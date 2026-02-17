import { Metadata } from 'next'
import { Section } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'NeuroRefinement provides educational wellness services, not medical treatment.',
}

export default function DisclaimerPage() {
  return (
    <Section className="pt-12 md:pt-16">
      <div className="container-narrow">
        <h1 className="font-display text-4xl text-brand-900 mb-8">Disclaimer</h1>

        {/* TODO: HAVE THIS ENTIRE PAGE REVIEWED BY AN ATTORNEY BEFORE LAUNCH */}
        <div className="bg-gold-50 border border-gold-200 rounded-xl p-6 mb-8">
          <p className="text-gold-700 text-sm font-medium">
            ⚠️ PLACEHOLDER — This disclaimer must be reviewed and approved by a licensed
            attorney before the website goes live. The language below is a draft only.
          </p>
        </div>

        <div className="prose-nr">
          <h2>Educational Wellness Services</h2>
          <p>
            NeuroRefinement provides educational wellness services — not medical treatment,
            diagnosis, or therapy. All sessions, classes, audio lessons, and coaching services
            are designed to help you explore movement, awareness, and function through
            neuroplasticity-based learning. They are not a substitute for medical care.
          </p>

          <h2>Not Medical Advice</h2>
          <p>
            Nothing on this website or in our services should be construed as medical advice,
            diagnosis, or treatment. The information provided is for general educational and
            informational purposes only.
          </p>
          <p>
            If you have a medical condition, recent injury, chronic pain, or are pregnant,
            please consult your healthcare provider before beginning any movement program,
            including NeuroRefinement lessons and sessions.
          </p>

          <h2>Consult Your Healthcare Provider</h2>
          <p>
            Always seek the advice of your physician or other qualified health provider with
            any questions you may have regarding a medical condition. Never disregard
            professional medical advice or delay in seeking it because of something you have
            read on this website or experienced in our services.
          </p>

          <h2>Individual Results</h2>
          <p>
            Individual results vary. We do not guarantee specific outcomes from our services.
            Testimonials and case examples on this website represent individual experiences
            and should not be interpreted as typical results.
          </p>

          <h2>Movement Safety</h2>
          <p>
            If any movement during a session, class, or audio lesson causes pain or
            discomfort, please stop immediately and consult with your healthcare provider.
            You are responsible for listening to your body and modifying or stopping any
            movement that does not feel right.
          </p>

          <h2>Trademark Acknowledgment</h2>
          <p>
            Anat Baniel Method® and NeuroMovement® are registered trademarks of Anat Baniel.
            The Feldenkrais Method® is a registered trademark of the Feldenkrais Guild® of
            North America. NeuroRefinement is an independent practice and is not affiliated
            with, endorsed by, or representing these organizations unless explicitly stated.
          </p>

          <h2>Contact</h2>
          <p>
            If you have questions about this disclaimer or our services, please contact us
            at bryan@neurorefinement.com.
          </p>

          <p className="text-sm text-brand-400 mt-8">
            Last updated: February 2026
          </p>
        </div>
      </div>
    </Section>
  )
}
