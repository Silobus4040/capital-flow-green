
-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'borrower', 'loan_officer');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles without recursion
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

-- Fix infinite recursion: drop bad policy and recreate
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
CREATE POLICY "Admins can view all profiles" ON public.profiles
FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- Fix admin policies on loan_program_applications
DROP POLICY IF EXISTS "Admins can view all applications" ON public.loan_program_applications;
CREATE POLICY "Admins can view all applications" ON public.loan_program_applications
FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can update applications" ON public.loan_program_applications;
CREATE POLICY "Admins can update applications" ON public.loan_program_applications
FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

-- Allow admins to read user_roles
CREATE POLICY "Users can read own roles" ON public.user_roles
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage roles" ON public.user_roles
FOR ALL USING (public.has_role(auth.uid(), 'admin'));
