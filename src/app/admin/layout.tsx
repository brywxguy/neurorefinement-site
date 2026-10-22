import { Metadata } from 'next'
import { ReactNode } from 'react'
import { pageMetadata } from '@/lib/metadata'

export const metadata: Metadata = pageMetadata('/admin', {
  title: 'Admin',
  robots: { index: false, follow: false },
})

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <div className="bg-sand-50 min-h-[60vh]">{children}</div>
}
