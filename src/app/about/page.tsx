"use client";
import { Box, Container, Stack, Typography, Grid, Card, CardContent, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function About() {
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
          py: { xs: 8, md: 8 },
        }}
      >
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
          <Stack spacing={6}>
            <Typography
              component="h1"
              variant="h3"
              align="center"
              color="text.primary"
              gutterBottom
            >
              About Senna Automation
            </Typography>

            {/* Hero Section with SEO-friendly content */}
            <Typography
              component="h2"
              variant="h4"
              align="center"
              color="text.primary"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              Your AI Automation & Custom Software Development Partner in Grand Rapids, Michigan
            </Typography>

            <Typography
              variant="body1"
              align="center"
              color="text.secondary"
              sx={{ mb: 4, maxWidth: 800, mx: "auto" }}
            >
              Senna Automation specializes in <strong>AI workflow automation</strong>, <strong>business AI integration</strong>, 
              <strong>chatbot development</strong>, <strong>process automation consulting</strong>, and 
              <strong>enterprise AI solutions</strong> for businesses in Grand Rapids, Michigan and beyond. 
              We help companies streamline operations, reduce manual work by up to 80%, and achieve measurable ROI 
              through intelligent automation and custom software development.
            </Typography>

            <Typography
              variant="h5"
              component="h2"
              align="center"
              color="text.primary"
              gutterBottom
              sx={{ mt: 6 }}
            >
              Why Choose Senna Automation for Your AI Transformation?
            </Typography>

            {/* Key Benefits Section - GEO optimized */}
            <Grid container spacing={4} sx={{ mb: 6 }}>
              <Grid item xs={12} md={6}>
                <Card sx={{ height: "100%", bgcolor: "background.paper" }}>
                  <CardContent>
                    <Stack spacing={2}>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: "text.primary" }}>
                        Expert AI Automation Consulting
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Our team of AI automation experts provides comprehensive <strong>AI workflow automation</strong> consulting,
                        <strong>business AI integration</strong> strategies, and <strong>process automation consulting</strong> services
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
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: "text.primary" }}>
                        Custom Software Development
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        We build <strong>custom web app development AI</strong> solutions and <strong>enterprise AI solutions</strong>
                        that address your specific challenges. From <strong>custom software development</strong>
                        to digital transformation AI strategies, our approach drives real business results.
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Story Section with local SEO and GEO keywords */}
            <Typography
              variant="h5"
              component="h2"
              align="center"
              color="text.primary"
              gutterBottom
              sx={{ mt: 8 }}
            >
              Our Story: From Silicon Valley to Grand Rapids, Michigan
            </Typography>

            <Typography
              variant="body1"
              align="left"
              color="text.secondary"
              sx={{ mb: 4, maxWidth: 800, mx: "auto" }}
            >
              Many businesses want simpler ways to get things done, but AI can feel overwhelming—especially 
              for those without a tech background. Our mission is to make <strong>AI workflow automation</strong> and 
              <strong>custom software development</strong> accessible to everyone, so companies in Grand Rapids, Michigan 
              can focus on what truly matters.
              <br /><br />
              This idea was sparked by{" "}
              <strong>
                <a href="https://www.justinkahrs.com" style={{ color: "inherit", textDecoration: "underline" }}>
                  Justin Kahrs
                </a>
              </strong>
              , who worked on fleet automation in a Silicon Valley start-up. He noticed that smart systems, 
              usually designed for large operations, could also help smaller or less "tech-focused" businesses succeed.
              <br /><br />
              Today, we bring Silicon Valley expertise to Grand Rapids, Michigan, helping local businesses with 
              <strong>business AI integration</strong>, <strong>chatbot development</strong>, and <strong>enterprise AI solutions</strong> 
              that were previously only available to Fortune 500 companies.
              <br /><br />
              Whether you need <strong>AI workflow automation</strong>, <strong>process automation consulting</strong>, 
              or end-to-end <strong>digital transformation AI</strong>, our team delivers measurable outcomes.
            </Typography>

            {/* Local Business Info - Important for local SEO */}
            <Card sx={{ maxWidth: 600, mx: "auto", mt: 6, bgcolor: "background.paper" }}>
              <CardContent>
                    <Stack spacing={3} alignItems="center">
                      <LocationOnIcon sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
                      <Typography variant="h5" component="h2" align="center" gutterBottom sx={{ fontWeight: 600, color: "text.primary" }}>
                        Senna Automation
                      </Typography>
                      <Typography variant="body1" align="center" color="text.secondary">
                        AI Automation & Custom Software Development
                      </Typography>
                      <Typography variant="body1" align="center" color="text.secondary" sx={{ mt: 2 }}>
                        Serving Grand Rapids, Michigan and businesses nationwide
                      </Typography>
                      <Typography variant="body2" align="center" color="text.secondary" sx={{ mt: 3 }}>
                        (616) 287-3360
                      </Typography>
                    </Stack>
              </CardContent>
            </Card>

            {/* Mission Statement - GEO optimized */}
            <Typography
              variant="h5"
              component="h2"
              align="center"
              color="text.primary"
              gutterBottom
              sx={{ mt: 8 }}
            >
              Our Mission
            </Typography>

            <Typography
              variant="body1"
              align="center"
              color="text.secondary"
              sx={{ mb: 4, maxWidth: 800, mx: "auto" }}
            >
              Every challenge is an opportunity to learn and improve—leading to new, better strategies for the future. 
              Welcome to a place where straightforward ideas meet powerful results, and where any business in Grand Rapids, Michigan 
              can unlock the potential of <strong>AI workflow automation</strong> and <strong>custom software development</strong> without feeling overwhelmed.
              We provide <strong>B2B AI consulting</strong>, <strong>chatbot development</strong>, 
              <strong>process automation consulting</strong>, and <strong>enterprise AI solutions</strong> that drive efficiency and growth.
            </Typography>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
