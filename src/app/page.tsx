import Link from 'next/link'
import Image from 'next/image'
import { Button, Section, SectionHeader, Card, TestimonialCard } from '@/components/ui'
import { siteConfig, pricing, booking, lessonThemes, testimonials, otherLessonsNote, freeLesson } from '@/lib/config'
import { ThemeIcon } from '@/components/ui/ThemeIcon'
import { VisitStrip } from '@/components/booking/VisitStrip'
import { ArrowRight, Play, Brain, Heart, Sparkles, Users, Waves, Target, Sun, Baby } from 'lucide-react'

export default function HomePage() {
  return (
    <>
      {/* ============================================================
          HERO
          ============================================================ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-sand-50 to-sand-50 grain">
        <div className="container-wide relative z-10 pt-16 pb-20 md:pt-24 md:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-100 text-brand-700 text-sm font-medium rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              Neuroplasticity-based movement learning
            </span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-brand-900 mb-6 leading-tight">
              Refine Movement.
              <br />
              <span className="text-brand-500">Revitalize Life.</span>
            </h1>
            <p className="text-xl md:text-2xl text-brand-600 leading-relaxed mb-10 max-w-2xl">
              Gentle, science-informed ABM NeuroMovement lessons that help your brain
              find new options for ease, function, and vitality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="/start-here" size="lg">
                Start Here — Take the Quiz
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button href="/lessons" variant="outline" size="lg">
                <Play className="mr-2 w-5 h-5" />
                Browse Lessons
              </Button>
            </div>
            <p className="mt-6 text-sm text-brand-400">
              {siteConfig.location.short}
            </p>
          </div>

          {/* Hero Image */}
          <div className="hidden lg:block relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-warm-lg">
              <Image
                src="/images/hero-atm-class.jpeg"
                alt="Anat Baniel Method group class — students practicing gentle floor movements"
                width={800}
                height={1000}
                className="object-cover w-full h-full grayscale"
                priority
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-card border border-brand-100/50 px-5 py-3">
              <p className="text-xs font-medium text-brand-600">Neuroplasticity-based movement</p>
              <p className="text-xs text-brand-400">Gentle &middot; Precise &middot; Transformative</p>
            </div>
          </div>
          </div>

          {/* Decorative concentric ring watermarks */}
          <svg className="absolute -top-20 -right-20 w-[500px] h-[500px] opacity-[0.07]" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="60" cy="60" r="55" stroke="#2A4E5E" strokeWidth="3.5" />
            <circle cx="60" cy="60" r="46" stroke="#2A4E5E" strokeWidth="3.5" />
            <circle cx="60" cy="60" r="37" stroke="#3B6F8E" strokeWidth="3.5" />
            <circle cx="60" cy="60" r="28" stroke="#3B6F8E" strokeWidth="3.5" />
            <circle cx="60" cy="60" r="19" stroke="#2A4E5E" strokeWidth="4" />
            <circle cx="60" cy="60" r="10" stroke="#2A4E5E" strokeWidth="4" />
            <circle cx="60" cy="60" r="3" fill="#D4A853" />
          </svg>
          <svg className="absolute bottom-0 -left-16 w-[300px] h-[300px] opacity-[0.05]" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="60" cy="60" r="55" stroke="#2A4E5E" strokeWidth="3.5" />
            <circle cx="60" cy="60" r="46" stroke="#2A4E5E" strokeWidth="3.5" />
            <circle cx="60" cy="60" r="37" stroke="#3B6F8E" strokeWidth="3.5" />
            <circle cx="60" cy="60" r="28" stroke="#3B6F8E" strokeWidth="3.5" />
            <circle cx="60" cy="60" r="19" stroke="#2A4E5E" strokeWidth="4" />
            <circle cx="60" cy="60" r="10" stroke="#2A4E5E" strokeWidth="4" />
            <circle cx="60" cy="60" r="3" fill="#D4A853" />
          </svg>
        </div>
      </section>

      {/* ============================================================
          WHO IT'S FOR — Customer Segments
          ============================================================ */}
      <Section variant="light">
        <SectionHeader
          eyebrow="Who this is for"
          title="Find Your Path to Ease"
          description="Whether you're an athlete refining performance, someone navigating chronic pain, or simply seeking more vitality — there's a place for you here."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            {
              icon: <Waves className="w-7 h-7" />,
              title: 'Active Adults & Athletes',
              description: 'Surfers, skiers, and weekend warriors seeking better coordination, balance, and injury-resilient movement.',
              href: '/lessons?theme=athletes',
            },
            {
              icon: <Sun className="w-7 h-7" />,
              title: 'Older Adults',
              description: 'Improve balance, prevent falls, and move with more vitality. Gentle lessons that respect where you are today.',
              href: '/lessons?theme=balance-fall-prevention',
            },
            {
              icon: <Target className="w-7 h-7" />,
              title: 'Busy Professionals',
              description: 'Undo the damage of desk work. Release neck and shoulder tension, improve posture, and breathe easier.',
              href: '/lessons?theme=neck-shoulders',
            },
            {
              icon: <Heart className="w-7 h-7" />,
              title: 'Chronic Pain & Neuropathy',
              description: 'Thoracic Outlet Syndrome, nerve pain, and persistent aches. A gentle, neuroplasticity-based alternative to forcing through pain.',
              href: '/lessons?theme=tos-upper-extremity',
            },
            {
              icon: <Baby className="w-7 h-7" />,
              title: 'Children with Special Needs',
              description: 'Brain-based movement for children with developmental challenges, cerebral palsy, autism spectrum, and other neurological conditions.',
              href: '/children',
            },
          ].map((segment) => (
            <Card key={segment.title} href={segment.href} className="group text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-50 text-brand-500 mb-5 group-hover:bg-brand-100 transition-colors">
                {segment.icon}
              </div>
              <h3 className="font-display text-xl text-brand-800 mb-3">{segment.title}</h3>
              <p className="text-sm text-brand-600 leading-relaxed">{segment.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* ============================================================
          HOW IT WORKS — Start Here
          ============================================================ */}
      <Section variant="warm">
        <SectionHeader
          eyebrow="How it works"
          title="Three Steps to Getting Started"
          description="No pressure, no complicated intake process. Just a simple path to discovering what your brain and body are capable of."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            {
              step: '01',
              title: 'Take the Questionnaire',
              description: "Tell us what's going on — your concerns, goals, and movement history. It takes about 3 minutes.",
              cta: { label: 'Start Here', href: '/start-here' },
            },
            {
              step: '02',
              title: 'Try a Free Lesson',
              description: 'Experience a gentle guided movement lesson. No equipment needed — just a comfortable place to lie down.',
              cta: { label: freeLesson.label, href: freeLesson.href },
            },
            {
              step: '03',
              title: 'Book or Browse',
              description: `Ready for more? Book a ${booking.events.freeCall.label} or your ${booking.events.newClientLesson.label}, join a TML lesson, or explore the audio lesson library at your own pace.`,
              cta: { label: 'See Options', href: '/work-with-me' },
            },
          ].map((step) => (
            <div key={step.step} className="text-center">
              <span className="inline-block font-display text-5xl text-brand-200 mb-4">
                {step.step}
              </span>
              <h3 className="font-display text-xl text-brand-800 mb-3">{step.title}</h3>
              <p className="text-brand-600 leading-relaxed mb-5">{step.description}</p>
              <Button href={step.cta.href} variant="ghost" size="sm">
                {step.cta.label} <ArrowRight className="ml-1 w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </Section>

      {/* ============================================================
          SERVICES OVERVIEW
          ============================================================ */}
      <Section>
        <SectionHeader
          eyebrow="Services"
          title="How We Work Together"
          description="From precision 1:1 sessions to on-demand audio lessons — choose the format that fits your life."
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[
            {
              icon: <Brain className="w-6 h-6" />,
              title: 'Functional Synthesis',
              subtitle: '1:1 hands-on lessons',
              description: 'Gentle, precise movement lessons guided by touch. Your brain learns new patterns for better coordination, less pain, and expanded possibilities.',
              price: `$${pricing.abm.session.price} · about ${pricing.abm.session.duration} min`,
              href: '/functional-synthesis',
            },
            {
              icon: <Users className="w-6 h-6" />,
              title: 'TML Lessons',
              subtitle: 'Individual or group Transformational Movement Lessons (ABM NeuroMovement)',
              description: 'Guided explorations that increase awareness, reduce effort, and open new movement options, one-on-one or in a small group.',
              price: `Group from $${pricing.classes.dropIn.price}`,
              href: '/classes',
            },
            {
              icon: <Play className="w-6 h-6" />,
              title: 'Audio Lesson Library',
              subtitle: 'Voice-guided movement lessons',
              description: "On-demand lessons organized by theme — backs, posture, surfing, stress, TOS, and more. Learn at your own pace, anytime, anywhere.",
              price: `From $${pricing.lessons.single.price}`,
              href: '/lessons',
            },
          ].map((service) => (
            <Card key={service.title} href={service.href} className="group flex gap-5">
              <div className="shrink-0 w-12 h-12 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center group-hover:bg-brand-100 transition-colors">
                {service.icon}
              </div>
              <div>
                <h3 className="font-display text-xl text-brand-800 mb-1">{service.title}</h3>
                <p className="text-sm text-brand-500 mb-2">{service.subtitle}</p>
                <p className="text-sm text-brand-600 leading-relaxed mb-3">{service.description}</p>
                <span className="text-sm font-medium text-brand-500">{service.price}</span>
              </div>
            </Card>
          ))}
        </div>
        <p className="text-center text-brand-600 leading-relaxed mt-8 max-w-2xl mx-auto">{otherLessonsNote}</p>
      </Section>

      {/* ============================================================
          LESSON THEMES PREVIEW
          ============================================================ */}
      <Section variant="light">
        <SectionHeader
          eyebrow="Audio Lesson Library"
          title="Explore by Theme"
          description="Each lesson is a guided movement exploration — 15 to 45 minutes of gentle learning for your brain and body."
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {lessonThemes.slice(0, 10).map((theme) => (
            <Link
              key={theme.slug}
              href={`/lessons?theme=${theme.slug}`}
              className="group flex flex-col items-center text-center p-5 rounded-2xl bg-white border border-brand-100/50 hover:shadow-card hover:-translate-y-0.5 transition-all"
            >
              <ThemeIcon slug={theme.slug} size={28} className="mb-3" />
              <span className="text-sm font-medium text-brand-700 group-hover:text-brand-900 transition-colors">
                {theme.label}
              </span>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button href="/lessons" variant="outline">
            View All {lessonThemes.length} Themes <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </Section>

      {/* ============================================================
          ABOUT / TRUST
          ============================================================ */}
      <Section variant="warm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block text-sm font-medium text-brand-500 uppercase tracking-wider mb-3">
              About Bryan
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-brand-900 mb-6">
              I Know What It&apos;s Like When Your Body Won&apos;t Cooperate
            </h2>
            <div className="space-y-4 text-brand-700 leading-relaxed">
              <p>
                For nearly two decades, persistent Lyme disease and bilateral Thoracic Outlet
                Syndrome reshaped my life. The nerve pain, fatigue, and physical limitations
                taught me something that no textbook could: when you can&apos;t force your way
                through, you learn to refine your way forward.
              </p>
              <p>
                That journey led me to the Anat Baniel Method&reg; NeuroMovement&reg; — a
                gentle, neuroplasticity-based approach that taught my brain to find new options
                where I thought none existed. As a certified ABM practitioner and strengths-based
                coach, I now help others discover the same thing.
              </p>
              <p>
                Whether you&apos;re navigating chronic pain, chasing athletic performance, or
                simply wanting to feel more at home in your body — I&apos;m here to help your
                brain learn its way to something better.
              </p>
            </div>
            <div className="mt-8 flex gap-4">
              <Button href="/about" variant="outline" size="sm">
                Full Story <ArrowRight className="ml-1 w-4 h-4" />
              </Button>
              <Button href="/start-here" size="sm">
                Work With Me
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-warm-lg">
              <Image
                src="/images/bryan-headshot.jpeg"
                alt="Bryan Thunstrom — ABM NeuroMovement Practitioner, Carlsbad CA"
                width={800}
                height={1000}
                className="object-cover w-full h-full"
              />
            </div>
            {/* Credential badges */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-card border border-brand-100/50 px-5 py-3">
              <p className="text-xs font-medium text-brand-600">Certified ABM® Practitioner</p>
            </div>
          </div>
        </div>
      </Section>

      {/* ============================================================
          PLAN YOUR VISIT
          ============================================================ */}
      <Section variant="light">
        <SectionHeader
          eyebrow="Plan your visit"
          title="Getting Started Is Simple"
          description={`Start with a ${booking.events.freeCall.label} (${booking.events.freeCall.duration} minutes on ${booking.events.freeCall.format}). Your first in-person visit is a ${pricing.abm.newClientLesson.label}: ${pricing.abm.newClientLesson.duration} minutes, $${pricing.abm.newClientLesson.price}, with extra time for discovery and conversation. After that, sessions are about ${pricing.abm.session.duration} minutes, $${pricing.abm.session.price}.`}
        />
        <VisitStrip showIntroCall={false} />
        <div className="text-center mt-8">
          <Button href="/functional-synthesis#booking" size="lg">
            Book a {booking.events.freeCall.label} <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </Section>

      {/* ============================================================
          TESTIMONIALS — hidden until real quotes are added in config.ts
          ============================================================ */}
      {testimonials.length > 0 && (
        <Section>
          <SectionHeader
            eyebrow="What people are saying"
            title="Real Stories of Refinement"
            description="Hear from people who've experienced the difference gentle, brain-based learning can make."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <TestimonialCard key={t.name + t.quote.slice(0, 20)} {...t} />
            ))}
          </div>
        </Section>
      )}

      {/* ============================================================
          MEMBERSHIP CTA
          ============================================================ */}
      <Section variant="dark" className="relative grain">
        <svg className="absolute -bottom-10 -left-10 w-[300px] h-[300px] opacity-[0.05]" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="60" cy="60" r="55" stroke="#c0d9ee" strokeWidth="3.5" />
            <circle cx="60" cy="60" r="46" stroke="#c0d9ee" strokeWidth="3.5" />
            <circle cx="60" cy="60" r="37" stroke="#adc7d3" strokeWidth="3.5" />
            <circle cx="60" cy="60" r="28" stroke="#adc7d3" strokeWidth="3.5" />
            <circle cx="60" cy="60" r="19" stroke="#c0d9ee" strokeWidth="4" />
            <circle cx="60" cy="60" r="10" stroke="#c0d9ee" strokeWidth="4" />
            <circle cx="60" cy="60" r="3" fill="#D4A853" />
          </svg>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <span className="inline-block text-sm font-medium text-brand-300 uppercase tracking-wider mb-3">
            Membership
          </span>
          <h2 className="font-display text-3xl md:text-4xl text-white mb-6">
            Ongoing Refinement, Ongoing Support
          </h2>
          <p className="text-lg text-brand-200 leading-relaxed mb-8">
            Join the NeuroRefinement community for ${pricing.membership.standard.price}/month.
            Get full access to the lesson library, monthly live classes, new lesson drops,
            Q&amp;A sessions, and member discounts on 1:1 services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/membership" variant="primary" size="lg">
              Learn About Membership
            </Button>
            <Button href="/start-here" variant="outline" size="lg" className="border-brand-400 text-brand-200 hover:bg-brand-800">
              Not Sure? Start Here
            </Button>
          </div>
        </div>
      </Section>

      {/* ============================================================
          FINAL CTA
          ============================================================ */}
      <Section variant="warm">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl text-brand-900 mb-4">
            Your Brain Already Knows How to Learn.
            <br />
            <span className="text-brand-500">Let&apos;s Remind It.</span>
          </h2>
          <p className="text-lg text-brand-600 leading-relaxed mb-8">
            Take the 3-minute questionnaire and get your personalized starting point —
            plus a free movement lesson.
          </p>
          <Button href="/start-here" size="lg">
            Start Your Journey <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </Section>
    </>
  )
}
