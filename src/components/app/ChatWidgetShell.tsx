"use client";

import type { ComponentType } from "react";
import { useEffect, useState } from "react";
import { useModalStore } from "@/stores/modal-store";

const STORAGE_KEY_OPEN = "tg_widget_is_open";

function ChatLauncher({
  disabled,
  onOpen,
}: {
  disabled: boolean;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      aria-label="Chat with Sales"
      aria-busy={disabled || undefined}
      onClick={onOpen}
      disabled={disabled}
      style={{
        position: "fixed",
        right: "clamp(16px, 4vw, 24px)",
        bottom: "var(--senna-chat-bottom, 24px)",
        zIndex: 9999,
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "0 20px",
        height: "56px",
        border: "none",
        borderRadius: "999px",
        background: "var(--ds-banana)",
        color: "var(--ds-space-indigo)",
        boxShadow: "var(--shadow-lg)",
        fontSize: "var(--type-body)",
        fontWeight: 700,
        lineHeight: 1,
        cursor: disabled ? "progress" : "pointer",
        opacity: disabled ? 0.92 : 1,
        pointerEvents: "auto",
        transition:
          "bottom 180ms ease, filter var(--dur-base) ease, opacity var(--dur-base) ease",
      }}
      onMouseEnter={(event) => {
        if (disabled) return;
        event.currentTarget.style.filter = "brightness(0.95)";
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.filter = "none";
      }}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        width="22"
        height="22"
        fill="currentColor"
      >
        <path d="M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-5 4v-4H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
      </svg>
      <span>Chat with Sales</span>
    </button>
  );
}

export default function ChatWidgetShell() {
  const { isCalendlyOpen } = useModalStore();
  const [hasMounted, setHasMounted] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [LoadedWidget, setLoadedWidget] =
    useState<ComponentType | null>(null);

  useEffect(() => {
    setHasMounted(true);

    try {
      setShouldLoad(sessionStorage.getItem(STORAGE_KEY_OPEN) === "true");
    } catch {
      setShouldLoad(false);
    }
  }, []);

  useEffect(() => {
    if (!shouldLoad || LoadedWidget) return;

    let cancelled = false;

    void import("@/components/app/ChatWidgetMount").then((module) => {
      if (!cancelled) {
        setLoadedWidget(() => module.default);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [LoadedWidget, shouldLoad]);

  const handleOpen = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY_OPEN, "true");
    } catch {
      // Session storage can be unavailable in restricted browser contexts.
    }

    setShouldLoad(true);
  };

  if (!hasMounted || isCalendlyOpen) {
    return null;
  }

  if (LoadedWidget) {
    return <LoadedWidget />;
  }

  return <ChatLauncher disabled={shouldLoad} onOpen={handleOpen} />;
}
