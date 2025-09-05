-- Enable password strength and leaked password protection for better security
-- This addresses the security warning about leaked password protection

-- Enable password strength validation
UPDATE auth.config 
SET password_min_length = 8
WHERE key = 'password_min_length';

-- Enable leaked password protection
INSERT INTO auth.config (key, value) 
VALUES ('password_leak_protection', 'true')
ON CONFLICT (key) 
DO UPDATE SET value = 'true';