import { NextResponse } from "next/server";
import { query } from "@/utils/db";

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

    let sql = `
      SELECT * FROM messages 
      WHERE session_id = $1 
    `;
    const params: any[] = [session_id];

    if (cursor) {
      sql += " AND created_at > $2 ";
      params.push(cursor);
    }

    sql += ` ORDER BY created_at ASC LIMIT $${params.length + 1} `;
    params.push(Math.min(limit, 200));

    const { rows: messages } = await query(sql, params);

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
