import RequestFormButton from "@/components/RequestFormButton";
import ScheduleCallButton from "@/components/ScheduleCallButton";
import SeeProductsButton from "@/components/SeeProductsButton";
import AnimatedHeroTitle from "@/components/AnimatedHeroTitle";
import { Box, Container, Stack, Typography } from "@mui/material";

export default function Home() {
  return (
    <>
      <Box
        component="section"
        aria-labelledby="hero-heading"
        sx={{
          bgcolor: "background.default",

          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={4} alignItems="center">
            <AnimatedHeroTitle />
            <Typography
              id="hero-description"
              variant="h5"
              align="center"
              component="h2"
              color="text.secondary"
              sx={{
                mb: 6,
                mx: "auto",
                maxWidth: 800,
              }}
            >
              Transform your Grand Rapids business with AI workflow automation,
              custom software development, and intelligent process automation.
              We help companies streamline operations, boost productivity, and
              achieve measurable ROI through expert AI integration and modern
              web solutions.
            </Typography>
            <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
              <Stack spacing={2} sx={{ textAlign: "center", width: 300 }}>
                <ScheduleCallButton
                  fullWidth
                  size="large"
                  text="Schedule Call"
                  aria-label="Schedule a consultation call with our AI automation experts"
                />
                <SeeProductsButton
                  fullWidth
                  size="large"
                  text="See Products"
                  aria-label="View our AI automation and software development products"
                />
                <RequestFormButton
                  fullWidth
                  size="large"
                  text="Custom Request"
                  aria-label="Submit a custom project request"
                />
              </Stack>
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* Why Choose Section - Visually separated with white background */}
      <Box
        component="section"
        sx={{
          bgcolor: "#ffffff",
          py: { xs: 8, md: 12 },
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            component="h3"
            align="center"
            color="text.primary"
            gutterBottom
            sx={{ mb: 4 }}
          >
            Why Choose Senna Automation for Your AI Transformation?
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ maxWidth: 900, mx: "auto" }}
          >
            <strong>
              Senna Automation specializes in AI workflow automation and custom
              software development
            </strong>
            , helping businesses in Grand Rapids, Michigan and beyond harness
            the power of artificial intelligence. From{" "}
            <strong>business AI integration</strong> and{" "}
            <strong>chatbot development</strong> to{" "}
            <strong>process automation consulting</strong> and{" "}
            <strong>enterprise AI solutions</strong>, we deliver tailored
            solutions that drive real business results.
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ mt: 3, maxWidth: 900, mx: "auto" }}
          >
            Our expertise spans <strong>custom web app development</strong>,{" "}
            <strong>modern web development</strong>,{" "}
            <strong>high-performance websites</strong>, and{" "}
            <strong>SEO-optimized websites</strong> that help your business
            stand out online. Whether you need{" "}
            <strong>B2B AI consulting</strong>,{" "}
            <strong>digital transformation AI</strong> strategies, or end-to-end
            workflow automation, our team delivers measurable outcomes including
            reduced operational costs, improved efficiency, and enhanced
            customer experiences.
          </Typography>
        </Container>
      </Box>
    </>
  );
}
