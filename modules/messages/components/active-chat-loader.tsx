"use client";

import { ActiveChatLoaderProps } from "@/interfaces";
import { useGetChatById } from "@/modules/chat/hooks/chat";
import { useChatStore } from "@/modules/chat/store/chat-store";
import { useEffect } from "react";

const ActiveChatLoader = ({ chatId }: ActiveChatLoaderProps) => {
  const { setActiveChatId, setMessages, chats, addChat } = useChatStore();

  const { data } = useGetChatById(chatId);

  useEffect(() => {
    if (!chatId) return;

    setActiveChatId(chatId);
  }, [chatId, setActiveChatId]);

  useEffect(() => {
    if (!data) return;

    const chat = data;

    // populate messages
    setMessages(chat.messages || []);

    if (!chats?.some((c) => c.id === chat.id)) {
      addChat(chat);
    }
  }, [data, setMessages, addChat, chats]);
  return null;
};

export default ActiveChatLoader;
