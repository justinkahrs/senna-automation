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
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BoltIcon from "@mui/icons-material/Bolt";
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
        bgcolor: "background.default",
        pt: { xs: 8, md: 12 },
        pb: 0,
      }}
    >
      <Container maxWidth="lg">
        {/* Header Hero */}
        <Box
          sx={{
            pt: { xs: 8, md: 12 },
            pb: { xs: 8, md: 10 },
            minHeight: { md: "420px" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center"
          }}
        >
          <Box sx={{ maxWidth: "900px", mx: "auto", transform: { md: "translateY(-56px)" } }}>
            <Typography
              variant="overline"
              sx={{ ...homeEyebrowSx, mb: 2, mx: "auto" }}
            >
              Transparent Investment
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
                borderRadius: 4,
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
                <Divider sx={{ my: 3 }} />
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
                    color="primary"
                    fullWidth
                    sx={{
                      py: 1.5,
                      "&:hover": {
                        backgroundColor: "transparent",
                        borderColor: "primary.main",
                        color: "primary.main",
                        boxShadow: "none",
                      },
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
                borderRadius: 4,
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
                      fontSize: '0.625rem',
                      height: 20
                    }} 
                  />
                </Stack>
                <Typography variant="h3" sx={{ mb: 1 }}>
                  {growthTier.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  {growthTier.description}
                </Typography>
                <Divider sx={{ my: 3 }} />
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
                    sx={{
                      "&:hover": {
                        backgroundColor: "primary.main",
                        boxShadow: "none",
                      },
                    }}
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
                borderRadius: 4,
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
                <Divider sx={{ my: 3 }} />
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
                      "&:hover": {
                        backgroundColor: "transparent",
                        borderColor: "primary.main",
                        color: "primary.main",
                        boxShadow: "none",
                      },
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
        <Box sx={{ mt: { xs: 8, md: 15 }, p: { xs: 4, md: 8 }, borderRadius: 6, bgcolor: "background.paper", textAlign: "center", border: "1px solid", borderColor: "divider" }}>
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

      {/* Factors & ROI - Asymmetrical Grid 7/5 */}
      <Container
        maxWidth={false}
        sx={{
          mt: { xs: 12, md: 24 },
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "1440px",
          px: { xs: 3, sm: 4, md: 5, lg: 6 },
        }}
      >
        <Grid container spacing={{ xs: 8, md: 6, lg: 8 }} alignItems="stretch">
          <Grid item xs={12} md={7}>
            <Box
              sx={{
                pr: { md: 4, lg: 5 },
                ml: { md: -4, lg: -6 },
                maxWidth: { md: "760px", lg: "820px" },
              }}
            >
              <Typography variant="overline" sx={{ ...homeEyebrowSx, mb: 2 }}>
                Investment Factors
              </Typography>
              <Typography variant="h2" sx={{ mb: 4 }}>
                What determines the final investment
              </Typography>
              <Typography variant="body1" sx={{ mb: 6, fontSize: '1.1rem', maxWidth: 600 }} color="text.secondary">
                Every project is unique. We look at the scope of work through these key lenses to ensure your system is built for long-term reliability.
              </Typography>
              <List sx={{ '& .MuiListItem-root': { py: 2, borderBottom: '1px solid', borderColor: 'divider' } }}>
                {[
                  { title: "Workflow Complexity", desc: "The number of conditional branches and logic steps required." },
                  { title: "Platform Integrations", desc: "How many external tools (CRMs, ERPs, APIs) must communicate." },
                  { title: "Data Volume", desc: "The amount of leads, rows, or records being processed weekly." },
                  { title: "Logic Requirements", desc: "Standard patterns versus custom-coded business rules." }
                ].map((item) => (
                  <ListItem key={item.title} sx={{ px: 0, alignItems: 'center' }}>
                    <ListItemIcon sx={{ minWidth: 40 }}><BoltIcon color="primary" /></ListItemIcon>
                    <ListItemText 
                      primary={<Typography variant="h6" sx={{ fontWeight: 600 }}>{item.title}</Typography>} 
                      secondary={<Typography variant="body2" color="text.secondary">{item.desc}</Typography>}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Grid>

          <Grid item xs={12} md={5} sx={{ position: "relative", display: "flex" }}>
            <Box
              sx={{
                position: { xs: "relative", md: "absolute" },
                top: { md: 0 },
                bottom: { md: 0 },
                left: 0,
                width: {
                  xs: "100%",
                  md: "calc(100% + 32px)",
                  lg: "calc(100% + 48px)",
                },
                display: "flex",
              }}
            >
              <Box sx={{ bgcolor: 'secondary.main', p: { xs: 4, md: 6 }, borderRadius: 0, color: 'background.paper', position: 'relative', overflow: 'hidden', height: "100%", flex: 1 }}>
                <Box 
                  sx={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    right: 0, 
                    bottom: 0, 
                    opacity: 0.03,
                    backgroundImage: 'url("https://www.transparenttextures.com/patterns/dark-matter.png")',
                    pointerEvents: 'none'
                  }} 
                />
                <Stack
                  spacing={6}
                  sx={{
                    position: 'relative',
                    zIndex: 1,
                    height: "100%",
                    justifyContent: "center",
                  }}
                >
                  <Box>
                    <Typography variant="overline" sx={{ color: 'primary.light', mb: 2, display: 'block' }}>
                      Measurable Outcomes
                    </Typography>
                    <Typography variant="h3" color="inherit">
                      Your return on investment
                    </Typography>
                  </Box>

                  <Stack spacing={5}>
                    <Box>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <AccessTimeIcon sx={{ color: 'primary.light', mt: 0.5 }} />
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>10-20 Hours Saved</Typography>
                          <Typography variant="body2" sx={{ color: 'var(--color-text-on-dark-body)' }}>Average weekly time reclaimed for leadership by automating routine admin.</Typography>
                        </Box>
                      </Stack>
                    </Box>
                    <Box>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <TrendingUpIcon sx={{ color: 'primary.light', mt: 0.5 }} />
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>50% Higher Conversion</Typography>
                          <Typography variant="body2" sx={{ color: 'var(--color-text-on-dark-body)' }}>Increase in meeting booking rates through instant automated lead response.</Typography>
                        </Box>
                      </Stack>
                    </Box>
                    <Box>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <BoltIcon sx={{ color: 'primary.light', mt: 0.5 }} />
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>10x Throughput</Typography>
                          <Typography variant="body2" sx={{ color: 'var(--color-text-on-dark-body)' }}>Scaling your operational capacity without needing to scale your headcount.</Typography>
                        </Box>
                      </Stack>
                    </Box>
                  </Stack>
                </Stack>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <FinalCTA 
        title="Ready to Get Your Automation Plan?"
        subtitle="Schedule a brief strategy call to walk through your current process. No pressure, just actionable insights on where automation can help you most."
        buttonText="Start Your Free Assessment"
      />
    </Box>
  );
}
