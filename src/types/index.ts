// ============================================================
// NEUROREFINEMENT — TYPE DEFINITIONS
// ============================================================

export interface Lesson {
  id: string
  slug: string
  title: string
  description: string
  duration: number // minutes
  difficulty: 'gentle' | 'moderate' | 'active'
  theme: string
  bodyAreas: string[]
  intention: string
  contraindications: string
  whatYouNeed: string
  whatToNotice: string
  recommendedFollowUp: string[]
  audioUrl?: string
  transcriptUrl?: string
  price: number
  isFree: boolean
  createdAt: string
  updatedAt: string
}

export interface Bundle {
  id: string
  slug: string
  title: string
  description: string
  lessons: string[] // lesson IDs
  theme: string
  price: number
  originalPrice: number
  createdAt: string
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  author: string
  category: string
  tags: string[]
  publishedAt: string
  updatedAt: string
  readingTime: number
  featured: boolean
}

export interface ClassEvent {
  id: string
  title: string
  description: string
  type: 'drop-in' | 'series'
  date: string
  time: string
  duration: number
  location: string
  spotsAvailable: number
  price: number
  seriesId?: string
}

export interface IntakeFormData {
  name: string
  email: string
  phone?: string
  primaryConcerns: string[]
  painAreas: string[]
  stressLevel: number
  movementHistory: string
  goals: string[]
  preferences: string[]
  medicalConsiderations?: string
  howDidYouHear: string
  consent: boolean
}

export interface Testimonial {
  id: string
  name: string
  location: string
  quote: string
  service: string
  rating: number
  featured: boolean
}

export interface FAQItem {
  question: string
  answer: string
}
