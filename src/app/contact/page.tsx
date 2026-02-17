import { Metadata } from 'next'
import { Button, Section } from '@/components/ui'
import { Mail, MapPin, Clock } from 'lucide-react'
import { siteConfig } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Bryan Thunstrom at NeuroRefinement. Based in Carlsbad, CA with virtual sessions available.',
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
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-brand-800">Location</p>
                  <p className="text-brand-600">{siteConfig.location.city}, {siteConfig.location.state}</p>
                  <p className="text-sm text-brand-400">Virtual sessions available worldwide</p>
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
          <div className="bg-white rounded-2xl border border-brand-100/50 p-8">
            <form action="/api/contact" method="POST" className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-brand-700 mb-1.5">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-brand-200 text-brand-800 focus:outline-none focus:border-brand-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-brand-700 mb-1.5">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-brand-200 text-brand-800 focus:outline-none focus:border-brand-500"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-brand-700 mb-1.5">Subject</label>
                <select
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-3 rounded-xl border border-brand-200 text-brand-800 focus:outline-none focus:border-brand-500"
                >
                  <option value="general">General Question</option>
                  <option value="abm">About ABM / Functional Synthesis</option>
                  <option value="coaching">About Coaching</option>
                  <option value="classes">About Group Classes</option>
                  <option value="lessons">About Audio Lessons</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-brand-700 mb-1.5">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-brand-200 text-brand-800 focus:outline-none focus:border-brand-500"
                />
              </div>
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </Section>
    </>
  )
}
