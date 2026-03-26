import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import {
  Box,
  Container,
  Typography,
  Stack,
  Button,
  Divider,
  Grid,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { ACCENT } from "@/components/theme/colors";
import { getBlogPostBySlug, getAllBlogPosts } from "@/utils/blog";
import { ConsultationCTA } from "@/components/blog/ConsultationCTA";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { notFound } from "next/navigation";

const SITE_URL = "https://www.senna-automation.com";

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found | Senna Automation" };
  }

  return {
    title: `${post.title} | Senna Automation`,
    description: post.excerpt,
    alternates: {
      canonical: `${SITE_URL}/blog/${slug}`,
    },
    openGraph: {
      type: "article",
      url: `${SITE_URL}/blog/${slug}`,
      title: post.title,
      description: post.excerpt,
      images: post.image
        ? [{ url: post.image.startsWith("http") ? post.image : `${SITE_URL}${post.image}`, width: 1200, height: 630, alt: post.title }]
        : [],
      publishedTime: post.date ? new Date(post.date).toISOString() : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image.startsWith("http") ? post.image : `${SITE_URL}${post.image}`] : [],
    },
  };
}


const markdownComponents = {
  h2: ({ children }: any) => (
    <Typography variant="h3" sx={{ mt: 8, mb: 3 }}>
      {children}
    </Typography>
  ),
  h3: ({ children }: any) => (
    <Typography variant="h4" sx={{ mt: 6, mb: 3 }}>
      {children}
    </Typography>
  ),
  p: ({ children }: any) => (
    <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.8 }}>
      {children}
    </Typography>
  ),
  img: ({ src, alt }: any) => (
    <Box sx={{ position: "relative", my: 6 }}>
      <Box
        component="img"
        src={src}
        alt={alt}
        sx={{
          width: "100%",
          borderRadius: 4,
          display: "block",
          boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          borderRadius: 4,
          bgcolor: alpha(ACCENT, 0.5),
          pointerEvents: "none",
        }}
      />
    </Box>
  ),
  strong: ({ children }: any) => (
    <Box component="span" sx={{ fontWeight: 700 }}>
      {children}
    </Box>
  ),
  ul: ({ children }: any) => (
    <Box component="ul" sx={{ mb: 4, pl: 4, "& li": { mb: 2 } }}>
      {children}
    </Box>
  ),
  ol: ({ children }: any) => (
    <Box component="ol" sx={{ mb: 4, pl: 4, "& li": { mb: 2 } }}>
      {children}
    </Box>
  ),
  li: ({ children }: any) => (
    <Box component="li">
      <Typography variant="body1" component="span">
        {children}
      </Typography>
    </Box>
  ),
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", pb: 12 }}>
      {/* ── Progress Bar Placeholder ── */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          bgcolor: "primary.main",
          zIndex: 2000,
          width: "45%", // Static for demo
        }}
      />

      <Box
        component="section"
        sx={{
          bgcolor: "secondary.main",
          color: "background.paper",
          position: "relative",
          overflow: "hidden",
          minHeight: { md: "600px" },
          display: "flex",
          alignItems: "center",
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
            zIndex: 1,
          }}
        />

        {/* Full-bleed right image */}
        <Box
          sx={{
            position: { xs: "relative", md: "absolute" },
            top: 0,
            right: 0,
            width: { xs: "100%", md: "50%" },
            height: { xs: "300px", md: "100%" },
            zIndex: 0,
            "& img": {
              width: "100%",
              height: "100%",
              objectFit: "cover",
            },
          }}
        >
          <img src={post.image} alt={post.title} />
          {/* 50% opacity overlay */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              bgcolor: alpha(ACCENT, 0.5),
              pointerEvents: "none",
            }}
          />
          {/* Gradient overlay for better text contrast on mobile if image overlaps */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: {
                xs: "linear-gradient(to bottom, rgba(28,25,23,0.8), transparent)",
                md: "none",
              },
            }}
          />
        </Box>

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
          <Grid container>
            <Grid item xs={12} md={6}>
              <Stack spacing={4} sx={{ py: { xs: 8, md: 16 }, pr: { md: 8 } }}>
                <Typography variant="overline" sx={{ color: "primary.light" }}>
                  {post.category} • {post.date}
                </Typography>
                <Typography
                  variant="h1"
                  color="inherit"
                  sx={{ fontSize: { xs: "2.5rem", md: "4rem" } }}
                >
                  {post.title}
                </Typography>
                {post.subtitle && (
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: "rgba(255,255,255,0.7)",
                      maxWidth: "500px",
                      fontSize: "1.25rem",
                      lineHeight: 1.6,
                      fontStyle: "italic",
                      borderLeft: "2px solid",
                      borderColor: "primary.main",
                      pl: 3,
                    }}
                  >
                    "{post.subtitle}"
                  </Typography>
                )}
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ pt: { xs: 8, md: 12 } }}>
        <Grid container spacing={8}>
          <Grid item xs={12} md={8}>
            <Stack spacing={4}>
              <Box sx={{ "& p": { mb: 4, lineHeight: 1.8 } }}>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={markdownComponents}
                >
                  {post.content}
                </ReactMarkdown>
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ position: { md: "sticky" }, top: 120 }}>
              <Stack spacing={4}>
                {post.metadata.client && (
                  <Box>
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: 700, mb: 0.5, color: "text.primary" }}
                    >
                      Client
                    </Typography>
                    <Typography variant="body1" color="text.primary">
                      {post.metadata.client}
                    </Typography>
                  </Box>
                )}
                {post.metadata.company && (
                  <Box>
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: 700, mb: 0.5, color: "text.primary" }}
                    >
                      Company
                    </Typography>
                    <Typography variant="body1" color="text.primary">
                      {post.metadata.companyUrl &&
                      post.metadata.companyUrl !== "#" ? (
                        <Link
                          href={post.metadata.companyUrl}
                          style={{
                            color: "inherit",
                            textDecoration: "underline",
                          }}
                        >
                          {post.metadata.company}
                        </Link>
                      ) : (
                        post.metadata.company
                      )}
                    </Typography>
                  </Box>
                )}
                {post.metadata.year && (
                  <Box>
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: 700, mb: 0.5, color: "text.primary" }}
                    >
                      Year
                    </Typography>
                    <Typography variant="body1" color="text.primary">
                      {post.metadata.year}
                    </Typography>
                  </Box>
                )}
                {post.metadata.role && (
                  <Box>
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: 700, mb: 0.5, color: "text.primary" }}
                    >
                      Role
                    </Typography>
                    <Typography variant="body1" color="text.primary">
                      {post.metadata.role}
                    </Typography>
                  </Box>
                )}
                {post.metadata.tools && (
                  <Box>
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: 700, mb: 0.5, color: "text.primary" }}
                    >
                      Tools
                    </Typography>
                    <Typography variant="body1" color="text.primary">
                      {post.metadata.tools}
                    </Typography>
                  </Box>
                )}
              </Stack>
            </Box>
          </Grid>
        </Grid>

        <ConsultationCTA />

        <Box sx={{ pt: 10, textAlign: "left" }}>
          <Link
            href="/blog"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <Typography
              variant="body2"
              sx={{
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              ← Back to Blog
            </Typography>
          </Link>
        </Box>
      </Container>
    </Box>
  );
}
