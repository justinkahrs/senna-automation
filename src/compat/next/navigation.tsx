"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const PathnameContext = createContext("/");

export function PathnameProvider({
  pathname,
  children,
}: {
  pathname: string;
  children: React.ReactNode;
}) {
  const [currentPathname, setCurrentPathname] = useState(pathname);

  useEffect(() => {
    setCurrentPathname(window.location.pathname);

    const handleNavigation = () => {
      setCurrentPathname(window.location.pathname);
    };

    window.addEventListener("popstate", handleNavigation);
    document.addEventListener(
      "astro:after-swap",
      handleNavigation as EventListener,
    );
    document.addEventListener(
      "astro:page-load",
      handleNavigation as EventListener,
    );

    return () => {
      window.removeEventListener("popstate", handleNavigation);
      document.removeEventListener(
        "astro:after-swap",
        handleNavigation as EventListener,
      );
      document.removeEventListener(
        "astro:page-load",
        handleNavigation as EventListener,
      );
    };
  }, []);

  useEffect(() => {
    setCurrentPathname(pathname);
  }, [pathname]);

  return (
    <PathnameContext.Provider value={currentPathname}>
      {children}
    </PathnameContext.Provider>
  );
}

export function usePathname() {
  return useContext(PathnameContext);
}

export function useRouter() {
  return useMemo(
    () => ({
      push(href: string) {
        window.location.assign(href);
      },
      replace(href: string) {
        window.location.replace(href);
      },
      back() {
        window.history.back();
      },
      forward() {
        window.history.forward();
      },
      refresh() {
        window.location.reload();
      },
      async prefetch() {},
    }),
    [],
  );
}

export class RedirectError extends Error {
  location: string;

  constructor(location: string) {
    super(`Redirect to ${location}`);
    this.location = location;
  }
}

export class NotFoundError extends Error {
  constructor() {
    super("Not Found");
  }
}

export function redirect(location: string): never {
  throw new RedirectError(location);
}

export function notFound(): never {
  throw new NotFoundError();
}
