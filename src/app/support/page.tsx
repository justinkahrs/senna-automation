import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  TextField,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import ChatIcon from "@mui/icons-material/Chat";
import HelpIcon from "@mui/icons-material/Help";

export default function Support() {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        minHeight: { xs: "calc(100vh - 64px)", md: "calc(100vh - 64px)" },
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Support Center
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          sx={{ mb: 6 }}
        >
          We&apos;re here to help you succeed
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 4, height: "100%" }}>
              <Typography variant="h4" gutterBottom>
                Contact Support
              </Typography>
              <Box component="form" noValidate sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField required fullWidth label="Name" autoFocus />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField required fullWidth label="Email" type="email" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField required fullWidth label="Subject" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Message"
                      multiline
                      rows={4}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Send Message
                </Button>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 3,
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    "&:hover": { bgcolor: "action.hover" },
                  }}
                >
                  <EmailIcon
                    sx={{ fontSize: 40, color: "primary.main", mr: 2 }}
                  />
                  <Box>
                    <Typography variant="h6">Email Support</Typography>
                    <Typography variant="body2" color="text.secondary">
                      justin+support@justinkahrs.com
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 3,
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    "&:hover": { bgcolor: "action.hover" },
                  }}
                >
                  <ChatIcon
                    sx={{ fontSize: 40, color: "primary.main", mr: 2 }}
                  />
                  <Box>
                    <Typography variant="h6">Live Chat</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Available Monday-Friday, 9am-5pm EST
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 3,
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    "&:hover": { bgcolor: "action.hover" },
                  }}
                >
                  <HelpIcon
                    sx={{ fontSize: 40, color: "primary.main", mr: 2 }}
                  />
                  <Box>
                    <Typography variant="h6">Knowledge Base</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Browse our help articles and tutorials
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
