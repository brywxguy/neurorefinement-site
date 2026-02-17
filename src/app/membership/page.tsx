import { Metadata } from 'next'
import { Button, Section, SectionHeader, Card, PriceTag } from '@/components/ui'
import { ArrowRight, Check, Play, Calendar, MessageSquare, Gift, Heart } from 'lucide-react'
import { pricing } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Membership — Ongoing Refinement & Community',
  description: 'Join the NeuroRefinement community for full audio library access, monthly live classes, new lesson drops, Q&A, and member discounts.',
}

export default function MembershipPage() {
  return (
    <>
      <Section className="pt-12 md:pt-16">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block text-sm font-medium text-brand-500 uppercase tracking-wider mb-3">
            Membership
          </span>
          <h1 className="font-display text-4xl md:text-5xl text-brand-900 mb-6">
            Ongoing Refinement, Ongoing Support
          </h1>
          <p className="text-xl text-brand-600 leading-relaxed">
            Real change happens over time. Membership gives you the library, community,
            and live support to keep refining — at your own pace.
          </p>
        </div>
      </Section>

      <Section variant="light">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Standard Membership */}
          <Card className="relative border-brand-300">
            <span className="absolute -top-3 left-6 inline-block text-xs font-medium bg-brand-500 text-white px-3 py-1 rounded-full">
              Most Popular
            </span>
            <h3 className="font-display text-2xl text-brand-900 mb-2 mt-2">
              {pricing.membership.standard.label}
            </h3>
            <PriceTag price={pricing.membership.standard.price} period="month" size="lg" />
            <p className="text-brand-600 mt-4 mb-6">
              Full access to the NeuroRefinement ecosystem — lessons, community, and live support.
            </p>
            <div className="space-y-3 mb-8">
              {[
                { icon: <Play className="w-4 h-4" />, text: 'Full audio lesson library access' },
                { icon: <Calendar className="w-4 h-4" />, text: 'Monthly live group class' },
                { icon: <Gift className="w-4 h-4" />, text: 'New lesson drops every month' },
                { icon: <MessageSquare className="w-4 h-4" />, text: 'Monthly Q&A with Bryan' },
                { icon: <Check className="w-4 h-4" />, text: '10% off all 1:1 sessions' },
                { icon: <Check className="w-4 h-4" />, text: 'Personalized lesson pathway' },
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-3 text-brand-700">
                  <span className="text-brand-500">{benefit.icon}</span>
                  <span className="text-sm">{benefit.text}</span>
                </div>
              ))}
            </div>
            <Button className="w-full">
              Join Membership
            </Button>
          </Card>

          {/* Faith + Function */}
          <Card>
            <h3 className="font-display text-2xl text-brand-900 mb-2">
              {pricing.membership.faithFunction.label}
            </h3>
            <PriceTag price={pricing.membership.faithFunction.price} period="month" size="lg" />
            <p className="text-brand-600 mt-4 mb-6">
              A smaller community space for those who want to explore movement and wellness
              through a values-based, faith-aligned lens.
            </p>
            <div className="space-y-3 mb-8">
              {[
                { icon: <Heart className="w-4 h-4" />, text: 'Monthly faith-aligned discussion' },
                { icon: <Play className="w-4 h-4" />, text: 'Select audio lesson access' },
                { icon: <MessageSquare className="w-4 h-4" />, text: 'Private community space' },
                { icon: <Check className="w-4 h-4" />, text: 'Values-based encouragement' },
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-3 text-brand-700">
                  <span className="text-brand-500">{benefit.icon}</span>
                  <span className="text-sm">{benefit.text}</span>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full">
              Join Community
            </Button>
          </Card>
        </div>
      </Section>
    </>
  )
}
