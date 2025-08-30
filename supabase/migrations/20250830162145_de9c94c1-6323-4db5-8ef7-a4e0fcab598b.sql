-- Update the default role for profiles table to use 'borrower' instead of 'user'
ALTER TABLE public.profiles ALTER COLUMN role SET DEFAULT 'borrower';

-- Update existing users with 'user' role to 'borrower' role
UPDATE public.profiles SET role = 'borrower' WHERE role = 'user';

-- Update the trigger function to use 'borrower' as default role
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    'borrower'
  );
  RETURN NEW;
END;
$$;