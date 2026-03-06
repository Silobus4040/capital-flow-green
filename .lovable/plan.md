

## Plan: Show Compact Hero on Mobile + Email Field Visible Without Scrolling

### Problem
On mobile, the hero panel is completely hidden (`hidden lg:flex`), so users only see a plain form. The user wants the hero to be visible on mobile but compact enough that the email input is visible without scrolling.

### Changes to Both `ApplicantSignup.tsx` and `ApplicantLogin.tsx`

**Mobile hero panel (visible on all screens, compact on mobile)**:
- Change the left panel from `hidden lg:flex lg:w-1/2` to always visible
- On mobile: render as a compact banner at the top (~40vh max) with the hero image, CCIF logo, heading, and a condensed 2-column feature grid (smaller icons/text)
- On desktop: keep the current full-height side panel layout
- Use responsive classes: `h-[35vh] lg:h-auto lg:w-1/2` so on mobile it's a short banner, on desktop it's the full side panel
- Hide the copyright line on mobile to save space
- Reduce padding on mobile (`p-4 lg:p-12`)
- Features list: show in a 2-column grid on mobile with smaller text, or show only 3 features on mobile to save space

**Form panel adjustments**:
- Remove the duplicate mobile-only branding block (`lg:hidden` section with logo) since the hero is now always visible
- Reduce top padding on mobile so the form starts right after the hero
- The email field should be visible at the top of the viewport or just barely below the fold

### Layout on Mobile (top to bottom)
```text
┌──────────────────────┐
│ Hero image (35vh)    │
│ CCIF Logo            │
│ "Your Loan..."       │
│ 2-col features grid  │
├──────────────────────┤
│ Create Your Account  │
│ [Email input]        │  ← visible without scrolling
│ ─ scroll for rest ─  │
│ [Password input]     │
│ [Continue button]    │
└──────────────────────┘
```

### Files to Modify
| File | Change |
|------|--------|
| `src/pages/applicant/ApplicantSignup.tsx` | Make hero visible on mobile (compact ~35vh), remove duplicate mobile branding, tighten spacing |
| `src/pages/applicant/ApplicantLogin.tsx` | Same mobile hero treatment |

