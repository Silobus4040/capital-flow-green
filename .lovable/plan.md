

## Telegram Notification Integration Plan

Thank you for providing your Telegram credentials. Here is the plan to send all application notifications to your Telegram.

### What Will Be Built

**1. New backend function: `send-telegram-notification`**
- Accepts application data (type, name, email, phone, program, amount, etc.)
- Formats a clean, readable Telegram message
- Sends it to your Telegram chat via the Bot API
- Non-blocking: if Telegram fails, the form submission still succeeds

**2. Store your credentials as backend secrets**
- `TELEGRAM_BOT_TOKEN` = `8613102452:AAGvnbVmXKCI1mSdpXMqh0ZTzDdPPLnBag4`
- `TELEGRAM_CHAT_ID` = `8156908905`

**3. Hook Telegram into all 3 submission flows**

| Flow | File | Change |
|------|------|--------|
| Loan applications (public) | `usePublicApplications.ts` | Add `send-telegram-notification` call after DB insert |
| Loan applications (auth) | `useProgramApplications.ts` | Add `send-telegram-notification` call after DB insert |
| Referral signups | `ReferralProgram.tsx` | Add `send-telegram-notification` call after DB insert |
| Contact form | `ContactUs.tsx` | Add `send-telegram-notification` call after DB insert |

**4. Telegram message format example**

```text
🆕 NEW LOAN APPLICATION

📋 Program: Commercial Mortgage
👤 Name: John Smith
📧 Email: john@example.com
📞 Phone: 619-555-1234
💰 Amount: $1,000,000
📍 Property: 123 Main St, San Diego, CA

⏰ Submitted: 2/25/2026 2:30 PM ET
```

Different headers for each type: loan, referral, and contact.

### Steps

1. Store `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` as backend secrets (2 secret prompts)
2. Create `supabase/functions/send-telegram-notification/index.ts` -- calls Telegram Bot API `sendMessage` endpoint
3. Update `usePublicApplications.ts` -- add Telegram notification call (fire-and-forget)
4. Update `useProgramApplications.ts` -- add Telegram notification call (fire-and-forget)
5. Update `ContactUs.tsx` -- add Telegram notification call after successful DB insert
6. Update `ReferralProgram.tsx` -- add Telegram notification call after successful DB insert

### Technical Details

- The edge function calls `https://api.telegram.org/bot{TOKEN}/sendMessage` with `parse_mode: "HTML"` for formatted messages
- All Telegram calls are wrapped in try/catch so failures never block form submissions
- The function accepts a generic payload with `applicationType`, `borrowerName`, `borrowerEmail`, `borrowerPhone`, `programName`, `requestedAmount`, and optional `extras` object for additional details
- JWT verification disabled for this function since it's called from both authenticated and anonymous contexts

