import { Box, Container, Typography, Paper } from "@mui/material";

export default function Terms() {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        minHeight: { xs: "calc(100vh - 64px)", md: "calc(100vh - 64px)" },
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="md">
        <Paper sx={{ p: 4 }}>
          <Typography variant="h2" gutterBottom>
            Terms of Service
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" paragraph>
            Last updated: May 8, 2025
          </Typography>
          <Typography paragraph>
            Welcome to Senna Automation LLC (“we,” “us,” or “our”). By accessing
            or using{" "}
            <a
              href="https://www.senna-automation.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.senna-automation.com
            </a>{" "}
            (the “Site”), you agree to these Terms of Service (“Terms”). If you
            do not agree, please do not use the Site.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            1. Use of the Site
          </Typography>
          <Typography paragraph>
            <strong>1.1 Eligibility.</strong> You must be at least 18 years old
            to use the Site.
          </Typography>
          <Typography paragraph>
            <strong>1.2 Permitted Use.</strong> You may browse, review, and
            purchase products and services as offered. You may not scrape,
            reverse-engineer, or otherwise misuse the Site.
          </Typography>
          <Typography paragraph>
            <strong>1.3 Account Registration.</strong> If a registration is
            required, you agree to provide accurate information and keep your
            password secure.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            2. Purchases & Payments
          </Typography>
          <Typography paragraph>
            <strong>2.1 Order Acceptance.</strong> All orders are subject to our
            acceptance. We may refuse or cancel any order at our discretion.
          </Typography>
          <Typography paragraph>
            <strong>2.2 Pricing & Taxes.</strong> Prices are as quoted on the
            Site. You are responsible for all applicable taxes.
          </Typography>
          <Typography paragraph>
            <strong>2.3 Refund Policy.</strong> Our Refund Policy governs
            eligibility and procedure for refunds. Please review it before
            purchase.
          </Typography>
          <Typography paragraph>
            <strong>2.4 Consent to Agreements.</strong> By clicking “Buy” or
            completing a purchase, you acknowledge that you have read and agree
            to our End-User License Agreement and Privacy Policy.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            3. Intellectual Property
          </Typography>
          <Typography paragraph>
            <strong>3.1 Site Content.</strong> All text, graphics, logos,
            images, and software on the Site are owned or licensed by Senna
            Automation LLC and protected by copyright, trademark, and other
            laws.
          </Typography>
          <Typography paragraph>
            <strong>3.2 Limited License.</strong> We grant you a limited,
            non-exclusive, non-transferable license to access and use the Site
            for your personal, non-commercial purposes. All other rights are
            reserved.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            4. User Content
          </Typography>
          <Typography paragraph>
            <strong>4.1 Submissions.</strong> Any reviews, comments, or other
            content you post become the property of Senna Automation LLC. You
            grant us a perpetual, worldwide, royalty-free license to use,
            modify, and display such content.
          </Typography>
          <Typography paragraph>
            <strong>4.2 Prohibited Content.</strong> You may not post anything
            unlawful, infringing, defamatory, or harmful.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            5. Links to Third-Party Sites
          </Typography>
          <Typography paragraph>
            The Site may contain links to third-party websites. We do not
            control those sites and are not responsible for their content or
            practices. Links do not imply endorsement.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            6. Disclaimer of Warranties
          </Typography>
          <Typography paragraph>
            THE SITE, ALL CONTENT, PRODUCTS AND SERVICES ARE PROVIDED “AS IS”
            AND “AS AVAILABLE,” WITHOUT WARRANTY OF ANY KIND. TO THE FULLEST
            EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR
            IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR
            PURPOSE, NON-INFRINGEMENT, AND AVAILABILITY.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            7. Limitation of Liability
          </Typography>
          <Typography paragraph>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL SENNA
            AUTOMATION LLC BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
            EXEMPLARY, OR CONSEQUENTIAL DAMAGES ARISING OUT OF OR RELATED TO
            YOUR USE OF THE SITE OR ANY PRODUCTS OR SERVICES PURCHASED THROUGH
            THE SITE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH
            DAMAGES. OUR TOTAL AGGREGATE LIABILITY SHALL NOT EXCEED THE AMOUNT
            YOU PAID TO US IN THE SIX (6) MONTHS PRECEDING THE EVENT GIVING RISE
            TO LIABILITY, OR USD 100, WHICHEVER IS GREATER.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            8. Indemnification
          </Typography>
          <Typography paragraph>
            You agree to defend, indemnify, and hold harmless Senna Automation
            LLC and its officers, directors, employees, and agents from any
            claims, damages, losses, liabilities, and expenses (including
            reasonable attorneys’ fees) arising out of your use of the Site,
            your breach of these Terms, or your violation of any rights of a
            third party.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            9. Governing Law & Dispute Resolution
          </Typography>
          <Typography paragraph>
            These Terms are governed by the laws of the State of Michigan,
            without regard to conflict-of-law principles. Any dispute arising
            under these Terms shall be subject to the exclusive jurisdiction of
            the courts located in Detroit, Michigan.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            10. Modifications
          </Typography>
          <Typography paragraph>
            We may modify these Terms at any time. The “Last updated” date at
            the top will change. Continued use of the Site after modifications
            constitutes your acceptance of the new Terms.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            11. Contact Us
          </Typography>
          <Typography paragraph>
            Senna Automation LLC
            <br />
            336 W. First Street
            <br />
            Suite 113
            <br />
            Flint, MI 48502
            <br />
            Email:{" "}
            <a href="mailto:legal@senna-automation.com">
              legal@senna-automation.com
            </a>
            <br />
            Phone: (616) 287-3360
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
