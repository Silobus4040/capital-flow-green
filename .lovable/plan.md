

## Fix Homepage Hero — Desktop & Mobile

### Problems (from screenshots)
1. **Desktop**: Image is cropped too high — the person at the desk is cut off. `object-position: center 30%` pushes the image up too much. Need `center center` or `center 40%` to show more of the bottom.
2. **Desktop**: Hero height too short at `clamp(450px, 65vh, 750px)` — not showing enough of the image. Need to match mobile's taller ratio.
3. **Desktop**: Buttons overlap the wall signage — need more bottom padding to push them below "INVESTMENT FINANCE INC."
4. **Mobile**: "Asset-Based Lending • 100% Financing Available • Serving All 50 States" wraps to 2 lines — the bullet separators are hidden on small screens (`hidden sm:inline`). Need all on one line with smaller text and always-visible bullets.
5. **Mobile**: Buttons need slightly more bottom space to clear the signage.

### Changes

**`src/index.css`** (hero CSS):
- Desktop: change height to `clamp(500px, 75vh, 850px)` (same as mobile) and `object-position: center 40%` to show the person
- Mobile stays as-is (already looks good per user)

**`src/pages/HomePage.tsx`**:
- Tagline: remove `hidden sm:inline` from bullet spans so they always show; reduce mobile text to `text-[10px]` so all fits on one line; use `whitespace-nowrap`
- Buttons: increase bottom padding from `pb-4 sm:pb-6` to `pb-6 sm:pb-10` to push buttons further below the signage

