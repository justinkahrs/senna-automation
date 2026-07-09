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

function resolveDimensions(src: ImageSource) {
  if (typeof src === "string") {
    return {
      width: undefined,
      height: undefined,
    };
  }

  return {
    width: src.width,
    height: src.height,
  };
}

const Image = forwardRef<HTMLImageElement, ImageProps>(function Image(
  { src, alt, fill = false, priority = false, style, sizes, decoding, ...props },
  ref,
) {
  const resolvedSrc = resolveSrc(src);
  const resolvedDimensions = resolveDimensions(src);
  const width = props.width ?? resolvedDimensions.width;
  const height = props.height ?? resolvedDimensions.height;

  if (fill) {
    return (
      <img
        ref={ref}
        src={resolvedSrc}
        alt={alt}
        sizes={sizes}
        decoding={decoding ?? "async"}
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
    <img
      ref={ref}
      src={resolvedSrc}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      decoding={decoding ?? "async"}
      loading={priority ? "eager" : props.loading || "lazy"}
      fetchPriority={priority ? "high" : props.fetchPriority}
      {...props}
      style={style}
    />
  );
});

export default Image;
