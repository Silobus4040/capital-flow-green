-- Update loan_program_applications table to not require user_id for public access
ALTER TABLE public.loan_program_applications ALTER COLUMN user_id DROP NOT NULL;