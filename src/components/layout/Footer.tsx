import Link from 'next/link'
import { siteConfig } from '@/lib/config'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-brand-900 text-brand-100 relative grain">
      <div className="container-wide section-padding relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-brand-500 flex items-center justify-center text-white font-display text-lg">
                N
              </div>
              <span className="font-display text-xl text-white">
                {siteConfig.name}
              </span>
            </Link>
            <p className="text-sm text-brand-300 leading-relaxed mb-4">
              {siteConfig.tagline}
            </p>
            <p className="text-sm text-brand-400">
              {siteConfig.location.city}, {siteConfig.location.state}
              <br />
              Virtual sessions available
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display text-white text-lg mb-4">Services</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/functional-synthesis" className="text-brand-300 hover:text-white transition-colors">Functional Synthesis (ABM)</Link></li>
              <li><Link href="/coaching" className="text-brand-300 hover:text-white transition-colors">Coaching</Link></li>
              <li><Link href="/classes" className="text-brand-300 hover:text-white transition-colors">Group Classes</Link></li>
              <li><Link href="/lessons" className="text-brand-300 hover:text-white transition-colors">Audio Lessons</Link></li>
              <li><Link href="/membership" className="text-brand-300 hover:text-white transition-colors">Membership</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-display text-white text-lg mb-4">Resources</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/about" className="text-brand-300 hover:text-white transition-colors">About Bryan</Link></li>
              <li><Link href="/blog" className="text-brand-300 hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/research" className="text-brand-300 hover:text-white transition-colors">Research & Evidence</Link></li>
              <li><Link href="/start-here" className="text-brand-300 hover:text-white transition-colors">Start Here</Link></li>
              <li><Link href="/contact" className="text-brand-300 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-display text-white text-lg mb-4">Stay Connected</h3>
            <p className="text-sm text-brand-300 mb-4">
              Get a free 15-minute movement lesson and weekly insights on neuroplasticity, movement, and mindful living.
            </p>
            <form className="flex gap-2" action="/api/newsletter" method="POST">
              <input
                type="email"
                name="email"
                placeholder="Your email"
                required
                className="flex-1 px-4 py-2.5 bg-brand-800 border border-brand-700 rounded-lg text-sm text-white placeholder:text-brand-500 focus:outline-none focus:border-brand-400"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-brand-500 text-white text-sm font-medium rounded-lg hover:bg-brand-400 transition-colors whitespace-nowrap"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-brand-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-brand-500">
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-brand-500">
            <Link href="/privacy" className="hover:text-brand-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-brand-300 transition-colors">Terms of Service</Link>
            <Link href="/disclaimer" className="hover:text-brand-300 transition-colors">Disclaimer</Link>
            <Link href="/refund-policy" className="hover:text-brand-300 transition-colors">Refund Policy</Link>
          </div>
        </div>
      </div>

      {/* LocalBusiness Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: siteConfig.name,
            description: siteConfig.description,
            url: siteConfig.url,
            address: {
              '@type': 'PostalAddress',
              addressLocality: siteConfig.location.city,
              addressRegion: siteConfig.location.state,
              addressCountry: 'US',
            },
            areaServed: [
              { '@type': 'City', name: 'Carlsbad' },
              { '@type': 'State', name: 'California' },
            ],
            priceRange: '$$',
            founder: {
              '@type': 'Person',
              name: siteConfig.owner,
            },
          }),
        }}
      />
    </footer>
  )
}
