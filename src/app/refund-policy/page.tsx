import { Metadata } from 'next'
import { Section } from '@/components/ui'

export const metadata: Metadata = { title: 'Refund Policy' }

export default function RefundPolicyPage() {
  return (
    <Section className="pt-12 md:pt-16">
      <div className="container-narrow">
        <h1 className="font-display text-4xl text-brand-900 mb-8">Refund Policy</h1>
        <div className="bg-gold-50 border border-gold-200 rounded-xl p-6 mb-8">
          <p className="text-gold-700 text-sm font-medium">
            ⚠️ PLACEHOLDER — Must be reviewed by a licensed attorney before launch.
          </p>
        </div>
        <div className="prose-nr">
          <h2>Digital Products (Audio Lessons & Bundles)</h2>
          <p>Due to the digital nature of our audio lessons, all sales are final once the content has been accessed or downloaded. If you experience technical issues preventing access, please contact us within 7 days of purchase and we&apos;ll work to resolve the issue or provide a refund.</p>
          <h2>1:1 Sessions (ABM & Coaching)</h2>
          <p>Cancellations made at least 24 hours before the scheduled session will receive a full refund or credit toward a future session. No-shows and cancellations within 24 hours are non-refundable. Session packs are non-refundable but transferable to another person with notice.</p>
          <h2>Group Classes</h2>
          <p>Drop-in class fees are non-refundable. 6-week series registrations may be refunded if cancelled before the first class. Monthly pass subscriptions may be cancelled at any time; no refund for the current billing period.</p>
          <h2>Membership</h2>
          <p>Membership subscriptions may be cancelled at any time. Cancellation takes effect at the end of the current billing period. No pro-rated refunds for partial months.</p>
          <h2>How to Request a Refund</h2>
          <p>Contact us at bryan@neurorefinement.com with your name, email, and purchase details. We aim to respond within 2 business days.</p>
          <p className="text-sm text-brand-400 mt-8">Last updated: February 2026</p>
        </div>
      </div>
    </Section>
  )
}
