

## Fix Homepage Hero — Mobile Button Overlap & Button Styling

Based on your screenshot, I can see the issues clearly. Here's what I'll do:

### 1. Move CTA buttons down so they don't overlap the wall signage
- Increase the hero section height on mobile (from `clamp(400px, 60vh, 700px)` to `clamp(500px, 75vh, 850px)`) to create room below the signage for buttons
- Keep buttons at the bottom with adequate padding

### 2. Improve green button gradient — thicker, shinier, shorter
- Make the gradient more vibrant with brighter green tones and a subtle shine/glow effect
- Remove extra horizontal padding so buttons are only as wide as the text needs (not full-width stretching on mobile)
- Add a subtle inner highlight for a "shiny" look

### 3. Remove white space below hero
- Remove `min-h-screen` from the wrapper div — it forces empty space since the hero is the only content

### Files Changed
- **`src/index.css`** — Increase mobile hero height
- **`src/pages/HomePage.tsx`** — Remove `min-h-screen`, update button classes (remove `w-full`, add shine effect, tighten padding)

