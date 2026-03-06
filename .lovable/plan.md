

## Plan: Scaffold & Deploy Custom Auth Email Templates

Your domain `ccif-inc.com` is verified. Now we need to create branded email templates so OTP codes, password resets, etc. come from your domain with CCIF branding.

### Steps

1. **Scaffold auth email templates** using the built-in tool — this creates all 6 template types (signup confirmation, password recovery, magic link, invite, email change, reauthentication)

2. **Brand the templates** to match CCIF's visual identity:
   - Extract colors from `src/index.css` (primary gold/amber, dark backgrounds)
   - Apply CCIF logo from `src/assets/ccif-logo-enhanced.png` (upload to storage bucket)
   - Match button styles, fonts, and tone to the app
   - Keep email body background white (required for email client compatibility)

3. **Deploy the `auth-email-hook` edge function** so emails route through the custom templates

4. **Verify** by testing signup/password reset to confirm branded emails arrive from `notify@ccif-inc.com`

### Result
- All auth emails (OTP verification, password reset, etc.) will come from your `ccif-inc.com` domain
- Emails will have CCIF branding (logo, colors, professional layout)
- Improved deliverability since emails come from a verified domain

