import { Metadata } from 'next'
import Link from 'next/link'
import { Section, SectionHeader, Card } from '@/components/ui'
import { Clock, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog — Movement, Neuroplasticity & Mindful Living',
  description: 'Articles on neuroplasticity, gentle movement, strengths-based coaching, and practical wellness. Evidence-informed, warmly written.',
}

// Sample blog data — will be replaced by MDX content or CMS
const posts = [
  {
    slug: 'what-is-anat-baniel-method',
    title: 'What Is the Anat Baniel Method? A Plain English Guide',
    excerpt: 'If you\'ve heard of ABM but aren\'t quite sure what it is or how it works, this is the article for you. No jargon, no hype — just a clear explanation of how gentle movement and your brain\'s neuroplasticity work together.',
    category: 'Foundations',
    readingTime: 8,
    date: '2026-02-15',
  },
  {
    slug: 'why-gentle-movement-works',
    title: 'Why Gentle Movement Works Better Than Forcing',
    excerpt: 'For decades, the mantra was "no pain, no gain." But neuroscience tells us something different: your brain learns best when movement is gentle, slow, and attended to with curiosity.',
    category: 'Neuroplasticity',
    readingTime: 6,
    date: '2026-02-10',
  },
  {
    slug: 'desk-body-reshaping',
    title: 'The Desk Body: How Sitting Reshapes You (And How to Undo It)',
    excerpt: 'Eight hours of sitting creates real patterns in your nervous system. Here\'s what\'s actually happening — and three gentle strategies to start reversing the process.',
    category: 'Practical',
    readingTime: 7,
    date: '2026-02-05',
  },
  {
    slug: 'neuroplasticity-what-research-says',
    title: 'Neuroplasticity and Movement: What the Research Actually Says',
    excerpt: 'A plain-language look at the science behind brain-based movement learning. What we know, what we don\'t, and why it matters for your health.',
    category: 'Research',
    readingTime: 12,
    date: '2026-01-28',
    featured: true,
  },
  {
    slug: 'strengths-and-movement-synergy',
    title: 'Strengths + Movement: Why What\'s Strong in You Matters for How You Move',
    excerpt: 'Your CliftonStrengths don\'t just affect your career — they shape how you approach movement, recovery, and change. Here\'s how to leverage them.',
    category: 'Coaching',
    readingTime: 7,
    date: '2026-01-20',
  },
  {
    slug: 'from-pain-to-possibility',
    title: 'From Pain to Possibility: One Practitioner\'s Journey with Chronic Illness',
    excerpt: 'Bryan shares his personal story of navigating persistent Lyme disease and bilateral Thoracic Outlet Syndrome — and how it led him to a fundamentally different approach to the body.',
    category: 'Personal',
    readingTime: 10,
    date: '2026-01-15',
    featured: true,
  },
  {
    slug: 'tos-movement-based-approach',
    title: 'Living with Thoracic Outlet Syndrome: A Movement-Based Approach to Finding Ease',
    excerpt: 'For those navigating TOS or upper extremity neuropathy, conventional approaches often fall short. Here\'s how brain-based movement learning offers a different path.',
    category: 'Personal',
    readingTime: 9,
    date: '2026-01-10',
  },
]

export default function BlogPage() {
  const featured = posts.filter((p) => p.featured)
  const recent = posts.filter((p) => !p.featured)

  return (
    <>
      <Section className="pt-12 md:pt-16">
        <SectionHeader
          eyebrow="Blog"
          title="Movement, Neuroplasticity & Mindful Living"
          description="Evidence-informed articles on gentle movement, brain-based learning, strengths coaching, and practical wellness."
          centered={false}
        />
      </Section>

      {/* Featured */}
      {featured.length > 0 && (
        <Section variant="light" className="pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featured.map((post) => (
              <Card key={post.slug} href={`/blog/${post.slug}`} className="group">
                <span className="inline-block text-xs font-medium text-brand-500 uppercase tracking-wider mb-2">
                  {post.category} &middot; Featured
                </span>
                <h2 className="font-display text-2xl text-brand-900 mb-3 group-hover:text-brand-600 transition-colors">
                  {post.title}
                </h2>
                <p className="text-brand-600 leading-relaxed mb-4">{post.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-brand-400">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readingTime} min read</span>
                  <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </Card>
            ))}
          </div>
        </Section>
      )}

      {/* All Posts */}
      <Section>
        <div className="space-y-4">
          {recent.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="flex items-start gap-6 p-6 bg-white rounded-2xl border border-brand-100/50 hover:shadow-card transition-all group"
            >
              <div className="flex-1">
                <span className="inline-block text-xs font-medium text-brand-500 uppercase tracking-wider mb-1">
                  {post.category}
                </span>
                <h3 className="font-display text-xl text-brand-800 mb-2 group-hover:text-brand-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-brand-600 leading-relaxed">{post.excerpt}</p>
              </div>
              <div className="shrink-0 text-sm text-brand-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {post.readingTime} min
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  )
}
