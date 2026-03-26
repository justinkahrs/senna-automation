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
import { getBlogPostBySlug } from "@/utils/blog";
import { ConsultationCTA } from "@/components/blog/ConsultationCTA";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { notFound } from "next/navigation";

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
    <Box
      component="img"
      src={src}
      alt={alt}
      sx={{
        width: "100%",
        borderRadius: 4,
        my: 6,
        boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
      }}
    />
  ),
  strong: ({ children }: any) => (
    <Box component="span" sx={{ fontWeight: 700 }}>
      {children}
    </Box>
  ),
  ul: ({ children }: any) => (
    <Box component="ul" sx={{ mb: 4, pl: 4 }}>
      {children}
    </Box>
  ),
  li: ({ children }: any) => (
    <Box component="li" sx={{ mb: 1 }}>
      <Typography variant="body1">{children}</Typography>
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

      <Container maxWidth="lg" sx={{ pt: { xs: 8, md: 12 } }}>
        <Box sx={{ mb: 6 }}>
          <Typography variant="overline" color="primary.main" gutterBottom>
            {post.category} • {post.date}
          </Typography>
          <Typography
            variant="h1"
            gutterBottom
            sx={{ mb: 4, maxWidth: "900px" }}
          >
            {post.title}
          </Typography>
          {post.subtitle && (
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{
                fontStyle: "italic",
                borderLeft: "3px solid",
                borderColor: "primary.main",
                pl: 3,
                py: 1,
                maxWidth: "800px",
              }}
            >
              "{post.subtitle}"
            </Typography>
          )}
        </Box>

        <Box
          component="img"
          src={post.image}
          alt={post.title}
          sx={{
            width: "100%",
            height: { xs: "300px", md: "500px" },
            objectFit: "cover",
            borderRadius: 10,
            mb: 8,
            boxShadow: "0 20px 80px rgba(0,0,0,0.1)",
          }}
        />

        <Divider sx={{ mb: 8 }} />

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
              </Stack>
            </Box>
          </Grid>
        </Grid>

        <ConsultationCTA />

        <Box sx={{ pt: 10, textAlign: 'left' }}>
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
              ← Back to Journal
            </Typography>
          </Link>
        </Box>
      </Container>
    </Box>
  );
}
