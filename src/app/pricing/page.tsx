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
        {/* Header Hero */}
        <Box
          sx={{
            pt: { xs: 8, md: 12 },
            pb: { xs: 8, md: 15 },
            textAlign: "center"
          }}
        >
          <Typography variant="overline" color="primary.main" gutterBottom sx={{ display: 'block', mb: 2 }}>
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
            Every business has unique workflows. Our pricing reflects the complexity and scale of the systems we build. We provide clear, fixed-price project ranges so you know exactly what to expect.
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
                <Typography variant="overline" color="text.secondary" gutterBottom sx={{ display: 'block', mb: 1 }}>
                  Tier 01
                </Typography>
                <Typography variant="h3" sx={{ mb: 1 }}>
                  Starter Automation
                </Typography>
                <Typography variant="h2" sx={{ my: 2 }}>
                  $1.5k – $3.5k
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Perfect for small businesses looking to automate a single, high-impact workflow.
                </Typography>
                <Divider sx={{ my: 3 }} />
                <Typography variant="overline" color="primary.main" sx={{ mb: 2, display: "block" }}>
                  Includes:
                </Typography>
                <List dense disablePadding>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 28 }}><CheckCircleOutlineIcon fontSize="small" color="primary" /></ListItemIcon>
                    <ListItemText primary="1 core workflow automated" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 28 }}><CheckCircleOutlineIcon fontSize="small" color="primary" /></ListItemIcon>
                    <ListItemText primary="Basic integrations (CRM, email, forms)" />
                  </ListItem>
                </List>
                <Typography variant="overline" color="primary.main" sx={{ mt: 3, mb: 2, display: "block" }}>
                  Outcomes:
                </Typography>
                <List dense disablePadding>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 28 }}><TrendingUpIcon fontSize="small" color="primary" /></ListItemIcon>
                    <ListItemText primary="Save hours each week" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 28 }}><TrendingUpIcon fontSize="small" color="primary" /></ListItemIcon>
                    <ListItemText primary="Reduce repetitive tasks" />
                  </ListItem>
                </List>
              </CardContent>
              <Box sx={{ p: 4, pt: 0 }}>
                <Link href="/contact" passHref>
                  <Button variant="outlined" color="primary" fullWidth sx={{ py: 1.5 }}>
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
                bgcolor: "background.paper",
                borderRadius: 4,
                boxShadow: "0 20px 80px rgba(0,0,0,0.06)",
                border: "2px solid",
                borderColor: "primary.main",
                transform: { md: "scale(1.05)" },
                zIndex: 1,
                position: 'relative',
                overflow: 'hidden',
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
                      color: '#FFF', 
                      fontWeight: 700,
                      fontSize: '0.625rem',
                      height: 20
                    }} 
                  />
                </Stack>
                <Typography variant="h3" sx={{ mb: 1 }}>
                  Growth Systems
                </Typography>
                <Typography variant="h2" sx={{ my: 2, color: 'primary.main' }}>
                  $4k – $8k
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  For companies ready to scale lead generation and automate customer follow-up.
                </Typography>
                <Divider sx={{ my: 3 }} />
                <Typography variant="overline" color="primary.main" sx={{ mb: 2, display: "block" }}>
                  Includes:
                </Typography>
                <List dense disablePadding>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 28 }}><CheckCircleOutlineIcon fontSize="small" color="primary" /></ListItemIcon>
                    <ListItemText primary="Multi-step automated workflows" sx={{ fontWeight: 600 }} />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 28 }}><CheckCircleOutlineIcon fontSize="small" color="primary" /></ListItemIcon>
                    <ListItemText primary="Lead capture + automated follow-up" sx={{ fontWeight: 600 }} />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 28 }}><CheckCircleOutlineIcon fontSize="small" color="primary" /></ListItemIcon>
                    <ListItemText primary="Full CRM integration" sx={{ fontWeight: 600 }} />
                  </ListItem>
                </List>
                <Typography variant="overline" color="primary.main" sx={{ mt: 3, mb: 2, display: "block" }}>
                  Outcomes:
                </Typography>
                <List dense disablePadding>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 28 }}><TrendingUpIcon fontSize="small" color="primary" /></ListItemIcon>
                    <ListItemText primary="Capture and convert more leads" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 28 }}><TrendingUpIcon fontSize="small" color="primary" /></ListItemIcon>
                    <ListItemText primary="Significantly reduce manual work" />
                  </ListItem>
                </List>
              </CardContent>
              <Box sx={{ p: 4, pt: 0 }}>
                <Link href="/contact" passHref>
                  <Button variant="contained" color="primary" fullWidth size="large">
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
                <Typography variant="overline" color="text.secondary" gutterBottom sx={{ display: 'block', mb: 1 }}>
                  Tier 03
                </Typography>
                <Typography variant="h3" sx={{ mb: 1 }}>
                  Custom AI Systems
                </Typography>
                <Typography variant="h2" sx={{ my: 2 }}>
                  $10k+
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
                <ScheduleCallButton
                  text="Book a Demo via"
                  fullWidth
                  showIcon={true}
                  variant="outlined"
                  sx={{ py: 1.5 }}
                />
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
            Ongoing Support & Optimization
          </Typography>
          <Typography variant="h3" color="primary" sx={{ mb: 3, fontWeight: 700 }}>
            $500 – $2,000 / mo
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

        {/* Factors & ROI - Asymmetrical Grid 7/5 */}
        <Box sx={{ mt: { xs: 12, md: 24 } }}>
          <Grid container spacing={{ xs: 8, md: 10, lg: 15 }}>
            {/* Determinants (7 columns) */}
            <Grid item xs={12} md={7}>
              <Box>
                <Typography variant="overline" color="primary.main" gutterBottom sx={{ display: 'block', mb: 2 }}>
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

            {/* ROI (5 columns) */}
            <Grid item xs={12} md={5}>
              <Box sx={{ bgcolor: 'secondary.main', p: { xs: 4, md: 6 }, borderRadius: 6, color: 'background.paper', position: 'relative', overflow: 'hidden' }}>
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
                <Stack spacing={6} sx={{ position: 'relative', zIndex: 1 }}>
                  <Box>
                    <Typography variant="overline" sx={{ color: 'primary.light', mb: 2, display: 'block' }}>
                      Measurable Outcomes
                    </Typography>
                    <Typography variant="h3" color="inherit">
                      Your return on <br /> investment
                    </Typography>
                  </Box>

                  <Stack spacing={5}>
                    <Box>
                      <Stack direction="row" spacing={2} alignItems="flex-start">
                        <AccessTimeIcon sx={{ color: 'primary.light', mt: 0.5 }} />
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>10-20 Hours Saved</Typography>
                          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>Average weekly time reclaimed for leadership by automating routine admin.</Typography>
                        </Box>
                      </Stack>
                    </Box>
                    <Box>
                      <Stack direction="row" spacing={2} alignItems="flex-start">
                        <TrendingUpIcon sx={{ color: 'primary.light', mt: 0.5 }} />
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>50% Higher Conversion</Typography>
                          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>Increase in meeting booking rates through instant automated lead response.</Typography>
                        </Box>
                      </Stack>
                    </Box>
                    <Box>
                      <Stack direction="row" spacing={2} alignItems="flex-start">
                        <BoltIcon sx={{ color: 'primary.light', mt: 0.5 }} />
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>10x Throughput</Typography>
                          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>Scaling your operational capacity without needing to scale your headcount.</Typography>
                        </Box>
                      </Stack>
                    </Box>
                  </Stack>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Final CTA */}
        <Box sx={{ mt: 15, mb: 5, textAlign: "center" }}>
          <Typography variant="h2" sx={{ mb: 3 }}>
            Ready to Get Your Automation Plan?
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 5, maxWidth: "600px", mx: "auto" }}>
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
