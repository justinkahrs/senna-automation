---
title: "Extracting portable features during CRM migrations — making lost functionality mobile"
date: "2026-04-18"
category: "data-migration"
subtitle: "How we used feature extraction to recover lost CRM capabilities during a cross-platform migration"
heroTitle: "Make CRM features portable before you lose them"
heroSubtitle: "Recover and carry capability across vendor boundaries with structured feature extraction"
excerpt: "A practical walkthrough of extracting endangered CRM features during migrations — analyzing UI, workflows, and attachments to make them portable and future-proof."
image: "/blog/portable-crm-features-extraction-ai.jpg"
metadata:
  client: "Regional HVAC reseller"
  company: "Senna Automation"
  companyUrl: "https://senna.automation"
  year: "2025"
  role: "systems integrator"
  tools: "Python, PostgreSQL, Zapier, OpenAI, Selenium"
---

# Extracting portable features during CRM migrations — making lost functionality mobile

## The hidden cost of CRM vendor lock-in for an HVAC reseller

We migrated a regional HVAC reseller from a decade-old, heavily customized CRM (Vendor A) to a modern cloud CRM (Vendor B). Vendor A had stretched conventional CRM fields into business logic: custom quote attachments, nested service schedules inside contact records, and a rule engine that auto-tagged accounts based on a blend of invoice history and manual flags. Vendor B was cleaner but lacked equivalent primitives — a common migration outcome: the destination has better UX but fewer hooks for the old bespoke workflows.

Key cost drivers we saw during discovery:

- Business workflows tied to custom fields: tech schedule windows, recurring filter cleaners, and service-level tags were implemented as multi-line notes and attachments.
- Loss of document-context: Vendor A stored quotes and schematic drawings inline, with annotation links to contact events.
- Hidden rules in text fields: decision logic encoded as checklists in a "Notes" field used by dispatchers.

Migration planning can't just copy rows. You have to copy capability.

## Turning UI and unstructured fields into portable feature descriptors

We needed a way to extract "features" — not just data rows — from Vendor A so those features could be adapted on Vendor B or run from a middle layer. Features in this context are operational capabilities: "scheduled maintenance reminders with annotated drawings", "quote lineage to invoice" and "priority tagging from invoice cadence".

Approach summary:

1. Inventory: catalog every schema object, attachments, notes, and workflows. Include who uses each field and how.
2. Sample capture: pull representative records, attachments, and UI screenshots for each feature.
3. Extraction pipeline: run parsers and LLM-assisted classifiers to produce structured feature descriptors.

A feature descriptor looks like:

- feature_id: scheduled_maintenance_with_drawings
- triggers: invoice_paid_date + service_interval
- inputs: contact_id, equipment_serial, annotated_pdf
- operations: generate reminder email, attach latest drawing, schedule field visit
- constraints: only for accounts with warranty=true
- migration_strategy: middleware webhook + replicated attachments

We used a mix of deterministic parsing (regex for invoice codes, PDF metadata extraction) and LLM classification to convert text checklists into stepwise decision trees.

## Building the extraction pipeline: code, heuristics, and where AI helped

We implemented the pipeline in three stages:

- Data ingestion: Selenium-driven export of pages that had no API, plus API pulls for structured tables. We stored everything in PostgreSQL with a raw_blob table for notes and attachments.
- Deterministic parsing: PDFMiner for schematics, Tika for metadata, and custom parsers for invoice numbers and schedule-like substrings.
- LLM-assisted classification and synthesis: we fed extracted text and small samples of annotated records into an LLM to classify whether a field represented a rule, a schedule, or free-form notes. The models produced JSON feature descriptors and confidence scores.

Why LLMs: the old CRM used human-friendly shorthand and inconsistent labels. Rules were disguised as bulleted checklists. A rule-based parser missed 37% of these. The LLM-based classifier, trained with a few hundred labeled examples, reduced false negatives to ~6% in our tests.

Edge cases we handled:

- Nested features (a note triggering both billing reminders and dispatch notes).
- Attachments referenced only by filenames inside notes (we linked them using fuzzy filename matching and timestamp proximity).
- Conflicting rules: when different users encoded different business logic in the same field, we surfaced both variations with origin metadata and suggested a consolidation path.

## Mapping portable features into the new CRM and middleware

We created two target paths:

1. Native mapping: implement the feature using Vendor B's native objects when possible (e.g., create standard service appointments and attach PDFs).
2. Middleware mapping: when Vendor B lacked a primitive, we implemented the feature in a serverless middleware that sits between both systems, exposing webhooks and a small API.

Example: scheduled maintenance with annotated drawings

- On Vendor A: notes + PDF with markup + invoice schedule
- Extraction outcome: feature descriptor (see above)
- Migration: attachments were bulk-migrated to S3. The middleware stores the feature descriptor and reacts to Vendor B's webhook for invoice_paid_date to create a Vendor B appointment and attach the S3 file. This preserved behavior without bending Vendor B's data model.

Tradeoffs: Every middleware call adds latency and operational cost. We recommended a hybrid model: migrate static resources and run critical decision logic in middleware only when the destination CRM couldn't represent it.

## Validation, rollout, and training to avoid the "missing feature" shock

We deployed in a staged rollout:

- Shadow mode for four weeks: middleware listened to Vendor B webhooks and logged what it would have done without taking action. We compared those logs to historical outcomes.
- Pilot group: 10 power users performed live tasks while we monitored errors and user friction.
- Full cutover: after fixing gaps, we flipped the switch and disabled the old CRM access.

Training materials focused on the differences: we provided a feature map that showed where each Vendor A capability now lived (native field, middleware, or abandoned). This transparency reduced helpdesk tickets by 42% in month one.

## Making CRM data truly mobile: lessons and guidelines

- Extract features, not just tables. The operational intent matters.
- Keep attachments portable: migrate to object storage with canonical filenames and metadata.
- Treat the migration as an opportunity to simplify; keep a shadow copy of complex rules for 90 days.
- Measure with shadow mode: simulate before forcing changes.

If you're planning a CRM migration and worry about losing custom capability, a short extraction project (2–4 weeks) that produces feature descriptors will save months of rework.
