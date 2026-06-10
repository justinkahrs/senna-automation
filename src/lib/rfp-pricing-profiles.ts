export interface RfpPricingProfileLineItem {
  label: string;
  value: string;
  assumptions: string[];
  included?: boolean;
  optional?: boolean;
}

export interface RfpSupportProfileTier {
  name: string;
  value: string;
  includedServices: string[];
  availability: string;
}

export interface RfpPricingProfile {
  key: string;
  label: string;
  opportunityTypes: string[];
  pricingLineItems: RfpPricingProfileLineItem[];
  supportTiers: RfpSupportProfileTier[];
  hourlySupport: RfpPricingProfileLineItem;
}

const profiles: Record<string, RfpPricingProfile> = {
  "assessment-only": {
    key: "assessment-only",
    label: "Assessment Only",
    opportunityTypes: ["assessment", "assessment-only", "discovery"],
    pricingLineItems: [
      {
        label: "Workflow Validation and Future-State Design",
        value: "$6,500 - $9,500",
        assumptions: [
          "Assumes stakeholder interviews, current-state workflow mapping, and a future-state recommendation package.",
          "Includes a phased implementation roadmap and risk review.",
        ],
      },
      {
        label: "Optional Process Documentation Pack",
        value: "$1,200 - $2,000",
        assumptions: [
          "Applies when the client needs formal SOP-ready workflow documentation and handoff materials.",
        ],
        optional: true,
      },
      {
        label: "Optional Implementation Planning Workshop",
        value: "$1,500 - $2,500",
        assumptions: [
          "Used to align internal teams, confirm sequencing, and prepare the first implementation release.",
        ],
        optional: true,
      },
    ],
    supportTiers: [
      {
        name: "Basic Support",
        value: "$450/month",
        includedServices: [
          "Email support",
          "Issue triage",
          "Minor documentation updates",
        ],
        availability: "Business-hours response",
      },
      {
        name: "Standard Support",
        value: "$1,100/month",
        includedServices: [
          "Priority support",
          "Minor workflow refinements",
          "Monthly check-in",
        ],
        availability: "Priority business-hours response",
      },
      {
        name: "Advisory Support",
        value: "$1,950/month",
        includedServices: [
          "Optimization guidance",
          "Roadmap review",
          "Stakeholder advisory sessions",
        ],
        availability: "Priority support plus advisory sessions",
      },
    ],
    hourlySupport: {
      label: "Out-of-scope hourly support",
      value: "$225/hour",
      assumptions: ["Used for work not covered by a monthly support tier."],
    },
  },
  "workflow-automation-small": {
    key: "workflow-automation-small",
    label: "Workflow Automation Small",
    opportunityTypes: [
      "workflow-automation",
      "workflow-automation-small",
      "automation-small",
    ],
    pricingLineItems: [
      {
        label: "Workflow Validation and Future-State Design",
        value: "$6,500 - $9,500",
        assumptions: [
          "Assumes up to five stakeholder working sessions and current-state workflow mapping.",
          "Includes implementation priorities, architecture guidance, and delivery assumptions.",
        ],
      },
      {
        label: "Initial Implementation Release",
        value: "$12,000 - $18,000",
        assumptions: [
          "Assumes the first release focuses on one to two high-value workflow paths and standard system integrations.",
        ],
      },
      {
        label: "Optional Reporting Dashboard",
        value: "$3,000 - $5,000",
        assumptions: [
          "Applies when dashboard views, exception tracking, or staff reporting screens are included.",
        ],
        optional: true,
      },
      {
        label: "Optional Finance or Invoicing Workflow",
        value: "$2,500 - $4,500",
        assumptions: [
          "Applies when billing triggers, finance handoffs, or invoice-support automations are added.",
        ],
        optional: true,
      },
    ],
    supportTiers: [
      {
        name: "Basic Support",
        value: "$500/month",
        includedServices: [
          "Email support",
          "Workflow monitoring review",
          "Minor bug fixes",
        ],
        availability: "Business-hours response",
      },
      {
        name: "Standard Support",
        value: "$1,250/month",
        includedServices: [
          "Priority support",
          "Minor workflow changes",
          "Reporting review",
        ],
        availability: "Priority business-hours response",
      },
      {
        name: "Advisory Support",
        value: "$2,400/month",
        includedServices: [
          "Optimization planning",
          "Roadmap adjustments",
          "Monthly advisory session",
        ],
        availability: "Priority support plus advisory sessions",
      },
    ],
    hourlySupport: {
      label: "Out-of-scope hourly support",
      value: "$225/hour",
      assumptions: ["Used for requests outside the agreed monthly scope."],
    },
  },
  "workflow-automation-mid": {
    key: "workflow-automation-mid",
    label: "Workflow Automation Mid",
    opportunityTypes: [
      "workflow-automation-mid",
      "automation-mid",
      "multi-system-automation",
    ],
    pricingLineItems: [
      {
        label: "Workflow Validation and Future-State Design",
        value: "$9,000 - $14,000",
        assumptions: [
          "Assumes broader cross-functional discovery, system handoff mapping, and architecture recommendation work.",
        ],
      },
      {
        label: "Initial Implementation Release",
        value: "$20,000 - $32,000",
        assumptions: [
          "Assumes multiple workflow stages, cross-system integration, and structured exception handling.",
        ],
      },
      {
        label: "Optional Reporting Dashboard",
        value: "$4,500 - $8,000",
        assumptions: [
          "Applies when operational dashboards, queue tracking, and management reporting are required.",
        ],
        optional: true,
      },
      {
        label: "Optional Scheduling or Coordination Workflow",
        value: "$3,500 - $6,000",
        assumptions: [
          "Applies when scheduling, assignment, or calendar-driven coordination workflows are included.",
        ],
        optional: true,
      },
    ],
    supportTiers: [
      {
        name: "Basic Support",
        value: "$850/month",
        includedServices: [
          "Email support",
          "Monitoring review",
          "Minor issue resolution",
        ],
        availability: "Business-hours response",
      },
      {
        name: "Standard Support",
        value: "$1,850/month",
        includedServices: [
          "Priority support",
          "Minor workflow updates",
          "Monthly reporting review",
        ],
        availability: "Priority business-hours response",
      },
      {
        name: "Advisory Support",
        value: "$3,200/month",
        includedServices: [
          "Optimization planning",
          "Roadmap guidance",
          "Quarterly improvement sessions",
        ],
        availability: "Priority support plus advisory sessions",
      },
    ],
    hourlySupport: {
      label: "Out-of-scope hourly support",
      value: "$250/hour",
      assumptions: ["Used for urgent or out-of-scope implementation work."],
    },
  },
  "crm-integration": {
    key: "crm-integration",
    label: "CRM Integration",
    opportunityTypes: ["crm", "crm-integration", "crm-sync"],
    pricingLineItems: [
      {
        label: "Requirements and Field Mapping",
        value: "$5,500 - $8,000",
        assumptions: [
          "Assumes field mapping, workflow definition, and data ownership validation across the source systems.",
        ],
      },
      {
        label: "CRM Synchronization Implementation",
        value: "$10,000 - $16,000",
        assumptions: [
          "Assumes bi-directional or staged synchronization for one primary CRM and one upstream system.",
        ],
      },
      {
        label: "Optional Data Cleanup or Migration Support",
        value: "$3,000 - $6,000",
        assumptions: [
          "Applies when legacy cleanup, import preparation, or de-duplication support is needed.",
        ],
        optional: true,
      },
    ],
    supportTiers: [
      {
        name: "Basic Support",
        value: "$600/month",
        includedServices: [
          "Email support",
          "Integration monitoring review",
          "Minor configuration fixes",
        ],
        availability: "Business-hours response",
      },
      {
        name: "Standard Support",
        value: "$1,350/month",
        includedServices: [
          "Priority support",
          "Minor integration changes",
          "Monthly sync review",
        ],
        availability: "Priority business-hours response",
      },
      {
        name: "Advisory Support",
        value: "$2,500/month",
        includedServices: [
          "Optimization guidance",
          "Schema change planning",
          "Stakeholder advisory sessions",
        ],
        availability: "Priority support plus advisory sessions",
      },
    ],
    hourlySupport: {
      label: "Out-of-scope hourly support",
      value: "$235/hour",
      assumptions: ["Used for urgent integration changes or investigation work."],
    },
  },
};

const opportunityTypeMap: Record<string, string> = {
  assessment: "assessment-only",
  "assessment-only": "assessment-only",
  discovery: "assessment-only",
  "workflow-automation": "workflow-automation-small",
  "workflow-automation-small": "workflow-automation-small",
  "automation-small": "workflow-automation-small",
  "workflow-automation-mid": "workflow-automation-mid",
  "automation-mid": "workflow-automation-mid",
  "multi-system-automation": "workflow-automation-mid",
  crm: "crm-integration",
  "crm-integration": "crm-integration",
  "crm-sync": "crm-integration",
};

function normalizeKey(value: string) {
  return value.trim().toLowerCase();
}

export function getRfpPricingProfiles() {
  return { ...profiles };
}

export function getRfpPricingProfile(key: string | undefined | null) {
  if (!key) return null;
  return profiles[normalizeKey(key)] || null;
}

export function resolveDefaultPricingProfileKey(
  opportunityType: string | undefined | null,
) {
  if (!opportunityType) return null;
  return opportunityTypeMap[normalizeKey(opportunityType)] || null;
}
