# Fetch Asset Catalog

All imported Figma components/illustrations for the Fetch Companion prototype.
Import paths are relative to `src/imports/`.

---

## Illustrations (Mascot characters)

### 1. Dog with leash — `Component1-1`
- **File:** `src/imports/Component1-1/index.tsx`
- **SVG data:** `svg-kgl5zkyxf9.ts`
- **Dimensions:** 143 × 151 px
- **Colors:** #E3E8FB (blue-lavender body), #FB90FB (pink leash), #1D1C1C (outlines)
- **Description:** Blue/lavender dog holding a pink leash in its mouth. Sitting pose with motion lines. Use for: walk reminders, activity logging.

### 2. Dog crouching / small pink — `Component1`
- **File:** `src/imports/Component1/index.tsx`
- **SVG data:** `svg-mn72nau5oo.ts`
- **Dimensions:** 83.5 × 66 px
- **Colors:** #FAE6FA / #F7A5F9 (light pink body), #1B1B1C (outlines)
- **Description:** Small crouching/sitting dog in pale pink. Use for: compact mascot moments, empty states.

### 3. Flying dog with money — `Component1-2`
- **File:** `src/imports/Component1-2/index.tsx`
- **SVG data:** `svg-hf0p1f6oju.ts`
- **Dimensions:** 344 × 271 px (large)
- **Colors:** #E5EBFF (blue body), #CEFFC2 / #8FEF81 (green money), #FFC56E / #FF9D0D (gold coins), #1B1B1C (outlines)
- **Description:** Large blue dog flying through the air holding cash and coins — surrounded by clouds. The hero claims illustration. Use for: insurance CTA hero, onboarding, marketing moments.

### 4. Flying money / winged dollar — `Component1-3`
- **File:** `src/imports/Component1-3/index.tsx`
- **SVG data:** `svg-xenrhxbnfa.ts`
- **Dimensions:** 96 × 62 px
- **Colors:** #FEC9FF (pink wings), #010101 (outlines), #8B8690 (shadow), #FDEDFD (highlight)
- **Description:** A dollar bill with pink wings flying through the air. Use for: claims paid, reimbursement, financial moments.

### 5. Cat with phone — `Component1-5`
- **File:** `src/imports/Component1-5/index.tsx`
- **SVG data:** `svg-zuiqzdtftz.ts`
- **Dimensions:** 165 × 153 px (approx, 0.26% inset)
- **Colors:** #FEC9FF (pink cat body), #85EB6C (green phone screen/checkmark), #161615 (outlines)
- **Description:** Pink cat holding/looking at a phone with a green check on screen. Use for: FetchPay, claims submitted, digital-first moments.

### 6. "FETCH" logo — pink italic — `Component1-4`
- **File:** `src/imports/Component1-4/index.tsx`
- **SVG data:** `svg-2ptajbbgvs.ts`
- **Dimensions:** 100 × 49 px
- **Colors:** #FDA5FF (light pink)
- **Description:** The word "FETCH" in bold italic custom lettering, pink colorway. Use for: light/accent contexts, splash screens, marketing overlays on dark backgrounds.

### 7. "FETCH" logo — dark/black — `Component1-7`
- **File:** `src/imports/Component1-7/index.tsx`
- **SVG data:** `svg-7v0n01ium0.ts`
- **Dimensions:** 100 × 49 px
- **Colors:** #1B1B1C (near black)
- **Description:** The word "FETCH" in bold italic custom lettering, dark colorway. Use for: light backgrounds, nav headers, profile screens.

### 8. Fetch QR code — `Component1-6`
- **File:** `src/imports/Component1-6/index.tsx`
- **SVG data:** `svg-re6q3tvyir.ts`, mask data: `svg-iknth.tsx`
- **Dimensions:** 100 × 100 px
- **Colors:** Black on white, #FDA9FF (pink circle center)
- **Description:** Fetch-branded QR code with pink Fetch logo in the center. Use for: app download prompt, share screens, onboarding.

### 9. Intercom / support chat widget — `Component3`
- **File:** `src/imports/Component3/index.tsx`
- **SVG data:** `svg-3oua2ccfoy.ts`, mask: `svg-epqn7.tsx`
- **Image:** `488c7604a3bee080ec5b5eedc3b8abc13e30c0e8.png` (Pip avatar — pink cat)
- **Dimensions:** 340 × ~60 px card (max-w-[340px])
- **Colors:** white card, #E5E5E5 border, #14161A text, #6C6F74 subtext
- **Description:** Intercom-style support chat notification card. "Hey! Need help with FetchPay? We're here if you need us 🐾" — from Pip (the pink cat avatar). Supports 40 variants including the full Fetch mascot/logo set. Use for: support prompts, chat nudges, onboarding tooltips.

### 10. Vector / arrow icon — `Vector`
- **File:** `src/imports/Vector/index.tsx`
- **SVG data:** `svg-ocgw2hdie8.ts`
- **Dimensions:** 21 × 24 px
- **Colors:** white
- **Description:** Small white arrow/chevron vector. Use for: button icons, navigation arrows.

---

## Speed / flame icon — inside `Component1-1` set

Visible in image-1: a stopwatch with pink flames. This appears to be a variant within the `Component3` multi-variant component (variant="28" is the cat with phone, variant="6" is flying money, variant="2" is the flying dog).

---

## Buttons & UI primitives

### "Check my price" CTA button — `DivFramer11Qg5FvContainer`
- **File:** `src/imports/DivFramer11Qg5FvContainer/index.tsx`
- **Dimensions:** ~205px wide × ~47px tall (content-sized)
- **Colors:** `#B1FF9E` green background, `#1B1B1C` text & border, `#222` 3px inner border ring
- **Typography:** Inter Medium, 21.5px, tracking -0.4px, `#1B1B1C`
- **Style details:**
  - `bg-[#b1ff9e]` fill
  - `rounded-[40px]` fully-rounded pill
  - `shadow-[1px_1px_0px_0px_#1b1b1c]` — 1px offset black shadow (nav/compact size)
  - `border-3 border-[#222]` inner border ring via `::after` pseudo-element
  - `px-[12px] py-[8px]` padding
- **Label:** "Check my price 👉" (label is hardcoded in the import — use `FetchCTAButton` from `src/app/components/FetchCTAButton.tsx` for a configurable version)
- **Variants in the codebase:**
  - Nav size: `shadow-[1px_1px_0px_0px_...]`, `border-3`, `px-12 py-8` (this component)
  - Full size: `shadow-[2px_2px_0px_0px_...]`, `border-4`, `px-24 py-12` (used on landing sections)
- **Use for:** Design reference for the exact Fetch CTA button spec. The `FetchCTAButton` component already implements this pattern with configurable label, emoji, and size.

---

## Batch 0 — Original Fetch website frames (full pages / design reference)

These were the first three designs shared. They are full rendered Figma frames from the live Fetch website — use these as design reference and to pull specific patterns, copy, and layout from.

### A. Fetch website navigation bar — `DivNav`
- **File:** `src/imports/DivNav/index.tsx`
- **SVG data:** `svg-0lzzq1k8c2.ts`
- **Dimensions:** Full-width desktop nav (1600px content width, 52px height)
- **Colors:** White background, #1B1B1C logo, #B1FF9E "Check my price" CTA button with 1px black offset shadow
- **Contents:**
  - Dark "FETCH" wordmark logo (links to fetchpet.com.au)
  - Nav links: Insurance, Cover, Vets, Partners, Support, About (all linking to real URLs)
  - "Check my price 👉" CTA button — green pill, `bg-[#b1ff9e]`, `shadow-[1px_1px_0px_0px_#1b1b1c]`, 40px radius
  - Search icon (24px)
- **Use for:** Reference for nav layout, CTA button sizing, logo placement, desktop spacing patterns.

### B. Fetch cat insurance page — `HttpsWwwFetchpetComAuCatInsurance...`
- **File:** `src/imports/HttpsWwwFetchpetComAuCatInsuranceHttpsWwwFetchpetComAuCatInsurance1106202603457Gmt10/index.tsx`
- **SVG data:** `svg-9r3n4sh9vi.ts`, masks: `svg-rmp68.tsx`
- **Images:** 12 PNG assets (pet photos, product imagery)
- **Dimensions:** ~9856 lines — full desktop page render (~1400px wide)
- **Hero copy:** "Cover as cool as your cat" — Inter Bold, 76px, #1B1B1C, tracking -1.52px
- **Sub-copy:** "Australia's top-rated pet insurance* now for your cat & kitten!" — Inter Medium, 30.6px
- **CTA:** "Get Cover in 2 mins" — same green pill button style as nav
- **Star rating:** 4.8★ displayed prominently in hero
- **Key design patterns to reference:**
  - Hero section: large pink cat illustration (358×416, same as `DivFramer1532En3`) left-aligned, headline right-aligned
  - `#050505` page background sections
  - `#B1FF9E` green accents throughout
  - `rounded-[48px]` for large section cards
  - Star/rating display pattern
  - Feature list with emoji bullets (☂️ $30k cover, 💸 Claims paid, 💬 24/7 support)
- **Use for:** Design reference for the insurance upsell screens, hero layouts, feature lists, rating display.

### C. Fetch mascot component set — `DivFramer1Ufq011`
- **File:** `src/imports/DivFramer1Ufq011/index.tsx`
- **SVG data:** `svg-m5ahhp4ti.ts`, secondary: `svg-2m73f.tsx`
- **Dimensions:** 40 variants, sizes ranging from 8.8px icons to 515×157px banner
- **Key variants used in prototype:**
  - `variant="3"` → pink-sm dog (61×71) — used as `FetchMascot variant="pink-sm"`
  - `variant="22"` → pink-md dog (143×151) — used as `FetchMascot variant="pink-md"`
  - `variant="4"` → small pink dog crouching (83×66)
  - `variant="5"` → tall standing dog (57×81)
  - `variant="29"` → "FETCH" logo pink (100×49)
  - `variant="35"` → "FETCH" logo dark (100×49)
  - `variant="2"` → large flying dog with money (344×271)
  - `variant="6"` → flying money bill (96×62)
  - `variant="28"` → cat with phone (165×153)
  - `variant="34"` → QR code (100×100)
  - `variant="38"` → search/settings icon (48×48)
  - `variant="7"–"21"` → small star/rating icons (25×25, #EB7BED pink)
  - `variant="23"–"27"` → small star icons (20×20, #FDA5FF light pink)
  - `variant="30"–"33"` → small star icons (25×25, various pink)
  - `variant="36"` → small icon (24×24, dark)
  - `variant="37"` → tiny dot (8.8×8.8px)
  - `variant="39"` → arrow/chevron (24×24, white)
  - `variant="40"` → small arrow (26×26)
  - `variant="1"` → full Fetch wordmark banner (515×157)
- **Note:** This is the source file for all mascot SVG paths used in `FetchMascot.tsx`. The `FetchMascot` component wraps the most-used variants for easy use — prefer that for illustrations.
- **Use for:** Any mascot, icon, logo, or rating star from the Fetch brand system.

---

## Batch 2 — Additional components

### 11. Intercom launcher button — `Component4`
- **File:** `src/imports/Component4/index.tsx`
- **SVG data:** `svg-tlq7cvbam7.ts`, masks/images: `svg-7u3tb.tsx`
- **Dimensions:** 48 × 48 px (default) / 52.8 × 52.8 px (hover state)
- **Colors:** #1B1B1C (dark button bg), #DF2020 (red notification badge), white (icon)
- **Props:** `hover?: boolean`, `text?: string` (badge number, default "2")
- **Description:** Intercom-style floating chat launcher button. Dark circle with a chat/message icon and a red badge showing unread count. Two states: default and hover (slightly larger). Use for: live support prompt, FetchPay help CTA, in-app chat nudge.

### 12. Large pink cat — `DivFramer1532En3`
- **File:** `src/imports/DivFramer1532En3/index.tsx`
- **SVG data:** `svg-11r1awqego.ts`
- **Dimensions:** 358 × 416 px
- **Colors:** #FEC9FF (pink body), #1B1B1C (outlines/features)
- **Description:** Large front-facing pink cat, sitting pose. Full body, bold outline style matching the Fetch illustration family. Biggest cat asset in the set. Use for: full-screen onboarding moments, hero cards, cat-owner specific screens.

### 13. Large blue dog (front-facing) — `Component1-8`
- **File:** `src/imports/Component1-8/index.tsx`
- **SVG data:** `svg-63v9yinq3w.ts`
- **Dimensions:** 220 × 268 px
- **Colors:** #E5EBFF (blue-lavender body), #AAAAAA (subtle outline stroke), #1B1B1C (features)
- **Description:** Large front-facing blue/lavender dog, sitting pose. Companion piece to the large pink cat. Use for: dog-owner screens, onboarding, paired with the cat for multi-pet moments. This is the `blue-lg` variant already registered in `FetchMascot.tsx`.

### 14. Small icon — paw / shape — `Svg635304711727`
- **File:** `src/imports/Svg635304711727/index.tsx`
- **SVG data:** `svg-ymo72aahxb.ts`
- **Dimensions:** 15 × 15 px
- **Colors:** white
- **Description:** Small 15×15 white icon/shape (likely a paw or UI glyph). Use for: button icons, badge decorations, inline UI accents.

### 15. Icon stroke A — `Component1-9`
- **File:** `src/imports/Component1-9/index.tsx`
- **SVG data:** `svg-xi113qjeao.ts`
- **Dimensions:** ~56 × 56 px (viewBox 59.988 × 60.7197)
- **Colors:** white stroke, strokeWidth 6.25, round linecap
- **Description:** White stroke icon — a rounded line-art glyph (likely a checkmark, plus, or similar UI symbol). Use for: success states, action icons on dark backgrounds.

### 16. Icon stroke B — `Component1-10`
- **File:** `src/imports/Component1-10/index.tsx`
- **SVG data:** `svg-gxt5pydva4.ts`
- **Dimensions:** ~56 × 56 px (viewBox 59.988 × 60.7197, same canvas as 1-9)
- **Colors:** white stroke, strokeWidth 6.25, round linecap
- **Description:** White stroke icon — companion to Component1-9, same size/style but different path (likely a close/X or minus glyph). Use for: dismiss, cancel, or toggle actions on dark backgrounds.

---

## Usage notes

- All SVG path data files (`svg-*.ts`) must remain in their original `src/imports/` folder — they use the `figma:asset` virtual module scheme and cannot be moved.
- Import components using their folder's `index.tsx`, e.g.:
  ```tsx
  import FlyingDog from '../../imports/Component1-2'
  import FetchLogoPink from '../../imports/Component1-4'
  ```
- The `Component3` multi-variant component is the richest — it contains the full Fetch brand mascot set (dog, cat, logos, icons) as variants 1–40.
