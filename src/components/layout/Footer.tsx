import { Box, Container, Grid, Typography, Link, IconButton } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";

const footerLinkGroups = [
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Senna Blog", href: "/blog" },
      { label: "Services", href: "/services" },
      { label: "Solutions", href: "/solutions" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    heading: "Explore",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 10,
        px: 2,
        mt: "auto",
        backgroundColor: "secondary.main",
        color: "background.paper",
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Subtle texture overlay */}
      <Box 
        sx={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          opacity: 0.02,
          backgroundImage: 'url("https://www.transparenttextures.com/patterns/dark-matter.png")',
          pointerEvents: 'none'
        }} 
      />
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={8}>
          <Grid item xs={12} md={4}>
            <Typography variant="h5" color="inherit" gutterBottom sx={{ fontWeight: 600 }}>
              Senna Automation LLC
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mb: 0.5 }}>
              Grand Rapids, MI
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mb: 2 }}>
              (616) 287-3360
            </Typography>
          </Grid>
          {footerLinkGroups.map((group) => (
            <Grid item xs={12} sm={4} md={2} key={group.heading}>
              <Typography
                variant="overline"
                sx={{ color: 'primary.light', display: "block", mb: 3 }}
              >
                {group.heading}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                {group.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    sx={{ 
                      color: 'rgba(255,255,255,0.6)', 
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                      '&:hover': { color: '#FFFFFF' }
                    }}
                  >
                    <Typography variant="body2" color="inherit">
                      {link.label}
                    </Typography>
                  </Link>
                ))}
              </Box>
            </Grid>
          ))}
          <Grid item xs={12} sm={4} md={2}>
            <Typography
              variant="overline"
              sx={{ color: 'primary.light', display: "block", mb: 3 }}
            >
              Socials
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <IconButton 
                component="a" 
                href="https://linkedin.com/company/senna-automation" 
                target="_blank" 
                rel="noopener noreferrer"
                sx={{ 
                  color: 'rgba(255,255,255,0.6)',
                  p: 0,
                  '&:hover': { color: 'primary.light' }
                }}
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton 
                component="a" 
                href="https://instagram.com/sennaautomation" 
                target="_blank" 
                rel="noopener noreferrer"
                sx={{ 
                  color: 'rgba(255,255,255,0.6)',
                  p: 0,
                  '&:hover': { color: 'primary.light' }
                }}
              >
                <InstagramIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Box 
          sx={{ 
            mt: 10, 
            pt: 4, 
            borderTop: '1px solid rgba(255,255,255,0.06)', 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
            color: 'rgba(255,255,255,0.4)'
          }}
        >
          <Typography variant="body2" color="inherit">
            © {new Date().getFullYear()} Senna Automation LLC.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link href="/privacy" sx={{ color: 'inherit', textDecoration: 'none', '&:hover': { color: '#FFF' } }}>
              <Typography variant="body2">Privacy</Typography>
            </Link>
            <Link href="/terms" sx={{ color: 'inherit', textDecoration: 'none', '&:hover': { color: '#FFF' } }}>
              <Typography variant="body2">Terms</Typography>
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
