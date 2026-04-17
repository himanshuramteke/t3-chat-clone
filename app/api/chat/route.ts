import {
  convertToModelMessages,
  streamText,
  UIMessage,
  ModelMessage,
} from "ai";
import { db } from "@/lib/db";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { CHAT_SYSTEM_PROMPT } from "@/lib/prompt";
import {
  ChatRequestBody,
  MessageToSave,
  StoredMessage,
  TextPart,
} from "@/interfaces";
import { MessageRole, MessageType, Prisma } from "@prisma/client";

const provider = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

function convertStoredMessageToUI(msg: StoredMessage): UIMessage | null {
  try {
    const parts: TextPart[] = JSON.parse(msg.content);
    const validParts = parts.filter((part) => part.type === "text");

    if (validParts.length === 0) return null;
    return {
      id: msg.id,
      role: msg.messageRole.toLowerCase() as UIMessage["role"],
      parts: validParts,
    };
  } catch (e) {
    return {
      id: msg.id,
      role: msg.messageRole.toLowerCase() as UIMessage["role"],
      parts: [{ type: "text", text: msg.content }],
    };
  }
}

function extractPartsAsJSON(message: UIMessage): string {
  if (message.parts && Array.isArray(message.parts)) {
    return JSON.stringify(message.parts);
  }
  const content = (message as unknown as { content?: string }).content ?? "";
  return JSON.stringify([{ type: "text", text: content }]);
}

export async function POST(req: Request): Promise<Response> {
  try {
    const {
      chatId,
      messages: newMessages,
      model,
      skipUserMessage,
    }: ChatRequestBody = await req.json();

    const previousMessages: StoredMessage[] = chatId
      ? await db.message.findMany({
          where: { chatId },
          orderBy: {
            createdAt: "asc",
          },
        })
      : [];

    const uiMessages = previousMessages
      .map(convertStoredMessageToUI)
      .filter((msg): msg is UIMessage => msg !== null);

    const normalizedNewMessages: UIMessage[] = Array.isArray(newMessages)
      ? newMessages
      : [newMessages];

    const allUIMessages: UIMessage[] = [
      ...uiMessages,
      ...normalizedNewMessages,
    ];

    let modelMessages: ModelMessage[];
    try {
      modelMessages = (await Promise.resolve(
        convertToModelMessages(allUIMessages),
      )) as ModelMessage[];
    } catch (conversionError) {
      modelMessages = allUIMessages
        .map((msg) => ({
          role: msg.role,
          content: msg.parts
            .filter((p): p is TextPart => p.type === "text")
            .map((p) => p.text)
            .join("\n"),
        }))
        .filter((m) => m.content) as ModelMessage[];
    }

    const result = streamText({
      model: provider.chat(model),
      messages: modelMessages,
      system: CHAT_SYSTEM_PROMPT,
    });

    return result.toUIMessageStreamResponse({
      sendReasoning: true,
      originalMessages: allUIMessages,
      onFinish: async ({ responseMessage }) => {
        try {
          const messagesToSave: MessageToSave[] = [];

          if (!skipUserMessage) {
            const latestUserMessage =
              normalizedNewMessages[normalizedNewMessages.length - 1];
            if (latestUserMessage?.role === "user") {
              const userPartsJSON = extractPartsAsJSON(latestUserMessage);
              messagesToSave.push({
                chatId,
                content: userPartsJSON,
                messageRole: MessageRole.USER,
                model,
                messageType: MessageType.NORMAL,
              });
            }
          }

          if (responseMessage?.parts && responseMessage.parts.length > 0) {
            const assistantPartsJSON = extractPartsAsJSON(
              responseMessage as UIMessage,
            );
            messagesToSave.push({
              chatId,
              content: assistantPartsJSON,
              messageRole: MessageRole.ASSISTANT,
              model,
              messageType: MessageType.NORMAL,
            });
          }

          if (messagesToSave.length > 0) {
            await db.message.createMany({
              data: messagesToSave as Prisma.MessageCreateManyInput[],
            });
          }
        } catch (error) {
          console.error("❌ Error saving messages:", error);
        }
      },
    });
  } catch (error) {
    const err = error as Error;
    console.error("❌ API Route Error:", err);
    return new Response(
      JSON.stringify({
        error: err.message || "Internal server error",
        details: err.toString(),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
