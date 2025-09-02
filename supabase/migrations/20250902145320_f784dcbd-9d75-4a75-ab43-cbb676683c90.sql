-- Security Enhancement: Fix RLS policies with missing WITH CHECK constraints

-- Fix profiles table role update policy to prevent privilege escalation
DROP POLICY IF EXISTS "Users can update their own profile data" ON public.profiles;
CREATE POLICY "Users can update their own profile data"
ON public.profiles
FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (
  auth.uid() = user_id AND 
  -- Prevent role escalation: users can only update to borrower role or keep existing role
  (role = 'borrower' OR role = (SELECT p.role FROM profiles p WHERE p.user_id = auth.uid()))
);

-- Add WITH CHECK constraint to loan_program_applications INSERT policy
DROP POLICY IF EXISTS "Users can create their own program applications" ON public.loan_program_applications;
CREATE POLICY "Users can create their own program applications"
ON public.loan_program_applications
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Add WITH CHECK constraint to loan_applications INSERT policy  
DROP POLICY IF EXISTS "Users can create loan applications" ON public.loan_applications;
CREATE POLICY "Users can create loan applications"
ON public.loan_applications
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Add WITH CHECK constraint to draw_requests INSERT policy
DROP POLICY IF EXISTS "Users can create draw requests" ON public.draw_requests;
CREATE POLICY "Users can create draw requests" 
ON public.draw_requests
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Add WITH CHECK constraint to application_documents INSERT policy
DROP POLICY IF EXISTS "Users can upload their own application documents" ON public.application_documents;
CREATE POLICY "Users can upload their own application documents"
ON public.application_documents
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Add WITH CHECK constraint to document_submissions INSERT policy
DROP POLICY IF EXISTS "Users can upload documents" ON public.document_submissions;
CREATE POLICY "Users can upload documents"
ON public.document_submissions
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Add WITH CHECK constraint to conversations INSERT policy
DROP POLICY IF EXISTS "Users can create conversations" ON public.conversations;
CREATE POLICY "Users can create conversations"
ON public.conversations
FOR INSERT
WITH CHECK (borrower_id = auth.uid());