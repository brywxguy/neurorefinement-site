import { Metadata } from 'next'
import { Button, Section, SectionHeader, Card } from '@/components/ui'
import { ArrowRight, ExternalLink, BookOpen, Microscope, GraduationCap, FileText, Link2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Research & Science — NeuroRefinement',
  description: 'The neuroscience behind NeuroRefinement. Peer-reviewed research on neuroplasticity, the Anat Baniel Method, the Feldenkrais Method, and brain-based movement learning.',
}

/* ─────────────────── DATA ─────────────────── */

const coreResearch = [
  {
    authors: 'Baniel A, Almagor E, Sharp N, Kolumbus O, Herbert MR',
    year: 2025,
    title: 'From fixing to connecting — developing mutual empathy guided through movement as a novel path for the discovery of better outcomes in autism',
    journal: 'Frontiers in Integrative Neuroscience',
    doi: '10.3389/fnint.2024.1489345',
    url: 'https://www.frontiersin.org/journals/integrative-neuroscience/articles/10.3389/fnint.2024.1489345/full',
    summary: 'Landmark paper presenting the theoretical foundation of both the Feldenkrais Method and ABM NeuroMovement as brain-based, empathy-driven approaches for autism — fundamentally different from conventional "fix the deficit" interventions.',
  },
  {
    authors: 'Baniel A',
    year: 2013,
    title: 'Leveraging the Power of the Brain to Change Itself to Transform Clinical Outcomes With Adults and Children With Special Needs With the Anat Baniel Method',
    journal: 'Global Advances in Health and Medicine, 2(Suppl), 11',
    doi: '10.7453/gahmj.2013.097CP.S11',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3875077/',
    summary: 'Introduces the Nine Essentials framework and how ABM shifts the clinical focus from "fixing" deficits to "connecting" with the brain. Includes Michael Merzenich\'s endorsement of ABM\'s alignment with neuroplasticity science.',
  },
  {
    authors: 'Naserizadeh S',
    year: 2023,
    title: 'Determining Effectiveness of Anat Baniel Neuro-Motor Intervention on Stereotyped Behavior and Social Interactions in Children with Autism Spectrum Disorder',
    journal: 'Journal of Disability Studies',
    url: 'https://jdisabilstud.org/browse.php?a_id=2567',
    summary: 'Research demonstrating measurable improvements in stereotyped behavior and social interactions in children with ASD following ABM-based neuro-motor intervention.',
  },
  {
    authors: 'Merzenich MM, Jenkins WM, Johnston P, Schreiner C, Miller SL, Tallal P',
    year: 1996,
    title: 'Temporal processing deficits of language-learning impaired children ameliorated by training',
    journal: 'Science, 271:77\u201384',
    url: 'https://pubmed.ncbi.nlm.nih.gov/8539603/',
    summary: 'Foundational neuroplasticity research by Michael Merzenich demonstrating that the brain can reorganize in response to training — the scientific bedrock underlying all brain-based movement methods including ABM.',
  },
  {
    authors: 'Reese M (via Donna Ray)',
    year: 2023,
    title: 'The Feldenkrais Method and Dynamic System Principles',
    journal: 'Donna Ray / Feldenkrais Southern California Movement Institute',
    url: 'https://www.donnaray.com/blog/the-feldenkrais-method-and-dynamic-system-principles',
    summary: 'Mark Reese\'s influential analysis of how the Feldenkrais Method embodies dynamic systems theory — the scientific framework for understanding how new movement patterns emerge through exploration rather than instruction.',
  },
  {
    authors: 'Verrel J, Almagor E, Schumann F, Lindenberger U, K\u00fchn S',
    year: 2015,
    title: 'Changes in neural resting state activity in primary and higher-order motor areas induced by a short sensorimotor intervention based on the Feldenkrais Method',
    journal: 'Frontiers in Human Neuroscience, 9',
    url: 'https://pubmed.ncbi.nlm.nih.gov/26029085/',
    summary: 'Brain imaging study using fMRI showing measurable neural changes in motor areas after Feldenkrais Functional Integration sessions — direct evidence that these gentle, awareness-based methods change the brain.',
  },
  {
    authors: 'Palmer CF',
    year: 2017,
    title: 'Feldenkrais Movement Lessons Improve Older Adults\' Awareness, Comfort, and Function',
    journal: 'Gerontology & Geriatric Medicine, Volume 3',
    url: 'https://pubmed.ncbi.nlm.nih.gov/28840153/',
    summary: 'Study showing that Awareness Through Movement lessons improve self-awareness, physical comfort, and daily function in older adults — directly relevant to NeuroRefinement\'s work with aging and fall prevention.',
  },
]

const books = [
  {
    author: 'Baniel A',
    year: 2012,
    title: 'Kids Beyond Limits',
    note: 'Foreword by Michael Merzenich, PhD. Practical guide to using the Nine Essentials with children with special needs — cerebral palsy, autism, developmental delays, and more.',
    amazonSearch: 'Kids+Beyond+Limits+Anat+Baniel',
  },
  {
    author: 'Baniel A',
    year: 2009,
    title: 'Move Into Life: The Nine Essentials for Lifelong Vitality',
    note: 'The foundational book on applying the Nine Essentials for adults seeking vitality, pain relief, and peak performance.',
    amazonSearch: 'Move+Into+Life+Anat+Baniel',
  },
  {
    author: 'Feldenkrais M',
    year: 1972,
    title: 'Awareness Through Movement: Health Exercises for Personal Growth',
    note: 'The original text that launched the Feldenkrais Method — foundational to ABM NeuroMovement and all brain-based movement education.',
    amazonSearch: 'Awareness+Through+Movement+Feldenkrais',
  },
  {
    author: 'Feldenkrais M',
    year: 1949,
    title: 'Body and Mature Behavior: A Study of Anxiety, Sex, Gravitation and Learning',
    note: 'Feldenkrais\'s most scientific work — connecting physics, neuroscience, and movement education decades before mainstream science caught up.',
    amazonSearch: 'Body+Mature+Behavior+Feldenkrais',
  },
  {
    author: 'Doidge N',
    year: 2015,
    title: 'The Brain\'s Way of Healing: Remarkable Discoveries and Recoveries from the Frontiers of Neuroplasticity',
    note: 'Features a detailed chapter on the Feldenkrais Method. Excellent introduction to neuroplasticity for general audiences.',
    amazonSearch: 'Brain+Way+Healing+Norman+Doidge',
  },
  {
    author: 'Merzenich MM',
    year: 2013,
    title: 'Soft-Wired: How the New Science of Brain Plasticity Can Change Your Life',
    note: 'The definitive guide to brain plasticity by the scientist who endorses Anat Baniel\'s Nine Essentials as practical neuroplasticity.',
    amazonSearch: 'Soft+Wired+Merzenich',
  },
]

const additionalResources = [
  {
    title: '9 Essentials — Research References (PDF)',
    url: 'https://www.anatbanielmethod.com/wp-content/uploads/2019/09/9-essentials-neuromovement-references-research.pdf',
    description: 'Official compilation of Merzenich and other neuroscience papers (1992\u20131999) supporting each of the Nine Essentials.',
    icon: FileText,
  },
  {
    title: 'ABM NeuroMovement — Supporting Research',
    url: 'https://www.anatbanielmethod.com/neuromovement-supporting-research/',
    description: 'Anat Baniel Method\'s curated research page with links to neuroplasticity studies, children with special needs outcomes, and movement learning science.',
    icon: Link2,
  },
  {
    title: 'Donna Ray — Feldenkrais Southern California Movement Institute',
    url: 'https://www.donnaray.com/',
    description: 'Internationally known Feldenkrais Practitioner, Trainer, and Licensed Psychotherapist with 40+ years of experience. One of Dr. Feldenkrais\'s earliest American students.',
    icon: GraduationCap,
  },
  {
    title: 'Feldenkrais Method — Research & Scholarly Resources',
    url: 'https://feldenkrais.com/research-2/',
    description: 'The Feldenkrais Guild\'s comprehensive database of 500+ articles, journal papers, and PhD theses.',
    icon: BookOpen,
  },
  {
    title: 'PubMed: Feldenkrais Method',
    url: 'https://pubmed.ncbi.nlm.nih.gov/?term=feldenkrais',
    description: '79+ peer-reviewed articles on the Feldenkrais Method in the National Library of Medicine.',
    icon: Microscope,
  },
  {
    title: 'Cerebral Palsy Guidance: ABM & NeuroMovement',
    url: 'https://cerebralpalsyguidance.com/cerebral-palsy/treatment/anat-baniel-method-and-neuromovement/',
    description: 'Medically reviewed overview of how ABM NeuroMovement can benefit children with cerebral palsy.',
    icon: Link2,
  },
]

/* ─────────────────── PAGE ─────────────────── */

export default function ResearchPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-900 grain">
        {/* Watermark rings */}
        <svg className="absolute top-10 right-10 w-[400px] h-[400px] opacity-[0.06]" viewBox="0 0 120 120" fill="none" aria-hidden="true">
          <circle cx="60" cy="60" r="55" stroke="#c0d9ee" strokeWidth="3.5" />
          <circle cx="60" cy="60" r="46" stroke="#c0d9ee" strokeWidth="3.5" />
          <circle cx="60" cy="60" r="37" stroke="#adc7d3" strokeWidth="3.5" />
          <circle cx="60" cy="60" r="28" stroke="#adc7d3" strokeWidth="3.5" />
          <circle cx="60" cy="60" r="19" stroke="#c0d9ee" strokeWidth="4" />
          <circle cx="60" cy="60" r="10" stroke="#c0d9ee" strokeWidth="4" />
          <circle cx="60" cy="60" r="3" fill="#D4A853" />
        </svg>
        <svg className="absolute -bottom-16 -left-16 w-[250px] h-[250px] opacity-[0.04]" viewBox="0 0 120 120" fill="none" aria-hidden="true">
          <circle cx="60" cy="60" r="55" stroke="#c0d9ee" strokeWidth="3.5" />
          <circle cx="60" cy="60" r="46" stroke="#c0d9ee" strokeWidth="3.5" />
          <circle cx="60" cy="60" r="37" stroke="#adc7d3" strokeWidth="3.5" />
          <circle cx="60" cy="60" r="28" stroke="#adc7d3" strokeWidth="3.5" />
          <circle cx="60" cy="60" r="19" stroke="#c0d9ee" strokeWidth="4" />
          <circle cx="60" cy="60" r="10" stroke="#c0d9ee" strokeWidth="4" />
          <circle cx="60" cy="60" r="3" fill="#D4A853" />
        </svg>

        <div className="container-wide relative z-10 py-20 md:py-28">
          <div className="max-w-3xl">
            <span className="inline-block text-sm font-medium text-brand-300 uppercase tracking-wider mb-3">
              Research & Science
            </span>
            <h1 className="font-display text-4xl md:text-5xl text-white mb-6">
              The Science Behind the Method
            </h1>
            <p className="text-xl text-brand-200 leading-relaxed mb-4">
              NeuroRefinement is built on decades of peer-reviewed neuroplasticity research,
              the clinical innovations of the Anat Baniel Method, and the foundational work of
              Mosh\u00e9 Feldenkrais. This page collects the science that informs everything we do.
            </p>
            <p className="text-brand-300 text-sm italic max-w-2xl">
              &ldquo;Scientists have defined the &lsquo;rules&rsquo; governing brain plasticity.
              Anat Baniel, working in parallel along a completely different path, has defined almost
              exactly the same rules in practical and understandable human terms.&rdquo;
              &mdash; Dr. Michael Merzenich, PhD, Winner of the 2016 Kavli Prize in Neuroscience
            </p>
          </div>
        </div>
      </section>

      {/* ── Core Research ── */}
      <Section>
        <SectionHeader
          eyebrow="Peer-Reviewed Research"
          title="Key Studies & Publications"
          description="Published research on ABM NeuroMovement, the Feldenkrais Method, and the neuroplasticity science that underpins brain-based movement learning."
        />
        <div className="space-y-6 max-w-4xl mx-auto">
          {coreResearch.map((paper) => (
            <Card key={paper.title} className="group">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center mt-1">
                  <Microscope className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-brand-400 mb-1">
                    {paper.authors} ({paper.year}) &mdash; <em>{paper.journal}</em>
                  </p>
                  <h3 className="font-display text-lg text-brand-800 mb-2 leading-snug">
                    {paper.title}
                  </h3>
                  <p className="text-sm text-brand-600 leading-relaxed mb-3">
                    {paper.summary}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {paper.url && (
                      <a
                        href={paper.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-brand-500 hover:text-brand-700 transition-colors"
                      >
                        Read paper <ExternalLink className="ml-1 w-3.5 h-3.5" />
                      </a>
                    )}
                    {paper.doi && (
                      <span className="text-xs text-brand-300 font-mono">
                        DOI: {paper.doi}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* ── Books ── */}
      <Section variant="warm">
        <SectionHeader
          eyebrow="Essential Reading"
          title="Books That Inform Our Practice"
          description="These books shaped NeuroRefinement\u2019s approach. Essential reading for understanding brain-based movement learning."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {books.map((book) => (
            <Card key={book.title}>
              <div className="flex items-start gap-3 mb-3">
                <BookOpen className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-display text-base text-brand-800 leading-snug">
                    <em>{book.title}</em>
                  </h3>
                  <p className="text-xs text-brand-400">{book.author} ({book.year})</p>
                </div>
              </div>
              <p className="text-sm text-brand-600 leading-relaxed mb-4">
                {book.note}
              </p>
              <a
                href={`https://www.amazon.com/s?k=${book.amazonSearch}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs text-brand-500 hover:text-brand-700 transition-colors"
              >
                Find on Amazon <ExternalLink className="ml-1 w-3 h-3" />
              </a>
            </Card>
          ))}
        </div>
      </Section>

      {/* ── Additional Resources ── */}
      <Section variant="light">
        <SectionHeader
          eyebrow="Explore Further"
          title="Additional Resources & Databases"
        />
        <div className="space-y-4 max-w-3xl mx-auto">
          {additionalResources.map((resource) => {
            const IconComp = resource.icon
            return (
              <a
                key={resource.title}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 rounded-xl bg-white border border-brand-100/50 hover:shadow-card hover:-translate-y-0.5 transition-all group"
              >
                <div className="shrink-0 w-9 h-9 rounded-lg bg-brand-50 text-brand-500 flex items-center justify-center">
                  <IconComp className="w-4.5 h-4.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-brand-800 group-hover:text-brand-600 transition-colors mb-0.5 text-sm">
                    {resource.title}
                  </h3>
                  <p className="text-xs text-brand-500 leading-relaxed">{resource.description}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-brand-300 shrink-0" />
              </a>
            )
          })}
        </div>
      </Section>

      {/* ── Practitioner Note ── */}
      <Section>
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-50 text-brand-500 mb-5">
            <GraduationCap className="w-7 h-7" />
          </div>
          <h2 className="font-display text-3xl text-brand-900 mb-4">
            Committed to Evidence-Based Practice
          </h2>
          <p className="text-lg text-brand-600 leading-relaxed mb-4">
            As a certified Anat Baniel Method practitioner, I stay current with the evolving
            research on neuroplasticity, motor learning, and brain-based rehabilitation. This
            page will be updated as new studies are published.
          </p>
          <p className="text-sm text-brand-400 mb-8">
            Have a research paper or resource to suggest? I&apos;d love to hear about it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" variant="outline">
              Suggest a Resource
            </Button>
            <Button href="/start-here">
              Experience It Yourself <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </Section>

      {/* ── Disclaimer ── */}
      <Section variant="light">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs text-brand-400 leading-relaxed">
            <strong>Disclaimer:</strong> The research cited on this page is provided for educational
            purposes only. NeuroRefinement provides wellness education and movement-based learning,
            not medical diagnosis or treatment. The Anat Baniel Method and Feldenkrais Method are
            educational practices, not substitutes for medical care. Always consult qualified
            healthcare providers for medical concerns. CliftonStrengths&reg; is a registered
            trademark of Gallup, Inc. ABM NeuroMovement&reg; is a registered trademark of
            Anat Baniel Method, Inc.
          </p>
        </div>
      </Section>
    </>
  )
}
