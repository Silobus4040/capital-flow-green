-- Enable anonymous loan application submissions
-- Step 1: Allow NULL user_id for anonymous submissions
ALTER TABLE loan_program_applications ALTER COLUMN user_id DROP NOT NULL;

-- Step 2: Drop existing restrictive policies
DROP POLICY "Authenticated users can submit program applications" ON loan_program_applications;
DROP POLICY "Users and admins can view program applications" ON loan_program_applications;

-- Step 3: Create new policy allowing anonymous submissions
CREATE POLICY "Allow public loan application submissions" ON loan_program_applications
  FOR INSERT 
  WITH CHECK (true);

-- Step 4: Create updated SELECT policy for viewing applications
CREATE POLICY "Users can view applications by email or user_id" ON loan_program_applications
  FOR SELECT 
  USING (
    -- Admins can see all
    (EXISTS (SELECT 1 FROM profiles WHERE profiles.user_id = auth.uid() AND profiles.role = 'admin')) 
    OR 
    -- Authenticated users can see their own by user_id
    (auth.uid() IS NOT NULL AND auth.uid() = user_id)
    OR
    -- For future enhancement: anonymous users could see by email with session tracking
    (user_id IS NULL AND borrower_email IS NOT NULL)
  );

-- Step 5: Keep existing UPDATE policy but make it work with anonymous submissions
DROP POLICY "Users can update their own program applications" ON loan_program_applications;
CREATE POLICY "Users can update their applications" ON loan_program_applications
  FOR UPDATE 
  USING (
    -- Admins can update all
    (EXISTS (SELECT 1 FROM profiles WHERE profiles.user_id = auth.uid() AND profiles.role = 'admin'))
    OR
    -- Authenticated users can update their own
    (auth.uid() IS NOT NULL AND auth.uid() = user_id)
  );