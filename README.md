# NeuroRefinement

**Refining Movement. Renewing Life.**

A modern website for Bryan Thunstrom's ABM NeuroMovement® practice and strengths-based coaching business, based in Carlsbad, CA.

---

## Tech Stack

| Component | Technology |
|-----------|------------|
| Framework | Next.js 14 (App Router) + TypeScript |
| Styling | Tailwind CSS + custom design system |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth (magic link) |
| Payments | Stripe (one-time + subscriptions) |
| Scheduling | Calendly (embedded, swappable) |
| Email | ConvertKit / Kit |
| Analytics | Plausible (privacy-respecting) |
| Hosting | Vercel (recommended) |

---

## Getting Started

### Prerequisites
- Node.js 18+ installed
- A Supabase account (free tier works)
- A Stripe account
- A Calendly account
- A ConvertKit (Kit) account

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd neurorefinement
npm install
```

### 2. Environment Variables

Copy the example env file and fill in your values:

```bash
cp .env.example .env.local
```

Required variables:
- `NEXT_PUBLIC_SITE_URL` — Your domain (use `http://localhost:3000` for dev)
- `NEXT_PUBLIC_SUPABASE_URL` — From Supabase dashboard
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — From Supabase dashboard
- `SUPABASE_SERVICE_ROLE_KEY` — From Supabase dashboard (keep secret!)
- `STRIPE_SECRET_KEY` — From Stripe dashboard
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — From Stripe dashboard
- `STRIPE_WEBHOOK_SECRET` — From Stripe webhook settings
- `NEXT_PUBLIC_CALENDLY_URL` — Your Calendly scheduling link
- `CONVERTKIT_API_KEY` — From ConvertKit account settings
- `CONVERTKIT_FORM_ID` — From ConvertKit form settings

### 3. Set Up Database

Go to your Supabase project → SQL Editor → paste and run `supabase/schema.sql`.

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

### 5. Deploy to Vercel

```bash
npx vercel
```

Or connect your GitHub repo to Vercel for automatic deployments.

---

## Project Structure

```
neurorefinement/
├── public/
│   ├── images/         # Photos, headshots, logos
│   ├── audio/          # Audio lesson files
│   └── icons/          # Favicon, app icons
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout (header + footer)
│   │   ├── page.tsx             # Homepage
│   │   ├── about/               # About Bryan
│   │   ├── work-with-me/        # Services overview
│   │   ├── functional-synthesis/ # ABM sessions page
│   │   ├── coaching/            # Coaching page
│   │   ├── classes/             # Group classes
│   │   ├── lessons/             # Audio lesson library
│   │   ├── bundles/             # Lesson bundles
│   │   ├── membership/          # Membership page
│   │   ├── blog/                # Blog listing + posts
│   │   ├── research/            # Research & evidence
│   │   ├── contact/             # Contact form
│   │   ├── start-here/          # Intake questionnaire
│   │   ├── dashboard/           # Member dashboard
│   │   ├── disclaimer/          # Legal disclaimer
│   │   ├── privacy/             # Privacy policy
│   │   ├── terms/               # Terms of service
│   │   ├── refund-policy/       # Refund policy
│   │   ├── sitemap.ts           # Dynamic sitemap
│   │   ├── robots.ts            # Robots.txt
│   │   └── api/
│   │       ├── contact/         # Contact form handler
│   │       ├── intake/          # Intake form handler
│   │       ├── newsletter/      # Newsletter signup
│   │       ├── stripe/          # Stripe checkout
│   │       └── webhook/         # Stripe webhooks
│   ├── components/
│   │   ├── ui/                  # Reusable UI components
│   │   ├── layout/              # Header, Footer
│   │   ├── sections/            # Page sections
│   │   └── forms/               # Form components
│   ├── lib/
│   │   ├── config.ts            # ★ Central config (prices, offerings, nav)
│   │   ├── utils.ts             # Utility functions
│   │   ├── supabase.ts          # Supabase client
│   │   └── stripe.ts            # Stripe client
│   ├── types/
│   │   └── index.ts             # TypeScript type definitions
│   └── styles/
│       └── globals.css          # Global styles + Tailwind
├── supabase/
│   └── schema.sql               # Database schema
├── .env.example                 # Environment variable template
├── package.json
├── tailwind.config.ts           # Custom design system
├── tsconfig.json
└── next.config.js
```

---

## Key File: `src/lib/config.ts`

**All prices, offerings, session durations, lesson themes, and navigation are defined in this single file.** To change any pricing or offering, edit this file — all pages will update automatically.

---

## Content Checklist (What Bryan Needs to Upload)

### Before Launch
- [ ] **Headshot photo** — Professional, warm photo for About page and homepage
- [ ] **Practice space photos** — If doing in-person sessions (optional)
- [ ] **ABM certification** — Scan/photo of certificate for credentials section
- [ ] **First 3-5 audio lessons** — At minimum the free "15-Minute Reset" lesson
- [ ] **Audio lesson transcripts** — Accessibility requirement
- [ ] **Confirm email address** — Update in `src/lib/config.ts`
- [ ] **Calendly event types** — Set up and add URLs to config
- [ ] **Stripe products** — Create products/prices in Stripe dashboard
- [ ] **Attorney review** — Disclaimer, Privacy, Terms, Refund Policy, Waiver
- [ ] **ABM trademark compliance** — Verify language with ABM organization

### After Launch
- [ ] **Real testimonials** — Replace placeholder testimonials (minimum 3-5)
- [ ] **Additional audio lessons** — Build out the library over time
- [ ] **Blog posts** — Publish the starter posts (outlines in blog page)
- [ ] **Google Search Console** — Submit sitemap
- [ ] **Google Business Profile** — Set up for local SEO
- [ ] **Social media profiles** — Add URLs to config

---

## Editing the Site

### Change Prices
Edit `src/lib/config.ts` → `pricing` object.

### Add a Blog Post
Create a new file in `src/content/blog/` (MDX) or add directly to the blog page data.

### Add an Audio Lesson
1. Upload audio file to `public/audio/` (or cloud storage)
2. Add lesson record to Supabase `lessons` table
3. Create Stripe product/price
4. Lesson appears in the library automatically

### Change Navigation
Edit `src/lib/config.ts` → `navigation` object.

### Change Design / Colors
Edit `tailwind.config.ts` → `colors` section.

---

## SEO Features

- Dynamic sitemap (`/sitemap.xml`)
- Robots.txt
- LocalBusiness schema markup (in Footer)
- OpenGraph meta tags on all pages
- Semantic HTML with proper heading hierarchy
- Alt text ready for all images

---

## Accessibility

- Semantic HTML structure
- Keyboard navigation support
- Focus visible indicators
- Color contrast meeting WCAG guidelines
- Form labels and ARIA attributes
- Audio transcripts supported
- Skip-to-content ready

---

## Design System

### Colors
- **Brand (Green)** — Growth, renewal, primary actions
- **Ocean (Blue)** — Trust, calm, Carlsbad ocean connection
- **Sand (Warm Neutral)** — Grounding, approachable backgrounds
- **Warmth (Orange)** — Energy, accents, calls to action

### Typography
- **Display:** DM Serif Display — warm, editorial headings
- **Body:** Source Sans 3 — clean, readable body text

### Components
All reusable components are in `src/components/ui/index.tsx`:
Button, Section, SectionHeader, Card, PriceTag, TestimonialCard, FAQ, CalendlyEmbed

---

## License

Private. All rights reserved. © 2026 NeuroRefinement / Bryan Thunstrom.
