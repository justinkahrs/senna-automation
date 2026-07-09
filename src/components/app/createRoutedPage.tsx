import type { ComponentType } from "react";
import MuiProviders from "@/components/app/MuiProviders";

export function createRoutedPage<Props extends Record<string, unknown>>(
  Page: ComponentType<Props>,
) {
  function RoutedPage({
    pathname: _pathname,
    ...pageProps
  }: Props & { pathname: string }) {
    return (
      <MuiProviders includeCssBaseline={false}>
        <Page {...(pageProps as Props)} />
      </MuiProviders>
    );
  }

  RoutedPage.displayName = `RoutedPage(${Page.displayName ?? Page.name ?? "Page"})`;

  return RoutedPage;
}
