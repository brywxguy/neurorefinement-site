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
    region: 'North County San Diego',
    virtual: true,
  },
  contact: {
    email: 'bryan@neurorefinement.com', // TODO: confirm email
    phone: '', // TODO: add phone if desired
  },
  social: {
    substack: '',   // TODO: add Substack URL
    x: '',          // TODO: add X (Twitter) URL
    facebook: '',   // TODO: add Facebook URL
    instagram: '',  // TODO: add Instagram URL
    youtube: '',    // TODO: add YouTube URL
  },
  calendly: {
    url: process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/neurorefinement',
    functionalSynthesis60: '', // TODO: specific event type URLs
    functionalSynthesis90: '',
    coaching60: '',
    freeConsult: '',
  },
}

// ============================================================
// PRICING — Edit all prices in one place
// ============================================================

export const pricing = {
  // 1:1 ABM Sessions
  abm: {
    session60: { price: 150, duration: 60, label: 'Standard Session' },
    session90: { price: 200, duration: 90, label: 'Deep Dive / First Visit' },
    pack4:     { price: 540, sessions: 4, savings: '10% off', perSession: 135 },
    pack10:    { price: 1275, sessions: 10, savings: '15% off', perSession: 127.5 },
  },

  // 1:1 Coaching
  coaching: {
    session60:  { price: 175, duration: 60, label: 'Single Session' },
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
    bundle5:      { price: 99, count: 5, label: '5-Lesson Bundle', perLesson: 19.8 },
    themePack10:  { price: 179, count: 10, label: '10-Lesson Theme Pack', perLesson: 17.9 },
    customLesson: { price: 75, label: 'Custom Lesson Request', delivery: '5 business days' },
  },

  // Membership
  membership: {
    standard:      { price: 39, interval: 'month', label: 'NeuroRefinement Membership' },
    faithFunction: { price: 19, interval: 'month', label: 'Faith + Function Community' },
  },
} as const

// ============================================================
// AUDIO LESSON THEMES
// ============================================================

export const lessonThemes = [
  { slug: 'healthy-backs', label: 'Healthy Backs', icon: '🦴', description: 'Relieve tension and build resilience in your spine' },
  { slug: 'anti-aging-vitality', label: 'Anti-Aging & Vitality', icon: '✨', description: 'Move with the energy and ease of a younger you' },
  { slug: 'neck-shoulders', label: 'Neck & Shoulders', icon: '🙆', description: 'Release tension in your neck, shoulders, and upper back' },
  { slug: 'jaw-face-headaches', label: 'Jaw, Face & Neck', icon: '😌', description: 'Ease jaw tension and find comfort in your face and neck' },
  { slug: 'posture-breathing', label: 'Posture & Breathing', icon: '🌬️', description: 'Discover upright ease and fuller breathing' },
  { slug: 'playful-mobility', label: 'Move Like a Child Again', icon: '🎈', description: 'Playful explorations that restore natural movement' },
  { slug: 'athletes', label: 'High-Performance Athletes', icon: '🏆', description: 'Refine coordination for peak performance' },
  { slug: 'surfing', label: 'Surfing Mobility', icon: '🏄', description: 'Better balance, rotation, and paddle strength' },
  { slug: 'snow-sports', label: 'Ski & Snowboard Agility', icon: '🏂', description: 'Edge control, balance, and dynamic stability' },
  { slug: 'stress-sleep', label: 'Stress & Sleep', icon: '🌙', description: 'Calm your nervous system and improve sleep quality' },
  { slug: 'hands-wrists-arms', label: 'Hands, Wrists & Arms', icon: '🖐️', description: 'Comfort for desk workers and anyone who uses their hands' },
  { slug: 'hips-knees-ankles', label: 'Hips, Knees & Ankles', icon: '🦵', description: 'Build resilience from the ground up' },
  { slug: 'balance-fall-prevention', label: 'Balance & Fall Prevention', icon: '⚖️', description: 'Confidence and stability at every age' },
  { slug: 'tos-upper-extremity', label: 'TOS & Upper Extremity Pain', icon: '🤲', description: 'Gentle approaches for nerve pain and thoracic outlet challenges' },
  { slug: 'travel-recovery', label: 'Travel Recovery', icon: '✈️', description: 'Reset after long flights and road trips' },
  { slug: 'morning-routines', label: 'Morning Wake-Up', icon: '☀️', description: 'Start your day with 5-10 minutes of ease' },
  { slug: 'evening-unwind', label: 'Evening Unwind', icon: '🌅', description: 'Release the day and prepare for rest' },
  { slug: 'golf', label: "Golfer's Coordination", icon: '⛳', description: 'Smoother rotation and more effortless power' },
  { slug: 'voice-breathing', label: 'Vocal Ease & Breathing', icon: '🎤', description: 'For speakers, singers, and anyone who uses their voice' },
  { slug: 'seated-lessons', label: 'Seated Lessons', icon: '🪑', description: 'Full lessons you can do from a chair or wheelchair' },
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
        { label: 'Functional Synthesis (ABM)', href: '/functional-synthesis', description: 'Hands-on neuroplasticity sessions' },
        { label: 'Coaching', href: '/coaching', description: 'Life, career & business coaching' },
        { label: 'Group Classes', href: '/classes', description: 'Transformational Movement Lessons' },
        { label: 'Children with Special Needs', href: '/children', description: 'Brain-based movement for kids' },
      ],
    },
    {
      label: 'Learn',
      children: [
        { label: 'Audio Lessons', href: '/lessons', description: 'Voice-guided movement library' },
        { label: 'Bundles & Packs', href: '/bundles', description: 'Curated lesson collections' },
        { label: 'Membership', href: '/membership', description: 'Ongoing access & community' },
      ],
    },
    { label: 'Blog', href: '/blog' },
    { label: 'Research', href: '/research' },
    { label: 'Contact', href: '/contact' },
  ],
  cta: { label: 'Start Here', href: '/start-here' },
}
