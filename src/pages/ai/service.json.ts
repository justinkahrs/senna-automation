import type { APIRoute } from "astro";
import { aiServiceProfile } from "@/utils/ai-discovery";

export const prerender = true;

export const GET: APIRoute = () =>
  new Response(JSON.stringify(aiServiceProfile, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
