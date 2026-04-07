import { Chat, Message } from "@prisma/client";

export interface ModelPricing {
  prompt: string;
  completion: string;
  image?: string;
  request?: string;
}

export interface ModelArchitecture {
  modality: string;
  tokenizer: string;
  instruct_type?: string;
  input_modalities: string[];
  output_modalities: string[];
}

export interface TopProvider {
  context_length?: number;
  max_completion_tokens: number;
  is_moderated: boolean;
}

export interface OpenRouterModel {
  id: string;
  name: string;
  description: string;
  context_length: number;
  architecture: ModelArchitecture;
  pricing: ModelPricing;
  top_provider: TopProvider;
}

export interface OpenRouterResponse {
  models: OpenRouterModel[];
}

export interface ModelSelectorProps {
  models: OpenRouterModel[];
  selectedModelId: string;
  onModelSelect: (id: string) => void;
  className?: string;
}

export interface CreateChatValues {
  content: string;
  model: string;
}

export interface ChatWithMessages extends Chat {
  messages: Message[];
}

export interface ActionResponse<T = ChatWithMessages> {
  success: boolean;
  message: string;
  data?: T;
}

export interface ChatStore {
  activeChatId: string | null;
  setActiveChatId: (chatId: string | null) => void;
}

export interface ChatSidebarProps {
  chats: ChatWithMessages[];
}

export interface GroupedChats {
  today: ChatWithMessages[];
  yesterday: ChatWithMessages[];
  lastWeek: ChatWithMessages[];
  older: ChatWithMessages[];
}
