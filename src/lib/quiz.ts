// Start Here questionnaire: options and the rule-based recommendation shown on /start-here/results.

export const CHILD_CONCERN = "My child's development"
export const COACHING_CONCERN = 'Life or career direction'

export const QUIZ_CONCERNS = [
  'Pain or discomfort',
  'Stiffness or limited mobility',
  'Stress or tension',
  'Better posture',
  'Athletic performance',
  'Balance or fall concerns',
  'Recovery from injury/surgery',
  'Nerve pain or neuropathy',
  CHILD_CONCERN,
  'General wellness & vitality',
  COACHING_CONCERN,
  'Curiosity about this approach',
  'Other',
] as const

/** Concerns where 1:1 Functional Synthesis lessons are the recommended starting point. */
export const FUNCTIONAL_SYNTHESIS_CONCERNS: readonly string[] = [
  'Pain or discomfort',
  'Stiffness or limited mobility',
  'Balance or fall concerns',
  'Better posture',
  'Athletic performance',
  'Recovery from injury/surgery',
  'Nerve pain or neuropathy',
  CHILD_CONCERN,
]

export type QuizPath = 'functional-synthesis' | 'coaching' | 'explore'

export interface QuizRecommendation {
  path: QuizPath
  /** The visitor's concerns that pointed to Functional Synthesis, in quiz order. */
  fsMatches: string[]
  forChild: boolean
  wantsCoaching: boolean
}

export function recommend(concerns: readonly string[], goals: readonly string[] = []): QuizRecommendation {
  const fsMatches = QUIZ_CONCERNS.filter((c) => FUNCTIONAL_SYNTHESIS_CONCERNS.includes(c) && concerns.includes(c))
  const wantsCoaching = concerns.includes(COACHING_CONCERN) || goals.includes('Career clarity and direction')
  const path: QuizPath = fsMatches.length ? 'functional-synthesis' : wantsCoaching ? 'coaching' : 'explore'
  return { path, fsMatches, forChild: concerns.includes(CHILD_CONCERN), wantsCoaching }
}

export const QUIZ_GOALS = [
  'Less pain, more comfort',
  'Better flexibility and range',
  'Improved balance and stability',
  'More energy and vitality',
  'Better sleep',
  'Athletic improvement',
  'Career clarity and direction',
  'More confidence in my body',
  'Stress management',
  'Connection and community',
] as const

/** Only known option values survive the round trip through the results URL. */
function pick(options: readonly string[], raw: string | string[] | undefined): string[] {
  const values = Array.isArray(raw) ? raw : raw ? [raw] : []
  return options.filter((o) => values.includes(o))
}

export const parseConcerns = (raw: string | string[] | undefined) => pick(QUIZ_CONCERNS, raw)
export const parseGoals = (raw: string | string[] | undefined) => pick(QUIZ_GOALS, raw)

export function resultsHref(concerns: readonly string[], goals: readonly string[], saved?: boolean) {
  const params = new URLSearchParams()
  concerns.forEach((c) => params.append('c', c))
  goals.forEach((g) => params.append('g', g))
  if (saved !== undefined) params.set('saved', saved ? '1' : '0')
  return `/start-here/results?${params.toString()}`
}
