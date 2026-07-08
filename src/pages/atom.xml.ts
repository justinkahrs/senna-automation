import type { APIRoute } from "astro";
import { GET as getHandler } from "@/app/atom.xml/route";

export const GET: APIRoute = () => getHandler();
