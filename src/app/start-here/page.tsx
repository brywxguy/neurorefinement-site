'use client'

import { useState } from 'react'
import { Button, Section, SectionHeader } from '@/components/ui'
import { ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react'

type Step = 'concerns' | 'areas' | 'goals' | 'history' | 'info' | 'complete'

export default function StartHerePage() {
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
  const [submitted, setSubmitted] = useState(false)

  const toggleItem = (field: 'concerns' | 'painAreas' | 'goals', value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value],
    }))
  }

  const handleSubmit = async () => {
    try {
      await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setSubmitted(true)
      setStep('complete')
    } catch (err) {
      alert('Something went wrong. Please try again.')
    }
  }

  const steps: Step[] = ['concerns', 'areas', 'goals', 'history', 'info', 'complete']
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
          {step !== 'complete' && (
            <div className="flex gap-2 max-w-xs mx-auto mb-8">
              {steps.slice(0, -1).map((s, i) => (
                <div
                  key={s}
                  className={`h-1.5 flex-1 rounded-full transition-colors ${
                    i <= currentIndex ? 'bg-brand-500' : 'bg-brand-200'
                  }`}
                />
              ))}
            </div>
          )}
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
                {[
                  'Pain or discomfort',
                  'Stiffness or limited mobility',
                  'Stress or tension',
                  'Better posture',
                  'Athletic performance',
                  'Balance or fall concerns',
                  'Recovery from injury/surgery',
                  'Nerve pain or neuropathy',
                  'General wellness & vitality',
                  'Life or career direction',
                  'Curiosity about this approach',
                  'Other',
                ].map((concern) => (
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
                {[
                  'Less pain, more comfort',
                  'Better flexibility and range',
                  'Improved balance and stability',
                  'More energy and vitality',
                  'Better sleep',
                  'Athletic improvement',
                  'Career clarity and direction',
                  'More confidence in my body',
                  'Stress management',
                  'Connection and community',
                ].map((goal) => (
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
                Last step — how can we reach you?
              </h2>
              <div className="space-y-4 mb-8">
                <input
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-brand-200 text-brand-800 focus:outline-none focus:border-brand-500"
                />
                <input
                  type="email"
                  placeholder="Email address"
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
              <div className="flex gap-3">
                <Button variant="ghost" onClick={() => setStep('history')}>
                  <ArrowLeft className="mr-2 w-4 h-4" /> Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!form.name || !form.email || !form.consent}
                >
                  Get My Recommendations <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Complete */}
          {step === 'complete' && (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-brand-100 text-brand-500 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h2 className="font-display text-3xl text-brand-900 mb-4">
                You&apos;re All Set, {form.name.split(' ')[0]}!
              </h2>
              <p className="text-lg text-brand-600 mb-8 max-w-lg mx-auto">
                Based on what you shared, here&apos;s your personalized starting point.
                We&apos;ve also sent a copy to your email.
              </p>

              {/* Personalized Recommendations (rule-based MVP) */}
              <div className="bg-white rounded-2xl border border-brand-100/50 p-8 text-left max-w-lg mx-auto mb-8">
                <h3 className="font-display text-xl text-brand-800 mb-4">Your Recommended Path</h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <span className="font-display text-2xl text-brand-300">1</span>
                    <div>
                      <p className="font-medium text-brand-800">Start with the free 15-Minute Reset</p>
                      <p className="text-sm text-brand-500">Get a feel for the approach in the comfort of home.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-display text-2xl text-brand-300">2</span>
                    <div>
                      <p className="font-medium text-brand-800">
                        {form.concerns.includes('Pain or discomfort') || form.concerns.includes('Nerve pain or neuropathy')
                          ? 'Book a 90-min Deep Dive session'
                          : form.concerns.includes('Life or career direction')
                          ? 'Book a coaching session'
                          : 'Explore the audio lesson library'}
                      </p>
                      <p className="text-sm text-brand-500">
                        {form.concerns.includes('Pain or discomfort')
                          ? 'A hands-on Functional Synthesis session is the best next step for pain and discomfort.'
                          : 'Find lessons matched to your specific goals and interests.'}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-display text-2xl text-brand-300">3</span>
                    <div>
                      <p className="font-medium text-brand-800">Consider membership for ongoing support</p>
                      <p className="text-sm text-brand-500">Full library access, monthly live classes, and community.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/lessons/free-intro-reset" size="lg">
                  Start Free Lesson
                </Button>
                <Button href="/functional-synthesis" variant="outline" size="lg">
                  Book a Session
                </Button>
              </div>
            </div>
          )}
        </div>
      </Section>
    </>
  )
}
