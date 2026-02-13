import { tool } from "ai";
import { z } from "zod";

export function createWebSearchTool() {
  return tool({
    description: "Search the web for information",
    parameters: z.object({
      query: z.string().describe("The search query"),
    }),
    execute: async ({ query }) => {
      const apiKey = process.env.TAVILY_API_KEY;
      if (!apiKey) {
        return { results: [] };
      }

      try {
        const response = await fetch("https://api.tavily.com/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            api_key: apiKey,
            query,
            max_results: 5,
            search_depth: "basic",
          }),
        });

        const data = await response.json();
        return {
          results: (data.results || []).map((r: any) => ({
            title: r.title,
            url: r.url,
            content: r.content,
          })),
        };
      } catch (error) {
        console.error("Web search error:", error);
        return { results: [] };
      }
    },
  });
}
