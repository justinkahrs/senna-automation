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

const blogPosts = getAllBlogPosts();

export default function BlogPage() {
  const featuredCategory = blogPosts[0]?.category || "Featured";
  const [categoryLeadWord = "Featured", ...categoryTailWords] =
    featuredCategory.split(" ");
  const categoryLead =
    categoryLeadWord.charAt(0).toUpperCase() +
    categoryLeadWord.slice(1).toLowerCase();
  const categoryTail = categoryTailWords.join(" ").toUpperCase();

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        pb: 0,
      }}
    >
      {/* ── Bolder, Darker Hero Section ───────────────────────── */}
      <Box
        component="section"
        sx={{
          bgcolor: "secondary.main", // SPACE_INDIGO (#181925)
          color: "background.paper",
          pt: { xs: 12, md: 20 },
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
                <Typography variant="overline" sx={{ color: "primary.light" }}>
                  Featured Thinking
                </Typography>
                <Typography
                  variant="h1"
                  color="inherit"
                  dangerouslySetInnerHTML={{
                    __html:
                      blogPosts[0]?.heroTitle ||
                      "The systems we build <br /> define how we scale.",
                  }}
                />
                <Typography
                  variant="subtitle1"
                  sx={{ color: "var(--color-text-on-dark)", maxWidth: 600 }}
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
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bgcolor: "background.paper",
                    color: "primary.main",
                    px: { xs: 3, md: 3.5 },
                    py: { xs: 2.25, md: 2.5 },
                    width: "fit-content",
                    maxWidth: "100%",
                    boxShadow: "var(--shadow-blog-card)",
                    zIndex: 2,
                  }}
                >
                  <Box sx={{ color: "inherit" }}>
                    <Typography
                      sx={{
                        color: "inherit",
                        fontFamily: "var(--font-sans)",
                        fontSize: { xs: "1.35rem", md: "1.55rem" },
                        fontWeight: 700,
                        lineHeight: 1,
                      }}
                    >
                      {categoryLead}
                    </Typography>
                    {categoryTail && (
                        <Typography
                          sx={{
                            color: "inherit",
                            fontFamily: "var(--font-sans)",
                            fontSize: { xs: "0.8rem", md: "0.9rem" },
                            fontWeight: 800,
                            lineHeight: 1.1,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          mt: 0.5,
                        }}
                      >
                        {categoryTail}
                      </Typography>
                    )}
                  </Box>
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
