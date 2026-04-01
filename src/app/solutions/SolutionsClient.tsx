"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import CascadingStagger from "@/components/animations/CascadingStagger";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ScheduleCallButton from "@/components/ScheduleCallButton";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { BlogPost } from "@/utils/blog";
import { WARM_BLACK } from "@/components/theme/colors";
import OrganicHighlight from "@/components/OrganicHighlight";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Solution {
  title: string;
  problem: string;
  solution: string;
  outcomes: string[];
  category?: string;
  video?: string;
  latestPost?: Omit<BlogPost, "content"> | null;
}

interface SolutionsClientProps {
  solutions: Solution[];
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

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

const SolutionCard = ({
  item,
  index,
  isDesktop = false,
  cardSx,
  forceLayout, // New prop to control side order
}: {
  item: Solution;
  index: number;
  isDesktop?: boolean;
  cardSx?: Record<string, unknown>;
  forceLayout?: "left" | "right";
}) => {
  const layoutIndex =
    forceLayout === "left" ? 0 : forceLayout === "right" ? 1 : index;

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      sx={{
        bgcolor: "background.paper",
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        overflow: "hidden",
        boxShadow: "0 20px 60px rgba(0,0,0,0.04)",
        position: "relative",
        height: isDesktop ? "auto" : "100%",
        minHeight: isDesktop ? { sm: 580, md: 620, lg: 680 } : undefined,
        display: "flex",
        flexDirection: "column",
        ...(cardSx || {}),
      }}
    >
      <Grid container spacing={0} sx={{ flexGrow: 1 }}>
        {/* Content Side */}
        <Grid
          item
          xs={12}
          md={5}
          order={{ xs: 2, md: layoutIndex % 2 === 0 ? 1 : 2 }}
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              p: { xs: 4, md: 6, lg: 8 },
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
            >
              <Typography
                variant="h3"
                component="h3"
                sx={{
                  mb: 3,
                  lineHeight: 1.2,
                  fontSize: { xs: "1.75rem", md: "2.25rem" },
                }}
              >
                {item.title}
              </Typography>
            </motion.div>

            <Stack spacing={4}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.5 }}
              >
                <Box>
                  <Typography
                    variant="overline"
                    sx={{
                      color: "primary.main",
                      fontWeight: 800,
                      letterSpacing: 1.5,
                      display: "block",
                      mb: 1,
                    }}
                  >
                    The Problem
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}
                  >
                    {item.problem}
                  </Typography>
                </Box>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Box>
                  <Typography
                    variant="overline"
                    sx={{
                      color: "primary.main",
                      fontWeight: 800,
                      letterSpacing: 1.5,
                      display: "block",
                      mb: 1,
                    }}
                  >
                    The Solution
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {item.solution}
                  </Typography>
                </Box>
              </motion.div>

              <Box>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.5 }}
                >
                  <Typography
                    variant="overline"
                    sx={{
                      color: "primary.main",
                      fontWeight: 800,
                      letterSpacing: 1.5,
                      display: "block",
                      mb: 1,
                    }}
                  >
                    Key Outcomes
                  </Typography>
                </motion.div>
                <Stack spacing={1.5} sx={{ mt: 1 }}>
                  {item.outcomes.map((outcome, idx) => (
                    <Box
                      key={outcome}
                      component={motion.div}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + idx * 0.05, duration: 0.4 }}
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 1.5,
                      }}
                    >
                      <CheckCircleOutlineIcon
                        sx={{
                          fontSize: 22,
                          color: "primary.main",
                          mt: 0.3,
                        }}
                      />
                      <Typography
                        variant="body1"
                        sx={{
                          color: "text.primary",
                          fontWeight: 600,
                        }}
                      >
                        {outcome}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>

              {item.latestPost && (
                <Box
                  sx={{ pt: 2 }}
                  component={motion.div}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <Button
                    component={Link}
                    href={`/blog/${item.latestPost.slug}`}
                    variant="outlined"
                    size="large"
                    sx={{
                      borderColor: "divider",
                      color: "text.primary",
                      "&:hover": {
                        borderColor: "primary.main",
                        bgcolor: "transparent",
                      },
                    }}
                  >
                    Read the Case Study
                  </Button>
                </Box>
              )}
            </Stack>
          </Box>
        </Grid>

        {/* Visualization Side */}
        <Grid
          item
          xs={12}
          md={7}
          order={{ xs: 1, md: layoutIndex % 2 === 0 ? 2 : 1 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            borderLeft: {
              md: layoutIndex % 2 === 0 ? "1px solid" : "none",
            },
            borderRight: {
              md: layoutIndex % 2 !== 0 ? "1px solid" : "none",
            },
            borderColor: "divider",
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              width: "100%",
              height: "100%",
              minHeight: { xs: 300, md: "100%" },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
              bgcolor: "#FBFBFB",
            }}
          >
            {item.video ? (
              <motion.div
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{
                  width: "90%",
                  height: "90%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  src={item.video}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    width: "auto",
                    height: "auto",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              </motion.div>
            ) : (
              <>
                <motion.p
                  initial={{ opacity: 0, letterSpacing: 0 }}
                  animate={{ opacity: 1, letterSpacing: 2 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  style={{
                    color: "var(--text-muted)",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    zIndex: 1,
                    margin: 0,
                  }}
                >
                  Solution Visualization
                </motion.p>
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    opacity: 0.04,
                    background: `radial-gradient(circle at 2px 2px, ${WARM_BLACK} 1px, transparent 0)`,
                    backgroundSize: "32px 32px",
                  }}
                />
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

const DesktopScrollytelling = ({ solutions }: { solutions: Solution[] }) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for up, 1 for down

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || solutions.length === 0) return;

    setActiveIndex(0);

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1280px) and (min-height: 800px)", () => {
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () =>
          `+=${Math.round(
            window.innerHeight * Math.max(solutions.length * 1.5, 2),
          )}`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 0.5,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const nextIndex = Math.min(
            solutions.length - 1,
            Math.floor(progress * solutions.length),
          );

          setActiveIndex((prev) => {
            if (nextIndex !== prev) {
              setDirection(nextIndex > prev ? 1 : -1);
              return nextIndex;
            }
            return prev;
          });
        },
      });

      return () => {
        trigger.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, [solutions.length]);

  const variants = {
    initial: (direction: number) => ({
      opacity: 0,
      y: direction > 0 ? 60 : -60,
      scale: 0.98,
    }),
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1], // Ease out quint
        staggerChildren: 0.1,
      },
    },
    exit: (direction: number) => ({
      opacity: 0,
      y: direction > 0 ? -60 : 60,
      scale: 0.98,
      transition: {
        duration: 0.5,
        ease: [0.7, 0, 0.84, 0], // Ease in quad
      },
    }),
  };

  return (
    <Box
      sx={{
        display: { xs: "none", lg: "block" },
        py: { sm: 8, md: 12, lg: 16 },
        bgcolor: "background.default",
        position: "relative",
        overflow: "visible",
        isolation: "isolate",
      }}
    >
      <Container maxWidth="lg">
        <Box
          ref={sectionRef}
          sx={{
            position: "relative",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: { lg: 4, xl: 5 },
            }}
          >
            <Typography variant="h3" component="h2" align="center">
              Common problems we solve
            </Typography>
          </Box>

          <Box
            sx={{
              position: "relative",
              height: { lg: 620, xl: 720 },
              width: "100%",
              maxWidth: 1140,
              mx: "auto",
            }}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                }}
              >
                <SolutionCard
                  item={solutions[activeIndex]}
                  index={activeIndex}
                  isDesktop
                  forceLayout="left" // Keep layout consistent in scrollytelling
                  cardSx={{
                    height: "100%",
                    boxShadow: "0 28px 80px rgba(0,0,0,0.08)",
                  }}
                />
              </motion.div>
            </AnimatePresence>

            {/* Progress Indicator */}
            <Box
              sx={{
                position: "absolute",
                right: -40,
                top: "50%",
                transform: "translateY(-50%)",
                display: "flex",
                flexDirection: "column",
                gap: 2,
                zIndex: 10,
              }}
            >
              {solutions.map((_, idx) => (
                <Box
                  key={idx}
                  sx={{
                    width: 4,
                    height: idx === activeIndex ? 32 : 12,
                    bgcolor: idx === activeIndex ? "primary.main" : "divider",
                    borderRadius: 2,
                    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default function SolutionsClient({ solutions }: SolutionsClientProps) {
  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <Box
        component="section"
        sx={{
          bgcolor: "secondary.main",
          color: "background.paper",
          pt: { xs: 12, md: 20 },
          pb: { xs: 10, md: 16 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle noise texture */}
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
        <Container
          maxWidth="md"
          sx={{ position: "relative", zIndex: 1, textAlign: "center" }}
        >
          <Box sx={{ maxWidth: "900px", mx: "auto" }}>
            <Typography
              component="h1"
              variant="h1"
              sx={{ mb: 2, color: "inherit" }}
            >
              Solve the work that slows you down
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                color: "rgba(255,255,255,0.7)",
                mb: 4,
              }}
            >
              Real-world automation for the repetitive work that drains time,
              slows follow-up, and makes growth harder than it should be.
            </Typography>
            <Button
              component={Link}
              href="/contact"
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
            >
              Get Your Automation Plan
            </Button>
          </Box>
        </Container>
      </Box>

      <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: "background.paper" }}>
        <Container maxWidth="md" sx={{ textAlign: "left" }}>
          <Typography
            variant="h4"
            component="h2"
            color="text.primary"
            sx={{ maxWidth: 720, lineHeight: 1.35 }}
          >
            <OrganicHighlight>
              Most bottlenecks look more familiar than you think.
            </OrganicHighlight>{" "}
            Too much admin work, inconsistent follow-up, messy handoffs, and not
            enough visibility.
          </Typography>
        </Container>
      </Box>

      {/* Desktop Scrollytelling */}
      <DesktopScrollytelling solutions={solutions} />

      {/* Mobile Linear Stack */}
      <Box
        sx={{
          py: 6,
          display: { xs: "block", lg: "none" },
          bgcolor: "background.default",
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" align="center" sx={{ mb: 6 }}>
            Common problems we solve
          </Typography>
          <Stack spacing={4}>
            {solutions.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
              >
                <SolutionCard item={item} index={index} />
              </motion.div>
            ))}
          </Stack>
        </Container>
      </Box>

      <Box
        sx={{
          py: { xs: 8, md: 12 },
          bgcolor: "background.paper",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={8}>
            <Grid item xs={12} md={4}>
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  mb: 2,
                  fontSize: { xs: "2.2rem", md: "3rem" },
                  fontWeight: 700,
                  lineHeight: 1.1,
                }}
              >
                Frequently asked questions
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ fontSize: "1.1rem", maxWidth: 320 }}
              >
                A few common questions teams ask before they start automating
                their workflows.
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <CascadingStagger spacing={2}>
                {faqs.map((faq) => (
                  <Accordion
                    key={faq.question}
                    disableGutters
                    slotProps={{ transition: { timeout: 140 } }}
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
                      <Typography variant="h5" color="text.primary">
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
              </CascadingStagger>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box
        sx={{
          bgcolor: "secondary.main",
          color: "background.paper",
          py: { xs: 8, md: 12 },
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Texture overlay */}
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
        <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
          <Typography variant="h2" sx={{ mb: 2, color: "inherit" }}>
            See what you can automate
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: "rgba(255,255,255,0.7)",
              mb: 4,
            }}
          >
            Start with a quick 30-minute conversation about where time is being
            lost and what feels most repetitive. We will identify practical
            opportunities and map out the best place to start.
          </Typography>
          <Stack spacing={2} alignItems="center">
            <ScheduleCallButton
              text="Book a Demo"
              size="large"
              inverse
              sx={{ px: 6 }}
              showIcon={false}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                color: "rgba(255,255,255,0.55)",
              }}
            >
              <Typography variant="caption" sx={{ color: "inherit" }}>
                via
              </Typography>
              <Box
                component="img"
                src="/Calendly.svg"
                alt="Calendly"
                sx={{
                  height: "0.95rem",
                  width: "auto",
                  opacity: 0.9,
                  filter: "brightness(0) invert(1)",
                  mt: "3px",
                }}
              />
            </Box>
            <Typography
              variant="caption"
              sx={{ color: "rgba(255,255,255,0.4)" }}
            >
              Prefer a form?{" "}
              <Button
                component={Link}
                href="/contact"
                variant="text"
                size="small"
                sx={{
                  color: "rgba(255,255,255,0.5)",
                  p: 0,
                  minWidth: 0,
                  textDecoration: "underline",
                  fontSize: "inherit",
                }}
              >
                Contact us
              </Button>
            </Typography>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
