export type PortalProviderId = "google" | "github" | "facebook" | "apple";

export interface PortalProviderDefinition {
  id: PortalProviderId;
  label: string;
}

export const portalProviderCatalog: PortalProviderDefinition[] = [
  { id: "google", label: "Google" },
  { id: "github", label: "GitHub" },
  { id: "facebook", label: "Facebook" },
  { id: "apple", label: "Apple" },
];
