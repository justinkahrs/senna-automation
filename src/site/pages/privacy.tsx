import { Box, Container, Typography, Paper } from "@mui/material";

export default function Privacy() {
  return (
    <Box
      sx={{
        pt: { xs: 16, md: 28 },
        pb: { xs: 8, md: 12 },
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="md">
        <Paper sx={{ p: 4 }}>
          <Typography variant="h2" gutterBottom>
            Privacy Policy
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: "text.secondary",
              marginBottom: "16px"
            }}>
            Last updated: July 27, 2026
          </Typography>
          <Typography variant="body1" sx={{
            marginBottom: "16px"
          }}>
            Senna Automation LLC (“we,” “us,” or “our”) operates{" "}
            <a
              href="https://www.senna-automation.com"
              target="_blank"
              rel="noopener"
            >
              https://www.senna-automation.com
            </a>{" "}
            (the “Site”). This Privacy
            Policy explains what information we collect, how we use it, and your
            rights.
          </Typography>

          {/* 1. Information We Collect */}
          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            1. Information We Collect
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            1.1 Information You Provide Directly
          </Typography>
          <Typography component="ul" variant="body1" sx={{
            marginBottom: "16px"
          }}>
            <li>
              <strong>Account &amp; Purchases:</strong> Name, email address,
              billing address, payment information (processed by Stripe or
              another payment processor), and any other details you submit when
              you purchase, register, or contact us.
            </li>
            <li>
              <strong>Support &amp; Feedback:</strong> Any content you provide
              when you submit a support request, bug report, or feedback form.
            </li>
            <li>
              <strong>Workflow Assessments and Bookings:</strong> Contact
              details, company name, workflow context, form attribution, and
              consultation scheduling or cancellation data you submit.
            </li>
          </Typography>

          <Typography variant="subtitle1" gutterBottom>
            1.2 Automatically Collected Information
          </Typography>
          <Typography component="ul" variant="body1" sx={{
            marginBottom: "16px"
          }}>
            <li>
              <strong>Usage Data:</strong> App telemetry (e.g. feature usage,
              errors, crashes) and Site analytics (page views, referral URLs,
              device/browser type).
            </li>
            <li>
              <strong>Cookies &amp; Tracking Technologies:</strong> We and our
              third-party partners use cookies, web beacons, and similar tools
              to collect data about your activity on the Site and over time
              across different sites and devices when you grant the relevant
              consent. See Section 4 for details.
            </li>
            <li>
              <strong>Advertising Attribution:</strong> Campaign parameters,
              landing-page variants, referring pages, and a single available
              Google click identifier such as GCLID, GBRAID, or WBRAID. We
              associate these details with an opaque attribution identifier so
              we can understand which ads lead to inquiries and paid work.
            </li>
          </Typography>

          <Typography variant="subtitle1" gutterBottom>
            1.3 Third-Party Sources
          </Typography>
          <Typography component="ul" variant="body1" sx={{
            marginBottom: "16px"
          }}>
            <li>
              <strong>Payment Processors:</strong> We receive confirmation of
              successful payments and limited transaction details from
              processors like Stripe—no full credit-card data is stored on our
              servers.
            </li>
            <li>
              <strong>Analytics Providers:</strong> Aggregated usage and
              performance metrics from Umami and, with consent, Google Ads.
            </li>
            <li>
              <strong>Business Systems:</strong> Lead lifecycle information
              from Mautic, scheduling information from Calendly, and paid
              invoice status and collected revenue from Akaunting.
            </li>
          </Typography>

          {/* 2. How We Use Your Information */}
          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            2. How We Use Your Information
          </Typography>
          <Typography component="ul" variant="body1" sx={{
            marginBottom: "16px"
          }}>
            <li>
              <strong>Provide &amp; Improve Services:</strong> Deliver,
              maintain, and enhance the App and Site, fix bugs, and roll out new
              features.
            </li>
            <li>
              <strong>Process Transactions:</strong> Verify purchases, send
              receipts, and communicate about orders, license keys, and
              subscription renewals.
            </li>
            <li>
              <strong>Measure Advertising Outcomes:</strong> Attribute lead
              forms, consultations, qualified opportunities, and collected
              revenue to the ads that produced them, audit campaign quality,
              and prevent duplicate conversion reporting.
            </li>
            <li>
              <strong>Support &amp; Communicate:</strong> Respond to support
              requests, send updates, security alerts, and administrative
              messages (e.g. policy changes).
            </li>
            <li>
              <strong>Marketing &amp; Promotions:</strong> With your consent,
              send newsletters, product announcements, and offers. You may opt
              out at any time.
            </li>
            <li>
              <strong>Security &amp; Compliance:</strong> Monitor for fraud,
              enforce our terms, and comply with legal obligations.
            </li>
          </Typography>

          {/* 3. How We Share Your Information */}
          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            3. How We Share Your Information
          </Typography>
          <Typography component="ul" variant="body1" sx={{
            marginBottom: "16px"
          }}>
            <li>
              <strong>Service Providers:</strong> Vendors who perform services
              on our behalf (e.g. payment processors, hosting, analytics, email
              delivery, CRM, scheduling, and advertising measurement).
            </li>
            <li>
              <strong>Google Ads Measurement:</strong> When advertising
              measurement consent is recorded, we may send normalized,
              SHA-256-hashed contact identifiers, click identifiers,
              transaction IDs, lifecycle status, and conversion value to
              Google&apos;s Data Manager API for enhanced and offline
              conversion measurement. We do not permit this upload without the
              recorded consent state.
            </li>
            <li>
              <strong>Legal &amp; Safety:</strong> When required by law, to
              protect rights, or in connection with a merger or sale of assets.
            </li>
            <li>
              <strong>Aggregated/Anonymized Data:</strong> We may publish usage
              trends or reports that do not identify you.
            </li>
          </Typography>

          {/* 4. Cookies & Tracking Technologies */}
          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            4. Cookies &amp; Tracking Technologies
          </Typography>
          <Typography component="ul" variant="body1" sx={{
            marginBottom: "16px"
          }}>
            <li>
              <strong>Essential Cookies:</strong> Required for site
              functionality (e.g. login sessions, shopping cart).
            </li>
            <li>
              <strong>Analytics Cookies:</strong> Collect anonymous usage data
              to help us improve performance and content. You can grant or
              deny this category independently.
            </li>
            <li>
              <strong>Advertising/Marketing Storage:</strong> Optional. Google
              advertising tags remain denied and are not loaded until you
              grant advertising measurement consent. The current pilot uses
              this category for conversion measurement, not Display
              remarketing.
            </li>
          </Typography>
          <Typography variant="body2" sx={{
            marginBottom: "16px"
          }}>
            You can manage or disable cookies via your browser settings or
            through the privacy choices control available on every page. Your
            choice is stored locally and can be changed later.
          </Typography>

          {/* 5. Your Choices & Rights */}
          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            5. Your Choices &amp; Rights
          </Typography>
          <Typography component="ul" variant="body1" sx={{
            marginBottom: "16px"
          }}>
            <li>
              <strong>Access &amp; Correction:</strong> Request a copy of or
              correction to your personal data.
            </li>
            <li>
              <strong>Deletion:</strong> Ask us to delete your personal data
              (subject to legal exceptions).
            </li>
            <li>
              <strong>Portability:</strong> Obtain a machine-readable copy of
              data you provided.
            </li>
            <li>
              <strong>Opt-Out:</strong> Withdraw consent for marketing
              communications or change analytics and advertising measurement
              consent through the site&apos;s privacy choices control.
            </li>
          </Typography>
          <Typography variant="body2" sx={{
            marginBottom: "16px"
          }}>
            To exercise these rights, contact us at
            privacy@senna-automation.com.
          </Typography>

          {/* 6. Data Security */}
          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            6. Data Security
          </Typography>
          <Typography variant="body1" sx={{
            marginBottom: "16px"
          }}>
            We implement industry-standard technical and organizational measures
            to protect your data, including encryption in transit (HTTPS) and at
            rest, regular security audits, and limited access controls. However,
            no system is completely secure—please help protect your account by
            using strong, unique passwords.
          </Typography>

          {/* 7. Data Retention */}
          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            7. Data Retention
          </Typography>
          <Typography variant="body1" sx={{
            marginBottom: "16px"
          }}>
            We retain lead and advertising attribution data for the time needed
            to measure the sales cycle and support customer service. The pilot
            uses a 90-day originating-click window for first paid-customer
            attribution. Accounting and tax records may be retained longer
            where legally required. After the applicable period, we delete or
            anonymize the data.
          </Typography>

          {/* 8. International Transfers */}
          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            8. International Transfers
          </Typography>
          <Typography variant="body1" sx={{
            marginBottom: "16px"
          }}>
            Senna Automation LLC is based in the U.S. If you’re located outside
            the U.S., please note that your data may be transferred to and
            processed on servers in the U.S., under U.S. privacy laws.
          </Typography>

          {/* 9. Children’s Privacy */}
          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            9. Children’s Privacy
          </Typography>
          <Typography variant="body1" sx={{
            marginBottom: "16px"
          }}>
            Our Site and App are not intended for children under 16. We do not
            knowingly collect personal data from anyone under 16. If you believe
            we have, please contact us and we will delete that information.
          </Typography>

          {/* 10. Changes to This Policy */}
          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            10. Changes to This Policy
          </Typography>
          <Typography variant="body1" sx={{
            marginBottom: "16px"
          }}>
            We may update this Privacy Policy at any time. The “Last updated”
            date will change accordingly. Your continued use of the Site or App
            after revisions constitutes acceptance of the updated policy.
          </Typography>

          {/* 11. Contact Us */}
          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            11. Contact Us
          </Typography>
          <Typography variant="body1" sx={{
            marginBottom: "16px"
          }}>
            Senna Automation LLC
            <br />
            Email: contact@senna-automation.com
            <br />
            Phone: (616) 287-3360
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
