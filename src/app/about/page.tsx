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
          py: { xs: 8, md: 8 },
        }}
      >
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
          <Stack spacing={4}>
            <Typography align="center" variant="h2">
              About Us
            </Typography>
            <Typography
              variant="h5"
              align="left"
              color="text.secondary"
              sx={{
                mb: 6,
                mx: "auto",
              }}
            >
              Many businesses want simpler ways to get things done, but AI can
              feel overwhelming—especially for those without a tech background.
              The goal here is to make AI automation accessible to everyone, so
              companies can focus on what truly matters.
              <br />
              <br />
              This idea was sparked by <strong>Justin Kahrs</strong>, who worked
              on fleet automation in a Silicon Valley start-up. He noticed that
              smart systems, usually designed for large operations, could also
              help smaller or less “tech-focused” businesses succeed.
              <br />
              <br />
              Today, the mission is clear: create solutions that remove
              obstacles and guide organizations toward better, easier workflows.
              When the right processes are in place, it frees up time and
              resources to serve customers and grow the business.
              <br />
              <br />
              Every challenge is an opportunity to learn and improve—leading to
              new, better strategies for the future. Welcome to a place where
              straightforward ideas meet powerful results, and where any
              business can unlock the potential of technology without feeling
              overwhelmed.
            </Typography>
            <Typography>
              <strong> Senna Automation </strong>
              <br />
              Established 2024
              <br />
              Grand Rapids, MI
            </Typography>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
