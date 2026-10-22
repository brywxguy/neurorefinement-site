import type { Metadata } from 'next'
import Link from 'next/link'
import { FAQ, Section } from '@/components/ui'
import { faqItems } from '@/lib/faq'
import { pageMetadata } from '@/lib/metadata'

export const metadata: Metadata = pageMetadata('/faq', {
  title: 'FAQ',
  description: 'Answers about Functional Synthesis lessons, location, scheduling, payment, and working with children.',
})

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
}

export default function FaqPage() {
  return (
    <Section className="pt-12 md:pt-16">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block text-sm font-medium text-brand-500 uppercase tracking-wider mb-3">FAQ</span>
          <h1 className="font-display text-4xl md:text-5xl text-brand-900">Common Questions</h1>
        </div>
        <FAQ items={faqItems} />
        <p className="text-center text-brand-600 mt-8">
          Still have a question?{' '}
          <Link href="/contact" className="text-ocean-600 underline underline-offset-2 hover:text-ocean-700">
            Contact Bryan
          </Link>
          .
        </p>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </Section>
  )
}
