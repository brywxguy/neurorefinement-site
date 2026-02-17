import { Metadata } from 'next'
import { Section } from '@/components/ui'

export const metadata: Metadata = { title: 'Privacy Policy' }

export default function PrivacyPage() {
  return (
    <Section className="pt-12 md:pt-16">
      <div className="container-narrow">
        <h1 className="font-display text-4xl text-brand-900 mb-8">Privacy Policy</h1>
        <div className="bg-gold-50 border border-gold-200 rounded-xl p-6 mb-8">
          <p className="text-gold-700 text-sm font-medium">
            ⚠️ PLACEHOLDER — This privacy policy must be reviewed by a licensed attorney and customized for your specific business practices before launch.
          </p>
        </div>
        <div className="prose-nr">
          <p>NeuroRefinement (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) respects your privacy. This policy explains how we collect, use, and protect your personal information when you visit our website or use our services.</p>
          <h2>Information We Collect</h2>
          <p>We may collect information you provide directly (name, email, intake form responses, payment information) and information collected automatically (analytics data, cookies). Payment processing is handled by Stripe; we do not store credit card numbers.</p>
          <h2>How We Use Your Information</h2>
          <p>We use your information to provide services, process payments, send communications you&apos;ve opted into, and improve our offerings. We do not sell your personal information to third parties.</p>
          <h2>Third-Party Services</h2>
          <p>We use Stripe (payments), Calendly (scheduling), ConvertKit (email), Supabase (data storage), and Plausible (privacy-focused analytics). Each has its own privacy policy.</p>
          <h2>Contact</h2>
          <p>Questions about this policy? Contact us at bryan@neurorefinement.com.</p>
          <p className="text-sm text-brand-400 mt-8">Last updated: February 2026</p>
        </div>
      </div>
    </Section>
  )
}
