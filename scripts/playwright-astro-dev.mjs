import { execFileSync, spawn } from "node:child_process";
import { rmSync } from "node:fs";
import { setTimeout as delay } from "node:timers/promises";

const astroBin = process.platform === "win32" ? "npx.cmd" : "npx";
const host = "127.0.0.1";
const port = "3001";

function run(command, args) {
  execFileSync(command, args, {
    stdio: "inherit",
    env: process.env,
  });
}

function tryRun(command, args) {
  try {
    run(command, args);
  } catch {
    // Cleanup is best-effort.
  }
}

async function waitForServer(url, timeoutMs = 30_000) {
  const startedAt = Date.now();

  while (Date.now() - startedAt < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // Server is still booting.
    }

    await delay(500);
  }

  throw new Error(`Timed out waiting for Astro dev server at ${url}`);
}

let stopping = false;

function stopServer() {
  if (stopping) return;
  stopping = true;
  tryRun(astroBin, ["astro", "dev", "stop"]);
}

async function main() {
  tryRun(astroBin, ["astro", "dev", "stop"]);
  rmSync(".astro", { recursive: true, force: true });
  rmSync("node_modules/.vite", { recursive: true, force: true });

  const child = spawn(
    astroBin,
    ["astro", "dev", "--host", host, "--port", port],
    {
      stdio: "inherit",
      env: process.env,
    },
  );

  child.on("exit", (code) => {
    if (!stopping && code && code !== 0) {
      process.exitCode = code;
    }
  });

  process.on("SIGINT", () => {
    stopServer();
    process.exit(0);
  });

  process.on("SIGTERM", () => {
    stopServer();
    process.exit(0);
  });

  process.on("exit", () => {
    stopServer();
  });

  await waitForServer(`http://${host}:${port}/`);

  // Astro stays alive in its own daemon. Keep this wrapper alive so Playwright
  // has a long-running webServer process to manage.
  await new Promise(() => {});
}

main().catch((error) => {
  console.error(error);
  stopServer();
  process.exit(1);
});
