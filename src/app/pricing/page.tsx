"use client";

import Link from "next/link";
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
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BoltIcon from "@mui/icons-material/Bolt";
import ScheduleCallButton from "@/components/ScheduleCallButton";

export default function PricingPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box sx={{ bgcolor: "background.default", py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Stack spacing={3} alignItems="center" sx={{ mb: 10, textAlign: "center" }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 700,
              maxWidth: "800px",
              lineHeight: 1.2,
            }}
          >
            Automation That Pays for Itself
          </Typography>
        </Stack>

        {/* Intro */}
        <Box sx={{ mb: 8, textAlign: "center" }}>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: "700px", mx: "auto", fontSize: "1.1rem" }}>
            Every business has unique workflows. Our pricing reflects the complexity and scale of the automation we build for you. We provide clear, fixed-price project ranges so you know exactly what to expect before we start.
          </Typography>
        </Box>

        {/* Pricing Tiers */}
        <Grid container spacing={4} alignItems="stretch">
          {/* Starter */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 4,
                boxShadow: "none",
                transition: "transform 0.3s ease",
                "&:hover": { transform: "translateY(-4px)" },
              }}
            >
              <CardContent sx={{ p: 4, flexGrow: 1 }}>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Starter Automation
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 700, my: 2 }}>
                  $1.5k – $3.5k
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Perfect for small businesses looking to automate a single, high-impact workflow.
                </Typography>
                <Divider sx={{ my: 3 }} />
                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: "bold", textTransform: "uppercase", letterSpacing: 1 }}>
                  Includes:
                </Typography>
                <List dense disablePadding>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 32 }}><CheckCircleOutlineIcon fontSize="small" color="primary" /></ListItemIcon>
                    <ListItemText primary="1 core workflow automated" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 32 }}><CheckCircleOutlineIcon fontSize="small" color="primary" /></ListItemIcon>
                    <ListItemText primary="Basic integrations (CRM, email, forms)" />
                  </ListItem>
                </List>
                <Typography variant="subtitle2" sx={{ mt: 3, mb: 2, fontWeight: "bold", textTransform: "uppercase", letterSpacing: 1 }}>
                  Outcomes:
                </Typography>
                <List dense disablePadding>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 32 }}><TrendingUpIcon fontSize="small" /></ListItemIcon>
                    <ListItemText primary="Save hours each week" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 32 }}><TrendingUpIcon fontSize="small" /></ListItemIcon>
                    <ListItemText primary="Reduce repetitive tasks" />
                  </ListItem>
                </List>
              </CardContent>
              <Box sx={{ p: 4, pt: 0 }}>
                <Link href="/contact" passHref>
                  <Button variant="contained" fullWidth sx={{ borderRadius: "50px", fontWeight: "bold", py: 1.5, backgroundColor: isDark ? "#FFFFFF" : "#000000", color: isDark ? "#000000" : "#FFFFFF" }}>
                    Get Started
                  </Button>
                </Link>
              </Box>
            </Card>
          </Grid>

          {/* Growth - Most Popular */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                border: "2px solid",
                borderColor: "primary.main",
                borderRadius: 4,
                position: "relative",
                overflow: "visible",
                transition: "transform 0.3s ease",
                "&:hover": { transform: "translateY(-4px)" },
              }}
            >
              <Chip
                label="Most Popular"
                color="primary"
                sx={{
                  position: "absolute",
                  top: -14,
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontWeight: "bold",
                  px: 2,
                }}
              />
              <CardContent sx={{ p: 4, flexGrow: 1 }}>
                <Typography variant="h6" color="primary" gutterBottom sx={{ fontWeight: "bold" }}>
                  Growth Systems
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 700, my: 2 }}>
                  $4k – $8k
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  For companies ready to scale lead generation and automate customer follow-up.
                </Typography>
                <Divider sx={{ my: 3 }} />
                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: "bold", textTransform: "uppercase", letterSpacing: 1 }}>
                  Includes:
                </Typography>
                <List dense disablePadding>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 32 }}><CheckCircleOutlineIcon fontSize="small" color="primary" /></ListItemIcon>
                    <ListItemText primary="Multi-step automated workflows" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 32 }}><CheckCircleOutlineIcon fontSize="small" color="primary" /></ListItemIcon>
                    <ListItemText primary="Lead capture + automated follow-up" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 32 }}><CheckCircleOutlineIcon fontSize="small" color="primary" /></ListItemIcon>
                    <ListItemText primary="Full CRM integration" />
                  </ListItem>
                </List>
                <Typography variant="subtitle2" sx={{ mt: 3, mb: 2, fontWeight: "bold", textTransform: "uppercase", letterSpacing: 1 }}>
                  Outcomes:
                </Typography>
                <List dense disablePadding>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 32 }}><TrendingUpIcon fontSize="small" /></ListItemIcon>
                    <ListItemText primary="Capture and convert more leads" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 32 }}><TrendingUpIcon fontSize="small" /></ListItemIcon>
                    <ListItemText primary="Significantly reduce manual work" />
                  </ListItem>
                </List>
              </CardContent>
              <Box sx={{ p: 4, pt: 0 }}>
                <Link href="/contact" passHref>
                  <Button variant="contained" fullWidth sx={{ borderRadius: "50px", fontWeight: "bold", py: 1.5, backgroundColor: isDark ? "#FFFFFF" : "#000000", color: isDark ? "#000000" : "#FFFFFF" }}>
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
                borderRadius: 4,
                boxShadow: "none",
                transition: "transform 0.3s ease",
                "&:hover": { transform: "translateY(-4px)" },
              }}
            >
              <CardContent sx={{ p: 4, flexGrow: 1 }}>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Custom AI Systems
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 700, my: 2 }}>
                  $10k+
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  End-to-end automation and custom AI tools for complex, high-volume operations.
                </Typography>
                <Divider sx={{ my: 3 }} />
                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: "bold", textTransform: "uppercase", letterSpacing: 1 }}>
                  Includes:
                </Typography>
                <List dense disablePadding>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 32 }}><CheckCircleOutlineIcon fontSize="small" color="primary" /></ListItemIcon>
                    <ListItemText primary="End-to-end automation systems" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 32 }}><CheckCircleOutlineIcon fontSize="small" color="primary" /></ListItemIcon>
                    <ListItemText primary="Custom AI tools or assistants" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 32 }}><CheckCircleOutlineIcon fontSize="small" color="primary" /></ListItemIcon>
                    <ListItemText primary="Deep, multi-platform integrations" />
                  </ListItem>
                </List>
                <Typography variant="subtitle2" sx={{ mt: 3, mb: 2, fontWeight: "bold", textTransform: "uppercase", letterSpacing: 1 }}>
                  Outcomes:
                </Typography>
                <List dense disablePadding>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 32 }}><TrendingUpIcon fontSize="small" /></ListItemIcon>
                    <ListItemText primary="Replace fragmented manual processes" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 32 }}><TrendingUpIcon fontSize="small" /></ListItemIcon>
                    <ListItemText primary="Scale operations without hiring" />
                  </ListItem>
                </List>
              </CardContent>
              <Box sx={{ p: 4, pt: 0 }}>
                <ScheduleCallButton
                  text="Book a Demo via"
                  fullWidth
                  showIcon={true}
                  sx={{ 
                    borderRadius: "50px", 
                    fontWeight: "bold", 
                    py: 1.5, 
                    backgroundColor: isDark ? "#FFFFFF" : "#000000", 
                    color: isDark ? "#000000" : "#FFFFFF" 
                  }}
                />
                <Typography variant="caption" align="center" display="block" color="text.secondary" sx={{ mt: 2 }}>
                  Want more information? <Link href="/contact" style={{ color: "inherit", fontWeight: 600 }}>Contact sales</Link>
                </Typography>
              </Box>
            </Card>
          </Grid>
        </Grid>

        {/* Ongoing Support */}
        <Box sx={{ mt: 12, p: 6, borderRadius: 4, bgcolor: "background.paper", textAlign: "center", border: "1px solid", borderColor: "divider" }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
            Ongoing Support & Optimization
          </Typography>
          <Typography variant="h5" color="primary" sx={{ mb: 3, fontWeight: "bold" }}>
            $500 – $2,000 / month
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: "600px", mx: "auto", mb: 4 }}>
            Automation isn't "set it and forget it." We provide continuous monitoring, updates, and optimization to ensure your systems grow with your business.
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            {["System Optimization", "Monthly Updates", "Additional Automation"].map((item) => (
              <Grid item key={item}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <CheckCircleOutlineIcon color="primary" fontSize="small" />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>{item}</Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Factors & ROI */}
        <Grid container spacing={8} sx={{ mt: 8 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 4 }}>
              What Determines Pricing
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }} color="text.secondary">
              Several factors influence the final scope and investment of your automation project:
            </Typography>
            <List>
              {[
                "Workflow complexity and number of steps",
                "Number of software integrations required",
                "Volume of leads or data being processed",
                "Custom logic vs. standard automation patterns"
              ].map((text) => (
                <ListItem key={text} sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}><BoltIcon color="primary" /></ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 4 }}>
              Your Return on Investment
            </Typography>
            <Stack spacing={4}>
              <Box>
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <AccessTimeIcon color="primary" sx={{ mt: 0.5 }} />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>Time Reclaimed</Typography>
                    <Typography variant="body2" color="text.secondary">Our clients save an average of 10-20 hours per week by automating repetitive administrative tasks.</Typography>
                  </Box>
                </Stack>
              </Box>
              <Box>
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <TrendingUpIcon color="primary" sx={{ mt: 0.5 }} />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>Faster Lead Response</Typography>
                    <Typography variant="body2" color="text.secondary">Instant automated follow-ups increase your lead-to-meeting conversion rate by up to 50%.</Typography>
                  </Box>
                </Stack>
              </Box>
              <Box>
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <BoltIcon color="primary" sx={{ mt: 0.5 }} />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>Scalable Operations</Typography>
                    <Typography variant="body2" color="text.secondary">Build systems that handle 10x the volume without the need to hire additional administrative staff.</Typography>
                  </Box>
                </Stack>
              </Box>
            </Stack>
          </Grid>
        </Grid>

        {/* Final CTA */}
        <Box sx={{ mt: 15, mb: 5, textAlign: "center" }}>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 3 }}>
            Ready to Get Your Automation Plan?
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 5, maxWidth: "600px", mx: "auto" }}>
            Schedule a brief strategy call to walk through your current process. No pressure—just actionable insights on where automation can help you most.
          </Typography>
          <Link href="/contact" passHref>
            <Button
              variant="contained"
              size="large"
              sx={{
                px: 6,
                py: 2,
                borderRadius: "50px",
                fontSize: "1.2rem",
                fontWeight: "bold",
                backgroundColor: isDark ? "#FFFFFF" : "#000000",
                color: isDark ? "#000000" : "#FFFFFF",
                "&:hover": {
                  backgroundColor: isDark ? "#EEEEEE" : "#333333",
                },
              }}
            >
              Start Your Free Assessment
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  );
}
