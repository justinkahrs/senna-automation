import {
  Box,
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
          >
            Work Doesn't Need To Feel This Manual
          </Typography>

        

          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ mt: 3, maxWidth: 800, mx: "auto" }}
          >
            Most businesses aren’t short on tools.
They’re short on time.

Between follow-ups, data entry, handoffs, and all the little things that pile up, a lot of work ends up being… just keeping things moving.

That’s where Senna Automation comes in.
          </Typography>
        </Container>
      </Box>

      {/* Why Choose Section - White background */}
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
            component="h2"
            align="center"
            color="text.primary"
            gutterBottom
            sx={{ fontWeight: 600, mb: 6 }}
          >
            Why Senna Automation?
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={6}>
              <Card sx={{ 
                height: "100%", 
                bgcolor: "background.paper",
                borderTop: '4px solid',
                borderColor: 'primary.main',
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
              }}>
                <CardContent sx={{ p: 4 }}>
                  <Stack spacing={3}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography
                        variant="h5"
                        sx={{ fontWeight: 700, color: "text.primary" }}
                      >
                        What this actually is
                      </Typography>
                    </Box>
                    
                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                      Not a big “AI transformation.” Not a complicated rebuild. Just a smarter way to handle the stuff that keeps repeating.
                    </Typography>

                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, textTransform: 'uppercase', letterSpacing: 1, color: 'primary.main' }}>
                        Things like:
                      </Typography>
                      <List disablePadding>
                        {[
                          "Leads getting followed up automatically",
                          "Data moving where it needs to go",
                          "Tasks getting assigned without chasing them down"
                        ].map((item) => (
                          <ListItem key={item} disableGutters sx={{ py: 0.2, display: 'list-item', ml: 3, listStyleType: 'disc', color: 'text.secondary' }}>
                            <ListItemText 
                              primary={item} 
                              primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }} 
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Box>

                    <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                      The goal isn’t to change how your business works. It’s to make it run a little smoother.
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card sx={{ 
                height: "100%", 
                bgcolor: "background.paper",
                borderTop: '4px solid',
                borderColor: 'primary.main',
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
              }}>
                <CardContent sx={{ p: 4 }}>
                  <Stack spacing={3}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography
                        variant="h5"
                        sx={{ fontWeight: 700, color: "text.primary" }}
                      >
                        Our approach
                      </Typography>
                    </Box>
                    
                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                      No black boxes. No endless meetings. We look at where you're losing time and build the simplest thing that solves it. 
                    </Typography>

                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                      Whether that’s a custom tool or just connecting your existing ones better, we focus on what gives you the most time back.
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{ mt: 'auto', pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                      We bring Silicon Valley expertise to Grand Rapids, making high-level automation accessible to teams of any size.
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
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
            {/* Contact Card (Left) */}
            <Grid item xs={12} md={5}>
              <Card sx={{ bgcolor: "background.paper", boxShadow: '0 10px 30px rgba(0,0,0,0.05)', borderRadius: 4 }}>
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

            {/* Story Text (Right) */}
            <Grid item xs={12} md={7}>
              <Typography
                variant="h4"
                component="h2"
                color="text.primary"
                gutterBottom
                sx={{ fontWeight: 600, mb: 4 }}
              >
                From Silicon Valley to Grand Rapids
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 3 }}
              >
                After working on automation in a startup environment, one thing became pretty clear. The systems that help larger companies stay efficient aren’t actually out of reach, they’re just usually overbuilt or not designed for how smaller teams operate. 
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 3 }}
              >
                A lot of businesses are dealing with the same kinds of problems—repetitive work, missed follow-ups, too many manual steps—but don’t have the time or resources to build something complex to fix it. 
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 3 }}
              >
                The focus here is bringing that same level of efficiency in a way that’s simpler, more practical, and actually fits how people already work. If you’ve ever found yourself thinking there has to be a better way to do this, there usually is. It just hasn’t been set up yet.
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
              >
                Whether you need a single workflow automated or a more complete system to handle your operations, we focus on making sure it’s useful, reliable, and easy to use.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>


    </>
  );
}
