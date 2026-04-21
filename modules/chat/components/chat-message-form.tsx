"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAiModels } from "@/modules/ai-agent/hooks/ai-agent";
import { Spinner } from "@/components/ui/spinner";
import { ModelSelector } from "./model-selector";
import { useCreateChat } from "../hooks/chat";
import { toast } from "sonner";

interface ChatMessageFormProps {
  initialMessage?: string;
  onMessageChange?: (message: string) => void;
}

const ChatMessageForm = ({
  initialMessage,
  onMessageChange,
}: ChatMessageFormProps) => {
  const { data: models, isPending } = useAiModels();
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [localMessage, setLocalMessage] = useState<string>("");
  const { mutateAsync, isPending: isChatPending } = useCreateChat();

  const message = localMessage || initialMessage || "";

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalMessage(e.target.value);
    if (initialMessage) {
      onMessageChange?.("");
    }
  };

  const handleSubmit = async (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    e.preventDefault();
    if (!selectedModel) {
      toast.error("Please select a model before sending a message");
      return;
    }

    try {
      await mutateAsync({ content: message, model: selectedModel });
      toast.success("Message sent successfully");
    } catch (error) {
      console.error("Error sending message", error);
      toast.error("Failed to send message");
    } finally {
      setLocalMessage("");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 pb-6">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="relative rounded-2xl border-border shadow-sm transition-all">
          <Textarea
            value={message}
            onChange={handleChange}
            placeholder="Type your message here..."
            className="min-h-15 max-h-50 resize-none border-0 bg-transparent px-4 py-3 text-base focus-visible:ring-0 focus-visible:ring-offset-0"
            onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />

          <div className="flex items-center justify-between gap-2 px-3 py-2 border-t">
            <div className="flex items-center gap-1">
              {isPending ? (
                <>
                  <Spinner />
                </>
              ) : (
                <>
                  <ModelSelector
                    models={models?.models ?? []}
                    selectedModelId={selectedModel}
                    onModelSelect={setSelectedModel}
                    className="ml-1"
                  />
                </>
              )}
            </div>
            <Button
              type="submit"
              disabled={!message.trim() || !selectedModel || isChatPending}
              size="sm"
              variant={message.trim() ? "default" : "ghost"}
              className="h-8 w-8 p-0 rounded-full "
            >
              {isChatPending ? (
                <>
                  <Spinner />
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send message</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatMessageForm;
