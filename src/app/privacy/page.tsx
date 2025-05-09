import { Box, Container, Typography, Paper } from "@mui/material";

export default function Privacy() {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
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
          <Typography variant="subtitle1" color="text.secondary" paragraph>
            Last updated: May 8, 2025
          </Typography>
          <Typography variant="body1" paragraph>
            Senna Automation LLC (“we,” “us,” or “our”) operates{" "}
            <a
              href="https://www.senna-automation.com"
              target="_blank"
              rel="noopener"
            >
              https://www.senna-automation.com
            </a>{" "}
            (the “Site”) and the o11n application (the “App”). This Privacy
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
          <Typography component="ul" variant="body1" paragraph>
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
          </Typography>

          <Typography variant="subtitle1" gutterBottom>
            1.2 Automatically Collected Information
          </Typography>
          <Typography component="ul" variant="body1" paragraph>
            <li>
              <strong>Usage Data:</strong> App telemetry (e.g. feature usage,
              errors, crashes) and Site analytics (page views, referral URLs,
              device/browser type).
            </li>
            <li>
              <strong>Cookies &amp; Tracking Technologies:</strong> We and our
              third-party partners use cookies, web beacons, and similar tools
              to collect data about your activity on the Site and over time
              across different sites and devices. See Section 4 for details.
            </li>
          </Typography>

          <Typography variant="subtitle1" gutterBottom>
            1.3 Third-Party Sources
          </Typography>
          <Typography component="ul" variant="body1" paragraph>
            <li>
              <strong>Payment Processors:</strong> We receive confirmation of
              successful payments and limited transaction details from
              processors like Stripe—no full credit-card data is stored on our
              servers.
            </li>
            <li>
              <strong>Analytics Providers:</strong> Aggregated usage and
              performance metrics from services such as Google Analytics,
              Sentry, or equivalent.
            </li>
          </Typography>

          {/* 2. How We Use Your Information */}
          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            2. How We Use Your Information
          </Typography>
          <Typography component="ul" variant="body1" paragraph>
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
          <Typography component="ul" variant="body1" paragraph>
            <li>
              <strong>Service Providers:</strong> Vendors who perform services
              on our behalf (e.g. payment processors, hosting, analytics, email
              delivery).
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
          <Typography component="ul" variant="body1" paragraph>
            <li>
              <strong>Essential Cookies:</strong> Required for site
              functionality (e.g. login sessions, shopping cart).
            </li>
            <li>
              <strong>Analytics Cookies:</strong> Collect anonymous usage data
              to help us improve performance and content.
            </li>
            <li>
              <strong>Advertising/Marketing Cookies:</strong> (Optional) Only if
              you opt in, for tailored offers and retargeting.
            </li>
          </Typography>
          <Typography variant="body2" paragraph>
            You can manage or disable cookies via your browser settings or
            through our cookie banner on first visit.
          </Typography>

          {/* 5. Your Choices & Rights */}
          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            5. Your Choices &amp; Rights
          </Typography>
          <Typography component="ul" variant="body1" paragraph>
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
              communications or opt out of analytics tracking (via cookie
              settings).
            </li>
          </Typography>
          <Typography variant="body2" paragraph>
            To exercise these rights, contact us at
            privacy@senna-automation.com.
          </Typography>

          {/* 6. Data Security */}
          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            6. Data Security
          </Typography>
          <Typography variant="body1" paragraph>
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
          <Typography variant="body1" paragraph>
            We retain your personal data for as long as needed to fulfill the
            purposes outlined in Section 2, or as required by law (e.g. tax
            records). After that, we delete or anonymize the data.
          </Typography>

          {/* 8. International Transfers */}
          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            8. International Transfers
          </Typography>
          <Typography variant="body1" paragraph>
            Senna Automation LLC is based in the U.S. If you’re located outside
            the U.S., please note that your data may be transferred to and
            processed on servers in the U.S., under U.S. privacy laws.
          </Typography>

          {/* 9. Children’s Privacy */}
          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            9. Children’s Privacy
          </Typography>
          <Typography variant="body1" paragraph>
            Our Site and App are not intended for children under 16. We do not
            knowingly collect personal data from anyone under 16. If you believe
            we have, please contact us and we will delete that information.
          </Typography>

          {/* 10. Changes to This Policy */}
          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            10. Changes to This Policy
          </Typography>
          <Typography variant="body1" paragraph>
            We may update this Privacy Policy at any time. The “Last updated”
            date will change accordingly. Your continued use of the Site or App
            after revisions constitutes acceptance of the updated policy.
          </Typography>

          {/* 11. Contact Us */}
          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            11. Contact Us
          </Typography>
          <Typography variant="body1" paragraph>
            Senna Automation LLC
            <br />
            456 Industry Way
            <br />
            Detroit, MI 48201
            <br />
            Email: privacy@senna-automation.com
            <br />
            Phone: (123) 456-7890
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
