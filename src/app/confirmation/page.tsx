import { Box, Container, Typography } from "@mui/material";

export default function ConfirmationPage() {
  return (
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
          We&apos;ll be in touch soon.
        </Typography>
      </Container>
    </Box>
  );
}
