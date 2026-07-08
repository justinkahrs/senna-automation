import type { APIRoute } from "astro";
import { GET as getHandler } from "@/app/api/chat/poll/route";

export const prerender = false;
export const GET: APIRoute = ({ request }) => getHandler(request);
