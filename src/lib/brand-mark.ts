// Concentric-ring brand mark as standalone SVG strings, for favicons and app icons.
// Same palette and geometry family as the header logo (src/components/ui/Logo.tsx).
// The static icon files (src/app/favicon.ico, public/icon-*.png, public/apple-touch-icon.png,
// public/safari-pinned-tab.svg) are rendered from these strings; regenerate them if these change.

const DARK = '#2A4E5E'
const MID = '#3B6F8E'
const GOLD = '#D4A853'
export const CREAM = '#F5F0E8'

/** Full seven-ring mark (header logo geometry). Optional square background with padding. */
export function fullMarkSvg(background?: string) {
  const rings = `
    <circle cx="60" cy="60" r="55" stroke="${DARK}" stroke-width="4"/>
    <circle cx="60" cy="60" r="46" stroke="${DARK}" stroke-width="4"/>
    <circle cx="60" cy="60" r="37" stroke="${MID}" stroke-width="4.5"/>
    <circle cx="60" cy="60" r="28" stroke="${MID}" stroke-width="4.5"/>
    <circle cx="60" cy="60" r="19" stroke="${DARK}" stroke-width="5"/>
    <circle cx="60" cy="60" r="10" stroke="${DARK}" stroke-width="5"/>
    <circle cx="60" cy="60" r="3" fill="${GOLD}" stroke="none"/>`
  return background
    ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><rect width="120" height="120" fill="${background}"/><g fill="none" transform="translate(14 14) scale(0.7667)">${rings}</g></svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><g fill="none">${rings}</g></svg>`
}

/**
 * Bold mark for 16–48px browser tabs: three heavy rings and the gold center on a cream disc,
 * so it stays legible on both light and dark tab bars.
 */
export const smallMarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><circle cx="60" cy="60" r="60" fill="${CREAM}"/><g fill="none"><circle cx="60" cy="60" r="49" stroke="${DARK}" stroke-width="12"/><circle cx="60" cy="60" r="30" stroke="${MID}" stroke-width="12"/><circle cx="60" cy="60" r="12" stroke="${DARK}" stroke-width="10"/></g><circle cx="60" cy="60" r="4.5" fill="${GOLD}"/></svg>`

/** Single-color silhouette for Safari pinned tabs (Safari tints it with the link's color). */
export const maskIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><g fill="none" stroke="#000"><circle cx="60" cy="60" r="53" stroke-width="12"/><circle cx="60" cy="60" r="31" stroke-width="12"/><circle cx="60" cy="60" r="12" stroke-width="10"/></g></svg>`

export const MASK_ICON_COLOR = DARK

export function svgDataUri(svg: string) {
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`
}
