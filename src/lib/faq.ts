import { pricing, siteConfig } from '@/lib/config'

const { location } = siteConfig

/** Single source for FAQ content: used on /faq (with FAQPage JSON-LD) and the Functional Synthesis page. */
export const faqItems: Array<{ question: string; answer: string }> = [
  {
    question: 'What should I wear?',
    answer: 'Comfortable, loose-fitting clothes — like what you\'d wear to a yoga class. You remain fully clothed during the entire session. Avoid thick belts, heavy jewelry, or restrictive clothing.',
  },
  {
    question: 'Is this like massage or physical therapy?',
    answer: 'No — Functional Synthesis is a learning process, not a treatment. Instead of manipulating muscles or joints, I use gentle touch to communicate with your nervous system, helping your brain discover new movement options. Many people find it more effective than conventional approaches for chronic issues.',
  },
  {
    question: 'How many sessions will I need?',
    answer: 'Many people notice meaningful changes in their very first session. For lasting transformation, a series of sessions allows your brain to build on each experience. I typically recommend starting with 4 sessions to see what\'s possible, then we decide together on next steps.',
  },
  {
    question: 'Do you accept insurance?',
    answer: 'ABM sessions are not typically covered by insurance. However, some HSA/FSA accounts may cover wellness services. I provide detailed receipts you can submit to your provider.',
  },
  {
    question: 'Can this help with my specific condition?',
    answer: 'NeuroRefinement is educational wellness, not medical treatment. The approach works with your brain\'s ability to learn, which can benefit a wide range of situations. If you\'re unsure, I\'m happy to have a brief conversation to see if this might be a good fit. Please always consult with your healthcare provider about your specific medical needs.',
  },
  {
    question: 'Where are lessons held?',
    answer: `One-on-one lessons are at my home studio in ${location.city}, ${location.state} ${location.postalCode} (${location.crossStreets}); exact address after booking. ${location.formatsCompact} Travel available at my discretion for an added fee.`,
  },
  {
    question: 'How long is a session?',
    answer: `${pricing.abm.session.lengthNote} Your first visit is a ${pricing.abm.newClientLesson.label}, ${pricing.abm.newClientLesson.duration} minutes: the same one-on-one session with extra time for discovery and conversation.`,
  },
  {
    question: 'When are you available, and how do I pay?',
    answer: `${siteConfig.hours.days}, ${siteConfig.hours.time}. ${siteConfig.hours.closed} ${siteConfig.hours.byRequest} ${siteConfig.payment.note}`,
  },
  {
    question: 'Do you work with children?',
    answer: 'Absolutely. The Anat Baniel Method is widely recognized for its remarkable work with children with special needs — including cerebral palsy, autism spectrum, developmental delays, genetic conditions, and brain injuries. Children often respond beautifully because their brains have extraordinary plasticity. Sessions are gentle, playful, and a parent or guardian is always present. I offer both individual sessions and intensive packages for families traveling to Carlsbad.',
  },
]
