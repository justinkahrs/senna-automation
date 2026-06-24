import { Box, Container, Typography, Button } from "@mui/material";
import Link from "next/link";

export default function Confirmation() {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="h3" align="center" gutterBottom sx={{
          color: "text.primary"
        }}>
          Appointment Confirmed!
        </Typography>
        <Typography
          variant="h6"
          align="center"
          sx={{
            color: "text.secondary",
            marginBottom: "16px"
          }}>
          Thank you for scheduling your appointment. We look forward to serving
          you.
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Link href="/" passHref>
            <Button variant="contained">Home</Button>
          </Link>
        </Box>
      </Container>
    </Box>
  );
}