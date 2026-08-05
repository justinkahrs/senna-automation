import { attributionToLeadFields } from "@/utils/attribution";

export interface LeadFormValues {
  name: string;
  company?: string;
  assistance: string;
  contactMethod: "email" | "sms";
  contactValue: string;
  formContext?: string;
  landingPageSlug?: string;
  landingPageVariant?: string;
  website?: string;
  formStartedAt?: string;
}

export async function submitLead(values: LeadFormValues) {
  const attribution = attributionToLeadFields();
  const response = await fetch("/api/form-hook", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...values,
      ...attribution,
      landingPageSlug: values.landingPageSlug || attribution.landingPageSlug,
      landingPageVariant:
        values.landingPageVariant || attribution.landingPageVariant,
      submittedAt: new Date().toISOString(),
    }),
  });

  const payload = (await response.json().catch(() => null)) as
    | { submissionId?: string; error?: string }
    | null;

  if (!response.ok) {
    throw new Error(payload?.error || "We could not submit your request.");
  }

  return payload;
}
