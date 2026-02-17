'use client'

import { useState } from 'react'
import { Button, Section } from '@/components/ui'
import { ArrowRight, ArrowLeft, CheckCircle, Shield, AlertTriangle } from 'lucide-react'

type FormData = {
  // Personal Info
  fullName: string
  preferredName: string
  dateOfBirth: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zip: string
  occupation: string
  howDidYouHear: string
  // Emergency Contact
  emergencyName: string
  emergencyRelationship: string
  emergencyPhone: string
  // Healthcare Provider
  physicianName: string
  physicianPhone: string
  providerClearance: string
  // Current Health
  primaryReason: string
  currentConditions: string[]
  painLocations: string
  painLevel: number
  // Medical History
  medicalHistory: string[]
  otherConditions: string
  surgeries: string
  medications: string
  pregnant: string
  allergies: string
  // Movement History
  previousModalities: string[]
  activityLevel: string
  activitiesGoal: string
  // Goals
  goals: string[]
  anythingElse: string
  // Consent
  infoAccurate: boolean
  privacyAcknowledged: boolean
  consentToTouch: boolean
  photoConsent: string
  communicationPrefs: string[]
}

const initialForm: FormData = {
  fullName: '', preferredName: '', dateOfBirth: '', email: '', phone: '',
  address: '', city: '', state: '', zip: '', occupation: '', howDidYouHear: '',
  emergencyName: '', emergencyRelationship: '', emergencyPhone: '',
  physicianName: '', physicianPhone: '', providerClearance: '',
  primaryReason: '', currentConditions: [], painLocations: '', painLevel: 0,
  medicalHistory: [], otherConditions: '', surgeries: '', medications: '',
  pregnant: '', allergies: '',
  previousModalities: [], activityLevel: '', activitiesGoal: '',
  goals: [], anythingElse: '',
  infoAccurate: false, privacyAcknowledged: false, consentToTouch: false,
  photoConsent: '', communicationPrefs: [],
}

type Step = 'personal' | 'emergency' | 'health' | 'history' | 'movement' | 'goals' | 'consent' | 'complete'

const STEPS: { id: Step; label: string }[] = [
  { id: 'personal', label: 'Personal Info' },
  { id: 'emergency', label: 'Emergency Contact' },
  { id: 'health', label: 'Current Health' },
  { id: 'history', label: 'Medical History' },
  { id: 'movement', label: 'Movement History' },
  { id: 'goals', label: 'Your Goals' },
  { id: 'consent', label: 'Consent & Agreement' },
]

export default function IntakeFormPage() {
  const [step, setStep] = useState<Step>('personal')
  const [form, setForm] = useState<FormData>(initialForm)
  const [submitting, setSubmitting] = useState(false)

  const currentIndex = STEPS.findIndex((s) => s.id === step)

  const update = (field: keyof FormData, value: any) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const toggleArray = (field: keyof FormData, value: string) => {
    const arr = form[field] as string[]
    update(field, arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value])
  }

  const next = () => {
    if (currentIndex < STEPS.length - 1) setStep(STEPS[currentIndex + 1].id)
  }
  const prev = () => {
    if (currentIndex > 0) setStep(STEPS[currentIndex - 1].id)
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStep('complete')
    } catch {
      alert('Something went wrong. Please try again or contact us directly.')
    }
    setSubmitting(false)
  }

  // ── Reusable form components ──
  const Input = ({ label, field, type = 'text', required = false, placeholder = '' }: {
    label: string; field: keyof FormData; type?: string; required?: boolean; placeholder?: string
  }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-brand-600 mb-1">
        {label} {required && <span className="text-gold-500">*</span>}
      </label>
      <input
        type={type}
        value={form[field] as string}
        onChange={(e) => update(field, e.target.value)}
        required={required}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-xl border border-sand-200 bg-white text-brand-900 
          focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400 transition"
      />
    </div>
  )

  const TextArea = ({ label, field, rows = 3, placeholder = '' }: {
    label: string; field: keyof FormData; rows?: number; placeholder?: string
  }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-brand-600 mb-1">{label}</label>
      <textarea
        value={form[field] as string}
        onChange={(e) => update(field, e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-xl border border-sand-200 bg-white text-brand-900 
          focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400 transition resize-y"
      />
    </div>
  )

  const CheckboxGroup = ({ field, options, cols = 2 }: {
    field: keyof FormData; options: string[]; cols?: number
  }) => (
    <div className={`grid grid-cols-1 md:grid-cols-${cols} gap-2 mb-4`}>
      {options.map((opt) => (
        <label key={opt} className="flex items-start gap-2.5 p-2.5 rounded-lg hover:bg-sand-50 cursor-pointer transition">
          <input
            type="checkbox"
            checked={(form[field] as string[]).includes(opt)}
            onChange={() => toggleArray(field, opt)}
            className="mt-0.5 h-4 w-4 rounded border-sand-300 text-brand-500 focus:ring-brand-300"
          />
          <span className="text-sm text-brand-700">{opt}</span>
        </label>
      ))}
    </div>
  )

  const RadioGroup = ({ field, options }: { field: keyof FormData; options: string[] }) => (
    <div className="flex flex-wrap gap-3 mb-4">
      {options.map((opt) => (
        <label key={opt} className="flex items-center gap-2 px-4 py-2 rounded-full border cursor-pointer transition
          ${form[field] === opt ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-sand-200 text-brand-500 hover:bg-sand-50'}">
          <input
            type="radio"
            name={field}
            value={opt}
            checked={form[field] === opt}
            onChange={(e) => update(field, e.target.value)}
            className="h-3.5 w-3.5 text-brand-500 focus:ring-brand-300"
          />
          <span className="text-sm">{opt}</span>
        </label>
      ))}
    </div>
  )

  // ── Completed State ──
  if (step === 'complete') {
    return (
      <Section className="pt-16 pb-24">
        <div className="max-w-lg mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-sage-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-sage-500" />
          </div>
          <h1 className="font-display text-3xl text-brand-900 mb-4">Thank You!</h1>
          <p className="text-brand-600 text-lg mb-4">
            Your intake form has been submitted securely. Bryan will review your information
            before your first session.
          </p>
          <p className="text-brand-400 text-sm mb-8">
            If you haven&apos;t already, you can now book your session through our scheduling page.
          </p>
          <Button href="/functional-synthesis" variant="primary" size="lg">
            Book Your First Session <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </Section>
    )
  }

  return (
    <>
      {/* Header */}
      <Section className="pt-12 md:pt-16 pb-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl text-brand-900 mb-2">
            New Client Intake Form
          </h1>
          <p className="text-brand-400 mb-1 flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Confidential — Your information is stored securely and never shared.
          </p>
          <p className="text-sm text-brand-300 mb-6">
            Please complete all sections before your first session. Takes approximately 10 minutes.
          </p>

          {/* Progress */}
          <div className="flex gap-1 mb-2">
            {STEPS.map((s, i) => (
              <div
                key={s.id}
                className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                  i <= currentIndex ? 'bg-brand-500' : 'bg-brand-100'
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-brand-300">
            Step {currentIndex + 1} of {STEPS.length}: <span className="text-brand-500 font-medium">{STEPS[currentIndex].label}</span>
          </p>
        </div>
      </Section>

      {/* Form Content */}
      <Section variant="light" className="pt-4 pb-16">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-warm border border-sand-200 p-6 md:p-8">

            {/* ── STEP: Personal Info ── */}
            {step === 'personal' && (
              <>
                <h2 className="font-display text-xl text-brand-900 mb-6">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                  <Input label="Full Legal Name" field="fullName" required />
                  <Input label="Preferred Name / Nickname" field="preferredName" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                  <Input label="Date of Birth" field="dateOfBirth" type="date" required />
                  <Input label="Email Address" field="email" type="email" required />
                </div>
                <Input label="Phone (best number)" field="phone" type="tel" required />
                <Input label="Street Address" field="address" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4">
                  <div className="col-span-2"><Input label="City" field="city" /></div>
                  <Input label="State" field="state" />
                  <Input label="ZIP" field="zip" />
                </div>
                <Input label="Occupation" field="occupation" />
                <Input label="How did you hear about NeuroRefinement?" field="howDidYouHear" />
              </>
            )}

            {/* ── STEP: Emergency Contact ── */}
            {step === 'emergency' && (
              <>
                <h2 className="font-display text-xl text-brand-900 mb-6">Emergency Contact</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                  <Input label="Contact Name" field="emergencyName" required />
                  <Input label="Relationship" field="emergencyRelationship" required />
                </div>
                <Input label="Phone Number" field="emergencyPhone" type="tel" required />

                <h2 className="font-display text-xl text-brand-900 mt-8 mb-6">Healthcare Provider</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                  <Input label="Primary Care Physician / Provider" field="physicianName" />
                  <Input label="Physician Phone" field="physicianPhone" type="tel" />
                </div>
                <p className="text-sm text-brand-600 mb-2">
                  Do you have clearance from your healthcare provider to participate in gentle
                  movement-based educational wellness activities?
                </p>
                <RadioGroup field="providerClearance" options={['Yes', 'No', 'Not sure — please discuss']} />
              </>
            )}

            {/* ── STEP: Current Health ── */}
            {step === 'health' && (
              <>
                <h2 className="font-display text-xl text-brand-900 mb-6">Current Health Status</h2>
                <TextArea
                  label="Please describe your primary reason for seeking NeuroRefinement services"
                  field="primaryReason"
                  rows={4}
                  placeholder="Pain, movement limitation, performance goal, general wellness, etc."
                />
                <p className="text-sm font-medium text-brand-700 mb-2">
                  Please check all that currently apply to you:
                </p>
                <CheckboxGroup field="currentConditions" cols={2} options={[
                  'Chronic pain', 'Acute/recent injury', 'Post-surgical recovery',
                  'Neck pain or stiffness', 'Shoulder pain or restriction', 'Upper back pain',
                  'Lower back pain', 'Hip pain or tightness', 'Knee or ankle issues',
                  'Hand, wrist, or arm pain', 'Jaw pain (TMJ)', 'Headaches / migraines',
                  'Balance difficulties', 'Fatigue', 'Numbness or tingling',
                  'Thoracic Outlet Syndrome', 'Neuropathy', 'Fibromyalgia',
                  'Stress or anxiety', 'Sleep difficulties', 'Breathing difficulties',
                ]} />
                <TextArea
                  label="Where do you experience the most discomfort? (Describe the location)"
                  field="painLocations"
                  rows={2}
                />
                <div className="mb-4">
                  <label className="block text-sm font-medium text-brand-600 mb-2">
                    Pain / discomfort level (0 = none, 10 = worst imaginable)
                  </label>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-brand-400">0</span>
                    <input
                      type="range" min="0" max="10" step="1"
                      value={form.painLevel}
                      onChange={(e) => update('painLevel', parseInt(e.target.value))}
                      className="flex-1 accent-brand-500"
                    />
                    <span className="text-sm text-brand-400">10</span>
                    <span className="font-display text-2xl text-brand-700 w-8 text-center">{form.painLevel}</span>
                  </div>
                </div>
              </>
            )}

            {/* ── STEP: Medical History ── */}
            {step === 'history' && (
              <>
                <h2 className="font-display text-xl text-brand-900 mb-6">Medical History</h2>
                <p className="text-sm text-brand-600 mb-2">
                  Please check any conditions you have been diagnosed with or are currently managing:
                </p>
                <CheckboxGroup field="medicalHistory" cols={2} options={[
                  'Heart condition', 'High / Low blood pressure', 'Stroke',
                  'Diabetes', 'Cancer (current or past)', 'Osteoporosis',
                  'Arthritis', 'Scoliosis', 'Disc herniation / bulge',
                  'Spinal stenosis', 'Joint replacement', 'Lyme disease',
                  'Autoimmune condition', 'Neurological condition', 'Epilepsy / seizures',
                  'Mental health diagnosis', 'Chronic fatigue syndrome', 'Other (describe below)',
                ]} />
                <Input label="Other conditions not listed" field="otherConditions" />
                <TextArea label="Surgeries (include approximate dates)" field="surgeries" rows={2} />
                <TextArea label="Current medications and supplements" field="medications" rows={2} />
                <p className="text-sm font-medium text-brand-600 mb-2">
                  Are you currently pregnant or could you be?
                </p>
                <RadioGroup field="pregnant" options={['Yes', 'No', 'Not applicable']} />
                <Input label="Allergies (medications, latex, oils, lotions, etc.)" field="allergies" />
              </>
            )}

            {/* ── STEP: Movement History ── */}
            {step === 'movement' && (
              <>
                <h2 className="font-display text-xl text-brand-900 mb-6">Movement &amp; Activity History</h2>
                <p className="text-sm text-brand-600 mb-2">
                  Have you previously tried any of the following?
                </p>
                <CheckboxGroup field="previousModalities" cols={2} options={[
                  'Physical therapy', 'Chiropractic', 'Massage therapy',
                  'Yoga', 'Pilates', 'Tai Chi / Qigong',
                  'Feldenkrais Method', 'Anat Baniel Method', 'Alexander Technique',
                  'Personal training', 'Acupuncture', 'Other somatic practice',
                ]} />
                <p className="text-sm font-medium text-brand-600 mb-2">
                  Current physical activity level:
                </p>
                <RadioGroup field="activityLevel" options={[
                  'Sedentary', 'Light activity', 'Moderate (2–4x/week)', 'Active (5+x/week)',
                ]} />
                <TextArea
                  label="Activities or hobbies you hope to maintain, return to, or improve"
                  field="activitiesGoal"
                  rows={2}
                  placeholder="Surfing, skiing, playing with grandchildren, gardening, etc."
                />
              </>
            )}

            {/* ── STEP: Goals ── */}
            {step === 'goals' && (
              <>
                <h2 className="font-display text-xl text-brand-900 mb-6">Your Goals</h2>
                <p className="text-sm text-brand-600 mb-2">
                  What would you most like to get out of working with NeuroRefinement?
                </p>
                <CheckboxGroup field="goals" cols={2} options={[
                  'Reduce pain', 'Move more easily', 'Improve posture',
                  'Better balance / fall prevention', 'Athletic performance',
                  'Stress / anxiety relief', 'Better sleep',
                  'Feel younger / more vital', 'Learn new movement skills',
                  'Recover from injury or surgery', 'General wellness & vitality',
                  'Life / career / business coaching',
                ]} />
                <TextArea
                  label="Is there anything else you'd like Bryan to know?"
                  field="anythingElse"
                  rows={3}
                  placeholder="Concerns, preferences, questions, special circumstances…"
                />
              </>
            )}

            {/* ── STEP: Consent ── */}
            {step === 'consent' && (
              <>
                <h2 className="font-display text-xl text-brand-900 mb-4">Consent &amp; Agreement</h2>

                <div className="bg-gold-50 border border-gold-200 rounded-xl p-4 mb-6">
                  <p className="text-gold-700 text-sm font-medium flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    PLACEHOLDER — This consent language must be reviewed by a licensed attorney
                    before use with clients.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Consent to Touch */}
                  <div className="bg-sand-50 rounded-xl p-5">
                    <h3 className="font-display text-lg text-brand-800 mb-3">Consent to Touch</h3>
                    <p className="text-sm text-brand-600 mb-3">
                      Functional Synthesis sessions involve gentle, non-invasive touch through clothing.
                      This touch is always light, never forceful, and focused on movement learning rather
                      than muscle manipulation. You may modify or withdraw consent at any time during a session.
                    </p>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.consentToTouch}
                        onChange={(e) => update('consentToTouch', e.target.checked)}
                        className="mt-0.5 h-5 w-5 rounded border-brand-300 text-brand-500 focus:ring-brand-300"
                      />
                      <span className="text-sm text-brand-700 font-medium">
                        I understand and consent to the gentle, non-invasive touch described above.
                      </span>
                    </label>
                  </div>

                  {/* Photo/Video */}
                  <div>
                    <h3 className="font-display text-lg text-brand-800 mb-2">Photo / Video Consent (Optional)</h3>
                    <RadioGroup field="photoConsent" options={[
                      'I consent to photo/video for marketing & education',
                      'I do not consent to photo/video use',
                    ]} />
                  </div>

                  {/* Communication */}
                  <div>
                    <h3 className="font-display text-lg text-brand-800 mb-2">Communication Preferences</h3>
                    <CheckboxGroup field="communicationPrefs" cols={3} options={[
                      'Phone call', 'Text message', 'Email',
                      'Newsletter / educational content', 'Appointment reminders',
                    ]} />
                  </div>

                  {/* Privacy acknowledgment */}
                  <div className="bg-sand-50 rounded-xl p-5">
                    <label className="flex items-start gap-3 cursor-pointer mb-4">
                      <input
                        type="checkbox"
                        checked={form.privacyAcknowledged}
                        onChange={(e) => update('privacyAcknowledged', e.target.checked)}
                        className="mt-0.5 h-5 w-5 rounded border-brand-300 text-brand-500 focus:ring-brand-300"
                      />
                      <span className="text-sm text-brand-700">
                        I have read and acknowledge the{' '}
                        <a href="/privacy" className="text-sage-500 underline">Privacy Policy</a>{' '}
                        and{' '}
                        <a href="/disclaimer" className="text-sage-500 underline">Disclaimer</a>.
                        I understand that NeuroRefinement provides educational wellness services,
                        not medical treatment.
                      </span>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.infoAccurate}
                        onChange={(e) => update('infoAccurate', e.target.checked)}
                        className="mt-0.5 h-5 w-5 rounded border-brand-300 text-brand-500 focus:ring-brand-300"
                      />
                      <span className="text-sm text-brand-700">
                        I confirm that the information I&apos;ve provided is true and accurate to the best
                        of my knowledge. I agree to update NeuroRefinement of any changes to my health status.
                      </span>
                    </label>
                  </div>
                </div>
              </>
            )}

            {/* ── Navigation Buttons ── */}
            <div className="flex justify-between mt-8 pt-6 border-t border-sand-200">
              <button
                onClick={prev}
                disabled={currentIndex === 0}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-sand-200
                  text-brand-500 text-sm font-medium disabled:opacity-30 hover:bg-sand-50 transition"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>

              {step === 'consent' ? (
                <button
                  onClick={handleSubmit}
                  disabled={!form.infoAccurate || !form.privacyAcknowledged || !form.consentToTouch || submitting}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-brand-500 text-white
                    text-sm font-semibold disabled:opacity-40 hover:bg-brand-600 transition shadow-warm"
                >
                  {submitting ? 'Submitting…' : 'Submit Intake Form'}
                  <CheckCircle className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={next}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-brand-500 text-white
                    text-sm font-semibold hover:bg-brand-600 transition shadow-warm"
                >
                  Next <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
