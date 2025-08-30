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
  -- Prevent role changes unless user is admin
  (role = OLD.role OR EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role = 'admin'
  ))
);

-- Create admin-only policy for role management
CREATE POLICY "Admins can manage all profiles" 
ON public.profiles 
FOR ALL
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE user_id = auth.uid() AND role = 'admin'
));

-- Add role change audit trigger
CREATE TABLE IF NOT EXISTS public.role_change_audit (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  old_role text,
  new_role text,
  changed_by uuid,
  changed_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on audit table
ALTER TABLE public.role_change_audit ENABLE ROW LEVEL SECURITY;

-- Create policy for audit table (admin only)
CREATE POLICY "Admins can view audit logs" 
ON public.role_change_audit 
FOR SELECT
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE user_id = auth.uid() AND role = 'admin'
));

-- Create trigger function for role change auditing
CREATE OR REPLACE FUNCTION public.audit_role_changes()
RETURNS TRIGGER AS $$
BEGIN
  -- Only log if role actually changed
  IF OLD.role IS DISTINCT FROM NEW.role THEN
    INSERT INTO public.role_change_audit (user_id, old_role, new_role, changed_by)
    VALUES (NEW.user_id, OLD.role, NEW.role, auth.uid());
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for role change auditing
DROP TRIGGER IF EXISTS trigger_audit_role_changes ON public.profiles;
CREATE TRIGGER trigger_audit_role_changes
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.audit_role_changes();