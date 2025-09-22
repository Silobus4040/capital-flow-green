-- Reset admin password to a secure password
-- Update the admin user password in auth.users table
UPDATE auth.users 
SET 
  encrypted_password = crypt('AdminCCIF2024!', gen_salt('bf')),
  updated_at = now()
WHERE email = 'sundrycapitalsolutions@gmail.com';

-- Ensure the admin profile exists and is properly configured
INSERT INTO public.profiles (user_id, email, full_name, role)
SELECT id, email, 'CCIF Admin', 'admin'
FROM auth.users 
WHERE email = 'sundrycapitalsolutions@gmail.com'
ON CONFLICT (user_id) DO UPDATE SET 
  role = 'admin',
  full_name = 'CCIF Admin',
  updated_at = now();