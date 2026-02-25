#!/usr/bin/env node
/**
 * NeuroRefinement Fix v2 — Logo Rings + Theme Icons
 * Run from repo root: node apply-fixes-v2.js
 */

const fs = require('fs');

function writeFile(p, c) { fs.writeFileSync(p, c, 'utf-8'); console.log(`  ✅ ${p}`); }
function readFile(p) { return fs.readFileSync(p, 'utf-8'); }
function replace(content, search, replacement, label) {
  if (!content.includes(search)) {
    console.error(`  ❌ NOT FOUND: ${label}`);
    return content;
  }
  return content.replace(search, replacement);
}

console.log('🔧 NeuroRefinement Fix v2\n');

// ============================================================
// 1. LOGO — Bold concentric rings like the brand images
// ============================================================
console.log('1. Logo — bold concentric rings');

writeFile('src/components/ui/Logo.tsx', `import { cn } from '@/lib/utils'

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
`);

// ============================================================
// 2. ThemeIcon component — lucide-react icons (verified v0.312)
// ============================================================
console.log('2. ThemeIcon component');

writeFile('src/components/ui/ThemeIcon.tsx', `import {
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
`);

// ============================================================
// 3. Config — strip emoji icon field from themes
// ============================================================
console.log('3. Config — remove emojis');

let config = readFile('src/lib/config.ts');

// Remove icon: 'xxx', from each theme entry using a general approach
// Match pattern: icon: 'any emoji chars', 
config = config.replace(/,?\s*icon:\s*'[^']*'/g, '');

writeFile('src/lib/config.ts', config);

// ============================================================
// 4. Homepage — use ThemeIcon
// ============================================================
console.log('4. Homepage — ThemeIcon');

let page = readFile('src/app/page.tsx');

// Add ThemeIcon import (after config import)
page = replace(page,
  "import { siteConfig, pricing, lessonThemes } from '@/lib/config'",
  "import { siteConfig, pricing, lessonThemes } from '@/lib/config'\nimport { ThemeIcon } from '@/components/ui/ThemeIcon'",
  'Add ThemeIcon import to homepage'
);

// Replace emoji span with ThemeIcon
page = replace(page,
  '<span className="text-3xl mb-3">{theme.icon}</span>',
  '<ThemeIcon slug={theme.slug} size={28} className="mb-3" />',
  'Replace emoji with ThemeIcon on homepage'
);

writeFile('src/app/page.tsx', page);

// ============================================================
// 5. Lessons page — use ThemeIcon
// ============================================================
console.log('5. Lessons page — ThemeIcon');

let lessons = readFile('src/app/lessons/page.tsx');

// Add ThemeIcon import
lessons = replace(lessons,
  "import { lessonThemes, pricing } from '@/lib/config'",
  "import { lessonThemes, pricing } from '@/lib/config'\nimport { ThemeIcon } from '@/components/ui/ThemeIcon'",
  'Add ThemeIcon import to lessons page'
);

// Replace emoji span
lessons = replace(lessons,
  '<span className="text-2xl mb-2">{theme.icon}</span>',
  '<ThemeIcon slug={theme.slug} size={24} className="mb-2" />',
  'Replace emoji with ThemeIcon on lessons page'
);

writeFile('src/app/lessons/page.tsx', lessons);

console.log('\n🎉 Done! Run:');
console.log('   git add -A');
console.log('   git commit -m "Bold logo rings, replace emojis with lucide theme icons"');
console.log('   git push');
