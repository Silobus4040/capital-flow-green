-- Create program-specific loan applications table
CREATE TABLE public.loan_program_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  program_id TEXT NOT NULL,
  program_name TEXT NOT NULL,
  
  -- Basic Contact Information
  borrower_name TEXT NOT NULL,
  borrower_email TEXT NOT NULL,
  borrower_phone TEXT NOT NULL,
  
  -- Property Information
  property_address TEXT,
  property_city TEXT,
  property_state TEXT,
  property_zip TEXT,
  
  -- Loan Information
  requested_amount NUMERIC,
  loan_purpose TEXT,
  
  -- Program-specific fields stored as JSONB for flexibility
  program_specific_data JSONB DEFAULT '{}',
  
  -- Application Status
  status TEXT NOT NULL DEFAULT 'submitted',
  admin_notes TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_status_update TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.loan_program_applications ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own program applications" 
ON public.loan_program_applications 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own program applications" 
ON public.loan_program_applications 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own program applications" 
ON public.loan_program_applications 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all program applications" 
ON public.loan_program_applications 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.user_id = auth.uid() 
  AND profiles.role = 'admin'
));

-- Create application documents table
CREATE TABLE public.application_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  application_id UUID NOT NULL,
  user_id UUID NOT NULL,
  
  -- Document Information
  document_name TEXT NOT NULL,
  document_type TEXT,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT,
  
  -- Metadata
  upload_status TEXT NOT NULL DEFAULT 'uploaded',
  admin_reviewed BOOLEAN DEFAULT false,
  admin_notes TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.application_documents ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for application documents
CREATE POLICY "Users can view their own application documents" 
ON public.application_documents 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can upload their own application documents" 
ON public.application_documents 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own application documents" 
ON public.application_documents 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all application documents" 
ON public.application_documents 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.user_id = auth.uid() 
  AND profiles.role = 'admin'
));

-- Add foreign key constraint
ALTER TABLE public.application_documents 
ADD CONSTRAINT fk_application_documents_application_id 
FOREIGN KEY (application_id) REFERENCES public.loan_program_applications(id) 
ON DELETE CASCADE;

-- Create updated_at triggers
CREATE TRIGGER update_loan_program_applications_updated_at
  BEFORE UPDATE ON public.loan_program_applications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_application_documents_updated_at
  BEFORE UPDATE ON public.application_documents
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create status update trigger
CREATE TRIGGER update_program_application_status_timestamp
  BEFORE UPDATE ON public.loan_program_applications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_loan_status_timestamp();