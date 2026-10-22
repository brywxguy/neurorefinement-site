import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { pageMetadata } from '@/lib/metadata'

// The questionnaire page is a client component, so its metadata lives here.
export const metadata: Metadata = pageMetadata('/start-here', {
  title: 'Start Here',
  description:
    'Answer a few quick questions and get a personalized starting point: Functional Synthesis lessons, coaching, or voice-guided audio lessons.',
})

export default function StartHereLayout({ children }: { children: ReactNode }) {
  return children
}
