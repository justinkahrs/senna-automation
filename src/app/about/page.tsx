import Link from "next/link";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { List, ListItem, ListItemText } from "@mui/material";

export default function About() {
  return (
    <>
      {/* Hero Section */}
      <Box
        component="section"
        sx={{
          bgcolor: "background.default",
          py: { xs: 8, md: 12 },
        }}
      >
        <Container maxWidth="lg">
          <Typography
            component="h1"
            variant="h3"
            align="center"
            color="text.primary"
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            Welcome to Senna Automation
          </Typography>

          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            sx={{ mt: 2, maxWidth: 800, mx: "auto", fontWeight: 400 }}
          >
            We’re glad you’re here.
          </Typography>
        </Container>
      </Box>



      {/* Story & Contact Section - Default background */}
      <Box
        component="section"
        sx={{
          bgcolor: "background.default",
          py: { xs: 8, md: 12 },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems="center">
            {/* Story Text (Left) */}
            <Grid item xs={12} md={7}>
              <Typography
                variant="h4"
                component="h2"
                color="text.primary"
                gutterBottom
                sx={{ fontWeight: 700, mb: 4 }}
              >
                Work doesn’t need to feel this manual.
              </Typography>

              <Typography variant="body1" color="text.secondary" sx={{ mb: 3, fontSize: "1.1rem", lineHeight: 1.8 }}>
                Most businesses aren’t short on tools, they’re short on time. Between follow-ups, data entry, handoffs, and everything else that piles up, a lot of the day ends up being spent just keeping things moving.
              </Typography>

              <Typography variant="body1" color="text.primary" sx={{ mb: 0, fontWeight: 700, fontSize: "1.2rem" }}>
                Senna Automation helps take that off your plate.
              </Typography>
            </Grid>

            <Grid item xs={12} md={5}>
              <Card 
                sx={{ 
                  bgcolor: "background.paper", 
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 4,
                  boxShadow: 'none',
                  transition: 'none',
                  '&:hover': {
                    bgcolor: 'background.paper',
                    boxShadow: 'none',
                    transform: 'none'
                  }
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Stack spacing={2} alignItems="center">
                    <LocationOnIcon sx={{ fontSize: 48, color: "primary.main" }} />
                    <Typography
                      variant="h5"
                      component="h2"
                      align="center"
                      gutterBottom
                      sx={{ fontWeight: 600, color: "text.primary" }}
                    >
                      Senna Automation
                    </Typography>
                    <Typography
                      variant="body1"
                      align="center"
                      color="text.secondary"
                    >
                      AI Automation & Custom Software Development
                    </Typography>
                    <Typography
                      variant="body1"
                      align="center"
                      color="text.secondary"
                    >
                      Serving Grand Rapids, Michigan and businesses nationwide
                    </Typography>
                    <Typography
                      variant="body2"
                      align="center"
                      color="text.secondary"
                      sx={{ mt: 2 }}
                    >
                      (616) 287-3360
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Story Continuation Block */}
          <Box sx={{ mt: 10, textAlign: 'left', maxWidth: '800px', mx: 'auto' }}>
            <Stack spacing={4}>
              <Typography variant="body1" color="text.secondary" sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}>
                We're a full-stack automation and workflow consulting agency based in Grand Rapids, Michigan. Our approach to comes from over 15 years in software development and working with automation long before it was something everyone had an opinion about. 
              </Typography>

              <Typography variant="body1" color="text.secondary" sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}>
                We focus on making the repetitive parts of your business run on their own. Not a big overhaul. Not a complicated rebuild. Just smarter systems that fit into how you already work. Leads get followed up, data goes where it needs to go, and tasks don’t sit around waiting for someone to notice them.
              </Typography>

              <Typography variant="body1" color="text.secondary" sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}>
                At the end of the day, this is about making work feel lighter. Fewer things slipping through the cracks, less time spent on routine tasks, and more time for the work that actually matters.
              </Typography>

              <Box 
                sx={{ 
                  mt: 10, 
                  py: 8, 
                  px: { xs: 4, md: 8 }, 
                  bgcolor: 'text.primary', 
                  borderRadius: 4,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                }}
              >
                <Typography 
                  variant="h3" 
                  sx={{ 
                    fontSize: { xs: "1.75rem", md: "2.5rem" }, 
                    lineHeight: 1.2,
                    color: 'background.paper',
                    fontWeight: 800,
                    textAlign: 'center',
                    mb: 5
                  }}
                >
                  If you’ve ever thought, ‘<Box component="span" sx={{ fontStyle: 'italic', fontWeight: 700 }}>there has to be a better way to do this,</Box>’ there probably is. It just hasn’t been set up yet.
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Link href="/contact" passHref>
                    <Button 
                      variant="outlined" 
                      size="large"
                      sx={{ 
                        color: 'background.paper', 
                        borderColor: 'background.paper',
                        borderRadius: '50px',
                        px: 6,
                        py: 2,
                        fontWeight: 'bold',
                        fontSize: '1.2rem',
                        '&:hover': {
                          borderColor: 'background.paper',
                          bgcolor: 'rgba(255,255,255,0.1)'
                        }
                      }}
                    >
                      Let's fix that
                    </Button>
                  </Link>
                </Box>
              </Box>
            </Stack>
          </Box>
        </Container>
      </Box>


    </>
  );
}
