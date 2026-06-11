# Fetch Companion

A pet health timeline concept built for Fetch — helping pet owners track their pet's complete health journey in one beautiful, organised app.

---

## What is this?

Fetch is Australia's highest-rated pet insurance app. But most pet owners interact with their insurance only when something goes wrong — once or twice a year at most.

Fetch Companion explores a simple question:

> What would a beautiful, daily-use pet health experience look like if it were designed from the ground up today?

This is an unsolicited product concept built as a bonus piece alongside my application for the Product Builder role at Fetch.

---

## The problem

Today's pet ownership experience is fragmented. Vaccination records live in email. Vet notes are on paper. Medication schedules are in someone's head. Insurance documents are in a folder nobody can find.

When an emergency happens — or even just a routine vet appointment — pet owners scramble to piece together their pet's history from a dozen different places.

Fetch Companion centralises the entire pet journey into one experience.

---

## What's been built

### Pet Health Timeline
The core feature. A chronological, scrollable history of every health event in a pet's life — vet visits, medications, insurance claims, wellness activities, milestones, and emergencies. Grouped by month, filterable by event type, with a signature gradient spine running from adoption day to today.

### Multi-pet switcher
Seamlessly switch between pets. Each pet has their own timeline, avatar, and health summary.

### Event Detail
Tap any event to see the full picture — clinic, date, notes, attached documents, and nearby events in the timeline for context.

### Add Event
A two-step flow to log a new health event. Choose the event type first, then fill in the details. Contextual fields appear based on the event type selected.

### Profile
A summary of your pets, health stats, insurance status, and account settings — all in one place.

---

## Design philosophy

The Fetch job description called out something specific: they want someone who sweats the details — loading states, empty states, transitions, the moments most engineers skip. Every screen in this project was built with that bar in mind.

### Follows Fetch's real design language
Colours, typography, and component patterns were reverse-engineered directly from the Fetch app. The pink accent (`#F279C5`), black primary CTAs, pill-shaped buttons, and `#F5F5F7` canvas are all pulled from Fetch's actual UI — not approximated, extracted.

### A proper design system first
Before writing a single line of component code, a full design system was built: colour tokens, typography scale, spacing rhythm, border radius rules, motion timing, component tokens, and iconography. Every visual decision in the app traces back to a deliberate token. Nothing is hardcoded arbitrarily.

### Fraunces for display type
A warm optical-size serif used exclusively for pet names and screen titles. Paired with Plus Jakarta Sans for everything else. Typography is where most app UIs feel generic — the type pairing is the single biggest thing that makes this feel crafted rather than assembled.

### The gradient spine
The vertical timeline line fades from pale pink at the earliest event up to full Fetch Pink at today. It represents the pet's journey growing toward the present. Subtle, intentional, and the one signature element that makes the timeline feel alive rather than static.

### White cards with coloured left border accents
Rather than coloured card backgrounds — a pattern that reads as generic fintech — event type is communicated through a 4px coloured left border. Cleaner, more Fetch, less like every other health app.

---

## Animation and motion

Motion is one of the things that separates a good UI from a great one. Every animation in this project was chosen deliberately — nothing is decorative.

### Page transitions
Screens fade and slide in as you navigate between them using Framer Motion's `AnimatePresence`. The direction and distance of the transition communicates hierarchy — drilling into a detail slides up, going back slides down.

### Pet switcher
Switching between Bruno and Mochi animates the hero card out and the new one in with a subtle vertical fade. The transition reinforces that you're looking at a different pet's data, not just a colour change.

### Timeline entry animations
Each event card staggers in as the timeline loads — a 40ms delay between cards gives the list a sense of being populated rather than appearing all at once.

### Tap feedback
Every interactive card uses `whileTap={{ scale: 0.98 }}` — a micro-compression on press that makes the UI feel physical and responsive, matching the feel of a native mobile app.

### Add event flow
The progress bar animates from 50% to 100% as you move from step 1 to step 2. The step content slides in from the right on advance and from the left on back — matching the mental model of moving forward and backward through a flow.

### Success state
On saving an event, a spring-physics circle scales in with a checkmark before navigating back to the timeline. The spring easing (`stiffness: 300, damping: 20`) gives it a satisfying, bouncy feel without being over the top.

### Timing system
All transitions follow a consistent timing scale: 200ms for micro-interactions (hover, tap), 300ms for standard transitions, 400ms for sheet entries, 500ms for page transitions. Everything uses `ease-out` — fast in, gradual settle — which feels native on mobile.

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build tool | Vite 8 |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| Icons | Lucide React |
| Routing | React Router v7 |
| Deploy | Vercel |

---

## Running locally

```bash
git clone https://github.com/Prcyril/fetch-companion.git
cd fetch-companion
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## What's next

This is a concept, not a finished product. If I were building this for real inside Fetch, the next priorities would be:

- **Supabase backend** — real pet profiles, persistent event storage, user auth
- **Document upload** — actual PDF/image upload and storage via Supabase Storage
- **Claude AI integration** — intelligent event summaries, vet visit prep, anomaly detection across the timeline
- **Push notifications** — vaccination reminders, medication schedules, annual check-up nudges
- **Vet integration** — pulling real visit data directly from FetchPay into the timeline automatically

---

## About

Built by Cyril as a bonus piece for the Fetch Product Builder application.

This project was designed and built in one week — from a design system derived from the real Fetch app, through to a fully functional React prototype deployed on Vercel.

> "What would a beautiful pet care experience look like if it were designed from the ground up today?"
