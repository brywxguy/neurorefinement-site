'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Section } from '@/components/ui'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { FormError, HoneypotField } from '@/components/forms/fields'
import { HONEYPOT_FIELD } from '@/lib/inquiries'
import { submitInquiry } from '@/lib/submit-inquiry'
import { CHILD_CONCERN, QUIZ_CONCERNS, QUIZ_GOALS, recommend, resultsHref } from '@/lib/quiz'

type Step = 'concerns' | 'areas' | 'goals' | 'history' | 'info'

export default function StartHerePage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>('concerns')
  const [form, setForm] = useState({
    concerns: [] as string[],
    painAreas: [] as string[],
    goals: [] as string[],
    stressLevel: 5,
    movementHistory: '',
    name: '',
    email: '',
    howDidYouHear: '',
    consent: false,
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const toggleItem = (field: 'concerns' | 'painAreas' | 'goals', value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value],
    }))
  }

  // Recommendations never depend on saving: sharing contact details is optional, and if the
  // save fails the visitor still gets their results (with a note to reach Bryan directly).
  const handleSubmit = async () => {
    setError(null)
    const name = form.name.trim()
    const email = form.email.trim()
    if (!form.consent) {
      setError('Please tick the box above to see your recommendations.')
      return
    }
    if (Boolean(name) !== Boolean(email)) {
      setError('To have Bryan follow up, please add both your name and email — or leave both blank.')
      return
    }

    let saved: boolean | undefined
    if (name && email) {
      setSubmitting(true)
      const rec = recommend(form.concerns, form.goals)
      const result = await submitInquiry({
        form_type: 'start_here',
        name,
        email,
        who_for: form.concerns.includes(CHILD_CONCERN) ? 'My child' : undefined,
        concern: form.concerns.join(', '),
        how_heard: form.howDidYouHear,
        message: form.movementHistory,
        details: {
          concerns: form.concerns,
          painAreas: form.painAreas,
          goals: form.goals,
          stressLevel: form.stressLevel,
          consent: form.consent,
          recommendedPath: rec.path,
        },
        [HONEYPOT_FIELD]: (document.getElementById(HONEYPOT_FIELD) as HTMLInputElement | null)?.value,
      })
      if (!result.ok && result.fieldErrors?.email) {
        setSubmitting(false)
        setError(result.fieldErrors.email)
        return
      }
      saved = result.ok
    }
    router.push(resultsHref(form.concerns, form.goals, saved))
  }

  const steps: Step[] = ['concerns', 'areas', 'goals', 'history', 'info']
  const currentIndex = steps.indexOf(step)

  return (
    <>
      <Section className="pt-12 md:pt-16 pb-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="font-display text-4xl md:text-5xl text-brand-900 mb-4">
            Start Here
          </h1>
          <p className="text-lg text-brand-600 mb-8">
            Tell us a little about what&apos;s going on. This takes about 3 minutes and helps
            us recommend the right starting point for you.
          </p>

          {/* Progress bar */}
          <div className="flex gap-2 max-w-xs mx-auto mb-8">
            {steps.map((s, i) => (
              <div
                key={s}
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  i <= currentIndex ? 'bg-brand-500' : 'bg-brand-200'
                }`}
              />
            ))}
          </div>
        </div>
      </Section>

      <Section variant="light" className="pt-0">
        <div className="max-w-2xl mx-auto">
          {/* Step 1: Primary Concerns */}
          {step === 'concerns' && (
            <div>
              <h2 className="font-display text-2xl text-brand-800 mb-6">
                What brings you here? <span className="text-sm font-body text-brand-400">(Select all that apply)</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {QUIZ_CONCERNS.map((concern) => (
                  <button
                    key={concern}
                    onClick={() => toggleItem('concerns', concern)}
                    className={`text-left px-5 py-4 rounded-xl border transition-all ${
                      form.concerns.includes(concern)
                        ? 'bg-brand-50 border-brand-500 text-brand-800'
                        : 'bg-white border-brand-100/50 text-brand-600 hover:border-brand-300'
                    }`}
                  >
                    {concern}
                  </button>
                ))}
              </div>
              <Button onClick={() => setStep('areas')} disabled={form.concerns.length === 0}>
                Next <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          )}

          {/* Step 2: Body Areas */}
          {step === 'areas' && (
            <div>
              <h2 className="font-display text-2xl text-brand-800 mb-6">
                Where do you feel it most? <span className="text-sm font-body text-brand-400">(Select all that apply)</span>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                {[
                  'Neck', 'Shoulders', 'Upper back', 'Lower back',
                  'Jaw / face', 'Chest / ribs', 'Arms / hands',
                  'Hips', 'Knees', 'Ankles / feet',
                  'Full body', 'Not applicable',
                ].map((area) => (
                  <button
                    key={area}
                    onClick={() => toggleItem('painAreas', area)}
                    className={`text-left px-4 py-3 rounded-xl border text-sm transition-all ${
                      form.painAreas.includes(area)
                        ? 'bg-brand-50 border-brand-500 text-brand-800'
                        : 'bg-white border-brand-100/50 text-brand-600 hover:border-brand-300'
                    }`}
                  >
                    {area}
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <Button variant="ghost" onClick={() => setStep('concerns')}>
                  <ArrowLeft className="mr-2 w-4 h-4" /> Back
                </Button>
                <Button onClick={() => setStep('goals')}>
                  Next <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Goals */}
          {step === 'goals' && (
            <div>
              <h2 className="font-display text-2xl text-brand-800 mb-6">
                What does success look like for you?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {QUIZ_GOALS.map((goal) => (
                  <button
                    key={goal}
                    onClick={() => toggleItem('goals', goal)}
                    className={`text-left px-5 py-4 rounded-xl border transition-all ${
                      form.goals.includes(goal)
                        ? 'bg-brand-50 border-brand-500 text-brand-800'
                        : 'bg-white border-brand-100/50 text-brand-600 hover:border-brand-300'
                    }`}
                  >
                    {goal}
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <Button variant="ghost" onClick={() => setStep('areas')}>
                  <ArrowLeft className="mr-2 w-4 h-4" /> Back
                </Button>
                <Button onClick={() => setStep('history')}>
                  Next <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Movement History */}
          {step === 'history' && (
            <div>
              <h2 className="font-display text-2xl text-brand-800 mb-6">
                Tell us a bit about your movement background
              </h2>
              <div className="space-y-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-brand-700 mb-2">
                    Current stress level (1 = very low, 10 = very high)
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    value={form.stressLevel}
                    onChange={(e) => setForm({ ...form, stressLevel: Number(e.target.value) })}
                    className="w-full accent-brand-500"
                  />
                  <div className="flex justify-between text-xs text-brand-400 mt-1">
                    <span>1 — Very low</span>
                    <span className="font-medium text-brand-600">{form.stressLevel}</span>
                    <span>10 — Very high</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-700 mb-2">
                    Briefly describe your movement experience (yoga, PT, sports, etc.)
                  </label>
                  <textarea
                    value={form.movementHistory}
                    onChange={(e) => setForm({ ...form, movementHistory: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-brand-200 text-brand-800 focus:outline-none focus:border-brand-500"
                    placeholder="E.g., 'I used to run but stopped due to knee pain. I've tried yoga and PT...'"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="ghost" onClick={() => setStep('goals')}>
                  <ArrowLeft className="mr-2 w-4 h-4" /> Back
                </Button>
                <Button onClick={() => setStep('info')}>
                  Almost Done <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 5: Contact Info */}
          {step === 'info' && (
            <div>
              <h2 className="font-display text-2xl text-brand-800 mb-6">
                Last step — want Bryan to follow up?
              </h2>
              <p className="text-brand-600 mb-6 -mt-3">
                Add your name and email if you&apos;d like Bryan to review your answers and reach out.
                This is optional — your recommendations appear either way.
              </p>
              <div className="space-y-4 mb-8">
                <input
                  type="text"
                  placeholder="Your name (optional)"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-brand-200 text-brand-800 focus:outline-none focus:border-brand-500"
                />
                <input
                  type="email"
                  placeholder="Email address (optional)"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-brand-200 text-brand-800 focus:outline-none focus:border-brand-500"
                />
                <select
                  value={form.howDidYouHear}
                  onChange={(e) => setForm({ ...form, howDidYouHear: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-brand-200 text-brand-800 focus:outline-none focus:border-brand-500"
                >
                  <option value="">How did you hear about us?</option>
                  <option value="search">Google / search</option>
                  <option value="social">Social media</option>
                  <option value="friend">Friend or referral</option>
                  <option value="church">Church community</option>
                  <option value="other">Other</option>
                </select>
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                    className="mt-1 accent-brand-500"
                  />
                  <span className="text-sm text-brand-600">
                    I understand that NeuroRefinement provides educational wellness services, not
                    medical treatment. I consent to receiving personalized recommendations based
                    on my responses.
                  </span>
                </label>
              </div>
              <HoneypotField />
              {error && <FormError message={error} className="mb-6" />}
              <div className="flex gap-3">
                <Button variant="ghost" onClick={() => setStep('history')}>
                  <ArrowLeft className="mr-2 w-4 h-4" /> Back
                </Button>
                <Button onClick={handleSubmit} disabled={submitting}>
                  {submitting ? 'Saving…' : 'Show My Recommendations'} <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

        </div>
      </Section>
    </>
  )
}
