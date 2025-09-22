-- Phase 1: Critical Database Security Hardening (Fixed)

-- 1.1 Create comprehensive audit log table for security monitoring
CREATE TABLE IF NOT EXISTS public.security_audit_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  table_name TEXT NOT NULL,
  operation TEXT NOT NULL, -- INSERT, UPDATE, DELETE, LOGIN, ACCESS
  record_id UUID,
  ip_address INET,
  user_agent TEXT,
  session_id TEXT,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  details JSONB DEFAULT '{}'::jsonb,
  risk_level TEXT DEFAULT 'low' CHECK (risk_level IN ('low', 'medium', 'high', 'critical'))
);

-- Enable RLS on audit logs - only admins can view
ALTER TABLE public.security_audit_logs ENABLE ROW LEVEL SECURITY;

-- Create policy for audit log access - admin only
CREATE POLICY "Only admins can view audit logs" 
ON public.security_audit_logs 
FOR SELECT 
USING (get_current_user_role() = 'admin');

-- Create policy for system to insert audit logs
CREATE POLICY "System can insert audit logs" 
ON public.security_audit_logs 
FOR INSERT 
WITH CHECK (true);

-- 1.2 Create security audit function for sensitive data changes
CREATE OR REPLACE FUNCTION public.audit_sensitive_data_changes()
RETURNS TRIGGER AS $$
DECLARE
  current_user_id UUID;
  user_role TEXT;
BEGIN
  -- Get current user info
  current_user_id := auth.uid();
  user_role := get_current_user_role();
  
  -- Log changes to sensitive tables
  IF TG_TABLE_NAME IN ('loan_program_applications', 'contact_submissions', 'referral_signups', 'profiles') THEN
    INSERT INTO public.security_audit_logs (
      user_id,
      table_name,
      operation,
      record_id,
      details,
      risk_level
    ) VALUES (
      current_user_id,
      TG_TABLE_NAME,
      TG_OP,
      COALESCE(NEW.id, OLD.id),
      jsonb_build_object(
        'user_role', user_role,
        'table_name', TG_TABLE_NAME,
        'operation', TG_OP,
        'old_data', CASE WHEN TG_OP IN ('UPDATE', 'DELETE') THEN to_jsonb(OLD) ELSE NULL END,
        'new_data', CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN to_jsonb(NEW) ELSE NULL END
      ),
      CASE 
        WHEN TG_TABLE_NAME = 'loan_program_applications' THEN 'high'
        WHEN TG_TABLE_NAME IN ('contact_submissions', 'referral_signups') THEN 'medium'
        ELSE 'low'
      END
    );
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 1.3 Create triggers for audit logging on sensitive tables (INSERT/UPDATE/DELETE only)
CREATE TRIGGER audit_loan_applications_changes
  AFTER INSERT OR UPDATE OR DELETE ON public.loan_program_applications
  FOR EACH ROW EXECUTE FUNCTION public.audit_sensitive_data_changes();

CREATE TRIGGER audit_contact_submissions_changes
  AFTER INSERT OR UPDATE OR DELETE ON public.contact_submissions
  FOR EACH ROW EXECUTE FUNCTION public.audit_sensitive_data_changes();

CREATE TRIGGER audit_referral_signups_changes
  AFTER INSERT OR UPDATE OR DELETE ON public.referral_signups
  FOR EACH ROW EXECUTE FUNCTION public.audit_sensitive_data_changes();

-- 1.4 Strengthen RLS policies for contact submissions - admin only SELECT
DROP POLICY IF EXISTS "Admins can view all contact submissions" ON public.contact_submissions;
CREATE POLICY "Only admins can view contact submissions" 
ON public.contact_submissions 
FOR SELECT 
USING (get_current_user_role() = 'admin');

-- 1.5 Strengthen RLS policies for referral signups - admin only SELECT  
DROP POLICY IF EXISTS "Admins can view all referral signups" ON public.referral_signups;
CREATE POLICY "Only admins can view referral signups" 
ON public.referral_signups 
FOR SELECT 
USING (get_current_user_role() = 'admin');

-- 1.6 Add enhanced security monitoring function
CREATE OR REPLACE FUNCTION public.log_security_incident(
  incident_type TEXT,
  details JSONB DEFAULT '{}'::jsonb,
  risk_level TEXT DEFAULT 'medium'
) RETURNS VOID AS $$
BEGIN
  INSERT INTO public.security_audit_logs (
    user_id,
    table_name,
    operation,
    details,
    risk_level
  ) VALUES (
    auth.uid(),
    'security_events',
    incident_type,
    details,
    risk_level
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 1.7 Add timestamp trigger for audit logs
CREATE TRIGGER update_audit_logs_updated_at
  BEFORE UPDATE ON public.security_audit_logs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- 1.8 Create index for efficient audit log queries
CREATE INDEX IF NOT EXISTS idx_security_audit_logs_user_timestamp 
ON public.security_audit_logs(user_id, timestamp DESC);

CREATE INDEX IF NOT EXISTS idx_security_audit_logs_table_timestamp 
ON public.security_audit_logs(table_name, timestamp DESC);

CREATE INDEX IF NOT EXISTS idx_security_audit_logs_risk_level 
ON public.security_audit_logs(risk_level, timestamp DESC);