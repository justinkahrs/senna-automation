import WebIcon from "@mui/icons-material/Web";
import type { Product } from "@/components/ProductCard";

export const customApplications: Product[] = [
  {
    title: "o11n",
    icon: WebIcon,
    description:
      "A cross-platform desktop app that lets you load your project, describe your goals in natural language, and safely apply AI generated code changes to your files.",
    features: [
      "Load your codebase or entire project for full context",
      "Describe your goals in natural language instead of writing detailed instructions",
      "Review AI proposed edits and apply changes directly to your local files",
      "Iterate quickly by applying changes, reloading, and prompting again",
      "Save and reuse prompts or workflows for common tasks",
      "Works offline for personal use with no API keys, logins, or subscriptions required",
    ],
    media: {
      src: "/o11n-thumb.png",
      alt: "o11n platform interface",
      type: "image",
    },
  },
];
