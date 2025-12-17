import { NextResponse } from "next/server";
import { createAdminClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const session_id = searchParams.get("session_id");
    const cursor = searchParams.get("cursor"); // ISO timestamp string
    const limit = parseInt(searchParams.get("limit") || "50");

    if (!session_id) {
      return NextResponse.json(
        { error: "Missing session_id" },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    let query = supabase
      .from("messages")
      .select("*")
      .eq("session_id", session_id)
      .order("created_at", { ascending: true })
      .limit(Math.min(limit, 200));

    if (cursor) {
      query = query.gt("created_at", cursor);
    }

    const { data: messages, error } = await query;

    if (error) {
      console.error("Poll error:", error);
      return NextResponse.json({ error: "Db error" }, { status: 500 });
    }

    const nextCursor =
      messages && messages.length > 0
        ? messages[messages.length - 1].created_at
        : cursor;

    return NextResponse.json({
      messages: messages || [],
      nextCursor,
    });
  } catch (error: any) {
    console.error("Poll API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
