import { OpenRouterResponse } from "@/interfaces";
import { useQuery } from "@tanstack/react-query";
const AI_MODELS_STALE_TIME_MS = 10 * 60 * 1000;
const AI_MODELS_GC_TIME_MS = 30 * 60 * 1000;

export const useAiModels = () => {
  return useQuery<OpenRouterResponse>({
    queryKey: ["ai-models"],
    queryFn: async (): Promise<OpenRouterResponse> => {
      const res = await fetch("/api/ai/get-models");
      if (!res.ok) {
        throw new Error(`Failed to fetch models: ${res.status}`);
      }
      return res.json();
    },
    staleTime: AI_MODELS_STALE_TIME_MS,
    gcTime: AI_MODELS_GC_TIME_MS,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
