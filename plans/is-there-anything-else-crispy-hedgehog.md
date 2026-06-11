# Plan: Flesh out the AI Health Summary (InsightsScreen)

## Context

The InsightsScreen is already well-structured — dark hero card, 4 insight cards, a chat interface with suggested questions and typing animation. But several things make it feel like a prototype rather than a polished feature:

1. **Insights are static** — they're hardcoded, not derived from `mockData`. A vet reading this would clock it immediately.
2. **Chat is limited to 4 exact match questions** — anything else falls back to a generic non-answer. Feels broken.
3. **No entry point from HomeScreen** — the AI is only discoverable via the nav tab.
4. **EventDetailScreen has no AI touchpoint** — a missed opportunity to show how AI connects to individual events.
5. **The hero card stats are hardcoded** — "10 events", "3 yrs history", "$840 claimed" don't update from data.

This plan fills those gaps without over-engineering. The goal is a demo-ready screen that feels alive, coherent, and specific to Bruno's actual mock data.

---

## What to build

### 1. Make insight cards data-driven (`InsightsScreen.tsx`)

Replace the 4 hardcoded `INSIGHT_CARDS` with a function that derives them from `mockData`:

- **Vaccination due**: Calculate from last vet event date → if >11 months ago, show "due soon" card
- **Weight trend**: Parse weight mentions from event notes (Bruno: 24kg → 30kg → 32kg)
- **Medication gap**: Check if last medication event was >6 months ago
- **Insurance stat**: Pull real claim amounts and event counts from `events` array

### 2. Expand AI responses — broader question coverage (`InsightsScreen.tsx`)

Add ~8 more entries to `AI_RESPONSES` covering natural variations people would actually type:
- "when is his next vaccine" / "vaccination" / "shots"
- "weight" / "how much does he weigh"
- "emergency" / "sock" / "what happened in 2022"
- "insurance" / "claim" / "cover"
- "medication" / "nexgard" / "flea"

Add a smarter fallback using keyword matching (rather than a generic non-answer) so partial questions still surface something useful.

### 3. Live hero card stats (`InsightsScreen.tsx`)

Replace hardcoded numbers with values computed from `mockData`:
- Event count: `events.filter(e => e.petId === 'bruno').length`
- Years of history: from first event date to today
- Total claimed: sum from insurance events that mention dollar amounts in notes

### 4. "Ask AI" entry point on HomeScreen (`HomeScreen.tsx`)

Add a small banner card below the recent events section — above the "View full timeline" button:

```
┌─────────────────────────────────────────┐
│ ✦  Bruno's health looks good            │
│    Ask AI for a full summary →          │
└─────────────────────────────────────────┘
```

- Dark background, pink sparkle icon, subtle
- Taps through to `/insights`
- Only shows when there are >3 events logged

### 5. "Ask AI about this event" on EventDetailScreen (`EventDetailScreen.tsx`)

Add a secondary button below "Back to timeline":

```
[ Ask AI about this event ]   ← white outline pill
```

- Navigates to `/insights` and pre-populates the chat with a contextual question based on the event type (e.g., for a vet event: "Summarise Bruno's annual check-up on 15 Apr 2024")
- Pass as URL state via `navigate('/insights', { state: { prefilledQuestion: '...' } })`
- InsightsScreen reads `useLocation().state` on mount and auto-sends if present

---

## Files to modify

| File | Change |
|---|---|
| `src/app/components/InsightsScreen.tsx` | Data-driven insights, expanded AI responses, keyword fallback, live stats, read prefilled question from location state |
| `src/app/components/HomeScreen.tsx` | Add AI banner card above the CTA button |
| `src/app/components/EventDetailScreen.tsx` | Add "Ask AI about this event" secondary button |

---

## Verification

- Open HomeScreen → AI banner appears below recent events
- Tap banner → navigates to InsightsScreen
- On InsightsScreen, hero stats match the actual event count and date range from mockData
- Insight cards reflect real data (e.g., last vet date is correctly computed as overdue)
- Type a question not in the suggested list (e.g. "what about his flea treatment") → keyword match returns relevant answer, not a generic fallback
- Open any event on EventDetailScreen → "Ask AI about this event" button is visible
- Tap it → navigates to InsightsScreen with the chat pre-populated and the AI response already triggered
