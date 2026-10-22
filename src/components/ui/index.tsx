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

const buttonBase = 'inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500'

const buttonVariants = {
  primary: 'bg-brand-500 text-white hover:bg-brand-600 shadow-warm hover:shadow-warm-lg',
  secondary: 'bg-ocean-500 text-white hover:bg-ocean-600 shadow-warm',
  outline: 'border-2 border-brand-500 text-brand-600 hover:bg-brand-50',
  ghost: 'text-brand-600 hover:bg-brand-50',
}

// Hover styles keyed to a parent `group` (e.g. a clickable Card) instead of the element itself.
const buttonGroupHoverVariants = {
  primary: 'group-hover:bg-brand-600 group-hover:shadow-warm-lg',
  secondary: 'group-hover:bg-ocean-600',
  outline: 'group-hover:bg-brand-50',
  ghost: 'group-hover:bg-brand-50',
}

const buttonSizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
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
  const classes = cn(buttonBase, buttonVariants[variant], buttonSizes[size], disabled && 'opacity-50 cursor-not-allowed', className)

  if (href) {
    return <Link href={href} className={classes}>{children}</Link>
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  )
}

/** Looks like a Button but isn't interactive; use inside a clickable Card so there's a single link. */
export function ButtonLabel({
  variant = 'primary',
  size = 'md',
  children,
  className,
  id,
}: Pick<ButtonProps, 'variant' | 'size' | 'children' | 'className'> & { id?: string }) {
  return (
    <span id={id} className={cn(buttonBase, buttonVariants[variant].replace(/hover:\S+/g, ''), buttonGroupHoverVariants[variant], buttonSizes[size], className)}>
      {children}
    </span>
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
  /** Space-separated ids that name the link when `href` is set (keeps the accessible name short). */
  labelledBy?: string
}

export function Card({ children, className, hover = true, href, labelledBy }: CardProps) {
  const classes = cn(
    'bg-white rounded-2xl border border-brand-100/50 p-6 md:p-8',
    hover && 'hover:shadow-card hover:-translate-y-0.5 transition-all duration-300',
    className,
  )

  if (href) {
    return (
      <Link
        href={href}
        aria-labelledby={labelledBy}
        className={cn(classes, 'group cursor-pointer', !/\b(grid|flex)\b/.test(className ?? '') && 'block')}
      >
        {children}
      </Link>
    )
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
  variant?: 'light' | 'dark'
}

export function SectionHeader({ eyebrow, title, description, centered = true, className, variant = 'light' }: SectionHeaderProps) {
  const isDark = variant === 'dark'

  return (
    <div className={cn('mb-12 md:mb-16', centered && 'text-center', className)}>
      {eyebrow && (
        <span className={cn(
          'inline-block text-sm font-medium uppercase tracking-wider mb-3',
          isDark ? 'text-brand-300' : 'text-brand-500'
        )}>
          {eyebrow}
        </span>
      )}
      <h2 className={cn(
        'font-display text-3xl md:text-4xl lg:text-5xl mb-4',
        isDark ? 'text-white' : 'text-brand-900'
      )}>
        {title}
      </h2>
      {description && (
        <p className={cn(
          'text-lg leading-relaxed',
          isDark ? 'text-brand-200' : 'text-brand-600',
          centered && 'max-w-2xl mx-auto'
        )}>
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
  className?: string
}

export function PriceTag({ price, period, originalPrice, size = 'md', className }: PriceTagProps) {
  const sizes = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-4xl',
  }

  return (
    <div className={cn('flex items-baseline gap-2', className)}>
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
// PRICING CARD
// Place inside a grid; each card spans 5 subgrid rows (meta, title, price,
// note, footer) so rows line up across every card in the same grid row.
// ============================================================
interface PricingCardProps {
  title: string
  price: number
  period?: string
  meta?: ReactNode
  badge?: string
  note?: ReactNode
  footer?: ReactNode
  featured?: boolean
}

export function PricingCard({ title, price, period, meta, badge, note, footer, featured }: PricingCardProps) {
  return (
    <Card className={cn('row-span-5 grid grid-rows-subgrid gap-0 text-center', featured && 'border-brand-300')}>
      <div className="flex items-center justify-center gap-2 text-sm text-brand-500 mb-4">
        {badge ? (
          <span className="inline-block text-xs font-medium bg-brand-500 text-white px-3 py-1 rounded-full">{badge}</span>
        ) : (
          meta
        )}
      </div>
      <h3 className="font-display text-xl text-brand-800 mb-3">{title}</h3>
      <PriceTag price={price} period={period} className="justify-center mb-3" />
      <p className="text-sm text-brand-600 leading-relaxed">{note}</p>
      <div className="flex items-start justify-center gap-2 text-sm text-brand-500 mt-4">{footer}</div>
    </Card>
  )
}

// ============================================================
// IMAGE CAPTION
// ============================================================
export function ImageCaption({ children, as: Tag = 'p', className }: { children: ReactNode; as?: 'p' | 'figcaption'; className?: string }) {
  return <Tag className={cn('mt-3 text-sm text-brand-500 italic text-center', className)}>{children}</Tag>
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
