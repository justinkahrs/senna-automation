"use client";

import { forwardRef, type ImgHTMLAttributes } from "react";

export interface StaticImageData {
  src: string;
  width: number;
  height: number;
  blurDataURL?: string;
}

type ImageSource = string | StaticImageData;

export interface ImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src: ImageSource;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
}

function resolveSrc(src: ImageSource) {
  return typeof src === "string" ? src : src.src;
}

const Image = forwardRef<HTMLImageElement, ImageProps>(function Image(
  { src, alt, fill = false, priority = false, style, sizes, ...props },
  ref,
) {
  const resolvedSrc = resolveSrc(src);

  if (fill) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        ref={ref}
        src={resolvedSrc}
        alt={alt}
        sizes={sizes}
        loading={priority ? "eager" : props.loading || "lazy"}
        fetchPriority={priority ? "high" : props.fetchPriority}
        {...props}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          ...style,
        }}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={resolvedSrc}
      alt={alt}
      sizes={sizes}
      loading={priority ? "eager" : props.loading || "lazy"}
      fetchPriority={priority ? "high" : props.fetchPriority}
      {...props}
      style={style}
    />
  );
});

export default Image;
