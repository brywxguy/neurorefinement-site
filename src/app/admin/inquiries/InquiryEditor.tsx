'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { INQUIRY_STATUSES, INQUIRY_STATUS_LABELS, type InquiryStatus } from '@/lib/inquiries'
import { updateInquiry, type UpdateInquiryState } from './actions'

function SaveButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="px-4 py-2 rounded-full bg-brand-500 text-white text-sm font-medium hover:bg-brand-600 disabled:opacity-50"
    >
      {pending ? 'Saving…' : 'Save'}
    </button>
  )
}

export function InquiryEditor({ id, status, notes }: { id: string; status: InquiryStatus; notes: string | null }) {
  const [state, action] = useFormState<UpdateInquiryState, FormData>(updateInquiry, null)

  return (
    <form action={action} className="space-y-3">
      <input type="hidden" name="id" value={id} />
      <div>
        <label htmlFor={`status-${id}`} className="block text-xs font-medium uppercase tracking-wide text-brand-500 mb-1">
          Status
        </label>
        <select
          id={`status-${id}`}
          name="status"
          defaultValue={status}
          className="w-full px-3 py-2 rounded-lg border border-brand-200 bg-white text-sm text-brand-800"
        >
          {INQUIRY_STATUSES.map((s) => (
            <option key={s} value={s}>
              {INQUIRY_STATUS_LABELS[s]}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor={`notes-${id}`} className="block text-xs font-medium uppercase tracking-wide text-brand-500 mb-1">
          Notes
        </label>
        <textarea
          id={`notes-${id}`}
          name="notes"
          rows={3}
          defaultValue={notes ?? ''}
          maxLength={10000}
          className="w-full px-3 py-2 rounded-lg border border-brand-200 bg-white text-sm text-brand-800"
        />
      </div>
      <div className="flex items-center gap-3">
        <SaveButton />
        {state && (
          <span role="status" className={state.ok ? 'text-sm text-brand-600' : 'text-sm text-red-600'}>
            {state.message}
          </span>
        )}
      </div>
    </form>
  )
}
