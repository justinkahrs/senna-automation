---
title: "Why 'Good at Google' Is Now 'Good at AI' — A Practical Playbook for Operations"
date: "2026-04-15"
category: "Operations"
subtitle: "Making AI a practical, verifiable skill for quoting, intake, and everyday operational work"
heroTitle: "'Good at Google' → 'Good at AI'"
heroSubtitle: "How to turn prompt, retrieval, and verification skills into repeatable operational value"
excerpt: "Treat AI like the evolved search skillset it is: retrieval, verification, and structured synthesis. A step-by-step case study for turning LLMs into reliable quoting and intake tools for small operations."
image: "/images/posts/ai-good-at-google.jpg"
metadata:
  client: "Acme Fabrication\n(35-person machine shop)"
  company: "Senna Automation"
  companyUrl: "https://senna.co"
  year: "2026"
  role: "Systems architect"
  tools: "LLMs (instruction-tuned), embeddings, vector DB (Weaviate), LangChain-style retrieval layer, OCR, Zapier/Make, Gmail, HubSpot, Google Drive, Notion"
---

# Context — the lineage of a practical skill

For a long time hiring managers praised people who were "good at Google": they could find the right spec sheet, pull a relevant code snippet, or locate a regulation and extract the actionable line. That skill is about framing a question, navigating sources, and judging credibility under time pressure.

AI is the next iteration of that same capability. Instead of searching pages and reading, you're prompting a model, selecting relevant evidence from internal documents and the web, and producing a decision or artifact. The difference is not magic — it's scale, speed, and new failure modes (hallucinations, stale data, silence).

This post shows how to treat "being good at AI" as a practical, teachable, and auditable operational skill — using a quoting/intake example from a small machine shop we worked with.

## Why the problem is hard in the real world

Operational teams face constraints that simple demos ignore:

- Inputs are messy: PDFs, scanned drawings, emailed photos, and hand-written notes.
- Authority matters: a quote that looks right but is based on a misread spec creates cost and risk.
- Traceability is required: customers and auditors want to know why a number was chosen.
- Latency and staffing: sales and operations need fast answers, but SMEs are limited.
- Model failure modes: confident-sounding answers might be wrong (hallucinations) or reflect out-of-date pricing.

If you treat AI like a toy that writes text, you create brittle processes. If you treat it like an advanced search + synthesis tool with verification gates, it becomes useful.

## The system we built — inputs → system → outputs

Goal: cut quote turnaround time for RFQs while keeping error and rework risk low.

Inputs

- Incoming RFQ email with attachments (PDF drawings, customer spec sheets, photos).
- Existing internal data: BOM templates, historical quotes, negotiated supplier prices, shop routing times.
- SME rules: minimum run size, special tooling triggers, expedited rates.

System (high level)

1. Ingestion & OCR: attachments are saved to Google Drive. PDFs and images are OCRed and chunked by drawing/section.
2. Indexing & embeddings: chunks plus internal docs (BOM templates, past quotes) are embedded and stored in a vector DB with metadata (part number, customer, revision, page).
3. Retrieval layer: a LangChain-style retriever returns the top N evidence pieces for a given prompt. Evidence is presented with exact source pointers.
4. Structured synthesis: the LLM produces a draft quote using a deterministic template (line items, assumptions, confidence flags, and citations to evidence chunks). It also outputs a confidence score and a short rationale for each line item.
5. Rule engine & heuristics: deterministic checks flag items that need human review (new material types, large volume discounts, cost variance > X%).
6. Human-in-loop approval: a production scheduler sees the draft in Notion/HubSpot with highlighted evidence and either approves, edits, or routes to an SME. All edits are recorded.
7. Delivery & logging: approved quotes are sent via Gmail and stored. The system logs which evidence was used and who approved it.

Outputs

- Draft quote (PDF/HTML) with line-by-line citations and an assumptions section.
- Risk flags and reasons (e.g., "material spec ambiguous — see drawing p.2").
- Audit log tying each decision to evidence and approver.

## How it works — specific patterns and settings

Chunking and metadata

- Break PDFs into chunks at the drawing/page/title-block level, not arbitrary token windows. Tag chunks with fields: {file, page, drawing-number, revision}.
- Store both the raw OCR text and a high-quality handcrafted summary for critical documents (shop travelers, tooling notes).

Retrieval strategy

- Use a hybrid approach: keyword matching for exact identifiers (part number, drawing number) plus semantic similarity for context ("304 SS" close to "stainless 304").
- Set a similarity threshold and fall back to exact-match pipelines for high-risk fields (e.g., material spec). If similarity < 0.78, surface the chunk but require human review.

Prompt design and templates

- Use a strict template for quotes so the model fills structured slots (material, qty, unit cost, labor minutes, tooling needs, lead time, assumptions).
- Have the model always produce a short evidence list with source links. Never allow free-form numbers without a source reference.

Verification gates

- Deterministic checks: compare model-suggested material cost to supplier price DB. If delta > 12%, flag.
- Heuristic checks: if the quote includes a part type that hasn't been quoted in 24 months, require SME approval.
- Acceptance criteria: no quote leaves the system without either an approver signature or a pre-approved rule match.

Edge cases handled

- Handwritten notes: route to a human-OCR step and include in the evidence list.
- Missing drawings: auto-reply to customer asking for the specific missing file with a templated checklist.
- Conflicting specs: the model lists both interpretations, assigns a confidence, and suggests follow-up questions.

## Why this approach is better than typical solutions

Typical "AI solutions" either (a) let models write unchecked text, or (b) build rigid automation that fails on messy inputs. This design sits in the middle:

- It treats the LLM as a retrieval+compression layer, not an oracle. Outputs are always traceable to explicit evidence.
- It blends deterministic business rules with model flexibility. That reduces false positives and operational risk.
- Human approval is minimized but targeted: the system escalates only when uncertainty or business risk is present.
- Auditing and reproducibility: every number has provenance, which makes customer disputes and continuous improvement possible.

## Outcomes — measured impact

In the implementation at Acme Fabrication, measured over a 90-day window after rollout:

- Quote turnaround time fell from a median of ~2 hours to ~20 minutes for standard RFQs.
- The percentage of quotes requiring rework due to spec misread dropped from ~12% to ~2% (tracked by returned-for-correction incidents).
- The scheduler's weekly time spent on quote drafting dropped by ~65%, letting them focus on shop optimization and customer follow-ups.
- Sales conversion on quoted jobs rose by ~4 percentage points, largely because lead time estimates and assumptions were clearer.

Those numbers are from an operational pilot; your results will vary by data cleanliness and SME bandwidth.

## Tradeoffs and constraints

- Upfront effort: building the index, tagging documents, and writing the deterministic rules takes time. This is implementation work, not a button.
- Maintenance: supplier prices, tooling rates, and templates drift — you need a cadence for updating data and retraining embeddings.
- Compliance: if you work in regulated industries, add stricter audit and retention controls.
- Model choice: pick models that support deterministic behavior for template filling and allow you to extract token-level provenance when needed.

## Broader takeaway — teaching teams to be "good at AI"

Being "good at AI" is not about a single prompt trick. It is a composite skillset:

- Framing: turning an operational question into a retriever-friendly query.
- Evidence literacy: checking sources, recognizing weak matches, and escalating appropriately.
- Template discipline: forcing structure on outputs so decisions are auditable.
- Tooling fluency: knowing when to use embeddings, exact-match lookups, and human steps.

If you already hire people "good at Google," you have half the battle: they know how to judge sources and ask clarifying questions. Teach them the rest — how to craft retrieval prompts, read model confidence, and use the evidence-first templates above — and you’ll get consistent, auditable value out of AI without sacrificing safety.

## Practical next steps for operations teams

1. Inventory your inputs: where are RFQs, drawings, supplier price lists, and historical quotes stored? Start by moving them into a single, indexed location.
2. Prototype retrieval over a small dataset: extract 100 past quotes and their source docs, build embeddings, and try retrieval + template synthesis.
3. Define your gate rules: what percent variance or which part types require SME approval?
4. Run a 4–8 week pilot with a human-in-loop signoff and measure turnaround, rework, and conversion.
5. Iterate on chunking, similarity thresholds, and the approval rules — those three knobs matter most.

If you want, I can draft a one-page implementation checklist for your team or a tailored pilot plan for quoting, intake, or lead qualification for your business.
