import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import { redirect } from 'next/navigation'

export const metadata: Metadata = pageMetadata('/admin', { title: 'Admin' })

export default function AdminIndex() {
  redirect('/admin/inquiries')
}
