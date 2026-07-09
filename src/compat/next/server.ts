export type NextRequest = Request;

function mergeHeaders(
  initHeaders: HeadersInit | undefined,
  defaults: Record<string, string>,
) {
  const headers = new Headers(initHeaders);

  for (const [key, value] of Object.entries(defaults)) {
    if (!headers.has(key)) {
      headers.set(key, value);
    }
  }

  return headers;
}

export class NextResponse extends Response {
  static json(data: unknown, init?: ResponseInit) {
    return new NextResponse(JSON.stringify(data), {
      ...init,
      headers: mergeHeaders(init?.headers, {
        "Content-Type": "application/json; charset=utf-8",
      }),
    });
  }

  static redirect(url: string | URL, init?: number | ResponseInit) {
    const status = typeof init === "number" ? init : init?.status || 307;
    return new NextResponse(null, {
      ...(typeof init === "number" ? undefined : init),
      status,
      headers: mergeHeaders(
        typeof init === "number" ? undefined : init?.headers,
        { Location: String(url) },
      ),
    });
  }
}
