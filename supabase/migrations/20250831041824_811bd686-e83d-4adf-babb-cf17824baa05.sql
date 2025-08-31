-- Update one user to be admin for initial access
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'sundrycapitalsolutions@gmail.com';

-- Create client_assignments table for loan officer assignments
CREATE TABLE IF NOT EXISTS public.client_assignments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  loan_officer_id UUID NOT NULL,
  client_id UUID NOT NULL,
  assigned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  assigned_by UUID NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.client_assignments ENABLE ROW LEVEL SECURITY;

-- Create policies for client assignments
CREATE POLICY "Admins can manage all assignments" 
ON public.client_assignments 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.user_id = auth.uid() 
  AND profiles.role = 'admin'
));

CREATE POLICY "Loan officers can view their assignments" 
ON public.client_assignments 
FOR SELECT 
USING (loan_officer_id = auth.uid());

-- Add trigger for timestamps
CREATE TRIGGER update_client_assignments_updated_at
BEFORE UPDATE ON public.client_assignments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();