import type { APIRoute } from "astro";
import { GET as getHandler } from "@/server/routes/chat/poll";

export const prerender = false;
export const GET: APIRoute = ({ request }) => getHandler(request);
