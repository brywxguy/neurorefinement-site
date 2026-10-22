// ============================================================
// NEUROREFINEMENT — CENTRAL CONFIGURATION
// Edit prices, offerings, and settings here. Used across all pages.
// ============================================================

export const siteConfig = {
  name: 'NeuroRefinement',
  owner: 'Bryan Thunstrom',
  tagline: 'Refine Movement. Revitalize Life.',
  description:
    'Gentle, neuroplasticity-based movement learning and strengths-based coaching to help you reduce pain, improve function, and renew your life.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://neurorefinement.com',
  location: {
    city: 'Carlsbad',
    state: 'CA',
    postalCode: '92008',
    region: 'North County San Diego',
    // Never publish the street address anywhere on the site; Bryan shares it after booking.
    studio: 'Home studio in Carlsbad, CA 92008, near Tamarack and El Camino Real.',
    addressNote: 'Exact address provided after booking.',
    short: 'In person in Carlsbad; exact address after booking.',
    formats: 'Lessons are in person at the home studio. The Free Intro Call is on Zoom.',
    groupClasses: 'Group TML classes meet on Zoom or at locations announced in advance.',
    travel: 'Travel to clients is available at Bryan’s discretion for an additional fee.',
    // Compact lines for the Contact page Location block.
    studioCompact: 'Home studio in Carlsbad, CA 92008 (Tamarack & El Camino Real)',
    formatsCompact: 'Intro calls on Zoom. Group TML classes on Zoom or announced locations.',
    travelCompact: 'Travel available for an added fee.',
    googleBusinessProfile: 'https://maps.app.goo.gl/cvy9Wac52uqBgxca8',
  },
  hours: {
    days: 'Monday–Friday',
    daysShort: 'Mon–Fri',
    time: '9 AM–2 PM',
    timeShort: '9–2',
    closed: 'Closed most holidays.',
    byRequest: 'Evenings and weekends by request.',
  },
  payment: {
    note: 'Payment is collected at time of service.',
  },
  contact: {
    // Public-facing address. Inquiry notifications go to INQUIRY_NOTIFY_EMAIL (default bryan@neurorefinement.com).
    email: 'info@neurorefinement.com',
    // Google Voice business line (matches Google Business Profile). Never list a personal cell.
    phone: '(760) 607-6000',
    phoneE164: '+17606076000',
  },
  // Footer icons appear only for non-empty URLs (Google uses location.googleBusinessProfile).
  social: {
    substack: '',   // TODO: add Substack URL
    x: 'https://x.com/neurorefinement',
    facebook: '',   // TODO: add Facebook URL
    instagram: '',  // TODO: add Instagram URL, e.g. https://www.instagram.com/<handle>
    youtube: '',    // TODO: add YouTube URL
  },
}

// ============================================================
// BOOKING (Cal.com) — defaults below; NEXT_PUBLIC_CAL_* env vars override.
// If the username is ever set back to the placeholder, booking sections show
// a "request a time" fallback instead of a broken embed.
// ============================================================

export const CAL_USERNAME_PLACEHOLDER = 'your-cal-username'

export const booking = {
  calOrigin: process.env.NEXT_PUBLIC_CAL_ORIGIN || 'https://cal.com',
  calEmbedScript: process.env.NEXT_PUBLIC_CAL_EMBED_SCRIPT || 'https://app.cal.com/embed/embed.js',
  calUsername: process.env.NEXT_PUBLIC_CAL_USERNAME || 'neurorefinement',
  // Labels match the Cal.com event titles.
  events: {
    // New people only. Pre-call questions are collected on-site before the calendar appears.
    freeCall: {
      slug: process.env.NEXT_PUBLIC_CAL_FREE_CALL_SLUG || 'free-20-min-call',
      label: 'Free Intro Call',
      duration: 20,
      format: 'Zoom',
    },
    // First visit for new clients. Length and price come from pricing.abm.newClientLesson.
    newClientLesson: {
      slug: process.env.NEXT_PUBLIC_CAL_NEW_CLIENT_LESSON_SLUG || 'new-client-lesson',
      label: 'New Client Functional Synthesis Lesson',
    },
    // Existing clients only (hidden event, see existingClientUrl).
    clientLesson: {
      slug: 'client-lesson',
      label: 'Functional Synthesis Lesson',
      duration: 45,
    },
    coachingSession: {
      slug: process.env.NEXT_PUBLIC_CAL_COACHING_SLUG || 'coaching-session',
      label: 'Coaching Session',
      duration: 60,
    },
  },
  // Hidden Cal.com event (or private link) for existing clients. Only used on the
  // unlisted /book/client page that Bryan shares with clients.
  existingClientUrl: process.env.NEXT_PUBLIC_CAL_EXISTING_CLIENT_URL || 'https://cal.com/neurorefinement/client-lesson',
  intensiveHref: '/contact?type=intensive#inquiry-form',
}

// ============================================================
// TESTIMONIALS — the homepage section stays hidden while this list is empty.
// Add real client quotes (with permission) to show it.
// ============================================================

export const testimonials: Array<{ quote: string; name: string; location?: string; service?: string }> = []

export const isCalConfigured = booking.calUsername !== CAL_USERNAME_PLACEHOLDER && booking.calUsername.trim() !== ''

export function calLink(eventSlug: string) {
  return `${booking.calUsername}/${eventSlug}`
}

export function calUrl(eventSlug: string) {
  return `${booking.calOrigin}/${calLink(eventSlug)}`
}

// ============================================================
// PRICING — Edit all prices in one place
// ============================================================

export const pricing = {
  // NeuroRefinement is the practice; ABM NeuroMovement is the method Bryan practices, never the
  // practice or business name. These are 1:1 Functional Synthesis (FS) lessons, in person at the
  // home studio. Never label a session 'ABM NeuroMovement Session'.
  abm: {
    session: {
      price: 150,
      duration: 45, // approximate; always under 60
      label: 'Functional Synthesis Lesson (1:1)',
      shortLabel: 'FS Lesson (1:1)',
      lengthNote: 'About 45 minutes (always under 60). Length is flexible, especially for children with special needs.',
    },
    newClientLesson: {
      price: 200,
      duration: 90,
      label: 'New Client Functional Synthesis Lesson (1:1)',
      shortLabel: 'New Client FS Lesson (1:1)',
      description: 'The same one-on-one session, with extra time for discovery and conversation.',
    },
    pack4:     { price: 540, sessions: 4, savings: '10% off', perSession: 135 },
    // Booked via the intensive request flow (booking.intensiveHref). Change the price here only.
    intensive: {
      price: 795,
      label: 'Lesson + Homework Intensive',
      lessons: 6,
      homeworkMonths: 1,
      schedule: 'for example, 3 one week and 3 another week',
    },
  },

  // NeuroStrengths coaching — available but not promoted on the homepage. Remote OK.
  // Programs and the VIP day are kept for reference but not shown on the site.
  coaching: {
    session:    { price: 175, duration: 60, label: 'NeuroStrengths Coaching Session' },
    program6:   { price: 900, sessions: 6, label: '6-Week Program', perSession: 150 },
    program12:  { price: 1680, sessions: 12, label: '12-Week Program', savings: '20% off', perSession: 140 },
    vipDay:     { price: 750, duration: 180, label: 'VIP Half-Day', description: '3 hours of focused coaching' },
  },

  // Group Classes
  classes: {
    dropIn:      { price: 30, label: 'Drop-In Class' },
    series6:     { price: 150, sessions: 6, label: '6-Week Series', perSession: 25 },
    monthlyPass: { price: 99, label: 'Monthly Unlimited Pass' },
  },

  // Digital Products
  lessons: {
    single:       { price: 25, label: 'Single Lesson' },
    themePack10:  { price: 179, count: 10, label: '10-Lesson Theme Pack', perLesson: 17.9 },
    customLesson: { price: 75, label: 'Custom Lesson Request', delivery: '5 business days' },
  },

  // Membership
  membership: {
    standard:      { price: 39, interval: 'month', label: 'NeuroRefinement Membership' },
    faithFunction: { price: 19, interval: 'month', label: 'Faith + Function Community' },
  },
} as const

const { intensive } = pricing.abm
export const intensiveSummary = `${intensive.lessons} Functional Synthesis lessons (${intensive.schedule}), plus ${intensive.homeworkMonths} month of access to all TML audio lessons as homework.`

// Copy about the free lesson never states its length.
export const freeLesson = {
  label: 'Free Lesson',
  title: 'The Reset',
  href: process.env.NEXT_PUBLIC_FREE_LESSON_URL || '/lessons/free-intro-reset',
  // Hosted MP3 played on /lessons/free-intro-reset. Set in Vercel, then redeploy (inlined at build time).
  audioUrl: process.env.NEXT_PUBLIC_FREE_LESSON_AUDIO_URL || '',
}

export const otherLessonsNote =
  'Bryan also offers individual or group TML (Transformational Movement Lessons) and voice-guided lessons.'

// ============================================================
// AUDIO LESSON THEMES
// ============================================================

export const lessonThemes = [
  { slug: 'healthy-backs', label: 'Healthy Backs', description: 'Relieve tension and build resilience in your spine' },
  { slug: 'anti-aging-vitality', label: 'Anti-Aging & Vitality', description: 'Move with the energy and ease of a younger you' },
  { slug: 'neck-shoulders', label: 'Neck & Shoulders', description: 'Release tension in your neck, shoulders, and upper back' },
  { slug: 'jaw-face-headaches', label: 'Jaw, Face & Neck', description: 'Ease jaw tension and find comfort in your face and neck' },
  { slug: 'posture-breathing', label: 'Posture & Breathing', description: 'Discover upright ease and fuller breathing' },
  { slug: 'playful-mobility', label: 'Move Like a Child Again', description: 'Playful explorations that restore natural movement' },
  { slug: 'athletes', label: 'High-Performance Athletes', description: 'Refine coordination for peak performance' },
  { slug: 'surfing', label: 'Surfing Mobility', description: 'Better balance, rotation, and paddle strength' },
  { slug: 'snow-sports', label: 'Ski & Snowboard Agility', description: 'Edge control, balance, and dynamic stability' },
  { slug: 'stress-sleep', label: 'Stress & Sleep', description: 'Calm your nervous system and improve sleep quality' },
  { slug: 'hands-wrists-arms', label: 'Hands, Wrists & Arms', description: 'Comfort for desk workers and anyone who uses their hands' },
  { slug: 'hips-knees-ankles', label: 'Hips, Knees & Ankles', description: 'Build resilience from the ground up' },
  { slug: 'balance-fall-prevention', label: 'Balance & Fall Prevention', description: 'Confidence and stability at every age' },
  { slug: 'tos-upper-extremity', label: 'TOS & Upper Extremity Pain', description: 'Gentle approaches for nerve pain and thoracic outlet challenges' },
  { slug: 'travel-recovery', label: 'Travel Recovery', description: 'Reset after long flights and road trips' },
  { slug: 'morning-routines', label: 'Morning Wake-Up', description: 'Start your day with 5-10 minutes of ease' },
  { slug: 'evening-unwind', label: 'Evening Unwind', description: 'Release the day and prepare for rest' },
  { slug: 'golf', label: "Golfer's Coordination", description: 'Smoother rotation and more effortless power' },
  { slug: 'voice-breathing', label: 'Vocal Ease & Breathing', description: 'For speakers, singers, and anyone who uses their voice' },
  { slug: 'seated-lessons', label: 'Seated Lessons', description: 'Full lessons you can do from a chair or wheelchair' },
] as const

// ============================================================
// NAVIGATION
// ============================================================

export const navigation = {
  main: [
    { label: 'About', href: '/about' },
    {
      label: 'Services',
      children: [
        { label: 'Work With Me', href: '/work-with-me', description: 'Overview of all 1:1 services' },
        { label: 'Functional Synthesis', href: '/functional-synthesis', description: 'One-on-one lessons at the Carlsbad studio' },
        { label: 'Coaching', href: '/coaching', description: 'Strengths-based life, career & business coaching' },
        { label: 'TML Lessons', href: '/classes', description: 'Individual or group Transformational Movement Lessons' },
        { label: 'Bundles & Packs', href: '/bundles', description: 'Lesson packs & intensives' },
        { label: 'Children with Special Needs', href: '/children', description: 'Brain-based movement for kids' },
      ],
    },
    {
      label: 'Learn',
      children: [
        { label: 'Research', href: '/research', description: 'The science behind the method' },
        { label: 'Audio Lessons', href: '/lessons', description: 'Voice-guided movement library' },
        { label: 'Membership', href: '/membership', description: 'Ongoing access & community' },
      ],
    },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ],
  cta: { label: 'Start Here', href: '/start-here' },
}
