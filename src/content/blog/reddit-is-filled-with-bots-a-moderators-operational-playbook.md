---
title: "Reddit Is Filled With Bots — A Moderator’s Operational Playbook"
date: "2026-04-17"
category: "moderation"
subtitle: "Practical steps volunteer moderators can implement to detect, triage, and mitigate coordinated bot noise."
heroTitle: "Operational workflows for bot detection and response"
heroSubtitle: "Small infra, clear rules, and explainable triage"
excerpt: "Volunteer mods face a rising tide of automated accounts. This playbook outlines a low-cost, explainable workflow—inputs, rules, clustering, and outcomes—that reduced moderation time and false positives for a mid-sized subreddit."
image: "/blog/reddit-is-filled-with-bots-a-moderators-operational-playbook.jpg"
metadata:
  client: "r/example_subreddit\ncommunity moderators"
  company: "Senna Automation"
  companyUrl: "https://senna.com"
  year: "2026"
  role: "systems integrator"
  tools: "PRAW, Pushshift, Cloud Functions, Redis, Postgres, Sentry"
---

# Context and framing

Volunteer moderators on mid-sized subreddits (50k–200k subscribers) are seeing more automated accounts than before—cross-post spam, fake engagement, and coordinated comment farms. The load creates two problems: moderator burnout and community harm from both bot content and mistaken removals.

This post documents a concrete, operational playbook we deployed for r/example_subreddit that focuses on deterministic rules, lightweight infra, and explainable triage.

## Why this is hard in practice

- Volume: dozens to hundreds of low-effort items arrive daily.
- Evasion: bot operators rotate accounts, tweak content, and stagger posts to avoid simple rate limits.
- False positives matter: removing legitimate contributors damages community trust.
- Budget: volunteer teams need low-cost solutions that don't require constant maintenance.

# The system we implemented

Inputs -> Processing -> Outputs

Inputs
- New submissions and comments via Reddit API with Pushshift fallback.
- Modmail and user reports.
- Account history (age, karma, posting cadence).
- External signals: URL reputation, WHOIS, reverse-image results.

Processing
- Deterministic scoring engine (Cloud Function) applies rule weights to each item.
- Redis for recent activity lookups and de-dup detection.
- Postgres holds event history and moderator feedback.
- Background enrichment jobs (URL scans, image searches).

Outputs
- Auto-remove for high-confidence cases with a short safety window for appeals.
- Labeled modqueue items for human triage.
- Daily digest of likely bot clusters and suggested bulk actions.

# How it works — specifics

1) Ingestion
- We poll Reddit’s API for new items and subscribe to Pushshift as a redundancy. Polling is rate-limited; Pushshift provides bulk access when the API is slow.

2) Rules-based scoring
- Items receive additive weights from checks: account age < 3 days (+30), karma < 10 (+20), repeated domain (+25), identical image hash (+25), posting cadence matches a known cluster (+20), contains shortener or suspicious TLD (+15), blacklisted phrase (+40).
- Thresholds map to actions: score > 80 = auto-remove; 40–80 = modqueue label 'likely-bot'; <40 = no action.
- Conservative defaults prioritize human review whenever doubt exists.

3) Clustering and signals
- We create clusters from shared image hashes, similar usernames (edit distance <=2), identical or near-identical post bodies, and identical tracking params in URLs.
- Clusters with >=5 accounts that triggered high per-item scores get flagged for manual bulk removal and a suggested ban list.

4) Enrichment
- Non-blocking enrichment updates a record with URL reputation (VirusTotal, Google Safe Browsing), WHOIS age, and reverse-image matches; if enrichment increases confidence, the system escalates the item.

5) Moderator feedback loop
- Mods use three quick actions in the triage UI: 'remove+ban', 'remove', 'keep'. Each action is recorded and used to adjust rule weights monthly to reduce false positives.

# Why this approach works better

- Explainability: deterministic rules and visible weights let mods understand decisions.
- Low cost: Cloud Functions, Redis, and a small Postgres instance keep monthly costs low for volunteer communities.
- Focused on clusters: catching coordinated campaigns is more effective than per-account heuristics.

# Outcomes

- Reduced average moderator time on bot removals by ~50% within 6 weeks.
- False-positive rate measured at <4% after iterative tuning of rule weights.
- Identified and disabled multiple coordinated clusters posting affiliate links and vote-manipulation content.

# Practical checklist for teams

- Start with conservative rule weights and surface to humans.
- Implement clustering on several signals (images, usernames, URLs).
- Keep enrichment asynchronous so triage stays fast.
- Record moderator feedback and retune monthly.

If you'd like, I can share the PRAW script we used for scoring, the Cloud Function template, and the Postgres schema we used for feedback tracking.
