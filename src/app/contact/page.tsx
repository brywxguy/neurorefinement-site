import { Metadata } from 'next'
import { Suspense } from 'react'
import { Section } from '@/components/ui'
import { InquiryForm } from '@/components/forms/InquiryForm'
import { Mail, MapPin, Clock, Phone, CalendarDays } from 'lucide-react'
import { siteConfig } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Bryan Thunstrom at NeuroRefinement. In-person lessons at a home studio in Carlsbad, CA 92008; free intro calls on Zoom.',
}

export default function ContactPage() {
  return (
    <>
      <Section className="pt-12 md:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h1 className="font-display text-4xl md:text-5xl text-brand-900 mb-6">
              Get in Touch
            </h1>
            <p className="text-lg text-brand-600 leading-relaxed mb-8">
              Have a question about sessions, classes, or whether this approach might be
              right for you? I&apos;d love to hear from you.
            </p>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-brand-800">Email</p>
                  <a href={`mailto:${siteConfig.contact.email}`} className="text-ocean-600 hover:text-ocean-700">
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-brand-800">Phone</p>
                  <a href={`tel:${siteConfig.contact.phoneE164}`} className="text-ocean-600 hover:text-ocean-700">
                    {siteConfig.contact.phone}
                  </a>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-brand-800">Location</p>
                  <p className="text-brand-600">{siteConfig.location.studio}</p>
                  <p className="text-sm text-brand-500">{siteConfig.location.addressNote}</p>
                  <p className="text-sm text-brand-500">{siteConfig.location.formats}</p>
                  <p className="text-sm text-brand-500">{siteConfig.location.travel}</p>
                  <a
                    href={siteConfig.location.googleBusinessProfile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-ocean-600 hover:text-ocean-700"
                  >
                    View on Google Maps
                  </a>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center shrink-0">
                  <CalendarDays className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-brand-800">Hours</p>
                  <p className="text-brand-600">{siteConfig.hours.days}, {siteConfig.hours.time}</p>
                  <p className="text-sm text-brand-500">{siteConfig.hours.closed}</p>
                  <p className="text-sm text-brand-500">{siteConfig.hours.byRequest}</p>
                  <p className="text-sm text-brand-500">{siteConfig.payment.note}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-brand-800">Response Time</p>
                  <p className="text-brand-600">Usually within 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div id="inquiry-form" className="bg-white rounded-2xl border border-brand-100/50 p-8 scroll-mt-24">
            <Suspense fallback={null}>
              <InquiryForm />
            </Suspense>
          </div>
        </div>
      </Section>
    </>
  )
}
