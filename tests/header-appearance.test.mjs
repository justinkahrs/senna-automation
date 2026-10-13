import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync, readdirSync } from 'node:fs';
import { getHeaderAppearance } from '../src/components/layout/headerAppearance.ts';

test('all hero colors stay opaque unless the page explicitly opts into overlay', () => {
  for (const heroSurface of ['light', 'dark']) {
    for (const scrolled of [false, true]) {
      for (const menuOpen of [false, true]) {
        for (const headerMode of [undefined, 'solid', 'hero-overlay']) {
          const result = getHeaderAppearance({ heroSurface, scrolled, menuOpen, headerMode });
          const overlay = headerMode === 'hero-overlay' && !scrolled && !menuOpen;
          assert.deepEqual(result, { isOverlay: overlay, isDarkHeader: overlay && heroSurface === 'dark' });
        }
      }
    }
  }
});

test('closing menu and returning to top restores only an opted-in overlay', () => {
  for (const headerMode of ['solid', 'hero-overlay']) {
    const states = [false, true, false].map(scrolled =>
      getHeaderAppearance({ headerMode, heroSurface: 'dark', scrolled, menuOpen: false }).isOverlay);
    assert.deepEqual(states, headerMode === 'solid' ? [false, false, false] : [true, false, true]);
  }
});

test('every active RouteShell declares hero contrast; ads keep the solid default', () => {
  const pages = new URL('../src/pages/', import.meta.url);
  for (const entry of readdirSync(pages, { recursive: true })) {
    if (!entry.endsWith('.astro')) continue;
    const source = readFileSync(new URL(entry, pages), 'utf8');
    for (const shell of source.matchAll(/<RouteShell\b[^>]*>/g)) {
      assert.match(shell[0], /heroSurface="(?:light|dark)"/, entry);
    }
  }
  const ads = readFileSync(new URL('../src/pages/ads/[adSlug].astro', import.meta.url), 'utf8');
  assert.doesNotMatch(ads, /headerMode="hero-overlay"/);
});
