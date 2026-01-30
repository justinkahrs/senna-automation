import Link from "next/link";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
} from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import WebIcon from "@mui/icons-material/Web";
import AppsIcon from "@mui/icons-material/Apps";

const categories = [
  {
    title: "AI Workflow Automation",
    description:
      "Expert AI workflow automation and business AI integration services. We specialize in chatbot development, process automation consulting, and enterprise AI solutions that save your team 20+ hours per week and drive measurable ROI.",
    icon: SmartToyIcon,
    href: "/products/ai-automation",
  },
  {
    title: "Custom Web Applications & Enterprise AI Solutions",
    description:
      "Custom web app development AI and B2B AI consulting for digital transformation AI. We build enterprise AI solutions, custom business applications, and intelligent workflow systems tailored to your unique operational needs.",
    icon: AppsIcon,
    href: "/products/custom-applications",
  },
  {
    title: "Modern Web Development & SEO-Optimized Websites",
    description:
      "Professional modern web development and responsive web design services. We build high-performance websites and SEO-optimized websites that rank well on Google, generate more leads, and convert visitors into customers for your Grand Rapids, MI business.",
    icon: WebIcon,
    href: "/products/web-development",
  },
];

export default function Products() {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        minHeight: { xs: "calc(100vh - 64px)", md: "calc(100vh - 64px)" },
        bgcolor: "background.default",
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
        <Typography
          component="h1"
          variant="h4"
          align="center"
          color="text.primary"
          gutterBottom
        >
          AI Workflow Automation & Custom Software Solutions
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          sx={{ mb: 8, textAlign: { xs: "justify", sm: "center" } }}
        >
          Transform your Grand Rapids, Michigan business with intelligent
          automation. From AI workflow automation and business AI integration to
          custom web app development AI and enterprise AI solutions, we deliver
          measurable results.
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {categories.map((category) => (
            <Grid item xs={12} md={4} key={category.title}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 6,
                  },
                }}
              >
                <CardActionArea
                  component={Link}
                  href={category.href}
                  sx={{ height: "100%", p: 2 }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      gap: 2,
                    }}
                  >
                    <category.icon
                      sx={{ fontSize: 60, color: "primary.main" }}
                    />
                    <Typography variant="h5" component="h2" gutterBottom>
                      {category.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {category.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
