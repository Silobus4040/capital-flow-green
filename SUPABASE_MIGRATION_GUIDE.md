# Supabase Migration Guide

## Step 1: Create New Supabase Project
1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Choose your organization and create the project
4. Wait for the project to initialize

## Step 2: Get Your New Project Credentials
1. Go to Settings > API in your new project dashboard
2. Copy your:
   - Project Reference ID (something like "abcdefghijklmnop")
   - anon/public key (starts with "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...")
   - Project URL (https://YOUR_PROJECT_ID.supabase.co)

## Step 3: Update Configuration Files
Replace the placeholder values in these files:

### .env
```
VITE_SUPABASE_PROJECT_ID="YOUR_NEW_PROJECT_ID"
VITE_SUPABASE_PUBLISHABLE_KEY="YOUR_NEW_ANON_KEY" 
VITE_SUPABASE_URL="https://YOUR_NEW_PROJECT_ID.supabase.co"
```

### supabase/config.toml
```
project_id = "YOUR_NEW_PROJECT_ID"
```

### src/integrations/supabase/client.ts
```typescript
const SUPABASE_URL = "https://YOUR_NEW_PROJECT_ID.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "YOUR_NEW_ANON_KEY";
```

## Step 4: Set Up Database Schema
Run this SQL in your new project's SQL Editor:

```sql
-- Create profiles table
CREATE TABLE public.profiles (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid UNIQUE,
  email text,
  full_name text,
  phone text,
  company text,
  role text DEFAULT 'borrower'::text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create loan_program_applications table
CREATE TABLE public.loan_program_applications (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid,
  program_id text NOT NULL,
  program_name text NOT NULL,
  borrower_name text NOT NULL,
  borrower_email text NOT NULL,
  borrower_phone text NOT NULL,
  property_address text,
  property_city text,
  property_state text,
  property_zip text,
  requested_amount numeric,
  loan_purpose text,
  program_specific_data jsonb DEFAULT '{}'::jsonb,
  status text NOT NULL DEFAULT 'submitted'::text,
  admin_notes text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  last_status_update timestamp with time zone DEFAULT now()
);

-- Create other necessary tables
CREATE TABLE public.loan_applications (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid,
  project_name text NOT NULL,
  project_address text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  zip_code text NOT NULL,
  loan_program text NOT NULL,
  property_type text NOT NULL,
  project_description text,
  borrower_name text NOT NULL,
  borrower_email text NOT NULL,
  borrower_phone text NOT NULL,
  loan_amount numeric NOT NULL,
  status text DEFAULT 'pending'::text,
  detailed_status text DEFAULT 'under_review'::text,
  status_notes text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  last_status_update timestamp with time zone DEFAULT now()
);

-- Add more tables as needed...

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loan_program_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loan_applications ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own profile" ON public.profiles
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile data" ON public.profiles
FOR UPDATE USING (auth.uid() = user_id);

-- Add more policies as needed...
```

## Step 5: Set Up Authentication
1. Go to Authentication > Settings in your new project
2. Configure your Site URL (your domain or localhost for development)
3. Add any additional redirect URLs needed

## Step 6: Set Up Storage (if needed)
1. Go to Storage in your new project
2. Create buckets as needed:
   - documents (private)
   - loan-documents (private) 
   - conversation-files (private)

## Step 7: Deploy Edge Functions
The edge functions will be automatically deployed when you push your code.

## Step 8: Set Up Secrets
You'll need to add these secrets in your new project:
- RESEND_API_KEY
- OPENAI_API_KEY
- ADMIN_EMAIL
- And others as needed

## Step 9: Data Migration (Optional)
If you need to migrate existing data, you'll need to:
1. Export data from the old project
2. Import it into the new project
3. This typically requires custom scripts

## Next Steps
After completing these steps, your project will be connected to your new Supabase account!