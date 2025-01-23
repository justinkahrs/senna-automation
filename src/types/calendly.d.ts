declare global {
  interface Window {
    Calendly?: {
      initInlineWidget(options: {
        url: string;
        parentElement: HTMLElement | null;
      }): void;
    };
  }
}

// Make this file a module by including an empty export
export {};