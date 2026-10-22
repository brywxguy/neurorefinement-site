import { Metadata } from 'next'
import { Play } from 'lucide-react'
import { Button, Card, Section } from '@/components/ui'
import { freeLesson, siteConfig } from '@/lib/config'

export const metadata: Metadata = {
  title: `${freeLesson.label}: ${freeLesson.title}`,
  description: 'A free, gentle guided movement lesson you can do at home. No equipment needed.',
}

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

        <Card hover={false} className="text-left">
          {freeLesson.audioUrl ? (
            <>
              <h2 className="font-display text-xl text-brand-800 mb-4 flex items-center gap-2">
                <Play className="w-5 h-5 text-brand-500" /> Listen now
              </h2>
              <audio controls preload="none" src={freeLesson.audioUrl} className="w-full">
                Your browser can&apos;t play this recording.{' '}
                <a href={freeLesson.audioUrl} className="text-ocean-600 underline">Download it instead</a>.
              </audio>
            </>
          ) : (
            <>
              <h2 className="font-display text-xl text-brand-800 mb-2">The recording is on its way to the site</h2>
              <p className="text-brand-600 leading-relaxed mb-6">
                Ask Bryan and he&apos;ll send you the lesson directly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/contact">Request the Free Lesson</Button>
                <Button href={`mailto:${siteConfig.contact.email}?subject=Free%20lesson`} variant="outline">
                  Email Bryan
                </Button>
              </div>
            </>
          )}
        </Card>

        <p className="text-sm text-brand-500 leading-relaxed mt-8">
          Educational wellness content, not medical treatment. If any movement causes discomfort, stop and
          rest or make the movement smaller.
        </p>
      </div>
    </Section>
  )
}
