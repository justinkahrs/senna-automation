import fs from 'fs';
import path from 'path';
import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';

export const alt = 'Senna Automation | AI Workflow Automation & Custom Software Development';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const interSemiBold = fs.readFileSync(
    path.join(process.cwd(), 'src/app/fonts/Inter-SemiBold.ttf')
  );

  const interBold = fs.readFileSync(
    path.join(process.cwd(), 'src/app/fonts/Inter-Bold.ttf')
  );

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#181925', // Space Indigo
          padding: '80px',
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
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(146, 220, 229, 0.2)', // Light Cyan border
            borderRadius: '24px',
            padding: '60px',
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            width: '100%',
            height: '100%',
          }}
        >
          {/* Logo Placeholder / Brand Name */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '40px',
            }}
          >
            <div
              style={{
                fontSize: 64,
                fontWeight: 800,
                color: '#FFFFFF',
                letterSpacing: '-2px',
                fontFamily: 'Inter',
              }}
            >
              SENNA
            </div>
            <div
              style={{
                fontSize: 64,
                fontWeight: 400,
                color: '#92dce5', // Light Cyan
                marginLeft: '15px',
                letterSpacing: '-1px',
                fontFamily: 'Inter',
              }}
            >
              AUTOMATION
            </div>
          </div>

          <div
            style={{
              fontSize: 32,
              fontWeight: 600,
              color: 'rgba(255, 255, 255, 0.7)',
              textAlign: 'center',
              maxWidth: '800px',
              lineHeight: 1.4,
              fontFamily: 'Inter',
            }}
          >
            AI Workflow Automation & Custom Software Development
          </div>

          <div
            style={{
              marginTop: '40px',
              display: 'flex',
              padding: '12px 24px',
              backgroundColor: '#8f006b', // Magenta
              borderRadius: '12px',
              color: '#FFFFFF',
              fontSize: 20,
              fontWeight: 700,
              fontFamily: 'Inter',
            }}
          >
            Transforming Business with AI
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
