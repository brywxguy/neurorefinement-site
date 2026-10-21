import Link from 'next/link'
import { Download, LogOut, Mail, Phone } from 'lucide-react'
import { Section } from '@/components/ui'
import { FormError } from '@/components/forms/fields'
import { requireAdmin } from '@/lib/admin-auth'
import {
  FORM_TYPE_LABELS,
  INQUIRY_STATUSES,
  INQUIRY_STATUS_LABELS,
  type Inquiry,
  type InquiryStatus,
} from '@/lib/inquiries'
import { getServiceSupabase } from '@/lib/supabase-server'
import { cn } from '@/lib/utils'
import { signOut } from '../actions'
import { InquiryEditor } from './InquiryEditor'

export const dynamic = 'force-dynamic'

const PAGE_LIMIT = 500

const STATUS_STYLES: Record<InquiryStatus, string> = {
  new: 'bg-gold-100 text-gold-800',
  contacted: 'bg-ocean-100 text-ocean-800',
  booked: 'bg-brand-100 text-brand-800',
  not_a_fit: 'bg-sand-200 text-brand-600',
}

function formatWhen(iso: string) {
  return new Date(iso).toLocaleString('en-US', {
    timeZone: 'America/Los_Angeles',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

function humanizeKey(key: string) {
  return key.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/[_-]/g, ' ').replace(/^./, (c) => c.toUpperCase())
}

function formatValue(value: unknown): string {
  if (Array.isArray(value)) return value.join(', ')
  if (typeof value === 'boolean') return value ? 'Yes' : 'No'
  if (value && typeof value === 'object') return JSON.stringify(value)
  return String(value ?? '')
}

export default async function AdminInquiriesPage({ searchParams }: { searchParams: { status?: string } }) {
  const admin = await requireAdmin()
  const statusFilter = INQUIRY_STATUSES.includes(searchParams.status as InquiryStatus)
    ? (searchParams.status as InquiryStatus)
    : null

  const supabase = getServiceSupabase()
  let inquiries: Inquiry[] = []
  let counts: Record<string, number> = {}
  let loadError: string | null = null

  if (!supabase) {
    loadError = 'SUPABASE_SERVICE_ROLE_KEY / NEXT_PUBLIC_SUPABASE_URL are not set for this deployment.'
  } else {
    let query = supabase
      .from('inquiries')
      .select('id, created_at, updated_at, form_type, name, email, phone, who_for, concern, how_heard, message, source_page, status, notes, details')
      .order('created_at', { ascending: false })
      .limit(PAGE_LIMIT)
    if (statusFilter) query = query.eq('status', statusFilter)
    const [list, statuses] = await Promise.all([query, supabase.from('inquiries').select('status')])
    if (list.error) loadError = list.error.message
    inquiries = (list.data as Inquiry[] | null) ?? []
    counts = (statuses.data ?? []).reduce<Record<string, number>>((acc, row) => {
      acc[row.status] = (acc[row.status] || 0) + 1
      acc.all = (acc.all || 0) + 1
      return acc
    }, {})
  }

  const exportHref = `/admin/inquiries/export${statusFilter ? `?status=${statusFilter}` : ''}`
  const tabs: Array<{ key: InquiryStatus | null; label: string }> = [
    { key: null, label: 'All' },
    ...INQUIRY_STATUSES.map((s) => ({ key: s, label: INQUIRY_STATUS_LABELS[s] })),
  ]

  return (
    <Section className="pt-10 md:pt-12">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-3xl md:text-4xl text-brand-900">Inquiries</h1>
          <p className="text-sm text-brand-500 mt-1">Signed in as {admin.email}</p>
        </div>
        <div className="flex gap-3">
          <a
            href={exportHref}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-brand-500 text-brand-600 text-sm font-medium hover:bg-brand-50"
          >
            <Download className="w-4 h-4" /> Export CSV
          </a>
          <form action={signOut}>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-brand-600 text-sm font-medium hover:bg-brand-50"
            >
              <LogOut className="w-4 h-4" /> Sign out
            </button>
          </form>
        </div>
      </div>

      <nav aria-label="Filter by status" className="flex flex-wrap gap-2 mb-8">
        {tabs.map((tab) => {
          const active = tab.key === statusFilter
          return (
            <Link
              key={tab.label}
              href={tab.key ? `/admin/inquiries?status=${tab.key}` : '/admin/inquiries'}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'px-4 py-2 rounded-full text-sm border transition',
                active ? 'bg-brand-500 border-brand-500 text-white' : 'bg-white border-brand-200 text-brand-600 hover:border-brand-400'
              )}
            >
              {tab.label} <span className="opacity-70">({counts[tab.key ?? 'all'] ?? 0})</span>
            </Link>
          )
        })}
      </nav>

      {loadError && <FormError message={`Couldn’t load inquiries: ${loadError}`} className="mb-6" />}

      {!loadError && inquiries.length === 0 && (
        <div className="rounded-2xl border border-brand-100/50 bg-white p-10 text-center text-brand-500">
          No inquiries{statusFilter ? ` with status “${INQUIRY_STATUS_LABELS[statusFilter]}”` : ''} yet.
        </div>
      )}

      <ul className="space-y-4">
        {inquiries.map((inq) => {
          const fields: Array<[string, string | null]> = [
            ['Who for', inq.who_for],
            ['Concern', inq.concern],
            ['How heard', inq.how_heard],
            ['Message', inq.message],
            ['Page', inq.source_page],
          ]
          const details = Object.entries(inq.details || {}).filter(([, v]) => formatValue(v) !== '')
          return (
            <li key={inq.id} className="rounded-2xl border border-brand-100/50 bg-white p-5 md:p-6">
              <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h2 className="font-display text-xl text-brand-900">{inq.name}</h2>
                    <span className={cn('text-xs font-medium px-2.5 py-1 rounded-full', STATUS_STYLES[inq.status])}>
                      {INQUIRY_STATUS_LABELS[inq.status]}
                    </span>
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-sand-100 text-brand-600">
                      {FORM_TYPE_LABELS[inq.form_type] ?? inq.form_type}
                    </span>
                  </div>
                  <p className="text-sm text-brand-400 mb-3">{formatWhen(inq.created_at)}</p>
                  <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm mb-4">
                    <a href={`mailto:${inq.email}`} className="inline-flex items-center gap-1.5 text-ocean-600 hover:text-ocean-700">
                      <Mail className="w-4 h-4" /> {inq.email}
                    </a>
                    {inq.phone && (
                      <a href={`tel:${inq.phone}`} className="inline-flex items-center gap-1.5 text-ocean-600 hover:text-ocean-700">
                        <Phone className="w-4 h-4" /> {inq.phone}
                      </a>
                    )}
                  </div>
                  <dl className="grid grid-cols-[110px_1fr] gap-x-3 gap-y-2 text-sm">
                    {fields
                      .filter(([, v]) => v)
                      .map(([label, value]) => (
                        <div key={label} className="contents">
                          <dt className="text-brand-400">{label}</dt>
                          <dd className="text-brand-800 whitespace-pre-wrap break-words">{value}</dd>
                        </div>
                      ))}
                  </dl>
                  {details.length > 0 && (
                    <details className="mt-4 text-sm">
                      <summary className="cursor-pointer text-brand-600 font-medium">
                        Form answers ({details.length})
                      </summary>
                      <dl className="mt-3 grid grid-cols-[160px_1fr] gap-x-3 gap-y-2">
                        {details.map(([k, v]) => (
                          <div key={k} className="contents">
                            <dt className="text-brand-400">{humanizeKey(k)}</dt>
                            <dd className="text-brand-800 whitespace-pre-wrap break-words">{formatValue(v)}</dd>
                          </div>
                        ))}
                      </dl>
                    </details>
                  )}
                </div>
                <div className="lg:border-l lg:border-brand-100/50 lg:pl-6">
                  <InquiryEditor id={inq.id} status={inq.status} notes={inq.notes} />
                </div>
              </div>
            </li>
          )
        })}
      </ul>
      {inquiries.length === PAGE_LIMIT && (
        <p className="mt-6 text-sm text-brand-500 text-center">
          Showing the newest {PAGE_LIMIT}. Use Export CSV for the full list.
        </p>
      )}
    </Section>
  )
}
