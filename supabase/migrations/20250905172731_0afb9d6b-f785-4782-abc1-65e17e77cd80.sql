-- Create security definer function to get current user role without recursion
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT AS $$
BEGIN
  RETURN (
    SELECT role 
    FROM public.profiles 
    WHERE user_id = auth.uid()
    LIMIT 1
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE SET search_path = public;

-- Drop the problematic recursive policy
DROP POLICY IF EXISTS "Admins can manage all profiles" ON public.profiles;

-- Create new non-recursive policy that uses the security definer function
CREATE POLICY "Admins can manage all profiles" 
ON public.profiles 
FOR ALL 
USING (public.get_current_user_role() = 'admin');

-- Also ensure we have a policy for loan officers to view profiles they need access to
CREATE POLICY "Loan officers can view relevant profiles" 
ON public.profiles 
FOR SELECT 
USING (
  public.get_current_user_role() = 'loan_officer' OR 
  public.get_current_user_role() = 'admin'
);