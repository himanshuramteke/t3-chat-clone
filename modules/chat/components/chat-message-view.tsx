"use client";

import { useState } from "react";
import ChatWelcomeTabs from "./chat-welcome-tabs";
import ChatMessageForm from "./chat-message-form";
import { useUser } from "@clerk/nextjs";

const ChatMessageView = () => {
  const { user, isLoaded } = useUser();
  const [selectedMessage, setSelectedMessage] = useState<string>("");

  const handleMessageSelect = (message: string) => {
    setSelectedMessage(message);
  };

  const handleMessageChange = () => {
    setSelectedMessage("");
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-10">
      <ChatWelcomeTabs
        username={user?.fullName ?? user?.username ?? ""}
        onMessageSelect={handleMessageSelect}
      />
      <ChatMessageForm
        initialMessage={selectedMessage}
        onMessageChange={handleMessageChange}
      />
    </div>
  );
};

export default ChatMessageView;
