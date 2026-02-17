import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

// ============================================================
// BUTTON
// ============================================================
interface ButtonProps {
  href?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
}

export function Button({
  href,
  variant = 'primary',
  size = 'md',
  children,
  className,
  onClick,
  type = 'button',
  disabled,
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500'

  const variants = {
    primary: 'bg-brand-500 text-white hover:bg-brand-600 shadow-warm hover:shadow-warm-lg',
    secondary: 'bg-ocean-500 text-white hover:bg-ocean-600 shadow-warm',
    outline: 'border-2 border-brand-500 text-brand-600 hover:bg-brand-50',
    ghost: 'text-brand-600 hover:bg-brand-50',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  }

  const classes = cn(baseStyles, variants[variant], sizes[size], disabled && 'opacity-50 cursor-not-allowed', className)

  if (href) {
    return <Link href={href} className={classes}>{children}</Link>
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  )
}

// ============================================================
// SECTION WRAPPER
// ============================================================
interface SectionProps {
  children: ReactNode
  className?: string
  id?: string
  variant?: 'default' | 'light' | 'dark' | 'warm'
}

export function Section({ children, className, id, variant = 'default' }: SectionProps) {
  const variants = {
    default: 'bg-sand-50',
    light: 'bg-white',
    dark: 'bg-brand-900 text-white',
    warm: 'bg-sand-100',
  }

  return (
    <section id={id} className={cn('section-padding', variants[variant], className)}>
      <div className="container-wide">
        {children}
      </div>
    </section>
  )
}

// ============================================================
// CARD
// ============================================================
interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  href?: string
}

export function Card({ children, className, hover = true, href }: CardProps) {
  const classes = cn(
    'bg-white rounded-2xl border border-brand-100/50 p-6 md:p-8',
    hover && 'hover:shadow-card hover:-translate-y-0.5 transition-all duration-300',
    className,
  )

  if (href) {
    return <Link href={href} className={cn(classes, 'block')}>{children}</Link>
  }

  return <div className={classes}>{children}</div>
}

// ============================================================
// SECTION HEADER
// ============================================================
interface SectionHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  centered?: boolean
  className?: string
}

export function SectionHeader({ eyebrow, title, description, centered = true, className }: SectionHeaderProps) {
  return (
    <div className={cn('mb-12 md:mb-16', centered && 'text-center', className)}>
      {eyebrow && (
        <span className="inline-block text-sm font-medium text-brand-500 uppercase tracking-wider mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-brand-900 mb-4">
        {title}
      </h2>
      {description && (
        <p className={cn('text-lg text-brand-600 leading-relaxed', centered && 'max-w-2xl mx-auto')}>
          {description}
        </p>
      )}
    </div>
  )
}

// ============================================================
// PRICE TAG
// ============================================================
interface PriceTagProps {
  price: number
  period?: string
  originalPrice?: number
  size?: 'sm' | 'md' | 'lg'
}

export function PriceTag({ price, period, originalPrice, size = 'md' }: PriceTagProps) {
  const sizes = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-4xl',
  }

  return (
    <div className="flex items-baseline gap-2">
      {originalPrice && (
        <span className="text-brand-400 line-through text-lg">${originalPrice}</span>
      )}
      <span className={cn('font-display text-brand-900', sizes[size])}>
        ${price}
      </span>
      {period && (
        <span className="text-brand-500 text-sm">/{period}</span>
      )}
    </div>
  )
}

// ============================================================
// TESTIMONIAL CARD
// ============================================================
interface TestimonialProps {
  quote: string
  name: string
  location?: string
  service?: string
}

export function TestimonialCard({ quote, name, location, service }: TestimonialProps) {
  return (
    <Card className="relative">
      <div className="absolute top-4 left-6 text-5xl font-display text-brand-200 leading-none">&ldquo;</div>
      <blockquote className="relative z-10 pt-8">
        <p className="text-brand-700 leading-relaxed italic mb-4">{quote}</p>
        <footer className="text-sm">
          <span className="font-medium text-brand-800">{name}</span>
          {location && <span className="text-brand-500"> &mdash; {location}</span>}
          {service && <span className="block text-brand-400 text-xs mt-1">{service}</span>}
        </footer>
      </blockquote>
    </Card>
  )
}

// ============================================================
// FAQ ACCORDION
// ============================================================
interface FAQProps {
  items: Array<{ question: string; answer: string }>
}

export function FAQ({ items }: FAQProps) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <details key={i} className="group bg-white rounded-xl border border-brand-100/50 overflow-hidden">
          <summary className="flex items-center justify-between cursor-pointer px-6 py-5 text-brand-800 font-medium hover:bg-brand-50 transition-colors list-none">
            {item.question}
            <span className="ml-4 text-brand-400 group-open:rotate-45 transition-transform text-xl">+</span>
          </summary>
          <div className="px-6 pb-5 text-brand-600 leading-relaxed">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  )
}

// ============================================================
// CALENDLY EMBED
// ============================================================
interface CalendlyEmbedProps {
  url?: string
  className?: string
}

export function CalendlyEmbed({ url, className }: CalendlyEmbedProps) {
  const calendlyUrl = url || process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com'

  return (
    <div className={cn('rounded-2xl overflow-hidden border border-brand-100/50 bg-white', className)}>
      <iframe
        src={calendlyUrl}
        width="100%"
        height="660"
        frameBorder="0"
        title="Schedule an appointment"
        className="w-full"
      />
    </div>
  )
}
