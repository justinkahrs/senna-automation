import { defineMiddleware } from "astro:middleware";
import { auth } from "@/lib/auth";

export const onRequest = defineMiddleware(async (context, next) => {
  if (context.isPrerendered) {
    context.locals.session = null;
    context.locals.user = null;
    return next();
  }

  try {
    const session = await auth.api.getSession({
      headers: context.request.headers,
    });

    context.locals.session = session;
    context.locals.user = session?.user ?? null;
  } catch (error) {
    console.error("[Auth] Failed to resolve session", error);
    context.locals.session = null;
    context.locals.user = null;
  }

  return next();
});
