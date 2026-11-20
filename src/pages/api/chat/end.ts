import type { APIRoute } from "astro";
import { POST as postHandler } from "@/server/routes/chat/end";

export const prerender = false;
export const POST: APIRoute = ({ request }) => postHandler(request);
