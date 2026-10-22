import { Metadata } from 'next'
import { Section } from '@/components/ui'
import { freeLesson } from '@/lib/config'
import { FreeLessonGate } from './FreeLessonGate'
import { pageMetadata } from '@/lib/metadata'

export const metadata: Metadata = pageMetadata('/lessons/free-intro-reset', {
  title: `${freeLesson.label}: ${freeLesson.title}`,
  description: 'A free, gentle guided movement lesson you can do at home. No equipment needed.',
})

export default function FreeLessonPage() {
  return (
    <Section className="pt-12 md:pt-16">
      <div className="max-w-2xl mx-auto text-center">
        <span className="inline-block text-sm font-medium text-brand-500 uppercase tracking-wider mb-3">
          {freeLesson.label}
        </span>
        <h1 className="font-display text-4xl md:text-5xl text-brand-900 mb-6">{freeLesson.title}</h1>
        <p className="text-xl text-brand-600 leading-relaxed mb-8">
          Your free introduction to NeuroRefinement. A gentle full-body scan and reset you can do anywhere —
          no equipment needed, just a comfortable place to lie down.
        </p>

        <FreeLessonGate title={freeLesson.title} audioUrl={freeLesson.audioUrl} />

        <p className="text-sm text-brand-500 leading-relaxed mt-8">
          Educational wellness content, not medical treatment. If any movement causes discomfort, stop and
          rest or make the movement smaller.
        </p>
      </div>
    </Section>
  )
}
