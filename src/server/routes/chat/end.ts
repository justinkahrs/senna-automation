import { NextResponse } from "@/compat/next/server";
import {
  clearChatCapabilityCookie,
  isSameOriginRequest,
} from "@/lib/chat-capability.mjs";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json(
      { error: "Request origin is not allowed." },
      { status: 403, headers: { "Cache-Control": "no-store" } },
    );
  }

  return NextResponse.json(
    { ok: true },
    {
      headers: {
        "Cache-Control": "no-store",
        "Set-Cookie": clearChatCapabilityCookie(),
      },
    },
  );
}
