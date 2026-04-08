"use client";

import Link from "next/link";
import FinalCTA from "@/components/sections/FinalCTA";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  useTheme,
  Chip,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ScheduleCallButton from "@/components/ScheduleCallButton";
import {
  growthTier,
  starterTier,
} from "@/components/pricing/tierData";
import { WARM_BLACK } from "@/components/theme/colors";

const homeEyebrowSx = {
  display: "inline-flex",
  alignItems: "center",
  width: "fit-content",
  px: 1.75,
  py: 0.5,
  border: "1px solid",
  borderColor: "var(--color-border-medium)",
  borderRadius: "var(--radius-pill)",
  bgcolor:
    "color-mix(in srgb, var(--color-accent-cyan), transparent 84%)",
  color: "var(--color-text-secondary)",
  letterSpacing: "0.12em",
};

export default function PricingPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        bgcolor: "transparent",
        pt: 0,
        pb: 0,
      }}
    >
      <Container maxWidth="lg">
        {/* Header Hero */}
        <Box
          sx={{
            pt: { xs: 16, md: 28 },
            pb: { xs: 8, md: 10 },
            minHeight: { md: "420px" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center"
          }}
        >
          <Box sx={{ maxWidth: "900px", mx: "auto" }}>
            <Typography
              variant="overline"
              sx={{ ...homeEyebrowSx, mb: 2, mx: "auto", fontSize: "1rem" }}
            >
              Pricing
            </Typography>
            <Typography
              variant="h1"
              component="h1"
              sx={{
                maxWidth: "900px",
                mx: 'auto',
                mb: 3
              }}
            >
              Automation that pays <br /> for itself.
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: "700px", mx: "auto" }}>
              Every business has unique workflows. Our pricing reflects the complexity and scale of the systems we build. We provide clear, fixed-price quotes tailored to your specific needs after a free assessment.
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            mb: { xs: 8, md: 10 },
            position: "relative",
            left: "50%",
            transform: "translateX(-50%)",
            width: "100vw",
            bgcolor: isDark ? "var(--color-bg-on-dark-subtle)" : "var(--color-bg-neutral-subtle)",
            py: { xs: 4, md: 6 },
            px: { xs: 3, sm: 4, md: 5 },
          }}
        >
          <Box
            sx={{
              maxWidth: "1200px",
              mx: "auto",
              textAlign: "center",
              transform: { md: "translateX(-56px)" },
            }}
          >
            <Grid container spacing={4} alignItems="center" justifyContent="center">
              <Grid item xs={12} sm={6}>
                <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, textAlign: { sm: 'right' } }}>
                  Pricing starting at $500
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ textAlign: { sm: 'right' } }}>
                  Professional automation for any budget
                </Typography>
              </Grid>
              <Grid
                item
                sx={{
                  display: { xs: 'none', sm: 'flex' },
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    height: { sm: 72, md: 88 },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="h4" sx={{ fontWeight: 600, color: 'primary.main', mb: 1, textAlign: { sm: 'left' } }}>
                  4-6 Weeks
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ textAlign: { sm: 'left' } }}>
                  Typical implementation timeline
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>

        {/* Pricing Tiers */}
        <Grid container spacing={4} alignItems="stretch">
          {/* Starter */}
          <Grid
            item
            xs={12}
            md={4}
            id={starterTier.anchorId}
            sx={{ scrollMarginTop: { xs: 96, md: 128 } }}
          >
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: { xs: 0, md: 1.5 },
                boxShadow: "none",
                cursor: "default",
                transition: "none !important",
                transform: "none !important",
                "&:hover": {
                  transform: "none !important",
                  boxShadow: "none !important",
                  borderColor: "divider",
                },
              }}
            >
              <CardContent sx={{ p: 4, flexGrow: 1 }}>
                <Typography variant="h3" sx={{ mb: 1 }}>
                  {starterTier.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  {starterTier.description}
                </Typography>
                <Divider sx={{ my: 3, borderBottomWidth: 8, borderColor: "divider" }} />
                <Typography variant="overline" color="primary.main" sx={{ mb: 2, display: "block" }}>
                  Includes:
                </Typography>
                <List dense disablePadding>
                  {starterTier.includes.map((item) => (
                    <ListItem disableGutters key={item}>
                      <ListItemIcon sx={{ minWidth: 28 }}><CheckCircleOutlineIcon fontSize="small" color="primary" /></ListItemIcon>
                      <ListItemText primary={item} />
                    </ListItem>
                  ))}
                </List>
                <Typography variant="overline" color="primary.main" sx={{ mt: 3, mb: 2, display: "block" }}>
                  Outcomes:
                </Typography>
                <List dense disablePadding>
                  {starterTier.outcomes.map((item) => (
                    <ListItem disableGutters key={item}>
                      <ListItemIcon sx={{ minWidth: 28 }}><TrendingUpIcon fontSize="small" color="primary" /></ListItemIcon>
                      <ListItemText primary={item} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
              <Box sx={{ p: 4, pt: 0 }}>
                <Link href="/contact" passHref>
                  <Button
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    sx={{
                      py: 1.5,
                      fontWeight: "bold",
                      borderColor: "secondary.main",
                      color: "secondary.main",
                    }}
                  >
                    Get Started
                  </Button>
                </Link>
              </Box>
            </Card>
          </Grid>

          {/* Growth - Most Popular */}
          <Grid
            item
            xs={12}
            md={4}
            id={growthTier.anchorId}
            sx={{ scrollMarginTop: { xs: 96, md: 128 } }}
          >
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                bgcolor: "background.paper",
                borderRadius: { xs: 0, md: 1.5 },
                boxShadow: "var(--shadow-pricing)",
                border: "2px solid",
                borderColor: "primary.main",
                zIndex: 1,
                position: 'relative',
                overflow: 'hidden',
                cursor: "default",
                transition: "none !important",
                transform: "none !important",
                "&:hover": {
                  transform: "none !important",
                  boxShadow: "0 20px 80px rgba(0,0,0,0.06) !important",
                  borderColor: "primary.main",
                },
              }}
            >
              <CardContent sx={{ p: 4, flexGrow: 1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                  <Typography variant="overline" color="primary.main" sx={{ fontWeight: 700 }}>
                    Most Popular
                  </Typography>
                  <Chip 
                    label="Recommended" 
                    size="small" 
                    sx={{ 
                      bgcolor: 'primary.main', 
                      color: 'var(--color-text-inverse)', 
                      fontWeight: 700,
                      fontSize: '1rem',
                      height: 32
                    }} 
                  />
                </Stack>
                <Typography variant="h3" sx={{ mb: 1 }}>
                  {growthTier.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  {growthTier.description}
                </Typography>
                <Divider sx={{ my: 3, borderBottomWidth: 8, borderColor: "divider" }} />
                <Typography variant="overline" color="primary.main" sx={{ mb: 2, display: "block" }}>
                  Includes:
                </Typography>
                <List dense disablePadding>
                  {growthTier.includes.map((item) => (
                    <ListItem disableGutters key={item}>
                      <ListItemIcon sx={{ minWidth: 28 }}><CheckCircleOutlineIcon fontSize="small" color="primary" /></ListItemIcon>
                      <ListItemText primary={item} sx={{ fontWeight: 600 }} />
                    </ListItem>
                  ))}
                </List>
                <Typography variant="overline" color="primary.main" sx={{ mt: 3, mb: 2, display: "block" }}>
                  Outcomes:
                </Typography>
                <List dense disablePadding>
                  {growthTier.outcomes.map((item) => (
                    <ListItem disableGutters key={item}>
                      <ListItemIcon sx={{ minWidth: 28 }}><TrendingUpIcon fontSize="small" color="primary" /></ListItemIcon>
                      <ListItemText primary={item} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
              <Box sx={{ p: 4, pt: 0 }}>
                <Link href="/contact" passHref>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                  >
                    Get Growing
                  </Button>
                </Link>
              </Box>
            </Card>
          </Grid>

          {/* Custom */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: { xs: 0, md: 1.5 },
                boxShadow: "none",
                cursor: "default",
                transition: "none !important",
                transform: "none !important",
                "&:hover": {
                  transform: "none !important",
                  boxShadow: "none !important",
                  borderColor: "divider",
                },
              }}
            >
              <CardContent sx={{ p: 4, flexGrow: 1 }}>
                <Typography variant="h3" sx={{ mb: 1 }}>
                  Custom AI Systems
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  End-to-end automation and custom AI tools for complex, high-volume operations.
                </Typography>
                <Divider sx={{ my: 3, borderBottomWidth: 8, borderColor: "divider" }} />
                <Typography variant="overline" color="primary.main" sx={{ mb: 2, display: "block" }}>
                  Includes:
                </Typography>
                <List dense disablePadding>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 28 }}><CheckCircleOutlineIcon fontSize="small" color="primary" /></ListItemIcon>
                    <ListItemText primary="End-to-end automation systems" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 28 }}><CheckCircleOutlineIcon fontSize="small" color="primary" /></ListItemIcon>
                    <ListItemText primary="Custom AI tools or assistants" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 28 }}><CheckCircleOutlineIcon fontSize="small" color="primary" /></ListItemIcon>
                    <ListItemText primary="Deep, multi-platform integrations" />
                  </ListItem>
                </List>
                <Typography variant="overline" color="primary.main" sx={{ mt: 3, mb: 2, display: "block" }}>
                  Outcomes:
                </Typography>
                <List dense disablePadding>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 28 }}><TrendingUpIcon fontSize="small" color="primary" /></ListItemIcon>
                    <ListItemText primary="Replace fragmented manual processes" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 28 }}><TrendingUpIcon fontSize="small" color="primary" /></ListItemIcon>
                    <ListItemText primary="Scale operations without hiring" />
                  </ListItem>
                </List>
              </CardContent>
              <Box sx={{ p: 4, pt: 0 }}>
                <Stack spacing={1.5} alignItems="center">
                  <ScheduleCallButton
                    text="Book a Demo"
                    fullWidth
                    showIcon={false}
                    variant="outlined"
                    sx={{
                      py: 1.5,
                      borderColor: "secondary.main",
                      color: "secondary.main",
                    }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      color: "text.secondary",
                    }}
                  >
                    <Typography variant="caption" sx={{ color: "inherit" }}>
                      via
                    </Typography>
                    <Box
                      component="img"
                      src="/Calendly.svg"
                      alt="Calendly"
                      sx={{
                        height: "0.95rem",
                        width: "auto",
                        opacity: 0.9,
                        mt: "3px",
                      }}
                    />
                  </Box>
                </Stack>
              </Box>
            </Card>
          </Grid>
        </Grid>

        {/* Ongoing Support */}
        <Box sx={{ mt: { xs: 8, md: 15 }, p: { xs: 4, md: 8 }, borderRadius: { xs: 0, md: 1.5 }, bgcolor: "background.paper", textAlign: "center", border: "1px solid", borderColor: "divider" }}>
          <Typography variant="overline" color="primary.main" gutterBottom sx={{ display: 'block', mb: 2 }}>
            Long-term Value
          </Typography>
          <Typography variant="h2" gutterBottom>
            Ongoing support & optimization
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: "700px", mx: "auto", mb: 6, fontSize: '1.1rem' }}>
            Automation isn't "set it and forget it." We provide continuous monitoring, updates, and optimization to ensure your systems grow as your business evolves.
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {["24/7 Monitoring", "Monthly System Updates", "Performance Optimization", "Workflow Scaling"].map((item) => (
              <Grid item key={item}>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <CheckCircleOutlineIcon color="primary" fontSize="small" />
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>{item}</Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Box>

      </Container>
      <FinalCTA 
        title="Ready to get your automation plan?"
        subtitle="Schedule a brief strategy call to walk through your current process. No pressure, just actionable insights on where automation can help you most."
        buttonText="Start Your Free Assessment"
      />
    </Box>
  );
}
