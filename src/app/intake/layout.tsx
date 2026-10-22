import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { pageMetadata } from '@/lib/metadata'

// The intake form is a client component, so its metadata lives here.
export const metadata: Metadata = pageMetadata('/intake', {
  title: 'New Client Intake',
  description: 'New client intake form for NeuroRefinement lessons.',
})

export default function IntakeLayout({ children }: { children: ReactNode }) {
  return children
}
