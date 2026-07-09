import Script from "@/compat/next/script";
import Image from "@/compat/next/image";
import Link from "@/compat/next/link";
import {
  Box,
  Container,
  Typography,
  Stack,
  Grid,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ACCENT } from "@/components/theme/colors";
import FinalCTA from "@/components/sections/FinalCTA";
import {
  NumberedSteps,
  parseNumberedSteps,
} from "@/components/blog/NumberedSteps";
import { MermaidDiagram } from "@/components/blog/MermaidDiagram";
import { LOGO_URL, SITE_NAME, SITE_URL } from "@/utils/site";
import type { BlogPost, BlogPostPreview } from "@/types/blog";

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

function toAbsoluteUrl(url?: string) {
  if (!url) return undefined;
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return `${SITE_URL}${url.startsWith("/") ? url : `/${url}`}`;
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
    <Box
      sx={{
        position: "relative",
        my: 6,
        width: "100%",
        aspectRatio: "16 / 9",
        borderRadius: 4,
        overflow: "hidden",
        boxShadow: "var(--shadow-blog-header)",
      }}
    >
      <Image src={src} alt={alt} fill style={{ objectFit: "cover" }} />
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
          fontFamily: "var(--font-sans)",
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

export default function BlogPostPageContent({
  post,
  relatedPost,
}: {
  post: BlogPost;
  relatedPost?: BlogPostPreview | null;
}) {
  const contentParts =
    post.slug === "quote-automation" &&
    post.content.includes(QUOTE_AUTOMATION_ERP_STEPS_MARKER)
      ? post.content.split(QUOTE_AUTOMATION_ERP_STEPS_MARKER)
      : null;
  const hasMermaidDiagram = post.content.includes("```mermaid");
  const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;
  const imageUrl = toAbsoluteUrl(post.image);
  const publishedDate = post.date ? new Date(post.date).toISOString() : undefined;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: imageUrl ? [imageUrl] : undefined,
    datePublished: publishedDate,
    dateModified: publishedDate,
    articleSection: post.category,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: LOGO_URL,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <Box sx={{ bgcolor: "transparent", minHeight: "100vh", pb: 0 }}>
      <Script
        id="article-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd),
        }}
      />
      <Script
        id="blog-breadcrumb-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
      {hasMermaidDiagram && (
        <Script
          src="https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js"
          strategy="afterInteractive"
        />
      )}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          bgcolor: "primary.main",
          zIndex: 2000,
          width: "45%",
          display: "none",
        }}
      />
      <Box
        component="section"
        sx={{
          bgcolor: "secondary.main",
          color: "background.paper",
          pt: { xs: 16, md: 28 },
          pb: { xs: 10, md: 16 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            opacity: 0.03,
            backgroundImage:
              'url("https://www.transparenttextures.com/patterns/dark-matter.png")',
            pointerEvents: "none",
          }}
        />
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Grid container spacing={{ xs: 6, md: 8 }} sx={{ alignItems: "center" }}>
            <Grid size={{ xs: 12, md: 7 }}>
              <Stack spacing={3}>
                <Typography
                  variant="overline"
                  sx={{
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
                  }}
                >
                  {post.category}
                </Typography>
                <Typography component="h1" variant="h1" sx={{ color: "inherit" }}>
                  {post.title}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: "var(--color-text-on-dark)",
                    maxWidth: 720,
                  }}
                >
                  {post.excerpt}
                </Typography>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <Box
                sx={{
                  position: "relative",
                  aspectRatio: "4 / 5",
                  borderRadius: { xs: 1.5, md: 1.5 },
                  overflow: "hidden",
                  boxShadow: "var(--shadow-blog-hero)",
                }}
              >
                <Image
                  src={post.image || "/gradient-fallback.png"}
                  alt={post.title}
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                  sizes="(max-width: 900px) 100vw, 460px"
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box component="article" sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="md">
          {contentParts ? (
            <>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={markdownComponents as any}
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
                components={markdownComponents as any}
              >
                {contentParts[1] || ""}
              </ReactMarkdown>
            </>
          ) : (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={markdownComponents as any}
            >
              {post.content}
            </ReactMarkdown>
          )}
        </Container>
      </Box>

      {relatedPost ? (
        <Box component="section" sx={{ pb: { xs: 8, md: 12 } }}>
          <Container maxWidth="lg">
            <Stack spacing={3}>
              <Typography variant="overline" sx={{ color: "primary.main" }}>
                Next read
              </Typography>
              <Grid container spacing={4} sx={{ alignItems: "center" }}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Stack spacing={2.5}>
                    <Typography variant="h3" component="h2">
                      {relatedPost.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: "text.secondary" }}>
                      {relatedPost.excerpt}
                    </Typography>
                    <Box>
                      <Link href={`/blog/${relatedPost.slug}`} passHref>
                        <Typography
                          component="span"
                          sx={{
                            color: "primary.main",
                            fontWeight: 700,
                            textDecoration: "underline",
                          }}
                        >
                          Read the next case study
                        </Typography>
                      </Link>
                    </Box>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Box
                    sx={{
                      position: "relative",
                      aspectRatio: "4 / 3",
                      borderRadius: 3,
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={relatedPost.image || "/gradient-fallback.png"}
                      alt={relatedPost.title}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 900px) 100vw, 50vw"
                    />
                  </Box>
                </Grid>
              </Grid>
            </Stack>
          </Container>
        </Box>
      ) : null}

      <FinalCTA transparentBackground />
    </Box>
  );
}
