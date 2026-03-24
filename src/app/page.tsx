import RequestFormButton from "@/components/RequestFormButton";
import ScheduleCallButton from "@/components/ScheduleCallButton";
import SeeProductsButton from "@/components/SeeProductsButton";
import AnimatedHeroTitle from "@/components/AnimatedHeroTitle";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const faqs = [
  {
    question: "Who is this a good fit for?",
    answer:
      "This is for businesses that feel slowed down by repetitive tasks, manual processes, or inconsistent follow-up. It works well for teams that want to save time, stay organized, and keep things moving without adding more overhead.",
  },
  {
    question: "What challenges does this help address?",
    answer:
      "It reduces time spent on repetitive work, prevents things from slipping through the cracks, and helps leads and tasks move forward without constant manual effort. The goal is smoother operations and more consistency across the board.",
  },
  {
    question: "What types of work can be automated?",
    answer:
      "Common examples include lead capture and follow-up, scheduling, onboarding, data entry, reporting, approvals, notifications, and internal workflows. If something is repetitive or rule-based, it can likely be automated.",
  },
  {
    question: "Do you offer chatbot or AI assistant solutions?",
    answer:
      "Yes, when it makes sense. Chat-based tools can help with lead qualification, answering common questions, or guiding users through a process. The focus is always on usefulness, not just adding a chatbot for the sake of it.",
  },
  {
    question: "Can this work with the tools already in use?",
    answer:
      "Yes. Most systems can connect with tools already in use, such as CRMs, email platforms, scheduling tools, and internal systems. The goal is to improve what’s already there, not replace everything.",
  },
  {
    question: "Is technical experience required to manage it?",
    answer:
      "No. Everything is set up to be simple and easy to manage. Once it’s in place, it should feel like part of the normal workflow, not something that requires technical expertise.",
  },
  {
    question: "Is it possible to start with a smaller scope?",
    answer:
      "Yes. Many projects start with one workflow or a single problem area. That makes it easy to see value quickly before expanding into other areas.",
  },
  {
    question: "What does getting started look like?",
    answer:
      "Start with a quick conversation about current workflows and where time is being lost. From there, it’s easy to identify a few opportunities to automate and outline what that would look like.",
  },
];

export default function Home() {
  return (
    <>
      <Box
        component="section"
        aria-labelledby="hero-heading"
        sx={{
          bgcolor: "background.default",

          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={4} alignItems="center">
            <AnimatedHeroTitle />
            <Typography
              id="hero-description"
              variant="h5"
              align="center"
              component="h2"
              color="text.secondary"
              sx={{
                mb: 6,
                mx: "auto",
                maxWidth: 800,
              }}
            >
              Support your team with systems that handle the repetitive work.
              So they can focus on the work that moves things forward.
            </Typography>
            <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
              <Stack spacing={2} sx={{ textAlign: "center", width: 300 }}>
                <ScheduleCallButton
                  fullWidth
                  size="large"
                  text="Schedule Call"
                  aria-label="Schedule a consultation call with our AI automation experts"
                />
                <SeeProductsButton
                  fullWidth
                  size="large"
                  text="See Products"
                  aria-label="View our AI automation and software development products"
                />
                <RequestFormButton
                  fullWidth
                  size="large"
                  text="Custom Request"
                  aria-label="Submit a custom project request"
                />
              </Stack>
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* Why Choose Section - Visually separated with white background */}
      <Box
        component="section"
        sx={{
          bgcolor: "#ffffff",
          py: { xs: 8, md: 12 },
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            component="h3"
            align="center"
            color="text.primary"
            gutterBottom
            sx={{ mb: 4 }}
          >
            Why Choose Senna Automation for Your AI Transformation?
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ maxWidth: 900, mx: "auto" }}
          >
            <strong>
              Senna Automation specializes in AI workflow automation and custom
              software development
            </strong>
            , helping businesses in Grand Rapids, Michigan and beyond harness
            the power of artificial intelligence. From{" "}
            <strong>business AI integration</strong> and{" "}
            <strong>chatbot development</strong> to{" "}
            <strong>process automation consulting</strong> and{" "}
            <strong>enterprise AI solutions</strong>, we deliver tailored
            solutions that drive real business results.
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ mt: 3, maxWidth: 900, mx: "auto" }}
          >
            Our expertise spans <strong>custom web app development</strong>,{" "}
            <strong>modern web development</strong>,{" "}
            <strong>high-performance websites</strong>, and{" "}
            <strong>SEO-optimized websites</strong> that help your business
            stand out online. Whether you need{" "}
            <strong>B2B AI consulting</strong>,{" "}
            <strong>digital transformation AI</strong> strategies, or end-to-end
            workflow automation, our team delivers measurable outcomes including
            reduced operational costs, improved efficiency, and enhanced
            customer experiences.
          </Typography>
        </Container>
      </Box>

      <Box
        component="section"
        sx={{
          bgcolor: "background.paper",
          py: { xs: 8, md: 12 },
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h3"
            component="h2"
            align="center"
            color="text.primary"
            sx={{ mb: 2 }}
          >
            Frequently asked questions
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ maxWidth: 720, mx: "auto", mb: 5 }}
          >
            A few common questions teams ask before they start automating their
            workflows.
          </Typography>
          <Stack spacing={2}>
            {faqs.map((faq) => (
              <Accordion
                key={faq.question}
                disableGutters
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 2,
                  boxShadow: "none",
                  "&:before": {
                    display: "none",
                  },
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6" color="text.primary">
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ pt: 0 }}>
                  <Typography variant="body1" color="text.secondary">
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Stack>
        </Container>
      </Box>
    </>
  );
}
