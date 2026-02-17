import { Metadata } from 'next'
import { Section } from '@/components/ui'

export const metadata: Metadata = { title: 'Terms of Service' }

export default function TermsPage() {
  return (
    <Section className="pt-12 md:pt-16">
      <div className="container-narrow">
        <h1 className="font-display text-4xl text-brand-900 mb-8">Terms of Service</h1>
        <div className="bg-gold-50 border border-gold-200 rounded-xl p-6 mb-8">
          <p className="text-gold-700 text-sm font-medium">
            ⚠️ PLACEHOLDER — Must be reviewed by a licensed attorney before launch.
          </p>
        </div>
        <div className="prose-nr">
          <p>By using NeuroRefinement&apos;s website and services, you agree to these terms. Please read them carefully.</p>
          <h2>Services</h2>
          <p>NeuroRefinement provides educational wellness services including movement sessions, coaching, group classes, and digital audio lessons. These are not medical services. See our Disclaimer page for full details.</p>
          <h2>Payments & Cancellations</h2>
          <p>All payments are processed securely through Stripe. Cancellation policies apply: please cancel at least 24 hours before a scheduled session. See our Refund Policy for digital product returns.</p>
          <h2>Intellectual Property</h2>
          <p>All content on this website — including audio lessons, articles, and written materials — is the property of NeuroRefinement and may not be reproduced without permission. Purchased digital lessons are licensed for personal use only.</p>
          <h2>Limitation of Liability</h2>
          <p>NeuroRefinement is not liable for any injury, loss, or damage arising from the use of our services. You participate at your own risk and should consult with your healthcare provider before beginning any movement program.</p>
          <p className="text-sm text-brand-400 mt-8">Last updated: February 2026</p>
        </div>
      </div>
    </Section>
  )
}
