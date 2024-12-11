import { Box, Container, Typography, Paper } from '@mui/material';

export default function Privacy() {
  return (
    <Box sx={{
      py: { xs: 8, md: 12 },
      minHeight: { xs: 'calc(100vh - 64px)', md: 'calc(100vh - 64px)' },
      display: 'flex',
      alignItems: 'center'
    }}>
      <Container maxWidth="md">
        <Paper sx={{ p: 4 }}>
          <Typography variant="h2" gutterBottom>
            Privacy Policy
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" paragraph>
            Last updated: March 2024
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            1. Information We Collect
          </Typography>
          <Typography paragraph>
            We collect information that you provide directly to us, including when you create an account,
            use our services, or contact us for support. This may include your name, email address,
            and any other information you choose to provide.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            2. How We Use Your Information
          </Typography>
          <Typography paragraph>
            We use the information we collect to provide, maintain, and improve our services,
            to communicate with you, and to detect and prevent fraud or other harmful activities.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            3. Information Sharing
          </Typography>
          <Typography paragraph>
            We do not share your personal information with third parties except as described in this
            privacy policy or with your consent.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            4. Security
          </Typography>
          <Typography paragraph>
            We take reasonable measures to help protect your personal information from loss, theft,
            misuse, unauthorized access, disclosure, alteration, and destruction.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            5. Contact Us
          </Typography>
          <Typography paragraph>
            If you have any questions about this Privacy Policy, please contact us at:
            privacy@senna-automation.com
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}