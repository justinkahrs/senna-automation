import type { ScriptHTMLAttributes } from "react";

export interface ScriptProps extends ScriptHTMLAttributes<HTMLScriptElement> {
  strategy?: "afterInteractive" | "beforeInteractive" | "lazyOnload";
}

export default function Script({ strategy, ...props }: ScriptProps) {
  const nextProps = { ...props };

  if (strategy === "afterInteractive" || strategy === "lazyOnload") {
    nextProps.defer = props.defer ?? true;
  }

  return <script {...nextProps} />;
}
