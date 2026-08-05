import type { APIRoute } from "astro";
import { handleAttribution } from "@/server/routes/ads/webhooks";

export const prerender = false;
export const POST: APIRoute = ({ request }) => handleAttribution(request);
