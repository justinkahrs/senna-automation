import { ImageResponse } from 'next/og';
import { blogPostsMetadata } from '@/utils/blog-data';

// Use edge runtime for better performance and to avoid Webpack chunking errors in Node.js runtime
export const runtime = 'edge';

export const alt = 'Senna Automation Blog';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Use the static manifest to avoid fs access in edge runtime
  const post = blogPostsMetadata[slug] || {
    title: "Senna Automation Insights",
    category: "Automation",
    excerpt: "Transforming business through intelligent AI workflow automation."
  };

  // Fetch fonts via HTTP (supported in edge)
  const interSemiBold = await fetch(
    new URL('https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYMZg.ttf')
  ).then((res) => res.arrayBuffer());

  const interBold = await fetch(
    new URL('https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuDyYMZg.ttf')
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundColor: '#181925', // Space Indigo
          padding: '80px',
          position: 'relative',
        }}
      >
        {/* Background Accent Gradient Overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 100% 0%, rgba(143, 0, 107, 0.15) 0%, transparent 50%), radial-gradient(circle at 0% 100%, rgba(143, 0, 107, 0.1) 0%, transparent 50%)',
            display: 'flex',
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            position: 'relative',
          }}
        >
          {/* Category Tag */}
          <div
            style={{
              display: 'flex',
              padding: '8px 16px',
              backgroundColor: 'rgba(146, 220, 229, 0.15)', // Light Cyan tinted
              borderRadius: '8px',
              color: '#92dce5', // Light Cyan
              fontSize: 20,
              fontWeight: 700,
              fontFamily: 'Inter',
              marginBottom: '24px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            {post.category}
          </div>

          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: '#FFFFFF',
              lineHeight: 1.1,
              fontFamily: 'Inter',
              marginBottom: '0px',
              maxWidth: '960px',
            }}
          >
            {post.title}
          </div>
        </div>

        {/* Footer Brand Area */}
        <div
          style={{
            position: 'absolute',
            bottom: '80px',
            left: '80px',
            right: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '32px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: 32, fontWeight: 800, color: '#FFFFFF', fontFamily: 'Inter' }}>SENNA</span>
            <span style={{ fontSize: 32, fontWeight: 400, color: '#92dce5', marginLeft: '10px', fontFamily: 'Inter' }}>AUTOMATION</span>
          </div>
          <div style={{ fontSize: 24, fontWeight: 600, color: '#8f006b', fontFamily: 'Inter' }}>
            read more →
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Inter',
          data: interSemiBold,
          style: 'normal',
          weight: 600,
        },
        {
          name: 'Inter',
          data: interBold,
          style: 'normal',
          weight: 800,
        },
      ],
    }
  );
}
