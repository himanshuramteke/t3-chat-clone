import { CreateChatValues } from "@/interfaces";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createChatWithMessage, deleteChat } from "../actions";
import { toast } from "sonner";

export const useCreateChat = () => {
  const queryClient = useQueryClient();

  const router = useRouter();

  return useMutation({
    mutationFn: (values: CreateChatValues) => createChatWithMessage(values),
    onSuccess: (res) => {
      if (res.success && res.data) {
        const chat = res.data;
        queryClient.invalidateQueries({ queryKey: ["chats"] });
        router.push(`/chat/${chat.id}?autoTrigger=true`);
      }
    },
    onError: (error) => {
      console.error("Create chat error:", error);
      toast.error("Failed to create chat");
    },
  });
};

export const useDeleteChat = (chatId: string) => {
  const queryClient = useQueryClient();

  const router = useRouter();

  return useMutation({
    mutationFn: () => deleteChat(chatId),

    onSuccess: (res) => {
      if (res.success) {
        queryClient.invalidateQueries({ queryKey: ["chats"] });
        router.push("/");
      }
    },
    onError: (error) => {
      console.error("Delete chat error:", error);
      toast.error("Failed to delete chat");
    },
  });
};
