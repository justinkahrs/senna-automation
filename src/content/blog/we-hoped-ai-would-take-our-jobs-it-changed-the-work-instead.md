---
title: "We hoped AI would take our jobs — it changed the work instead"
date: "2026-04-15"
category: "operations"
subtitle: "How automation shifts tasks from doing to deciding, with concrete systems and tradeoffs"
heroTitle: "AI didn't remove the work — it reframed it"
heroSubtitle: "From repetitive execution to exception handling, monitoring, and continuous improvement"
excerpt: "Automation often eliminates repetitive steps, but it doesn't eliminate the need for human judgment. Here’s a practical look at how work changes, with a systems-level implementation you can copy."
image: "/blog/inside-an-old-fashioned-control-room-E840iJGN8_k.jpg"
metadata:
  client: "Midwest Metalworks\n(anonymous)"
  company: "Senna Automation"
  companyUrl: "https://sennaautomation.com"
  year: "2026"
  role: "Lead Automation Consultant"
  tools: "Unsplash, Node.js, PostgreSQL, Redis, Zapier, Prometheus"
---

# Context

People say "AI will take our jobs" as if work is a fixed set of manual steps that can be deleted. In practice — especially in operations, manufacturing, and service businesses — automation removes some tasks and creates others. The job becomes less about executing repetitive steps and more about designing, tuning, verifying, and responding to automation.

This post walks through a concrete, repeatable system we built for a mid-sized metal fabrication shop that was trying to automate quote intake, job scheduling, and production exceptions. The goal was not to "replace people" but to shift skilled staff away from repetitive tasks and toward higher-value decision-making.

# Why the problem is hard in the real world

- Inputs are messy: emailed drawings, phone notes, scanned PDFs, and non-standard Excel files.
- Rules aren’t binary: two quotes that look identical on paper may need different routing because of material source, tooling availability, or customer urgency.
- Exceptions are the norm: missing dimensions, conflicting tolerances, or rush requests happen daily.
- Compliance and traceability matter: audit trails and timestamped approvals must be preserved.

Any effective system has to handle the noise and surface only the real decisions to people.

# The system we built (at a glance)

Inputs → Preprocess → Auto-parse & classify → Rules engine → Human-in-the-loop triage → Execution systems

Components:
- Intake endpoints: email parser (IMAP + attachments), a lightweight web intake form (for repeat customers), and an SFTP drop for large CAD bundles.
- Parser: a Node.js microservice that extracts text from PDFs and Excel files, pulls attachments, and normalizes fields into a JSON schema.
- Classifier: a small rules+ML hybrid; deterministic rules for clear fields (part count, material), and a lightweight classifier for ambiguous fields (urgency, job type).
- Rules engine: a config-driven engine (Postgres-backed) that routes quotes to "Auto-quote", "Scheduled Review", or "Escalate to Sales" buckets.
- Human triage UI: a single-page app that shows only the differences and missing fields compared to the expected template, with quick actions and canned responses.
- Execution hooks: scheduler (cron + job queue), ERP sync (batched writes), and a monitoring stack (Prometheus + alerting).

# How it works — concrete flow

1. An incoming email with a PDF quote hits the IMAP listener.
2. The parser extracts text and attachments, runs a best-effort CAD filename matcher, and produces a normalized JSON payload:
   - customer_id, part_count, requested_date, materials, tolerances, attachments[]
3. Deterministic checks run first: is requested_date within lead-time window? is material in approved list? is part_count > 1000?
4. If deterministic checks pass, the rules engine computes an "auto-quote" score. A threshold (configurable) decides whether to auto-quote or send for review.
5. For ambiguous items (missing tolerances, conflicting sheet/part counts), the system sends a single triage task to the "Scheduler" queue rather than blocking everything. The triage UI surfaces: original email, parsed fields, what failed, and two buttons: "Approve auto-quote" or "Request clarification" (which sends a templated email and reopens the intake).
6. Approved auto-quotes are queued for ERP sync and scheduled for production planning. Rejected/clarified items create a short audit entry and a follow-up task.

Key implementation choices:
- Keep parsing tolerant but auditable: every extracted field stores provenance (which page, which regex/ML guess). That makes debugging fast when the parser is wrong.
- Use thresholds, not gates: thresholds let you tune the balance between automation and human review as trust improves.
- Prefer single-task triage: instead of surfacing the whole backlog of ambiguous quotes, surface only the minimal set that requires human judgment.

# Why this approach is better than typical "big automation" solutions

- Incremental trust-building: typical large automation projects try to automate everything and fail when edge-cases blow up. We deploy with low thresholds and increase automation as metrics improve.
- Auditability: because each decision has provenance, it's possible to trace why a quote was auto-approved — critical for compliance and customer disputes.
- Human time is used for decisions, not basic data entry: triage UI removes busywork (copy-paste, hunting attachments) so experienced staff can resolve more exceptions per hour.
- Config-driven routing means non-engineers (ops managers) can change routing rules without code deployments.

# Outcome and business impact (realistic example)

For the shop we worked with, after a 3-month rollout:
- 65% of inbound quotes were either fully auto-quoted or routed without manual data entry.
- The average time from receipt to schedule dropped from 28 hours to 6.5 hours for those handled by the system.
- The operations manager reported a 40% reduction in time spent on data entry and a 25% increase in throughput on the planning team because planners spent less time waiting on clarifications.
- False auto-approvals were tracked and reduced by adjusting thresholds; each false positive produced a clear edit in the audit trail so training data was easy to gather.

These numbers are from the deployment logs and weekly time-sheets; your mileage will vary depending on intake cleanliness and team bandwidth.

# Tradeoffs and edge cases

- Over-automation risk: lowering thresholds too far increases false approvals. Mitigation: monitor a rolling sample of auto-decisions and keep a short feedback loop for rollback.
- Hidden manual work: new tasks appear (monitoring, threshold tuning, triage). Plan for capacity and upskill existing staff rather than assuming headcount reductions.
- Data drift: as customers change formats, parser accuracy will decay. Solution: scheduled retraining and simple tooling for ops to add parsing rules.
- Responsibility handoff: when automation fails in production it’s often a people/process failure. Define RACI for automation incidents — who owns rollbacks, who owns model updates, who owns communication.

# Broader takeaway for similar businesses

Automation doesn’t remove work; it changes the work. The productive route is to:

- Automate the deterministic, repeatable steps first.
- Build lightweight, auditable paths for everything else.
- Surface only the exceptions to humans, and give those humans the right tools (context, provenance, and one-click actions).
- Track guardrail metrics (false positive rate, time-to-triage, %auto-processed) and use them to tune the system.

If you want to discuss how this pattern maps to your intake pipeline (quotes, service requests, repair orders), I can sketch a short roadmap and a minimum viable automation plan for your team.
