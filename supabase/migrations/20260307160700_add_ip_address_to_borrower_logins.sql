-- Add ip_address column to borrower_logins table
ALTER TABLE IF EXISTS public.borrower_logins 
ADD COLUMN IF NOT EXISTS ip_address text;
