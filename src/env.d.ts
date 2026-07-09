/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    session:
      | Awaited<ReturnType<typeof import("@/lib/auth").auth.api.getSession>>
      | null;
    user: Locals["session"] extends { user: infer User } ? User : unknown;
  }
}
