'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'
import { navigation, siteConfig } from '@/lib/config'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/ui/Logo'

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-sand-50/90 backdrop-blur-md border-b border-brand-100/50">
      <nav className="container-wide flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <Logo size="md" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {navigation.main.map((item) => (
            <div key={item.label} className="relative">
              {'children' in item && item.children ? (
                <div
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button className="flex items-center gap-1 px-4 py-2 text-sm font-body text-brand-700 hover:text-brand-900 transition-colors rounded-lg hover:bg-brand-50">
                    {item.label}
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  {openDropdown === item.label && (
                    <div className="absolute top-full left-0 pt-2">
                      <div className="bg-white rounded-xl shadow-card border border-brand-100/50 p-2 min-w-[260px]">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-3 rounded-lg hover:bg-brand-50 transition-colors"
                          >
                            <span className="block text-sm font-medium text-brand-800">
                              {child.label}
                            </span>
                            {'description' in child && (
                              <span className="block text-xs text-brand-500 mt-0.5">
                                {child.description}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className="px-4 py-2 text-sm font-body text-brand-700 hover:text-brand-900 transition-colors rounded-lg hover:bg-brand-50"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link
            href={navigation.cta.href}
            className="hidden md:inline-flex items-center px-5 py-2.5 bg-brand-500 text-white text-sm font-medium rounded-full hover:bg-brand-600 transition-colors shadow-warm"
          >
            {navigation.cta.label}
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-brand-700 hover:text-brand-900"
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-brand-100/50 shadow-lg">
          <div className="container-wide py-6 space-y-2">
            {navigation.main.map((item) => (
              <div key={item.label}>
                {'children' in item && item.children ? (
                  <div className="space-y-1">
                    <span className="block px-4 py-2 text-xs font-medium text-brand-500 uppercase tracking-wider">
                      {item.label}
                    </span>
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="block px-4 py-3 text-brand-700 hover:text-brand-900 hover:bg-brand-50 rounded-lg transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 text-brand-700 hover:text-brand-900 hover:bg-brand-50 rounded-lg transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-4">
              <Link
                href={navigation.cta.href}
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center px-5 py-3 bg-brand-500 text-white font-medium rounded-full hover:bg-brand-600 transition-colors"
              >
                {navigation.cta.label}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
