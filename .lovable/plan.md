

## Plan: Update Email Sender Name + Confirm OTP Setup

### Context
The custom email domain setup is complete. The screenshot shows emails are being sent from `capital-flow-green <noreply@ccif-inc.com>`. The user wants the display name changed to "Commercial Capital & Investment Inc".

Regarding the tech stack: this project uses Lovable's managed email system (not manual Resend). The `RESEND_API_KEY` secret exists but Lovable handles email delivery automatically through the `auth-email-hook`. No changes needed on any Resend account.

### Changes

**File: `supabase/functions/auth-email-hook/index.ts`**
- Change `SITE_NAME` from `"capital-flow-green"` to `"Commercial Capital & Investment Inc"`
- This updates the From display name in emails: `Commercial Capital & Investment Inc <noreply@ccif-inc.com>`

**Redeploy**: Deploy `auth-email-hook` edge function after the change.

### About 6-Digit OTP Codes
Now that custom email is set up, the OTP/code confirmation type needs to be enabled in auth settings. This is a configuration change (not a code change). I will use the auth configuration tool to switch from link-based confirmation to OTP-based confirmation if possible, or guide you to toggle it in Cloud settings.

### Files to Modify
| File | Change |
|------|--------|
| `supabase/functions/auth-email-hook/index.ts` | Update `SITE_NAME` to "Commercial Capital & Investment Inc" |

