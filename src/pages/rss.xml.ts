import type { APIRoute } from "astro";
import { GET as getHandler } from "@/app/rss.xml/route";

export const GET: APIRoute = () => getHandler();
