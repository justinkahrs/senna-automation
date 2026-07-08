"use client";

import { forwardRef, type AnchorHTMLAttributes } from "react";

export interface LinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  prefetch?: boolean;
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
  passHref?: boolean;
}

const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  {
    href,
    children,
    prefetch: _prefetch,
    replace: _replace,
    scroll: _scroll,
    shallow: _shallow,
    passHref: _passHref,
    ...props
  },
  ref,
) {
  void _prefetch;
  void _replace;
  void _scroll;
  void _shallow;
  void _passHref;

  return (
    <a ref={ref} href={href} {...props}>
      {children}
    </a>
  );
});

export default Link;
