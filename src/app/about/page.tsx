import {
  Box,
  Container,
  Stack,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function About() {
  return (
    <>
      {/* Hero Section */}
      <Box
        component="section"
        sx={{
          bgcolor: "background.default",
          py: { xs: 8, md: 12 },
        }}
      >
        <Container maxWidth="lg">
          <Typography
            component="h1"
            variant="h3"
            align="center"
            color="text.primary"
            gutterBottom
          >
            About Senna Automation
          </Typography>

          <Typography
            component="h2"
            variant="h4"
            align="center"
            color="text.primary"
            gutterBottom
            sx={{ fontWeight: 600, mt: 4 }}
          >
            Your AI Automation & Custom Software Development Partner in Grand
            Rapids, Michigan
          </Typography>

          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ mt: 3, maxWidth: 800, mx: "auto" }}
          >
            Senna Automation specializes in{" "}
            <strong>AI workflow automation</strong>,{" "}
            <strong>business AI integration</strong>,{" "}
            <strong>chatbot development</strong>,{" "}
            <strong>process automation consulting</strong>, and{" "}
            <strong>enterprise AI solutions</strong> for businesses in Grand
            Rapids, Michigan and beyond. We help companies streamline
            operations, reduce manual work by up to 80%, and achieve measurable
            ROI through intelligent automation and custom software development.
          </Typography>
        </Container>
      </Box>

      {/* Why Choose Section - White background */}
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
            component="h2"
            align="center"
            color="text.primary"
            gutterBottom
            sx={{ fontWeight: 600, mb: 6 }}
          >
            Why Choose Senna Automation for Your AI Transformation?
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={6}>
              <Card sx={{ height: "100%", bgcolor: "background.paper" }}>
                <CardContent>
                  <Stack spacing={2}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ fontWeight: 600, color: "text.primary" }}
                    >
                      Expert AI Automation Consulting
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Our team of AI automation experts provides comprehensive{" "}
                      <strong>AI workflow automation</strong> consulting,{" "}
                      <strong>business AI integration</strong> strategies, and{" "}
                      <strong>process automation consulting</strong> services
                      tailored to your Grand Rapids business needs.
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card sx={{ height: "100%", bgcolor: "background.paper" }}>
                <CardContent>
                  <Stack spacing={2}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ fontWeight: 600, color: "text.primary" }}
                    >
                      Custom Software Development
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      We build <strong>custom web app development AI</strong>{" "}
                      solutions and <strong>enterprise AI solutions</strong>{" "}
                      that address your specific challenges. From{" "}
                      <strong>custom software development</strong> to digital
                      transformation AI strategies, our approach drives real
                      business results.
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Our Story Section - Default background */}
      <Box
        component="section"
        sx={{
          bgcolor: "background.default",
          py: { xs: 8, md: 12 },
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            component="h2"
            align="center"
            color="text.primary"
            gutterBottom
            sx={{ fontWeight: 600, mb: 4 }}
          >
            Our Story: From Silicon Valley to Grand Rapids, Michigan
          </Typography>

          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ maxWidth: 800, mx: "auto" }}
          >
            Many businesses want simpler ways to get things done, but AI can
            feel overwhelming—especially for those without a tech background.
            Our mission is to make <strong>AI workflow automation</strong> and{" "}
            <strong>custom software development</strong> accessible to everyone,
            so companies in Grand Rapids, Michigan can focus on what truly
            matters.
          </Typography>

          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ mt: 3, maxWidth: 800, mx: "auto" }}
          >
            This idea was sparked by{" "}
            <strong>
              <a
                href="https://www.justinkahrs.com"
                style={{ color: "inherit", textDecoration: "underline" }}
              >
                Justin Kahrs
              </a>
            </strong>
            , who worked on fleet automation in a Silicon Valley start-up. He
            noticed that smart systems, usually designed for large operations,
            could also help smaller or less "tech-focused" businesses succeed.
          </Typography>

          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ mt: 3, maxWidth: 800, mx: "auto" }}
          >
            Today, we bring Silicon Valley expertise to Grand Rapids, Michigan,
            helping local businesses with{" "}
            <strong>business AI integration</strong>,{" "}
            <strong>chatbot development</strong>, and{" "}
            <strong>enterprise AI solutions</strong> that were previously only
            available to Fortune 500 companies.
          </Typography>

          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ mt: 3, maxWidth: 800, mx: "auto" }}
          >
            Whether you need <strong>AI workflow automation</strong>,{" "}
            <strong>process automation consulting</strong>, or end-to-end{" "}
            <strong>digital transformation AI</strong>, our team delivers
            measurable outcomes.
          </Typography>
        </Container>
      </Box>

      {/* Local Business Info - White background */}
      <Box
        component="section"
        sx={{
          bgcolor: "#ffffff",
          py: { xs: 8, md: 12 },
        }}
      >
        <Container maxWidth="lg">
          <Card sx={{ maxWidth: 600, mx: "auto", bgcolor: "background.paper" }}>
            <CardContent>
              <Stack spacing={2} alignItems="center">
                <LocationOnIcon sx={{ fontSize: 48, color: "primary.main" }} />
                <Typography
                  variant="h5"
                  component="h2"
                  align="center"
                  gutterBottom
                  sx={{ fontWeight: 600, color: "text.primary" }}
                >
                  Senna Automation
                </Typography>
                <Typography
                  variant="body1"
                  align="center"
                  color="text.secondary"
                >
                  AI Automation & Custom Software Development
                </Typography>
                <Typography
                  variant="body1"
                  align="center"
                  color="text.secondary"
                >
                  Serving Grand Rapids, Michigan and businesses nationwide
                </Typography>
                <Typography
                  variant="body2"
                  align="center"
                  color="text.secondary"
                  sx={{ mt: 2 }}
                >
                  (616) 287-3360
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Container>
      </Box>

      {/* Mission Section - Default background */}
      <Box
        component="section"
        sx={{
          bgcolor: "background.default",
          py: { xs: 8, md: 12 },
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            component="h2"
            align="center"
            color="text.primary"
            gutterBottom
            sx={{ fontWeight: 600, mb: 4 }}
          >
            Our Mission
          </Typography>

          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ maxWidth: 800, mx: "auto" }}
          >
            Every challenge is an opportunity to learn and improve—leading to
            new, better strategies for the future. Welcome to a place where
            straightforward ideas meet powerful results, and where any business
            in Grand Rapids, Michigan can unlock the potential of{" "}
            <strong>AI workflow automation</strong> and{" "}
            <strong>custom software development</strong> without feeling
            overwhelmed. We provide <strong>B2B AI consulting</strong>,{" "}
            <strong>chatbot development</strong>,{" "}
            <strong>process automation consulting</strong>, and{" "}
            <strong>enterprise AI solutions</strong> that drive efficiency and
            growth.
          </Typography>
        </Container>
      </Box>
    </>
  );
}
