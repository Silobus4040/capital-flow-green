

# Connect New Supabase Project

## Overview
Update your project to use your new Supabase credentials and connect via Lovable's built-in Supabase integration so migrations are pushed automatically.

## Steps

### Step 1: Update Credentials (3 files)
Update the following files with your new Supabase details:

| File | Fields to Update |
|------|-----------------|
| `.env` | `VITE_SUPABASE_PROJECT_ID`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` |
| `src/integrations/supabase/client.ts` | `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY` |
| `supabase/config.toml` | `project_id` |

New values:
- Project ID: `qjfvhyrkmqlafxrzponx`
- URL: `https://qjfvhyrkmqlafxrzponx.supabase.co`
- Anon Key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqZnZoeXJrbXFsYWZ4cnpwb254Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwMjU5NDYsImV4cCI6MjA4NjYwMTk0Nn0.GtEfuCewJdRT0-fQspT7MjZ6_dqPVqOu03t13OGpyh4`

### Step 2: Connect via Lovable's Built-in Supabase Integration
After updating credentials, I will use Lovable's Supabase connector to link your project. This will:
- Push all 30 existing database migrations (tables, RLS policies, RPC functions)
- Deploy edge functions automatically

### Step 3: Post-Connection (Your Actions)
After connection is established, you will need to:
1. **Add Edge Function Secrets** in your new Supabase dashboard (Settings > Edge Functions > Secrets):
   - `RESEND_API_KEY` -- for email notifications
   - `ADMIN_EMAIL` -- for admin notification recipient
2. **Configure Authentication URLs** (Authentication > URL Configuration):
   - Site URL: `https://ccif-inc.com` or `https://capital-flow-green.lovable.app`
   - Add redirect URLs for login flows
3. **Create Storage Buckets** (if using document uploads):
   - `documents`, `loan-documents`, `conversation-files`

## Technical Details
No application logic changes are needed. Only the three configuration files are updated with new credentials. The existing 30 migration files will recreate your full database schema including all tables (profiles, loan_applications, loan_program_applications, referral_signups, etc.) and security policies.

