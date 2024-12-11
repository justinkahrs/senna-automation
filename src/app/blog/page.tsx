import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, CardActionArea } from '@mui/material';

const blogPosts = [
  {
    title: 'Getting Started with Automation',
    description: 'Learn the basics of workflow automation and how it can transform your business processes.',
    image: '/globe.svg',
    date: 'March 15, 2024',
    readTime: '5 min read',
    slug: 'getting-started-with-automation',
  },
  {
    title: 'Best Practices for Workflow Design',
    description: 'Discover the key principles for designing efficient and scalable automation workflows.',
    image: '/window.svg',
    date: 'March 10, 2024',
    readTime: '7 min read',
    slug: 'workflow-design-best-practices',
  },
  // Add more blog posts as needed
];

export default function Blog() {
  return (
    <Box sx={{
      py: { xs: 8, md: 12 },
      minHeight: { xs: 'calc(100vh - 64px)', md: 'calc(100vh - 64px)' },
      display: 'flex',
      alignItems: 'center'
    }}>
      <Container maxWidth="lg">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Blog
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          sx={{ mb: 6 }}
        >
          Insights, updates, and best practices for automation
        </Typography>

        <Grid container spacing={4}>
          {blogPosts.map((post) => (
            <Grid item key={post.slug} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    transition: 'all 0.3s ease-in-out',
                  },
                }}
              >
                <CardActionArea href={`/blog/${post.slug}`}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={post.image}
                    alt={post.title}
                    sx={{ bgcolor: 'background.paper' }}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="h2"
                    >
                      {post.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      {post.description}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: 'flex', justifyContent: 'space-between' }}
                    >
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}