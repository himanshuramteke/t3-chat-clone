import { NextResponse } from "next/server";
import { OpenRouterModel, OpenRouterResponse } from "@/interfaces";
const MODELS_REVALIDATE_SECONDS = 30 * 60;

export async function GET(): Promise<NextResponse> {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/models", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      next: {
        revalidate: MODELS_REVALIDATE_SECONDS,
      },
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const data = (await response.json()) as {
      data?: OpenRouterModel[];
      models?: OpenRouterModel[];
    };

    const allModels = data.data ?? data.models ?? [];

    const freeModels: OpenRouterModel[] = allModels.filter(
      (model: OpenRouterModel) => {
        const promptPrice = Number(model.pricing?.prompt ?? "0");
        const completionPrice = Number(model.pricing?.completion ?? "0");
        const requestPrice = Number(model.pricing?.request ?? "0");
        return (
          Number.isFinite(promptPrice) &&
          Number.isFinite(completionPrice) &&
          Number.isFinite(requestPrice) &&
          promptPrice === 0 &&
          completionPrice === 0 &&
          requestPrice === 0
        );
      },
    );

    const formattedModels: OpenRouterModel[] = freeModels.map(
      (model: OpenRouterModel) => ({
        id: model.id,
        name: model.name,
        description: model.description,
        context_length: model.context_length,
        architecture: model.architecture,
        pricing: model.pricing,
        top_provider: model.top_provider,
      }),
    );

    const payload: OpenRouterResponse = {
      models: formattedModels,
    };

    return NextResponse.json(payload, {
      headers: {
        "Cache-Control": `public, max-age=${MODELS_REVALIDATE_SECONDS}, s-maxage=${MODELS_REVALIDATE_SECONDS}, stale-while-revalidate=${MODELS_REVALIDATE_SECONDS * 2}`,
      },
    });
  } catch (error) {
    console.error("Error fetching free models", error);

    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch free model";

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 },
    );
  }
}
