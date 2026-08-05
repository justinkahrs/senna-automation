import type { APIRoute } from "astro";
import { handleLeadSubmission } from "@/server/routes/ads/webhooks";

export const prerender = false;
export const POST: APIRoute = ({ request }) => handleLeadSubmission(request);

