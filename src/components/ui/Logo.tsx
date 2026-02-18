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
    md: { ring: 38, text: 'text-xl' },
    lg: { ring: 52, text: 'text-2xl' },
  }

  const s = sizes[size]

  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      {/* Concentric Rings Mark */}
      <svg
        width={s.ring}
        height={s.ring}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Outermost ring */}
        <circle cx="60" cy="60" r="56" stroke={variant === 'dark' ? '#2A4E5E' : '#d6e3e9'} strokeWidth="3" opacity="0.3" />
        {/* Ring 2 */}
        <circle cx="60" cy="60" r="46" stroke={variant === 'dark' ? '#2A4E5E' : '#d6e3e9'} strokeWidth="3.5" opacity="0.45" />
        {/* Ring 3 */}
        <circle cx="60" cy="60" r="36" stroke={variant === 'dark' ? '#3B6F8E' : '#adc7d3'} strokeWidth="4" opacity="0.6" />
        {/* Ring 4 */}
        <circle cx="60" cy="60" r="26" stroke={variant === 'dark' ? '#3B6F8E' : '#c0d9ee'} strokeWidth="4.5" opacity="0.75" />
        {/* Inner ring */}
        <circle cx="60" cy="60" r="16" stroke={variant === 'dark' ? '#2A4E5E' : '#f0f5f7'} strokeWidth="5" opacity="0.9" />
        {/* Center dot */}
        <circle cx="60" cy="60" r="5" fill={variant === 'dark' ? '#D4A853' : '#D4A853'} />
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
