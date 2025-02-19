import { Box, Container, Typography } from "@mui/material";
import Script from "next/script";

export default function ConfirmationPage() {
  return (
    <>
      <Script id="gtag-event" strategy="afterInteractive">
        {`
          gtag('event', 'ads_conversion_Book_appointment_1', {
            // <event_parameters>
          });
        `}
      </Script>
      <Box
        sx={{
          minHeight: "calc(100vh - 64px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="sm" sx={{ textAlign: "center" }}>
          <Typography variant="h3" gutterBottom>
            Thank you!
          </Typography>
          <Typography variant="h5" color="text.secondary">
            We appreciate you scheduling with us. We’ll be in touch soon.
          </Typography>
        </Container>
      </Box>
    </>
  );
}