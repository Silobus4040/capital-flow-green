-- EMERGENCY FIX: Allow public submissions to loan_program_applications table

-- Drop the existing problematic INSERT policy that requires authentication
DROP POLICY "Authenticated users can create program applications" ON loan_program_applications;

-- Create new INSERT policy that allows both public and authenticated submissions
CREATE POLICY "Allow public and authenticated program applications" ON loan_program_applications
FOR INSERT WITH CHECK (
  (auth.uid() IS NULL AND user_id IS NULL) OR  -- Allow public submissions
  (auth.uid() IS NOT NULL AND auth.uid() = user_id)  -- Allow authenticated submissions
);

-- Drop and recreate SELECT policy to ensure admins can view all submissions including public ones
DROP POLICY "Users can view their own program applications" ON loan_program_applications;

CREATE POLICY "Users and admins can view program applications" ON loan_program_applications
FOR SELECT USING (
  (auth.uid() = user_id) OR  -- Users can view their own applications
  (EXISTS (  -- Admins can view all applications (including public ones)
    SELECT 1 FROM profiles 
    WHERE profiles.user_id = auth.uid() AND profiles.role = 'admin'
  ))
);