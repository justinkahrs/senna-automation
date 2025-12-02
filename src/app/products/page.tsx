"use client";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import WebIcon from "@mui/icons-material/Web";
import AppsIcon from "@mui/icons-material/Apps";
import { useRouter } from "next/navigation";

const categories = [
  {
    title: "AI/Automation",
    description: "Powerful automation tools needing minimal customization.",
    icon: SmartToyIcon,
    href: "/products/ai-automation",
  },
  {
    title: "Custom Applications",
    description: "Tailor-made software solutions for your specific needs.",
    icon: AppsIcon,
    href: "/products/custom-applications",
  },
  {
    title: "Web Development",
    description: "Modern, responsive websites to grow your business.",
    icon: WebIcon,
    href: "/products/web-development",
  },
];

export default function Products() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();

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
          Our Solutions
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          sx={{ mb: 8, textAlign: isMobile ? "justify" : "center" }}
        >
          Explore our range of services and products designed to elevate your business.
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
                    boxShadow: theme.shadows[4],
                  },
                }}
              >
                <CardActionArea
                  onClick={() => router.push(category.href)}
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
