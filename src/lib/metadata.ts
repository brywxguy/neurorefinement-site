import type { Metadata } from 'next'
import { siteConfig } from '@/lib/config'

export const DEFAULT_TITLE = `${siteConfig.name} — ${siteConfig.tagline}`

type PageMeta = { title?: string; description?: string } & Omit<Metadata, 'title' | 'description' | 'openGraph' | 'twitter'>

/**
 * Per-page metadata whose Open Graph / Twitter tags match the page's own tab title and
 * description. Next.js replaces (not merges) a parent's `openGraph`, doesn't apply the title
 * template to it, and a layout with a plain title stops the template for pages below it — so
 * the full title is set as absolute and the description is always explicit.
 * Omit `title` for the homepage, which uses the site's default title.
 */
export function pageMetadata(path: string, { title, description, ...rest }: PageMeta = {}): Metadata {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : DEFAULT_TITLE
  const socialDescription = description ?? siteConfig.description
  return {
    title: { absolute: fullTitle },
    description: socialDescription,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      siteName: siteConfig.name,
      url: path,
      title: fullTitle,
      description: socialDescription,
    },
    twitter: {
      card: 'summary',
      title: fullTitle,
      description: socialDescription,
    },
    ...rest,
  }
}
