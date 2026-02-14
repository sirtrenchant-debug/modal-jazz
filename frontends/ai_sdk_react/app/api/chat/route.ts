import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { convertToCoreMessages, streamText } from "ai";
import { createWebSearchTool } from "../../lib/search-tool";

const provider = createOpenAICompatible({
  name: "jazz",
  baseURL:
    process.env.LLM_BACKEND_URL || "",
  apiKey: process.env.LLM_BACKEND_API_KEY ?? "",
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const webSearchTool = process.env.TAVILY_API_KEY
    ? createWebSearchTool()
    : undefined;

  const result = streamText({
    model: provider.chatModel("zai-org/GLM-5-FP8"),
    messages: convertToCoreMessages(messages),
    tools: webSearchTool ? { webSearch: webSearchTool } : undefined,
    maxSteps: 20,
  });

  return result.toDataStreamResponse();
}
