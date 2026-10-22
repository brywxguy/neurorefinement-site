'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { getAdminUser } from '@/lib/admin-auth'
import { INQUIRY_STATUSES } from '@/lib/inquiries'
import { getServiceSupabase } from '@/lib/supabase-server'

export type UpdateInquiryState = { ok: boolean; message: string } | null

const updateSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(INQUIRY_STATUSES),
  notes: z.string().max(10000),
})

export async function updateInquiry(_prev: UpdateInquiryState, formData: FormData): Promise<UpdateInquiryState> {
  if (!(await getAdminUser())) return { ok: false, message: 'Your session expired. Please sign in again.' }

  const parsed = updateSchema.safeParse({
    id: formData.get('id'),
    status: formData.get('status'),
    notes: String(formData.get('notes') ?? ''),
  })
  if (!parsed.success) return { ok: false, message: 'Invalid status or notes.' }

  const supabase = getServiceSupabase()
  if (!supabase) return { ok: false, message: 'SUPABASE_SERVICE_ROLE_KEY is not configured.' }

  const { id, status, notes } = parsed.data
  const { error } = await supabase
    .from('inquiries')
    .update({ status, notes: notes.trim() || null })
    .eq('id', id)
  if (error) return { ok: false, message: `Save failed: ${error.message}` }

  revalidatePath('/admin/inquiries')
  return { ok: true, message: 'Saved' }
}
