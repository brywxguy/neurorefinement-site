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
| Auth | Supabase Auth (magic link; admin area) |
| Payments | Stripe (one-time + subscriptions) |
| Scheduling | Cal.com (embedded, configured in `src/lib/config.ts`) |
| Email | ConvertKit / Kit (marketing), Resend (inquiry notifications) |
| Analytics | Plausible (privacy-respecting) |
| Hosting | Vercel (recommended) |

---

## Getting Started

### Prerequisites
- Node.js 18+ installed
- A Supabase account (free tier works)
- A Stripe account
- A Cal.com account
- A Resend account (inquiry notification emails)
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
- `CONVERTKIT_API_KEY` — From ConvertKit account settings
- `CONVERTKIT_FORM_ID` — From ConvertKit form settings
- `CRON_SECRET` — Random string (e.g. `openssl rand -hex 32`); protects `/api/keepalive`

Inquiries, admin and booking variables (full list with comments in `.env.example`) are described in [Inquiries, Booking & Admin](#inquiries-booking--admin) below.

### 3. Set Up Database

Go to your Supabase project → SQL Editor → paste and run `supabase/schema.sql`, then every file in `supabase/migrations/` (oldest first).

For an existing database, run any migrations not yet applied (oldest first) in the SQL Editor, or with `supabase db push` if using the Supabase CLI.

#### Supabase keep-alive

Free-tier Supabase projects pause after about 7 days without database activity. Two independent daily jobs each run a one-row `SELECT` on `lessons` to prevent this:

- **GitHub Action** (`.github/workflows/supabase-keepalive.yml`, 14:00 UTC ≈ 7 AM Pacific) queries Supabase's REST API directly. Needs repository secrets `SUPABASE_URL` and `SUPABASE_ANON_KEY` (GitHub → Settings → Secrets and variables → Actions). Can be run manually from the Actions tab.
- **Vercel cron** (`vercel.json`, daily at 15:00 UTC) calls `/api/keepalive`, which uses `SUPABASE_SERVICE_ROLE_KEY`. Needs `CRON_SECRET` set in Vercel project environment variables.

A failed run (e.g. the project is already paused) fails the GitHub Action, which emails the repo owner.

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
│   │   ├── admin/inquiries/     # Private inquiry inbox (Supabase Auth)
│   │   ├── book/client/         # Unlisted existing-client booking page
│   │   ├── contact/             # Contact + intensive request form
│   │   ├── start-here/          # Intake questionnaire
│   │   ├── dashboard/           # Member dashboard
│   │   ├── disclaimer/          # Legal disclaimer
│   │   ├── privacy/             # Privacy policy
│   │   ├── terms/               # Terms of service
│   │   ├── refund-policy/       # Refund policy
│   │   ├── sitemap.ts           # Dynamic sitemap
│   │   ├── robots.ts            # Robots.txt
│   │   └── api/
│   │       ├── inquiries/       # Saves every form submission + emails Bryan
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

## Inquiries, Booking & Admin

### How it works

Every public form saves a row to the Supabase `inquiries` table and emails Bryan:

| Form | Where | `form_type` |
|------|-------|-------------|
| Contact form | `/contact` | `contact` |
| Request an intensive | `/contact?type=intensive` (also linked from booking sections) | `intensive` |
| Free 20-min call questions | Booking sections on `/functional-synthesis` and `/coaching` | `free_call` |
| Start Here questionnaire | `/start-here` | `start_here` |
| New client intake | `/intake` | `intake` |

Submissions go to `POST /api/inquiries`, which validates input, drops bot submissions (hidden honeypot field), limits each IP to 5 submissions per 10 minutes, inserts with the service-role key, then sends the email. If Resend isn't configured or fails, the inquiry is still saved. Visitors only see an error if it could neither be saved nor emailed, and then they're told to email or call instead.

Row Level Security is on and the public `anon`/`authenticated` roles have no access to the table at all, so nobody can read or write inquiries through the public Supabase API. Intake answers (which can include health information) are stored in the `details` column and shown only in the admin page, never in the notification email.

### Setup checklist

1. **Database:** run `supabase/migrations/20261021210000_inquiries.sql` (SQL Editor or `supabase db push`).
2. **Vercel env vars** (Production *and* Preview):

   | Variable | Required | Purpose |
   |----------|----------|---------|
   | `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Admin sign-in |
   | `SUPABASE_SERVICE_ROLE_KEY` | Yes | Saving inquiries, admin page (server only) |
   | `RESEND_API_KEY` | For email | Notification emails |
   | `RESEND_FROM_EMAIL` | For email | Sender, e.g. `NeuroRefinement <notifications@neurorefinement.com>` |
   | `INQUIRY_NOTIFY_EMAIL` | No | Recipient(s), default `bryan@neurorefinement.com` |
   | `ADMIN_EMAILS` | No | Admin allowlist, default `bryan@neurorefinement.com,bpthunstrom@gmail.com` |
   | `INQUIRY_IP_SALT` | No | Random string for hashing IPs used in rate limiting |
   | `NEXT_PUBLIC_CAL_USERNAME` | No | Default `neurorefinement` |
   | `NEXT_PUBLIC_CAL_FREE_CALL_SLUG` | No | Default `free-20-min-call` |
   | `NEXT_PUBLIC_CAL_NEW_CLIENT_LESSON_SLUG` | No | Default `new-client-lesson` |
   | `NEXT_PUBLIC_CAL_COACHING_SLUG` | No | Default `coaching-session` |
   | `NEXT_PUBLIC_CAL_EXISTING_CLIENT_URL` | No | Default `https://cal.com/neurorefinement/client-lesson` |

   `NEXT_PUBLIC_*` values are baked in at build time, so redeploy after changing them.

3. **Resend:** create an account at [resend.com](https://resend.com), add and verify the `neurorefinement.com` domain (it gives you DNS records to add), create an API key, and set `RESEND_API_KEY` + `RESEND_FROM_EMAIL`. Before the domain is verified, Resend's `onboarding@resend.dev` sender only delivers to the email you signed up to Resend with. Replying to a notification email replies straight to the person who wrote in.

4. **Supabase Auth (admin sign-in):** in Supabase → Authentication → URL Configuration, set the Site URL to `https://neurorefinement.com` and add these Redirect URLs:
   - `https://neurorefinement.com/admin/auth/callback`
   - `https://*-bryan-thunstroms-projects.vercel.app/**` (Vercel previews)
   - `http://localhost:3000/admin/auth/callback`

   The built-in Supabase email sender is limited to a few emails per hour, which is plenty for two admins. Add custom SMTP (e.g. Resend) under Authentication → Emails if you ever hit the limit.

### Cal.com booking

Booking settings live in one place: the `booking` block in `src/lib/config.ts`, which defaults to Bryan's Cal.com account (`cal.com/neurorefinement`). Any `NEXT_PUBLIC_CAL_*` env var overrides the matching default. If the username is set to the placeholder `your-cal-username`, booking sections fall back to saving the free-call questions as an inquiry and telling the visitor Bryan will reach out.

Cal.com event types used by the site:

| Event type | URL slug | Notes |
|------------|----------|-------|
| Free Intro Call (20 min, Zoom) | `free-20-min-call` | For new people. The site asks who it's for, the main concern, and how they heard *before* showing the calendar, saves those answers, and pre-fills name, email and notes in Cal.com. Optionally add the same booking questions in Cal.com (event type → Advanced → Booking questions) for anyone who books on cal.com directly. |
| New Client Lesson (90 min, $200) | `new-client-lesson` | First visit for new clients. Embedded on `/functional-synthesis`. Length and price shown on the site come from `pricing.abm.newClientLesson`. |
| Client Lesson (45 min) | `client-lesson` | Hidden event type, embedded only on the unlisted page `/book/client` (not linked anywhere, hidden from search engines), which you share with clients. Hidden events can still be booked by anyone who has the link. To use a Cal.com private link instead, set `NEXT_PUBLIC_CAL_EXISTING_CLIENT_URL`. |
| Coaching Session (60 min) | `coaching-session` | By request only. Linked from `/coaching`, which is not in the main nav. |
| Intensive | — | Not a Cal.com event: "Request an Intensive" opens the inquiry form (`form_type = intensive`). |

If you change a slug in Cal.com, set the matching `NEXT_PUBLIC_CAL_*_SLUG` variable (or edit the default in `src/lib/config.ts`).

### Reviewing inquiries (for Bryan)

1. Go to **`/admin/inquiries`** (e.g. `https://neurorefinement.com/admin/inquiries`).
2. Enter `bryan@neurorefinement.com` or `bpthunstrom@gmail.com` and click **Email me a sign-in link**, then open the link **in the same browser**.
3. Inquiries are listed newest first. Use the tabs to filter by status (New, Contacted, Booked, Not a fit), change the status and add private notes on each one, then click **Save**. Click **Form answers** to see the full questionnaire or intake answers.
4. **Export CSV** downloads the current filter (all columns, including notes) for a spreadsheet.

To change who can sign in, set `ADMIN_EMAILS`.

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
- [ ] **Cal.com event types** — See [Inquiries, Booking & Admin](#inquiries-booking--admin)
- [ ] **Stripe products** — Create products/prices in Stripe dashboard
- [ ] **Attorney review** — Disclaimer, Privacy, Terms, Refund Policy, Waiver
- [ ] **ABM trademark compliance** — Verify language with ABM organization

### After Launch
- [ ] **Real testimonials** — Add to `testimonials` in `src/lib/config.ts` (the homepage section is hidden while it's empty)
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
Button, Section, SectionHeader, Card, PriceTag, TestimonialCard, FAQ.
Booking components (`BookingOptions`, `CalEmbed`) are in `src/components/booking/`; form components in `src/components/forms/`.

---

## License

Private. All rights reserved. © 2026 NeuroRefinement / Bryan Thunstrom.
