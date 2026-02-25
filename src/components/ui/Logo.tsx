import { cn } from '@/lib/utils'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  showText?: boolean
  variant?: 'light' | 'dark'
}

export function Logo({ size = 'md', className, showText = true, variant = 'dark' }: LogoProps) {
  const sizes = {
    sm: { ring: 32, text: 'text-lg' },
    md: { ring: 40, text: 'text-xl' },
    lg: { ring: 56, text: 'text-2xl' },
  }

  const s = sizes[size]
  const c = variant === 'dark' ? '#2A4E5E' : '#c0d9ee'
  const mid = variant === 'dark' ? '#3B6F8E' : '#adc7d3'

  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <svg
        width={s.ring}
        height={s.ring}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="60" cy="60" r="55" stroke={c} strokeWidth="4" />
        <circle cx="60" cy="60" r="46" stroke={c} strokeWidth="4" />
        <circle cx="60" cy="60" r="37" stroke={mid} strokeWidth="4.5" />
        <circle cx="60" cy="60" r="28" stroke={mid} strokeWidth="4.5" />
        <circle cx="60" cy="60" r="19" stroke={c} strokeWidth="5" />
        <circle cx="60" cy="60" r="10" stroke={c} strokeWidth="5" />
        <circle cx="60" cy="60" r="3" fill="#D4A853" />
      </svg>

      {showText && (
        <span className={cn(
          'font-display',
          s.text,
          variant === 'dark' ? 'text-brand-800' : 'text-white'
        )}>
          NeuroRefinement
        </span>
      )}
    </span>
  )
}
