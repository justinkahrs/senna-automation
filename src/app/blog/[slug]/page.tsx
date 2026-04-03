import type { Metadata } from "next";
import Script from "next/script";
import Image from "next/image";
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
import {
  NumberedSteps,
  parseNumberedSteps,
} from "@/components/blog/NumberedSteps";
import { MermaidDiagram } from "@/components/blog/MermaidDiagram";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { notFound } from "next/navigation";

const SITE_URL = "https://www.senna-automation.com";
const QUOTE_AUTOMATION_ERP_STEPS_MARKER = "[[QUOTE_AUTOMATION_ERP_STEPS]]";
const quoteAutomationErpSteps = [
  {
    number: "01",
    title: "Customer Discovery",
    description:
      "Using the sender's email address, the workflow executes a POST request to search the ERP for matching corporate accounts, fetching required shipping codes and addresses.",
  },
  {
    number: "02",
    title: "Item Validation",
    description:
      "Iterating over the structured AI extracted list, it queries the backend for every individual part number to dynamically pull real items and pricing.",
  },
  {
    number: "03",
    title: "Quote Generation",
    description:
      "Finally, the system packages the verified items, customer ID, and metadata into a final payload, generating a fully fleshed out Quote PDF file on the fly.",
  },
];

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
    <Typography variant="body1" component="div" sx={{ mb: 4, lineHeight: 1.8 }}>
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
          boxShadow: "var(--shadow-blog-header)",
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
  blockquote: ({ children }: any) => (
    <Box
      sx={{
        my: 8,
        px: { xs: 4, md: 5 },
        py: { xs: 4, md: 5 },
        bgcolor: alpha(ACCENT, 0.06),
        borderRadius: 3,
        boxShadow: "var(--shadow-blog-article)",
        "& .MuiTypography-body1": {
          mb: 2.5,
          lineHeight: 1.85,
        },
        "& .MuiTypography-body1:last-child": {
          mb: 0,
        },
        "& > .MuiTypography-body1:first-of-type": {
          mb: 3,
          fontFamily: "Inter, sans-serif",
          fontSize: "clamp(1.875rem, 3.5vw, 2.369rem)",
          lineHeight: 1.18,
          letterSpacing: "-0.02em",
          color: "text.primary",
        },
        "& > .MuiTypography-body1:first-of-type strong": {
          fontSize: "inherit",
          lineHeight: "inherit",
          letterSpacing: "inherit",
        },
        "& strong": {
          color: "text.primary",
          fontWeight: 700,
        },
      }}
    >
      {children}
    </Box>
  ),
  pre: ({ children }: any) => <Box component="div">{children}</Box>,
  code: ({ className, children, ...props }: any) => {
    const language = className?.replace("language-", "");
    const content = String(children).replace(/\n$/, "");

    if (language === "steps") {
      return (
        <NumberedSteps
          steps={parseNumberedSteps(content)}
          layout="stack"
          sx={{ my: 8 }}
        />
      );
    }

    if (language === "mermaid") {
      return <MermaidDiagram chart={content} sx={{ my: 8 }} />;
    }

    return (
      <Box
        component="code"
        className={className}
        sx={{
          fontFamily: "monospace",
          fontSize: "0.95em",
          bgcolor: "var(--color-bg-accent-faint)",
          px: 0.75,
          py: 0.25,
          borderRadius: 1,
        }}
        {...props}
      >
        {children}
      </Box>
    );
  },
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  const relatedPost = getAllBlogPosts().find((entry) => entry.slug !== slug);

  if (!post) {
    notFound();
  }

  const contentParts =
    slug === "quote-automation" &&
    post.content.includes(QUOTE_AUTOMATION_ERP_STEPS_MARKER)
      ? post.content.split(QUOTE_AUTOMATION_ERP_STEPS_MARKER)
      : null;
  const hasMermaidDiagram = post.content.includes("```mermaid");

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", pb: 12 }}>
      {hasMermaidDiagram && (
        <Script
          src="https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js"
          strategy="afterInteractive"
        />
      )}

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
          display: "none",
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
          }}
        >
          <Image
            src={post.image || "/gradient-fallback.png"}
            alt={post.title}
            fill
            style={{ objectFit: "cover" }}
            priority
            sizes="(max-width: 900px) 100vw, 50vw"
          />
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
                xs: "linear-gradient(to bottom, rgba(24,25,37,0.8), transparent)",
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
                      color: "var(--color-text-on-dark)",
                      maxWidth: "500px",
                      fontSize: "1.25rem",
                      lineHeight: 1.6,
                      fontStyle: "italic",
                      borderLeft: "2px solid",
                      borderColor: "primary.main",
                      pl: 3,
                    }}
                  >
                    {post.subtitle}
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
                {contentParts ? (
                  <>
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={markdownComponents}
                    >
                      {contentParts[0]}
                    </ReactMarkdown>
                    <NumberedSteps
                      steps={quoteAutomationErpSteps}
                      layout="stack"
                      sx={{ my: 8 }}
                    />
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={markdownComponents}
                    >
                      {contentParts[1]}
                    </ReactMarkdown>
                  </>
                ) : (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={markdownComponents}
                  >
                    {post.content}
                  </ReactMarkdown>
                )}
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
                    <Typography
                      variant="body1"
                      color="text.primary"
                      sx={{ whiteSpace: "pre-line" }}
                    >
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
                {relatedPost && (
                  <Box
                    component={Link}
                    href={`/blog/${relatedPost.slug}`}
                    sx={{
                      display: "block",
                      textDecoration: "none",
                      color: "inherit",
                      mt: 1,
                      px: 3,
                      py: 3.5,
                      borderRadius: 3,
                      bgcolor: alpha(ACCENT, 0.06),
                      border: "1px solid",
                      borderColor: alpha(ACCENT, 0.14),
                      boxShadow: "var(--shadow-blog-card)",
                      transition: "transform 180ms ease, box-shadow 180ms ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "var(--shadow-blog-card-hover)",
                      },
                    }}
                  >
                    <Typography
                      variant="overline"
                      sx={{ color: "primary.main", letterSpacing: "0.14em" }}
                    >
                      Related Read
                    </Typography>
                    <Typography variant="h5" sx={{ mt: 1.25, mb: 1.25 }}>
                      See the other side of this workflow.
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", lineHeight: 1.75, mb: 2 }}
                    >
                      {relatedPost.excerpt}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 700, color: "text.primary" }}
                    >
                      {relatedPost.title}
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
