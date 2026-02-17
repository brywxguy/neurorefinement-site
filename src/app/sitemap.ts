import { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://neurorefinement.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    '', '/about', '/work-with-me', '/functional-synthesis', '/coaching',
    '/classes', '/lessons', '/bundles', '/membership', '/blog', '/research',
    '/contact', '/start-here', '/disclaimer', '/privacy', '/terms', '/refund-policy',
  ]

  return staticPages.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route === '/lessons' ? 0.9 : 0.7,
  }))
}
