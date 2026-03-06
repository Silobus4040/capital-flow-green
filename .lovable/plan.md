

## Plan: Critical Fixes — Voice Playback, TTS, Real-Time Messaging, Green Colors

### Root Causes Identified

1. **TTS 404 Error**: The ElevenLabs voice IDs in the edge function are **outdated/invalid**. Logs show `voice_not_found` for `9BWtsMINqrJLrRacOk9x` (aria). The correct IDs from ElevenLabs docs differ from what's hardcoded.

2. **Voice Playback Failure**: The signed URL path extraction regex works on the stored URL, but the issue is likely that the `createSignedUrl` call itself fails silently (returns null) or the path has URL-encoded segments. Need to store the raw file path separately and always generate fresh signed URLs from it, rather than trying to regex-parse a signed URL.

3. **Messaging Lag**: No optimistic updates — messages only appear after the full DB round-trip + realtime event fires. Need to immediately append the sent message to local state.

4. **Colors**: `--primary: 266 4% 20.8%` is dark gray/purple. Need to change to green (`142 71% 45%`) to match the website's green theme.

---

### Fix 1: ElevenLabs TTS — Update Voice IDs
**File**: `supabase/functions/elevenlabs-tts/index.ts`
- Replace the entire `ELEVENLABS_VOICES` map with the correct IDs from the ElevenLabs docs:
  - `roger`: `CwhRBWXzGAHq8TQ4Fs17` (same)
  - `george`: `JBFqnCBsd6RMkjVDRZzb` (same)
  - **Remove `aria`** (no longer valid) — set default voice to `george` or `roger`
  - Keep only documented voices: Roger, Sarah, Laura, Charlie, George, Callum, River, Liam, Alice, Matilda, Will, Jessica, Eric, Chris, Brian, Daniel, Lily, Bill
- Also use proper Deno base64 encoding: `import { encode } from "https://deno.land/std@0.168.0/encoding/base64.ts"` instead of the chunked `btoa` approach
- Change default voice from `aria` to `george`

### Fix 2: Voice Playback — Store File Path, Not Signed URL
**Files**: `CommunicationPortal.tsx`, `AdminMessaging.tsx`
- **On upload**: Store the raw storage path (e.g., `APP_ID/voice-xxx.webm`) in `audio_url` instead of a signed URL that expires
- **On playback**: Always call `createSignedUrl(storedPath, 3600)` to get a fresh URL
- This fixes the root cause: expired/malformed signed URLs stored in DB
- Update both borrower `handleVoiceSend` and admin `sendAsTTS` to store paths

### Fix 3: Optimistic Updates for Instant Messaging
**Files**: `CommunicationPortal.tsx`, `AdminMessaging.tsx`
- After successful insert, immediately append the new message to local `messages` state with a temporary ID
- When the realtime event fires, replace the temp message with the real one (or just re-fetch, deduplicating)
- This gives <100ms perceived send time
- Add message status: show single check (✓) on send, double check (✓✓) when `is_read` is true

### Fix 4: Green Color Scheme
**File**: `src/index.css`
- Change `:root` primary color from `266 4% 20.8%` (dark gray) to `142 71% 45%` (green)
- Change `--primary-foreground` to `0 0% 100%` (white on green)
- Update sidebar primary to match: `--sidebar-primary: 142 71% 45%`
- Update `--secondary-foreground` and `--accent-foreground` to use the green
- Keep background white (`0 0% 100%`), cards white

### Fix 5: Admin Default Voice Change
**File**: `src/components/AdminMessaging.tsx` (line 128)
- Change voice from `george` to `george` (keep, but the edge function default changes from `aria` to `george`)
- This ensures TTS works since `george` voice ID is confirmed valid

---

### Files Summary

| Action | File | Change |
|--------|------|--------|
| Redeploy | `supabase/functions/elevenlabs-tts/index.ts` | Fix voice IDs, use Deno base64, default to `george` |
| Modify | `src/components/closing/CommunicationPortal.tsx` | Store paths not signed URLs, optimistic updates |
| Modify | `src/components/AdminMessaging.tsx` | Store paths not signed URLs, optimistic updates |
| Modify | `src/index.css` | Primary color → green `142 71% 45%` |

