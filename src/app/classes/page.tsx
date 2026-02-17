import { Metadata } from 'next'
import { Button, Section, SectionHeader, Card, PriceTag, FAQ } from '@/components/ui'
import { ArrowRight, Calendar, Users, MapPin, Clock, CheckCircle } from 'lucide-react'
import { pricing } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Group Classes — Transformational Movement Lessons',
  description: 'Guided group movement explorations in Carlsbad, CA. Drop-in or join a 6-week series. Increase awareness, reduce effort, and discover new options.',
}

export default function ClassesPage() {
  return (
    <>
      <Section className="pt-12 md:pt-16">
        <div className="max-w-3xl">
          <span className="inline-block text-sm font-medium text-brand-500 uppercase tracking-wider mb-3">
            Group Classes
          </span>
          <h1 className="font-display text-4xl md:text-5xl text-brand-900 mb-6">
            Transformational Movement Lessons
          </h1>
          <p className="text-xl text-brand-600 leading-relaxed mb-8">
            Guided group explorations inspired by Awareness Through Movement&reg; principles.
            Increase awareness, reduce unnecessary effort, and expand your movement options
            — in a supportive community setting.
          </p>
          <Button href="#schedule" size="lg">
            See Schedule <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </Section>

      {/* What to Expect */}
      <Section variant="light">
        <SectionHeader
          eyebrow="What to expect"
          title="Your Class Experience"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="space-y-4">
            {[
              'Guided verbal instructions — no demonstrations to copy',
              'Gentle, slow movements performed lying down or sitting',
              'Focus on awareness and quality, not repetition or effort',
              'Suitable for all ages and fitness levels',
              'Each class is a unique exploration — no two are the same',
            ].map((item, i) => (
              <div key={i} className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
                <span className="text-brand-700">{item}</span>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-2xl p-6 border border-brand-100/50">
            <h3 className="font-display text-lg text-brand-800 mb-4">What to bring</h3>
            <ul className="space-y-2 text-sm text-brand-600">
              <li>Comfortable, loose-fitting clothes</li>
              <li>A yoga mat or blanket to lie on</li>
              <li>A small towel for under your head</li>
              <li>Water bottle</li>
              <li>An open mind and sense of curiosity</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Pricing */}
      <Section variant="warm">
        <SectionHeader eyebrow="Pricing" title="Class Options" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <Card className="text-center">
            <h3 className="font-display text-lg text-brand-800 mb-2">{pricing.classes.dropIn.label}</h3>
            <PriceTag price={pricing.classes.dropIn.price} />
            <p className="text-xs text-brand-400 mt-3">No commitment required</p>
          </Card>
          <Card className="text-center border-brand-300">
            <span className="inline-block text-xs font-medium bg-brand-500 text-white px-3 py-1 rounded-full mb-4">Best Value</span>
            <h3 className="font-display text-lg text-brand-800 mb-2">{pricing.classes.series6.label}</h3>
            <PriceTag price={pricing.classes.series6.price} />
            <p className="text-xs text-brand-500 mt-2">${pricing.classes.series6.perSession}/class</p>
          </Card>
          <Card className="text-center">
            <h3 className="font-display text-lg text-brand-800 mb-2">{pricing.classes.monthlyPass.label}</h3>
            <PriceTag price={pricing.classes.monthlyPass.price} period="month" />
          </Card>
        </div>
      </Section>

      {/* Schedule Placeholder */}
      <Section id="schedule">
        <SectionHeader
          eyebrow="Schedule"
          title="Upcoming Classes"
          description="Class schedule coming soon. Join the newsletter to be notified when classes are posted."
        />
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-2xl border border-brand-100/50 p-12">
            <Calendar className="w-12 h-12 text-brand-300 mx-auto mb-4" />
            <p className="text-brand-500 mb-4">Class schedule is being finalized</p>
            <p className="text-sm text-brand-400 mb-6">
              Sign up for the newsletter to be the first to know when classes are available.
            </p>
            <Button href="/contact" variant="outline">
              Contact Me for Details
            </Button>
          </div>
        </div>
      </Section>

      {/* Waiver Notice */}
      <Section variant="light">
        <div className="container-narrow text-center">
          <p className="text-sm text-brand-400">
            <strong>Note:</strong> All class participants are required to complete a waiver
            form before their first class. A link to the waiver will be provided upon
            registration. Please consult your healthcare provider before beginning any new
            movement practice.
          </p>
        </div>
      </Section>
    </>
  )
}
