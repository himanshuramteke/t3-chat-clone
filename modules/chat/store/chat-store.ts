import { ChatStore } from "@/interfaces";
import { create } from "zustand";

export const useChatStore = create<ChatStore>((set) => ({
  activeChatId: null,
  setActiveChatId: (chatId) => set({ activeChatId: chatId }),
}));
