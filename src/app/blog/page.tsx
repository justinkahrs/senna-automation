import Link from "next/link";
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

import { getAllBlogPosts } from "@/utils/blog";

const blogPosts = getAllBlogPosts();

export default function BlogPage() {
  return (
    <Box sx={{ bgcolor: "background.default" }}>
      {/* ── Bolder, Darker Hero Section ───────────────────────── */}
      <Box
        component="section"
        sx={{
          bgcolor: "secondary.main", // WARM_BLACK (#1C1917)
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
                  sx={{ color: "rgba(255,255,255,0.7)", maxWidth: 600 }}
                >
                  {blogPosts[0]?.heroSubtitle ||
                    "Automation is more than just script execution. It's the digital craftsmanship behind a calm, high-performing business."}
                </Typography>
                <Box sx={{ pt: 2 }}>
                  <Link href={`/blog/${blogPosts[0]?.slug || ""}`} passHref>
                    <Button variant="contained" size="large">
                      Read the Post
                    </Button>
                  </Link>
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box
                sx={{
                  borderRadius: 4,
                  overflow: "hidden",
                  boxShadow: "0 20px 80px rgba(0,0,0,0.4)",
                  transform: "rotate(2deg)",
                  transition: "transform 0.6s var(--ease-enter)",
                  "&:hover": {
                    transform: "rotate(0deg) scale(1.02)",
                  },
                }}
              >
                <img
                  src="/gradient-fallback.png"
                  alt="Featured Post"
                  style={{ width: "100%", display: "block" }}
                />
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
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    bgcolor: "background.paper",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="240"
                    image={post.image}
                    alt={post.title}
                  />
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
                      <Link
                        href={`/blog/${post.slug}`}
                        style={{
                          color: "inherit",
                          textDecoration: "none",
                        }}
                      >
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
                          Read the Article
                          <Box
                            component="span"
                            sx={{
                              fontSize: "1.2rem",
                              transition: "transform 0.2s",
                              "&:hover": { transform: "translateX(4px)" },
                            }}
                          >
                            →
                          </Box>
                        </Typography>
                      </Link>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ── Bolder Call to Action ───────────────────────────── */}
      <Box
        sx={{
          bgcolor: "secondary.main",
          color: "background.paper",
          py: 12,
          textAlign: "center",
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="h2" gutterBottom color="inherit">
            Get automation patterns in your inbox.
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: "rgba(255,255,255,0.7)", mb: 6 }}
          >
            A curated monthly digest of the most effective AI workflows we're
            seeing in the field. No fluff.
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
          >
            <Box
              component="input"
              placeholder="Your email address"
              sx={{
                bgcolor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "50px",
                px: 3,
                py: 2,
                color: "white",
                minWidth: { sm: 300 },
                "&:focus": {
                  outline: "none",
                  borderColor: "primary.light",
                  bgcolor: "rgba(255,255,255,0.1)",
                },
              }}
            />
            <Button variant="contained" size="large">
              Join the List
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
