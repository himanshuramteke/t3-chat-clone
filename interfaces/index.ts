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
