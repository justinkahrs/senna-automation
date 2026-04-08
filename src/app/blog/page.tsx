import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "AI Automation Insights & Case Studies | Senna Automation Blog",
  description:
    "Practical guides and real-world automation case studies from Senna Automation. Learn how businesses eliminate manual work, improve lead follow-up, and build smarter workflows with AI.",
  alternates: {
    canonical: "https://www.senna-automation.com/blog",
  },
};

import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Button,
} from "@mui/material";
import { alpha } from "@mui/material/styles";

import { ACCENT, LIGHT_CYAN } from "@/components/theme/colors";
import { getAllBlogPosts } from "@/utils/blog";

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

const blogPosts = getAllBlogPosts();

export default function BlogPage() {
  const featuredHeroTitle =
    blogPosts[0]?.heroTitle || "The systems we build define how we scale.";
  const hasEndToEndLead = featuredHeroTitle.startsWith("End-to-End ");
  const featuredHeroTail = hasEndToEndLead
    ? featuredHeroTitle.replace(/^End-to-End\s+/, "")
    : featuredHeroTitle;

  return (
    <Box
      sx={{
        bgcolor: "transparent",
        pb: 0,
      }}
    >
      {/* ── Bolder, Darker Hero Section ───────────────────────── */}
      <Box
        component="section"
        sx={{
          bgcolor: "secondary.main", // SPACE_INDIGO (#181925)
          color: "background.paper",
          pt: { xs: 16, md: 28 },
          pb: { xs: 10, md: 16 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle texture overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.03,
            backgroundImage:
              'url("https://www.transparenttextures.com/patterns/dark-matter.png")',
            pointerEvents: "none",
          }}
        />

        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={7}>
              <Stack spacing={3}>
                <Typography variant="overline" sx={{ ...homeEyebrowSx }}>
                  Featured
                </Typography>
                <Typography
                  variant="h1"
                  color="inherit"
                  sx={{
                    fontSize: "clamp(3.75rem, 9vw, 7rem)",
                    lineHeight: 0.96,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {hasEndToEndLead ? (
                    <>
                      <Box
                        component="span"
                        sx={{
                          display: "block",
                          fontFamily:
                            '"itc-avant-garde-gothic-pro", system-ui, -apple-system, sans-serif',
                          fontSize: "0.9em",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "-0.04em",
                          color: "var(--color-text-inverse)",
                          mb: 1.25,
                        }}
                      >
                        End-to-End
                      </Box>
                      <Box
                        component="span"
                        sx={{
                          display: "block",
                          fontFamily: '"posh", sans-serif',
                          fontWeight: 900,
                          fontStyle: "italic",
                          color: "var(--color-text-inverse)",
                          textShadow: {
                            xs: "3px 3px 0 var(--ds-airforce-blue)",
                            sm: "4px 4px 0 var(--ds-airforce-blue)",
                            md: "6px 6px 0 var(--ds-airforce-blue)",
                          },
                        }}
                      >
                        {featuredHeroTail}
                      </Box>
                    </>
                  ) : (
                    <Box
                      component="span"
                      sx={{
                        display: "block",
                        fontFamily: '"posh", sans-serif',
                        fontWeight: 900,
                        fontStyle: "italic",
                        color: "var(--color-text-inverse)",
                        textShadow: {
                          xs: "3px 3px 0 var(--ds-airforce-blue)",
                          sm: "4px 4px 0 var(--ds-airforce-blue)",
                          md: "6px 6px 0 var(--ds-airforce-blue)",
                        },
                      }}
                    >
                      {featuredHeroTitle}
                    </Box>
                  )}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "var(--color-text-on-dark)",
                    maxWidth: 600,
                    fontSize: "1.125rem",
                    lineHeight: 1.75,
                  }}
                >
                  {blogPosts[0]?.heroSubtitle ||
                    "Automation is more than just script execution. It's the digital craftsmanship behind a calm, high-performing business."}
                </Typography>
                <Box sx={{ pt: 2 }}>
                  <Link href={`/blog/${blogPosts[0]?.slug || ""}`} passHref>
                    <Button variant="contained" size="large">
                      Read It
                    </Button>
                  </Link>
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  maxWidth: { xs: 420, md: 460 },
                  ml: { md: "auto" },
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    aspectRatio: "4 / 5",
                    overflow: "hidden",
                    borderRadius: { xs: 1.5, md: 1.5 },
                    boxShadow: "var(--shadow-blog-hero)",
                  }}
                >
                  <Image
                    src={blogPosts[0]?.image || "/gradient-fallback.png"}
                    alt={blogPosts[0]?.title || "Featured Post"}
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                    sizes="(max-width: 900px) 100vw, 460px"
                  />
                  <Box sx={{ position: "absolute", inset: 0, bgcolor: alpha(LIGHT_CYAN, 0.4), pointerEvents: "none" }} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ── Blog Feed ─────────────────────────────────────────── */}
      <Box sx={{ py: { xs: 10, md: 16 } }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              mb: 8,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <Box>
              <Typography variant="h2">Recent Insights</Typography>
            </Box>
          </Box>

          <Grid container spacing={4}>
            {blogPosts.map((post) => (
              <Grid item xs={12} md={4} key={post.slug}>
                <Card
                  component={Link}
                  href={`/blog/${post.slug}`}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    bgcolor: "background.paper",
                    color: "inherit",
                    textDecoration: "none",
                    cursor: "pointer",
                    "&:hover .blog-card-arrow": {
                      transform: "translateX(4px)",
                    },
                  }}
                >
                  <Box sx={{ position: "relative" }}>
                    <CardMedia
                      component="img"
                      height="240"
                      image={post.image}
                      alt={post.title}
                    />
                    <Box sx={{ position: "absolute", inset: 0, bgcolor: alpha(LIGHT_CYAN, 0.4), pointerEvents: "none" }} />
                  </Box>
                  <CardContent sx={{ flexGrow: 1, p: 4 }}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      sx={{ mb: 2 }}
                    >
                      <Typography variant="overline" color="primary.main">
                        {post.category}
                      </Typography>
                      <Typography variant="caption">{post.date}</Typography>
                    </Stack>
                    <Typography
                      variant="h4"
                      component="h3"
                      gutterBottom
                      sx={{ lineHeight: 1.3 }}
                    >
                      {post.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ mb: 4 }}
                    >
                      {post.excerpt}
                    </Typography>
                    <Box sx={{ mt: "auto" }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 700,
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 1,
                          letterSpacing: 0.5,
                          textTransform: "uppercase",
                          fontSize: "0.8125rem",
                        }}
                      >
                        Read It
                        <Box
                          component="span"
                          className="blog-card-arrow"
                          sx={{
                            fontSize: "1.2rem",
                            transition: "transform 0.2s",
                          }}
                        >
                          →
                        </Box>
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ── Final CTA ─────────────────────────────────── */}
      <FinalCTA 
        title="Want to automate something in your business?"
        subtitle="Book a free 30-min call. We'll identify the highest-impact opportunities and map out exactly where to start."
        buttonText="Schedule a Free Call"
      />
    </Box>
  );
}
