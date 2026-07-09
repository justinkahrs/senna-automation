import type { APIRoute } from "astro";
import { GET as getHandler } from "@/site/feeds/feed-json";

export const GET: APIRoute = () => getHandler();
