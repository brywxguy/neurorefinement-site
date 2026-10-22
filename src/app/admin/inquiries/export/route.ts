import { NextRequest, NextResponse } from 'next/server'
import { getAdminUser } from '@/lib/admin-auth'
import { FORM_TYPE_LABELS, FORM_TYPES, INQUIRY_STATUSES, INQUIRY_STATUS_LABELS, type FormType, type Inquiry, type InquiryStatus } from '@/lib/inquiries'
import { getServiceSupabase } from '@/lib/supabase-server'

export const dynamic = 'force-dynamic'

const COLUMNS: Array<[string, (i: Inquiry) => unknown]> = [
  ['Created (UTC)', (i) => i.created_at],
  ['Status', (i) => INQUIRY_STATUS_LABELS[i.status] ?? i.status],
  ['Form', (i) => FORM_TYPE_LABELS[i.form_type] ?? i.form_type],
  ['Name', (i) => i.name],
  ['Email', (i) => i.email],
  ['Phone', (i) => i.phone],
  ['Who for', (i) => i.who_for],
  ['Concern', (i) => i.concern],
  ['How heard', (i) => i.how_heard],
  ['Message', (i) => i.message],
  ['Follow-up consent', (i) => (i.consent_followup == null ? '' : i.consent_followup ? 'Yes' : 'No')],
  ['Text consent', (i) => (i.consent_sms == null ? '' : i.consent_sms ? 'Yes' : 'No')],
  ['Consented at (UTC)', (i) => i.consented_at ?? ''],
  ['Source page', (i) => i.source_page],
  ['Notes', (i) => i.notes],
  ['Form answers (JSON)', (i) => (i.details && Object.keys(i.details).length ? JSON.stringify(i.details) : '')],
  ['ID', (i) => i.id],
]

function csvCell(value: unknown) {
  let s = value == null ? '' : String(value)
  // Prevent spreadsheet formula injection from user-submitted text.
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`
  return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

export async function GET(req: NextRequest) {
  if (!(await getAdminUser())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const supabase = getServiceSupabase()
  if (!supabase) {
    return NextResponse.json({ error: 'SUPABASE_SERVICE_ROLE_KEY is not configured' }, { status: 500 })
  }

  const status = req.nextUrl.searchParams.get('status')
  const type = req.nextUrl.searchParams.get('type')
  const rows: Inquiry[] = []
  const pageSize = 1000
  for (let from = 0; ; from += pageSize) {
    let query = supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false })
      .range(from, from + pageSize - 1)
    if (status && INQUIRY_STATUSES.includes(status as InquiryStatus)) query = query.eq('status', status)
    if (type && FORM_TYPES.includes(type as FormType)) query = query.eq('form_type', type)
    const { data, error } = await query
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    rows.push(...((data as Inquiry[]) ?? []))
    if (!data || data.length < pageSize) break
  }

  const csv = [
    COLUMNS.map(([h]) => csvCell(h)).join(','),
    ...rows.map((row) => COLUMNS.map(([, get]) => csvCell(get(row))).join(',')),
  ].join('\r\n')

  const date = new Date().toISOString().slice(0, 10)
  return new NextResponse(`\uFEFF${csv}\r\n`, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="inquiries-${status || 'all'}-${date}.csv"`,
      'Cache-Control': 'no-store',
    },
  })
}
