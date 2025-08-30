-- CRITICAL SECURITY FIX: Prevent users from updating their own role
-- Drop existing policies for profiles
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

-- Create separate policies: one for profile updates, one for role protection
CREATE POLICY "Users can update their own profile data" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (
  auth.uid() = user_id AND 
  -- Prevent role changes by checking if role is unchanged
  role = (SELECT role FROM public.profiles WHERE user_id = auth.uid())
);

-- Create admin-only policy for role management
CREATE POLICY "Admins can manage all profiles" 
ON public.profiles 
FOR ALL
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE user_id = auth.uid() AND role = 'admin'
));