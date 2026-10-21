import { ReactNode } from 'react'
import { AlertCircle } from 'lucide-react'
import { HONEYPOT_FIELD } from '@/lib/inquiries'
import { cn } from '@/lib/utils'

export const inputClass =
  'w-full px-4 py-3 rounded-xl border border-brand-200 bg-white text-brand-800 focus:outline-none focus:border-brand-500'

export function Field({
  label,
  htmlFor,
  required,
  error,
  hint,
  children,
}: {
  label: string
  htmlFor: string
  required?: boolean
  error?: string
  hint?: string
  children: ReactNode
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-brand-700 mb-1.5">
        {label} {required && <span className="text-gold-500" aria-hidden>*</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1 text-xs text-brand-400">{hint}</p>}
      {error && (
        <p id={`${htmlFor}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}

/** Visually hidden field that only bots fill in. */
export function HoneypotField() {
  return (
    <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}>
      <label htmlFor={HONEYPOT_FIELD}>Website</label>
      <input id={HONEYPOT_FIELD} name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
    </div>
  )
}

export function FormError({ message, className }: { message: string; className?: string }) {
  return (
    <div role="alert" className={cn('flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700', className)}>
      <AlertCircle className="w-5 h-5 shrink-0" />
      <p>{message}</p>
    </div>
  )
}
