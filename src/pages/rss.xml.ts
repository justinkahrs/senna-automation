import type { APIRoute } from "astro";
import { GET as getHandler } from "@/site/feeds/rss";

export const GET: APIRoute = () => getHandler();
