import RequestFormButton from "@/components/RequestFormButton";
import ScheduleCallButton from "@/components/ScheduleCallButton";
import SeeProductsButton from "@/components/SeeProductsButton";
import { Box, Container, Stack, Typography } from "@mui/material";
export default function Home() {
  return (
    <>
      <Box
        sx={{
          bgcolor: "background.paper",
          minHeight: "100vh", // Full viewport height
          display: "flex",
          alignItems: "center", // Center content vertically
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <Typography
            component="h1"
            variant="h1"
            align="center"
            color="text.primary"
            gutterBottom
            sx={{
              fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4rem" },
              maxWidth: "800px",
              mx: "auto",
            }}
          >
            Let&apos;s Automate Your Business
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            sx={{
              mb: 6,
              maxWidth: "600px",
              mx: "auto",
              fontSize: { xs: "1.1rem", md: "1.3rem" },
            }}
          >
            Powerful AI automation tools to streamline your workflow and boost
            productivity
          </Typography>
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
            <Stack useFlexGap spacing={2} style={{ textAlign: "center" }}>
              <ScheduleCallButton size="large" text="Schedule Call" />
              <SeeProductsButton size="large" text="See Products" />
              <RequestFormButton size="large" text="Custom Request" />
            </Stack>
          </Box>
        </Container>
      </Box>
    </>
  );
}
