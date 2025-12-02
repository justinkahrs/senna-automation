"use client";
import RequestFormButton from "@/components/RequestFormButton";
import ScheduleCallButton from "@/components/ScheduleCallButton";
import SeeProductsButton from "@/components/SeeProductsButton";
import AnimatedHeroTitle from "@/components/AnimatedHeroTitle";
import { Box, Container, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
export default function Home() {
  const theme = useTheme();
  return (
    <>
      <Box
        sx={{
          bgcolor: theme.palette.background.default,
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
                mx: "auto",
              }}
            >
              Powerful AI automation tools to streamline your workflow and boost
              productivity.
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
