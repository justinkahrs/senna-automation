import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import CodeIcon from '@mui/icons-material/Code';
import BuildIcon from '@mui/icons-material/Build';
import SchoolIcon from '@mui/icons-material/School';

const docSections = [
  {
    title: 'Getting Started',
    description: 'Learn the basics of Senna Automation',
    icon: ArticleIcon,
    href: '/docs/getting-started',
  },
  {
    title: 'API Reference',
    description: 'Detailed API documentation',
    icon: CodeIcon,
    href: '/docs/api',
  },
  {
    title: 'Integration Guides',
    description: 'Connect with your favorite tools',
    icon: BuildIcon,
    href: '/docs/integrations',
  },
  {
    title: 'Tutorials',
    description: 'Step-by-step guides and examples',
    icon: SchoolIcon,
    href: '/docs/tutorials',
  },
];

export default function Documentation() {
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Documentation
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          sx={{ mb: 6 }}
        >
          Everything you need to know about Senna Automation
        </Typography>

        <Grid container spacing={4}>
          {docSections.map((section) => {
            const Icon = section.icon;
            return (
              <Grid item xs={12} sm={6} md={3} key={section.title}>
                <Paper
                  sx={{
                    p: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: 'action.hover',
                      transform: 'translateY(-4px)',
                      transition: 'all 0.3s ease-in-out',
                    },
                  }}
                  component="a"
                  href={section.href}
                >
                  <Icon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    {section.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {section.description}
                  </Typography>
                </Paper>
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </Box>
  );
}