---
title: "Automating Unstructured Quoting with AI"
date: "2026-03-26"
category: "Automation Workflow"
subtitle: "How we turned manual quote drafting from unstructured emails into a fully automated AI pipeline."
heroTitle: "End-to-End Quote Automation"
heroSubtitle: "Transforming messy inbox requests into polished PDF quotes instantly."
excerpt: "Discover how we used n8n and Azure OpenAI to automatically read customer emails, extract structured product data (even from PDFs!), query internal databases, and generate final quote PDFs without human intervention."
image: "/paperwork.jpg"
metadata:
  client: "B2B Equipment Manufacturer\n50–200 employees"
  company: ""
  companyUrl: ""
  year: "2026"
  role: "Automation Consultant"
  tools: "n8n, Azure OpenAI, Front.com API, Custom ERP Integration"
---

The Request for Quote (RFQ) process is the lifeblood of B2B sales, but it's often fraught with manual inefficiencies. Customers send messy, unstructured emails requesting pricing, sometimes in the body text, sometimes buried in an attached PDF. Historically, support agents have to read these emails, decipher part numbers from descriptive text, log into an ERP system, manually enter each line item to verify pricing, and then generate a quote document.

To eliminate this bottleneck, we designed a fully automated n8n workflow that uses artificial intelligence to digest unstructured emails and instantly output a formal Quote PDF.

## The challenge: Messy inboxes and complex data

When an organization receives hundreds of emails a week in an unassigned inbox, just sorting through the noise is a massive undertaking. A potential workflow could easily break if it tries to generate a quote for a simple "Thank you" email, or if it accidentally picks up non-product numbers like phone numbers and ZIP codes.

We needed a system that was smart enough to understand the context of the emails, robust enough to extract highly specific technical part IDs, and capable of integrating deeply with existing internal databases.

![Man in glasses reviewing documents at desk](https://unsplash.com/photos/xQydhL4LmlA/download?force=true&w=1600&q=80)

### Categorizing the Request

Before attempting any data extraction, the system must confirm that an incoming email actually requires a quote. To solve this, the workflow monitors a targeted Front.com inbox and routes new unassigned email threads through an Azure OpenAI intent classifier. The AI is specifically prompted to detect if a message is requesting new quotes rather than asking about existing quantity discounts or order updates. Only verified quote requests are allowed to proceed down the pipeline, keeping the system efficient and preventing misfires.

## The solution: Intelligent extraction & automated quoting

The core of the workflow leverages LangChain and GPT models as an intelligent translation layer between messy human requests and strict database schemas.

```mermaid
flowchart TD
    A["RFQs<br/>(Plain text, PDFs, screenshots)"] --> B{"Classify"}
    B -->|Quote request| C["Extract<br/>part numbers and quantities"]
    B -->|Not a quote| X([Exit workflow])

    C --> D["Validate and match<br/>items + pricing in ERP"]
    D --> E["Assemble &<br/>build quote with customer data"]
    E --> F@{ shape: doc, label: "Output<br/>formalized quote PDF via email manager" }
```

### AI-Powered Data Extraction

The most critical and complex step is pulling precise, structured product data out of raw text. If an email includes a PDF attachment, the workflow automatically downloads it, parses the text locally using a temporary container command, and deletes the file.

Next, the combined text is fed into a heavily tuned Information Extractor node. Because ERP systems require exact part numbers to function, we wrote strict AI contracts:

- The model must return purely the raw product identifiers (e.g., SKUs or part numbers) and requested quantities.
- It must ignore descriptive branding like "SERVICE KIT" or "GASKET" next to the numbers.
- It must gracefully default to a quantity of 1 if none is specified, while ignoring dimensions, serial numbers, or irrelevant digits.

This strict extraction transforms a paragraph of text perfectly into a structured JSON array of products.

### Seamless ERP Integration

Once the AI locks down the structured list of parts and quantities, the workflow connects seamlessly to the company's internal "Control Tower" API:

[[QUOTE_AUTOMATION_ERP_STEPS]]

By combining the reasoning capabilities of modern LLMs with rigid API orchestration, what traditionally took a sales team several minutes of tedious administrative work per email is now completed flawlessly in the background in just seconds.
