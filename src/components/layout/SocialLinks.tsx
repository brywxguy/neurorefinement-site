import { Instagram, MapPin } from 'lucide-react'
import { siteConfig } from '@/lib/config'

// Stroke-only X mark sized and weighted to match the lucide line icons.
function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
      <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
    </svg>
  )
}

export function SocialLinks() {
  const links = [
    { label: 'NeuroRefinement on Google', href: siteConfig.location.googleBusinessProfile, Icon: MapPin },
    { label: 'NeuroRefinement on X', href: siteConfig.social.x, Icon: XIcon },
    { label: 'NeuroRefinement on Instagram', href: siteConfig.social.instagram, Icon: Instagram },
  ].filter((l) => l.href)

  if (!links.length) return null

  return (
    <ul className="flex items-center gap-1 -ml-2 mt-3">
      {links.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            className="inline-flex items-center justify-center w-9 h-9 rounded-full text-brand-300 hover:text-white hover:bg-brand-800 transition-colors"
          >
            <Icon className="w-4 h-4" />
          </a>
        </li>
      ))}
    </ul>
  )
}
