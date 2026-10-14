# Material icon subset

This directory contains only the Material icons used by the application. The
modules were derived from `@mui/icons-material` 9.1.1 and use MUI's existing
`createSvgIcon` utility. The upstream MIT license is preserved in `LICENSE`.

Keeping the selected modules locally prevents the complete icon catalog from
being installed and included in Vercel's build cache.
