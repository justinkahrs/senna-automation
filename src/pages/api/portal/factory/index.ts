import type { APIRoute } from "astro";
import { getFactoryOperator, requestFactory } from "@/lib/factory-portal";

export const prerender = false;

const idPattern = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i;
const privateHeaders = { "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex" };

function error(status: number, message: string) {
  return Response.json({ error: message }, { status, headers: privateHeaders });
}

export const GET: APIRoute = async ({ request, url, locals }) => {
  try {
    const user = await getFactoryOperator(request.headers, locals.user);
    if (!user) return error(403, "Factory access denied.");
    const project = url.searchParams.get("project");
    const run = url.searchParams.get("run");
    if (project && !idPattern.test(project)) return error(404, "Project unavailable.");
    if (run !== null && (!project || !idPattern.test(run))) return error(404, "Run unavailable.");
    const query = new URLSearchParams();
    if (project) query.set("project", project);
    if (run) query.set("run", run);
    const response = await requestFactory(user.id, `/v1/portfolio${query.size ? `?${query}` : ""}`);
    return Response.json(await response.json(), { status: response.status, headers: privateHeaders });
  } catch {
    return error(503, "The factory is temporarily unavailable.");
  }
};

export const POST: APIRoute = async ({ request, url, locals }) => {
  if (request.headers.get("origin") !== url.origin ||
      !request.headers.get("content-type")?.startsWith("application/json")) {
    return error(403, "Request origin denied.");
  }
  try {
    const user = await getFactoryOperator(request.headers, locals.user);
    if (!user) return error(403, "Factory access denied.");
    const reader = request.body?.getReader();
    let size = 0;
    const chunks: Uint8Array[] = [];
    for (;;) {
      if (!reader) break;
      const chunk = await reader.read();
      if (chunk.done) break;
      size += chunk.value.length;
      if (size > 6000) {
        await reader.cancel();
        return error(413, "Request is too large.");
      }
      chunks.push(chunk.value);
    }
    let answer;
    try { answer = JSON.parse(Buffer.concat(chunks).toString("utf8")); }
    catch { return error(422, "Invalid answer."); }
    if (answer?.kind === "enroll") {
      const response = await requestFactory(user.id, "/v1/enrollments", "POST", JSON.stringify({
        requestKey: answer.requestKey,
        client: answer.client,
        name: answer.name,
        template: answer.template,
        repository: answer.repository || undefined,
      }));
      return Response.json(await response.json(), { status: response.status, headers: privateHeaders });
    }
    if (answer?.kind === "link-enrollment-slack") {
      if (typeof answer.project !== "string" || !idPattern.test(answer.project)) return error(404, "Project unavailable.");
      if (typeof answer.channel !== "string" || !/^[CG][A-Z0-9]+$/.test(answer.channel)) return error(422, "Invalid channel confirmation.");
      const response = await requestFactory(user.id, `/v1/enrollments/${answer.project}/slack`, "POST",
        JSON.stringify({ channel: answer.channel }));
      return Response.json(await response.json(), { status: response.status, headers: privateHeaders });
    }
    if (answer?.kind === "dispatch") {
      if (typeof answer.project !== "string" || !idPattern.test(answer.project) ||
          !["pause", "resume"].includes(answer.action) || !Number.isSafeInteger(answer.version)) {
        return error(422, "Invalid project control request.");
      }
      const response = await requestFactory(user.id, `/v1/projects/${answer.project}/dispatch`, "POST",
        JSON.stringify({ action: answer.action, version: answer.version }));
      return Response.json(await response.json(), { status: response.status, headers: privateHeaders });
    }
    if (answer?.kind === "reconcile") {
      if (typeof answer.source !== "string" || !idPattern.test(answer.source) ||
          typeof answer.generation !== "string" || !/^\d{1,19}$/.test(answer.generation)) {
        return error(422, "Invalid source reconciliation request.");
      }
      const response = await requestFactory(user.id, `/v1/sources/${answer.source}/reconcile`, "POST",
        JSON.stringify({ generation: answer.generation }));
      return Response.json(await response.json(), { status: response.status, headers: privateHeaders });
    }
    if (!answer || typeof answer.decision !== "string" || !idPattern.test(answer.decision) ||
        !Number.isSafeInteger(answer.version)) return error(422, "Invalid decision or version.");
    const response = await requestFactory(user.id, `/v1/decisions/${answer.decision}/answer`, "POST", JSON.stringify({
      version: answer.version,
      action: answer.action,
      text: answer.text,
      digest: answer.digest,
    }));
    return Response.json(await response.json(), { status: response.status, headers: privateHeaders });
  } catch {
    return error(503, "The factory is temporarily unavailable.");
  }
};
