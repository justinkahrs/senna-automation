import { ImageResponse } from "next/og";
import { blogPostsMetadata } from "@/utils/blog-data";

export const runtime = "edge";

export const alt = "Senna Automation Blog Post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const SITE_URL = "https://www.senna-automation.com";

function getPublicImageSrc(imagePath?: string) {
  if (!imagePath) return "";
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  return `${SITE_URL}${imagePath.startsWith("/") ? imagePath : `/${imagePath}`}`;
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPostsMetadata[slug];
  const title = post?.title || "Senna Automation Blog";
  const category = post?.category || "Automation";
  const subtitle =
    post?.heroSubtitle ||
    post?.subtitle ||
    post?.excerpt ||
    "Practical automation patterns for operational businesses.";
  const imageSrc = getPublicImageSrc(post?.image);

  const interSemiBold = await fetch(
    new URL(
      "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYMZg.ttf",
    ),
  ).then((res) => res.arrayBuffer());

  const interBold = await fetch(
    new URL(
      "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuDyYMZg.ttf",
    ),
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#181925",
          color: "#ffffff",
          fontFamily: "Inter",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "radial-gradient(circle at 92% 24%, rgba(143, 0, 107, 0.26) 0%, transparent 34%), radial-gradient(circle at 22% 92%, rgba(146, 220, 229, 0.12) 0%, transparent 38%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "linear-gradient(112deg, rgba(24, 25, 37, 0.96) 0%, rgba(24, 25, 37, 0.9) 46%, rgba(24, 25, 37, 0.72) 100%)",
          }}
        />

        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            display: "flex",
            padding: "72px 78px",
            gap: "58px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "56%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                color: "#92dce5",
                fontSize: 22,
                fontWeight: 800,
                letterSpacing: 2,
                textTransform: "uppercase",
                marginBottom: 30,
              }}
            >
              {category}
            </div>

            <div
              style={{
                display: "flex",
                color: "#ffffff",
                fontSize: title.length > 52 ? 54 : 60,
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: "-0.01em",
                marginBottom: 28,
              }}
            >
              {title}
            </div>

            <div
              style={{
                display: "flex",
                width: 78,
                height: 8,
                backgroundColor: "#8f006b",
                marginBottom: 26,
              }}
            />

            <div
              style={{
                display: "flex",
                color: "rgba(255, 255, 255, 0.78)",
                fontSize: 24,
                fontWeight: 600,
                lineHeight: 1.36,
                maxWidth: 560,
              }}
            >
              {subtitle}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: 42,
                fontSize: 25,
                fontWeight: 800,
              }}
            >
              <span style={{ color: "#ffffff" }}>SENNA</span>
              <span style={{ color: "#92dce5", marginLeft: 10 }}>AUTOMATION</span>
            </div>
          </div>

          <div
            style={{
              width: "38%",
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "100%",
                height: 404,
                borderRadius: 18,
                overflow: "hidden",
                border: "1px solid rgba(146, 220, 229, 0.24)",
                backgroundColor: "rgba(146, 220, 229, 0.12)",
                boxShadow: "0 30px 70px rgba(0, 0, 0, 0.34)",
              }}
            >
              {imageSrc ? (
                <img
                  src={imageSrc}
                  alt={title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    background:
                      "linear-gradient(135deg, rgba(146, 220, 229, 0.22), rgba(143, 0, 107, 0.3))",
                  }}
                />
              )}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                color: "#8f006b",
                fontSize: 24,
                fontWeight: 800,
                marginTop: 28,
              }}
            >
              read more →
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Inter",
          data: interSemiBold,
          style: "normal",
          weight: 600,
        },
        {
          name: "Inter",
          data: interBold,
          style: "normal",
          weight: 800,
        },
      ],
    },
  );
}
