import RequestFormButton from "@/components/RequestFormButton";
import ScheduleCallButton from "@/components/ScheduleCallButton";
import SeeProductsButton from "@/components/SeeProductsButton";
import AnimatedHeroTitle from "@/components/AnimatedHeroTitle";
import { Box, Container, Stack, Typography } from "@mui/material";
export default function Home() {
  return (
    <>
      <Box
        sx={{
          bgcolor: "background.paper",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={4}>
            <AnimatedHeroTitle />
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
              <Stack spacing={2} sx={{ textAlign: "center", width: 300 }}>
                <ScheduleCallButton
                  fullWidth
                  size="large"
                  text="Schedule Call"
                />
                <SeeProductsButton fullWidth size="large" text="See Products" />
                <RequestFormButton
                  fullWidth
                  size="large"
                  text="Custom Request"
                />
              </Stack>
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
