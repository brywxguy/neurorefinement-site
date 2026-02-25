#!/usr/bin/env node
/**
 * NeuroRefinement Comprehensive Fix Script
 * Run from your repo root: node apply-fixes.js
 * 
 * Fixes:
 * 1. Logo concentric rings — increase opacity for visibility
 * 2. SectionHeader — support dark variant (white text on dark bg)
 * 3. Homepage — add Children with Special Needs tile
 * 4. Navigation — add Children page to Services dropdown
 */

const fs = require('fs');
const path = require('path');

function readFile(filePath) {
  return fs.readFileSync(filePath, 'utf-8');
}

function writeFile(filePath, content) {
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`  ✅ Updated: ${filePath}`);
}

function replaceOnce(content, search, replace, label) {
  if (!content.includes(search)) {
    console.error(`  ❌ Could not find target for: ${label}`);
    console.error(`     Looking for: "${search.substring(0, 80)}..."`);
    return content;
  }
  return content.replace(search, replace);
}

console.log('🔧 Applying NeuroRefinement fixes...\n');

// ============================================================
// FIX 1: Logo — More visible concentric rings
// ============================================================
console.log('Fix 1: Logo concentric rings visibility');

const logoContent = `import { cn } from '@/lib/utils'

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
        <circle cx="60" cy="60" r="56" stroke={variant === 'dark' ? '#2A4E5E' : '#d6e3e9'} strokeWidth="3.5" opacity="0.65" />
        {/* Ring 2 */}
        <circle cx="60" cy="60" r="46" stroke={variant === 'dark' ? '#2A4E5E' : '#d6e3e9'} strokeWidth="4" opacity="0.75" />
        {/* Ring 3 */}
        <circle cx="60" cy="60" r="36" stroke={variant === 'dark' ? '#3B6F8E' : '#adc7d3'} strokeWidth="4.5" opacity="0.85" />
        {/* Ring 4 */}
        <circle cx="60" cy="60" r="26" stroke={variant === 'dark' ? '#3B6F8E' : '#c0d9ee'} strokeWidth="5" opacity="0.9" />
        {/* Inner ring */}
        <circle cx="60" cy="60" r="16" stroke={variant === 'dark' ? '#2A4E5E' : '#f0f5f7'} strokeWidth="5.5" opacity="0.95" />
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
`;

writeFile('src/components/ui/Logo.tsx', logoContent);

// ============================================================
// FIX 2: SectionHeader — Support dark variant
// ============================================================
console.log('Fix 2: SectionHeader dark variant support');

let indexContent = readFile('src/components/ui/index.tsx');

// Replace the SectionHeader interface and component
const oldSectionHeader = `interface SectionHeaderProps {
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
}`;

const newSectionHeader = `interface SectionHeaderProps {
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
}`;

indexContent = replaceOnce(indexContent, oldSectionHeader, newSectionHeader, 'SectionHeader component');
writeFile('src/components/ui/index.tsx', indexContent);

// ============================================================
// FIX 2b + 3: page.tsx — dark variant on coaching SectionHeader + Children tile
// ============================================================
console.log('Fix 2b: Pass variant="dark" to coaching SectionHeader');
console.log('Fix 3: Add Children with Special Needs tile');

let pageContent = readFile('src/app/page.tsx');

// Add Baby to lucide-react imports
pageContent = replaceOnce(
  pageContent,
  "import { ArrowRight, Play, Brain, Heart, Sparkles, Users, Waves, Target, Sun, MessageCircle, ClipboardCheck, TrendingUp } from 'lucide-react'",
  "import { ArrowRight, Play, Brain, Heart, Sparkles, Users, Waves, Target, Sun, MessageCircle, ClipboardCheck, TrendingUp, Baby } from 'lucide-react'",
  'Add Baby icon import'
);

// Add variant="dark" to the coaching section SectionHeader
pageContent = replaceOnce(
  pageContent,
  `<SectionHeader
            eyebrow="Strengths-Based Coaching"
            title="You Don't Have to Figure It All Out Alone"`,
  `<SectionHeader
            variant="dark"
            eyebrow="Strengths-Based Coaching"
            title="You Don't Have to Figure It All Out Alone"`,
  'Add variant="dark" to coaching SectionHeader'
);

// Update grid to 5 columns for the extra tile
pageContent = replaceOnce(
  pageContent,
  'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5',
  'Update Who Its For grid to 5 columns'
);

// Add Children tile after Chronic Pain tile
const chronicPainTileEnd = `              href: '/lessons?theme=tos-upper-extremity',
            },`;

const childrenTile = `              href: '/lessons?theme=tos-upper-extremity',
            },
            {
              icon: <Baby className="w-7 h-7" />,
              title: 'Children with Special Needs',
              description: 'Brain-based movement for children with developmental challenges, cerebral palsy, autism spectrum, and other neurological conditions.',
              href: '/children',
            },`;

pageContent = replaceOnce(pageContent, chronicPainTileEnd, childrenTile, 'Add Children tile');

writeFile('src/app/page.tsx', pageContent);

// ============================================================
// FIX 4: Navigation — Add Children to Services dropdown
// ============================================================
console.log('Fix 4: Add Children page to navigation');

let configContent = readFile('src/lib/config.ts');

// Add Children link after Group Classes in Services dropdown
configContent = replaceOnce(
  configContent,
  "{ label: 'Group Classes', href: '/classes', description: 'Transformational Movement Lessons' },",
  `{ label: 'Group Classes', href: '/classes', description: 'Transformational Movement Lessons' },
        { label: 'Children with Special Needs', href: '/children', description: 'Brain-based movement for kids' },`,
  'Add Children to nav'
);

writeFile('src/lib/config.ts', configContent);

// ============================================================
// DONE
// ============================================================
console.log('\n🎉 All fixes applied! Now run:');
console.log('   git add -A');
console.log('   git commit -m "Fix: visible logo rings, dark section text, children tile + nav"');
console.log('   git push');
