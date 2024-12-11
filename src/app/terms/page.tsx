import { Box, Container, Typography, Paper } from '@mui/material';

export default function Terms() {
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="md">
        <Paper sx={{ p: 4 }}>
          <Typography variant="h2" gutterBottom>
            Terms of Service
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" paragraph>
            Last updated: March 2024
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            1. Acceptance of Terms
          </Typography>
          <Typography paragraph>
            By accessing and using Senna Automation's services, you accept and agree to be bound by the
            terms and conditions of this agreement.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            2. Description of Service
          </Typography>
          <Typography paragraph>
            Senna Automation provides workflow automation tools and services for businesses. We reserve
            the right to modify, suspend, or discontinue any part of the service at any time.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            3. User Responsibilities
          </Typography>
          <Typography paragraph>
            You are responsible for maintaining the confidentiality of your account information and for
            all activities that occur under your account.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            4. Intellectual Property
          </Typography>
          <Typography paragraph>
            All content, features, and functionality of our services are owned by Senna Automation
            and are protected by international copyright, trademark, and other intellectual property laws.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            5. Limitation of Liability
          </Typography>
          <Typography paragraph>
            Senna Automation shall not be liable for any indirect, incidental, special, consequential,
            or punitive damages resulting from your use of or inability to use the service.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            6. Contact Information
          </Typography>
          <Typography paragraph>
            If you have any questions about these Terms, please contact us at:
            legal@senna-automation.com
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}