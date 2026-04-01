"use client";

import { useState } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatMessageFormProps {
  initialMessage?: string;
  onMessageChange?: (message: string) => void;
}

const ChatMessageForm = ({
  initialMessage,
  onMessageChange,
}: ChatMessageFormProps) => {
  const [localMessage, setLocalMessage] = useState<string>("");

  // No useEffect needed — derive the displayed value directly.
  // localMessage (user typing) takes priority over initialMessage (tab click).
  const message = localMessage || initialMessage || "";

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalMessage(e.target.value);
    // Once the user starts editing, clear the parent's selected message
    if (initialMessage) {
      onMessageChange?.("");
    }
  };

  const handleSubmit = async (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    try {
      e.preventDefault();
      setLocalMessage("");
      onMessageChange?.("");
      console.log("Message sent:", message);
    } catch (error) {
      console.log(error);
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
              <Button variant={"outline"}>Select a Model</Button>
            </div>
            <Button
              type="submit"
              disabled={!message.trim()}
              size="sm"
              variant={message.trim() ? "default" : "ghost"}
              className="h-8 w-8 p-0 rounded-full"
            >
              <ArrowUp className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatMessageForm;
