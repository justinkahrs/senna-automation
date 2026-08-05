| Event Name             | Trigger                                                     | Captured Data             | Locations                                       |
| ---------------------- | ----------------------------------------------------------- | ------------------------- | ----------------------------------------------- |
| Clicked CTA            | Interaction with primary/secondary conversion buttons.      | label, content_id, asset_id, offer_id, placement | ScheduleCallButton, RequestFormButton, FinalCTA |
| Clicked Nav Link       | Main navigation usage (Services, Solutions, Pricing, Blog). | label, href               | AppBar (Desktop & Mobile)                       |
| Clicked Contact Link   | Clicks on sales-specific or high-intent contact links.      | label, content_id, asset_id, offer_id, placement | AppBar, FinalCTA                                |
| Clicked External Link  | Clicks on social media or third-party validation links.     | label, href               | Footer (LinkedIn, Instagram, BBB)               |
| Submitted Contact Form | Successful form submission (excludes PII).                  | form_type, contact_method | ContactForm                                     |
| Scheduled Calendly Meeting | Calendly confirms an invitee event was scheduled.        | source, content_id, asset_id, offer_id, placement | ScheduleCallButton                           |

Umami events are sent only after analytics consent is granted and are suppressed
when the browser-level owner exclusion flag is enabled. Opening the Calendly
modal remains a CTA interaction; it is not counted as a booked meeting.

`content_id`, `asset_id`, `offer_id`, and `placement` are optional on legacy
pages and required on generated-content conversion paths. The same identifiers
are persisted in first/last-touch attribution, lead payloads, and Calendly custom
answers (`a2`–`a5`); `a1` remains the attribution ID.
