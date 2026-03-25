import Link from "next/link";
import {
  Box,
  Container,
  Typography,
  Stack,
  Button,
  Divider,
} from "@mui/material";

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return (
    <Box sx={{ bgcolor: "background.default", minHeight: '100vh', pb: 12 }}>
      {/* ── Progress Bar Placeholder ── */}
      <Box sx={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        height: '3px', 
        bgcolor: 'primary.main', 
        zIndex: 2000,
        width: '45%' // Static for demo
      }} />

      <Container maxWidth="md" sx={{ pt: { xs: 8, md: 12 } }}>
        <Stack spacing={4}>
          <Box>
            <Typography variant="overline" color="primary.main" gutterBottom>
              Philosophy • Mar 24, 2026
            </Typography>
            <Typography variant="h1" gutterBottom sx={{ mb: 4 }}>
              Why Human-First Automation is the Future of Work
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ fontStyle: 'italic', borderLeft: '3px solid', borderColor: 'primary.main', pl: 3, py: 1 }}>
              "The most successful automation doesn't replace the human; it creates a stage for them to perform their best work."
            </Typography>
          </Box>

          <Divider sx={{ my: 4 }} />

          <Box sx={{ '& p': { mb: 4, lineHeight: 1.8 } }}>
            <Typography variant="body1">
              Most people think of automation as a way to cut costs. In the corporate world, it's often discussed in terms of "efficiency gains" and "headcount reduction." But this perspective misses the most transformative aspect of modern AI and workflow design: the restoration of human focus.
            </Typography>

            <Typography variant="h3" sx={{ mt: 6, mb: 3 }}>
              The Burden of Administrative Friction
            </Typography>

            <Typography variant="body1">
              Every day, brilliant people spend hours on "work-about-work." They're moving data from one spreadsheet to another, manually following up on leads that a machine could have qualified instantly, and chasing approvals through fragmented email threads. This is administrative friction, and it's the silent killer of innovation.
            </Typography>

            <Box 
              component="img" 
              src="/Users/annakahrs/.gemini/antigravity/brain/5ff63515-6bc1-482c-9777-5bdd64164302/blog_post_automation_hands_1774475499477.png"
              alt="Hand sketching a process"
              sx={{ width: '100%', borderRadius: 4, my: 6, boxShadow: '0 20px 60px rgba(0,0,0,0.1)' }}
            />

            <Typography variant="h4" sx={{ mt: 6, mb: 3 }}>
              Crafting Systems with Intent
            </Typography>

            <Typography variant="body1">
              When we build automation at Senna, we don't start with the tool. We start with the human experience. We ask: "Where is this person feeling stuck? What part of their day feels like a repetitive chore? How can we make their work feel lighter?"
            </Typography>

            <Typography variant="body1">
              This is what we call **Digital Craftsmanship**. It's the intentional design of systems that feel invisible because they work so seamlessly. They don't fight against the human; they flow with them.
            </Typography>
          </Box>

          <Box sx={{ mt: 10, bgcolor: 'secondary.main', color: 'background.paper', p: 6, borderRadius: 4, textAlign: 'center' }}>
            <Typography variant="h3" gutterBottom color="inherit">
              Need a smarter way to work?
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', mb: 4 }}>
              Let's look at your current workflows and find the friction points together.
            </Typography>
            <Link href="/contact" passHref>
              <Button variant="contained" size="large">
                Schedule a Consultation
              </Button>
            </Link>
          </Box>

          <Box sx={{ pt: 6 }}>
            <Link href="/blog" style={{ color: 'inherit', textDecoration: 'none' }}>
              <Typography variant="body2" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                ← Back to Journal
              </Typography>
            </Link>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
