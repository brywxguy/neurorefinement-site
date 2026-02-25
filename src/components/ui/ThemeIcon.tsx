import {
  Activity,
  Sparkles,
  User,
  Smile,
  Wind,
  Heart,
  Trophy,
  Waves,
  Mountain,
  Moon,
  Hand,
  Zap,
  Target,
  HeartPulse,
  Compass,
  Sun,
  Sunset,
  Flag,
  Mic,
  Monitor,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const iconMap: Record<string, React.ElementType> = {
  'healthy-backs': Activity,
  'anti-aging-vitality': Sparkles,
  'neck-shoulders': User,
  'jaw-face-headaches': Smile,
  'posture-breathing': Wind,
  'playful-mobility': Heart,
  'athletes': Trophy,
  'surfing': Waves,
  'snow-sports': Mountain,
  'stress-sleep': Moon,
  'hands-wrists-arms': Hand,
  'hips-knees-ankles': Zap,
  'balance-fall-prevention': Target,
  'tos-upper-extremity': HeartPulse,
  'travel-recovery': Compass,
  'morning-routines': Sun,
  'evening-unwind': Sunset,
  'golf': Flag,
  'voice-breathing': Mic,
  'seated-lessons': Monitor,
}

interface ThemeIconProps {
  slug: string
  className?: string
  size?: number
}

export function ThemeIcon({ slug, className, size = 24 }: ThemeIconProps) {
  const Icon = iconMap[slug] || Activity
  return <Icon className={cn('text-brand-500', className)} size={size} strokeWidth={1.75} />
}
