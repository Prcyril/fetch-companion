# Fetch Companion — Context Document
*Last updated: June 2026*

---

## What this is

A feature prototype built for a Fetch Pet Insurance job application (Product Builder role). The concept is a pet health companion app that centralises pet health records, reminders, insurance, and AI-powered insights in one place. Built in Figma Make using React + TypeScript + inline styles (no Tailwind).

---

## Tech stack

| Concern | Choice |
|---|---|
| Framework | React 18 + TypeScript |
| Router | `react-router` v7 — imports from `'react-router'`, uses `MemoryRouter` |
| Animation | `motion/react` from the `motion` package — `import { motion, AnimatePresence } from 'motion/react'` |
| Icons | `lucide-react` |
| Styles | Inline styles throughout — no Tailwind, no CSS modules |
| Entry point | `src/app/App.tsx` (mandatory, must have default export) |
| Components | `src/app/components/` as `.tsx` files |
| Fonts | `src/styles/fonts.css` — Fraunces (serif display) + Plus Jakarta Sans (body) via Google Fonts |

---

## Design system

**Colours**
- `#F5F5F7` — canvas background
- `#FFFFFF` — card background
- `#DEDEDE` — card border (0.5px)
- `#1A1A1A` — primary text, black CTAs
- `#6B6B6B` — muted/secondary text
- `#B0B0BF` — placeholder/disabled text
- `#F0F0F2` — divider lines
- `#F279C5` — Fetch Pink (primary accent)
- `#F9E0F3` — Fetch Pink light bg
- `#A0348A` — Fetch Pink dark text

**Event type colours**
| Type | Dot/icon | Background | Text |
|---|---|---|---|
| vet | `#1D9E75` | `#E1F5EE` | `#0F6E56` |
| medication | `#E8A020` | `#FFF5E0` | `#854F0B` |
| insurance | `#5B8DEF` | `#EEF0F8` | `#3A4A9A` |
| wellness | `#9B72CF` | `#F3EEFB` | `#6B3FA0` |
| milestone | `#F279C5` | `#F9E0F3` | `#A0348A` |
| emergency | `#E05A5A` | `#FCEAEA` | `#A03030` |

**Typography**
- Display/pet names: `'Fraunces', serif` — sizes 18–28px, weight 700, `letterSpacing: '-0.02em'`
- Body: `'Plus Jakarta Sans', sans-serif` — sizes 11–15px

**Components**
- Cards: white, `borderRadius: 12–16`, `border: '0.5px solid #DEDEDE'`
- Event cards: 4px coloured LEFT BORDER (not coloured backgrounds)
- Black CTAs: `backgroundColor: '#1A1A1A'`, `borderRadius: 9999` (pill), white text
- Back buttons: black circle (`#1A1A1A`), white chevron icon
- Filter chips active: `backgroundColor: '#1A1A1A'`, white text
- Pet switcher active: `border: '1.5px solid #F279C5'`, `backgroundColor: '#F9E0F3'`, pink text

---

## App structure

### `src/app/App.tsx`
Root component. Uses `MemoryRouter` with `initialEntries={['/']}`. Contains `AppShell` which manages the global bottom sheet state (Add menu) and renders `AppRoutes` + `NavBar`.

**Routes:**
| Path | Component |
|---|---|
| `/` | HomeScreen |
| `/timeline` | TimelineScreen |
| `/event/:id` | EventDetailScreen |
| `/add` | AddEventScreen |
| `/add-reminder` | AddReminderScreen |
| `/insights` | InsightsScreen |
| `/profile` | ProfileScreen |
| `/reminders` | RemindersScreen |
| `/reminder/:id` | ReminderDetailScreen |

### `src/app/components/MobileShell.tsx`
Renders an iPhone 15 Pro frame around the app. Structure:
- Dark `#1A1A1A` outer canvas
- Titanium gradient shell with side/power buttons
- Dynamic Island (120×36px black pill)
- Status bar (54px, shows 9:41 + signal/WiFi/battery SVGs)
- App content area: `height: 780px`, `overflowY: auto`, `flexDirection: column`
- Home indicator bar at bottom

### `src/app/components/NavBar.tsx`
5-tab bottom nav. The centre "Add" tab is a FAB that opens a global bottom sheet (state lives in `AppShell`). Sheet slides up with spring animation, shows two options:
- **Log an event** → `/add` (green CalendarPlus icon)
- **Set a reminder** → `/add-reminder` (pink ClipboardList icon)

FAB rotates 45° and turns pink while sheet is open. Backdrop tap closes the sheet.

Active tab: pink `#F279C5` icon + `#F9E0F3` pill background.

Props: `sheetOpen: boolean`, `onToggleSheet: () => void`

---

## Mock data (`src/app/components/mockData.ts`)

### Pets
- **Bruno** — Golden Retriever, born 2021-03-12, emoji 🐶, colour `#FFF5E0`
- **Mochi** — Domestic Shorthair, born 2023-07-04, emoji 🐱, colour `#F3EEFB`

### Events (13 total)
Bruno's events: Adoption day (milestone), First vet visit, Flea & tick treatment started, Annual vaccination ×2, Fetch insurance started, Insurance claim approved, Annual vaccination, Started hydrotherapy, Annual check-up
Mochi's events: Adoption day, First vet visit, Desexing procedure

### Reminders (7 total)
Bruno: Annual vaccination (Apr 2026, annually), Flea & tick treatment (Jul 2026, monthly), Annual check-up (Apr 2027, annually), Joint health review (Sep 2026, once), Fetch policy renewal (Aug 2026, annually)
Mochi: Annual vaccination (Jul 2026, annually), Annual check-up (Oct 2026, annually)

### Types (`src/app/components/types.ts`)
```ts
type EventType = 'vet' | 'medication' | 'insurance' | 'wellness' | 'milestone' | 'emergency'

type Reminder = {
  id: string; petId: string; title: string; type: EventType
  dueDate: string; notes?: string; recurring?: 'monthly' | 'annually' | 'once'; done?: boolean
}

type TimelineEvent = {
  id: string; petId: string; type: EventType; title: string
  clinic?: string; date: string; notes?: string; attachments?: number
}

type Pet = {
  id: string; name: string; breed: string; species: 'dog' | 'cat'
  dob: string; emoji: string; colour: string
}
```

---

## Screens

### HomeScreen (`/`)
- "Good morning 👋" / "Your pets" header
- Pet switcher pills (Bruno/Mochi)
- Hero card per pet: emoji, name, breed/age, stats row (last vet date, event count, cover status)
- "Coming up" horizontal scroll strip — live from `mockData.reminders`, filtered by active pet, sorted by due date, first 3 shown. Cards have 4px coloured left border, type icon, title, due date, "Soon" badge if within 30 days. Taps → `/reminder/:id`. "See all →" → `/reminders`
- "Recent events" list — last 3 events for active pet. Each taps → `/event/:id`. "See all →" → `/timeline`
- Dark AI banner card ("Bruno's health looks good / Ask AI for a full summary →") → `/insights`
- No "View full timeline" button (removed — redundant with nav)

### TimelineScreen (`/timeline`)
- "Health history" / "{Pet}'s timeline" header
- Pet switcher, filter chips: All / Vet / Medication / Insurance / Wellness / Milestone / Emergency
- Events grouped by month (most recent first), gradient pink spine
- Each event card: coloured type pill, date, title, clinic, truncated notes (2 lines), attachment count
- Taps → `/event/:id`
- **Empty states:**
  - Filter active + no results: coloured dot + "No {type} events logged for {pet} yet" + "Tap + to log the first one"
  - Filter active + has results: after last card, fades in coloured dot + "That's all of {pet}'s {type} events" + "Tap + to log another"
  - All filter + no events at all: paw print emoji empty state

### EventDetailScreen (`/event/:id`)
- Black back button (circle)
- Type pill badge
- Main card: 4px left border, large icon, Fraunces title, date/clinic/pet meta, notes, attachments list
- "Ask AI about this event" outline pill (Sparkles pink) → navigates to `/insights` with `state: { prefilledQuestion }` pre-populated with contextual question
- "Back to timeline" black pill CTA

### AddEventScreen (`/add`)
2-step flow:
1. Type selector (6 types as tappable rows — auto-advances on selection after 150ms)
2. Details form: title, date, optional clinic (vet/wellness/emergency), optional notes
- Pink progress bar animates 50% → 100%
- Black back button navigates back through steps
- Success state: spring-animated green checkmark → navigates to `/timeline` after 1.8s

### InsightsScreen (`/insights`)
- Dark hero card: Bruno's name/breed, AI summary paragraph, 3 live stats (event count from mockData, years of history, total $ claimed from insurance notes)
- 4 data-driven insight cards with 4px coloured left borders (vaccination due, weight trend, medication gap, insurance stat) — computed from `mockData` at render time
- AI chat interface:
  - Suggested question chips disappear once chat starts
  - Typing indicator (3 bouncing dots)
  - Keyword-matched responses across 10 topics: vaccination, vet summary, patterns, prep, weight, emergency/sock, insurance, medication/nexgard, wellness/hydrotherapy, Mochi
  - `getAIResponse(question)` uses `.includes()` on lowercased input with graceful fallback
  - Reads `useLocation().state?.prefilledQuestion` on mount — auto-sends pre-filled question from EventDetailScreen or ReminderDetailScreen
- "Powered by Claude" footer

### ProfileScreen (`/profile`)
- Pet summary card, 2×2 stats grid
- Insurance and preferences menu sections
- "Built for Fetch · Fetch Companion concept" footer

### RemindersScreen (`/reminders`)
- "Health schedule" / "Reminders" header
- Pet switcher
- Filter chips: All / This month / Upcoming / Done
- Reminders grouped by month, sorted by due date ascending
- Each card: 4px coloured left border, type icon, title, due date, recurring badge, urgency badge (Overdue / Soon / Xd)
- Mark-done circle toggle (local state with `Set<string>`)
- Done items: strikethrough, faded, pink check circle
- Empty state per filter

### ReminderDetailScreen (`/reminder/:id`)
- Black back button
- Type pill + optional Overdue/Due soon/Rescheduled badge
- Main card: 4px left border, icon, Fraunces title, date (+ time if booked), recurring, pet info
- Notes card
- Past history card: up to 3 related events of same type for same pet, tappable → `/event/:id`
- CTAs:
  - "Mark as done" → spring checkmark success state → `/reminders`
  - "Reschedule" → opens bottom sheet with **CalendarPicker**
  - "Ask AI about this" → `/insights` with prefilledQuestion

### AddReminderScreen (`/add-reminder`)
2-step flow:
1. Type selector (same 6 types)
2. Details form: pet selector, title, due date (native date input), recurring (One-time / Monthly / Annually), optional notes. Form fields highlight in the type's accent colour when filled.
- Black back button
- Pink progress bar
- Success state: pink checkmark → navigates to `/reminders` after 1.8s

### CalendarPicker (`src/app/components/CalendarPicker.tsx`)
Used inside ReminderDetailScreen's reschedule sheet.
- **Clinic connection badge**: "Live availability · {clinic name}" with green "Connected" pill
- Month-view grid (Mon–Sun), forward navigation only (can't go before current month)
- Past dates greyed and non-interactive
- **Green availability dots** under dates that have clinic slots — generated by `generateAvailability()` which seeds consistent future dates relative to today (so always looks current)
- Selected date: filled circle in reminder's type accent colour
- Today: outlined circle in accent colour
- Time slot picker slides in below calendar when an available date is selected — 2–4 slots per day
- Unavailable dates show amber "No clinic slots" notice
- Confirm button label: "Confirm date" or "Confirm · 10:30 am" when time selected
- Clinic name: "City Road Animal Hospital" for Bruno, "Newtown Cat Clinic" for Mochi

---

## Key patterns

### Pre-filling AI chat from other screens
```ts
navigate('/insights', { state: { prefilledQuestion: 'Tell me about Bruno\'s annual vaccination' } })
```
InsightsScreen reads `useLocation().state?.prefilledQuestion` via a `hasSentPrefill` ref on mount and auto-sends.

### Bottom sheet overlay positioning
The Add sheet and ReminderDetailScreen's reschedule sheet are rendered as `position: absolute` overlays inside a `position: relative` wrapper that spans the full phone screen — not inside any scroll container, so they don't get clipped.

### Screen top padding
All screens use `padding-top: 16px` on their header — the MobileShell status bar (54px fixed height) provides the physical top clearance.

### Back button style
All back buttons: `width: 36, height: 36, borderRadius: '50%', backgroundColor: '#1A1A1A', border: 'none'` with `<ChevronLeft size={18} color="#FFFFFF" />`.

### Route-aware nav active state
```ts
const active = path === '/'
  ? location.pathname === '/'
  : path ? location.pathname.startsWith(path) : false
```
The FAB (null path) is never "active".

---

## Features built

1. ✅ iPhone 15 Pro shell (MobileShell)
2. ✅ Bottom nav with Add sheet
3. ✅ Home screen — pet switcher, hero card, coming up strip, recent events, AI banner
4. ✅ Timeline screen — filtered, grouped, spine, empty/end states
5. ✅ Event detail screen — with AI entry point
6. ✅ Add event flow — 2-step with success state
7. ✅ AI Insights screen — data-driven cards, keyword chat, pre-fill from other screens
8. ✅ Reminders screen — filters, done toggle, grouped
9. ✅ Reminder detail screen — past history, mark done, reschedule, AI
10. ✅ Add reminder flow — 2-step with success state
11. ✅ Reschedule flow — CalendarPicker with mock clinic availability + time slots
12. ✅ Timeline filter empty/end states ("That's all of Bruno's wellness events")
13. ✅ Profile screen
