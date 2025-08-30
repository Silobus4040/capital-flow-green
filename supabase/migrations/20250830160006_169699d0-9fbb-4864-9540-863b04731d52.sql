-- Update existing profiles table to add role column
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role text DEFAULT 'borrower' CHECK (role IN ('borrower', 'loan_officer', 'admin'));

-- Create conversations table for messaging
CREATE TABLE public.messaging_conversations (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  borrower_id uuid NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
  loan_officer_id uuid REFERENCES profiles(user_id) ON DELETE SET NULL,
  title text NOT NULL DEFAULT 'General Conversation',
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'closed', 'archived')),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  last_message_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.messaging_conversations ENABLE ROW LEVEL SECURITY;

-- Create policies for conversations
CREATE POLICY "Borrowers can view their conversations" 
ON public.messaging_conversations 
FOR SELECT 
USING (auth.uid() = borrower_id);

CREATE POLICY "Loan officers can view assigned conversations" 
ON public.messaging_conversations 
FOR SELECT 
USING (auth.uid() = loan_officer_id);

CREATE POLICY "Admins can view all conversations" 
ON public.messaging_conversations 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.user_id = auth.uid() 
  AND profiles.role = 'admin'
));

CREATE POLICY "Borrowers can create conversations" 
ON public.messaging_conversations 
FOR INSERT 
WITH CHECK (auth.uid() = borrower_id);

-- Create messages table
CREATE TABLE public.messaging_messages (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id uuid NOT NULL REFERENCES messaging_conversations(id) ON DELETE CASCADE,
  sender_id uuid NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
  content text,
  message_type text NOT NULL DEFAULT 'text' CHECK (message_type IN ('text', 'voice', 'file')),
  file_path text,
  file_name text,
  file_size integer,
  voice_duration integer,
  is_tts boolean DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.messaging_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for messages
CREATE POLICY "Users can view messages in their conversations" 
ON public.messaging_messages 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM messaging_conversations c
    WHERE c.id = conversation_id 
    AND (c.borrower_id = auth.uid() OR c.loan_officer_id = auth.uid())
  ) OR 
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.user_id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

CREATE POLICY "Users can create messages in their conversations" 
ON public.messaging_messages 
FOR INSERT 
WITH CHECK (
  auth.uid() = sender_id AND
  (EXISTS (
    SELECT 1 FROM messaging_conversations c
    WHERE c.id = conversation_id 
    AND (c.borrower_id = auth.uid() OR c.loan_officer_id = auth.uid())
  ) OR 
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.user_id = auth.uid() 
    AND profiles.role = 'admin'
  ))
);

-- Create borrower loan status table
CREATE TABLE public.borrower_loan_status (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  borrower_id uuid NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
  loan_amount numeric,
  property_address text,
  loan_program text,
  status text NOT NULL DEFAULT 'application_review' CHECK (status IN (
    'application_review', 'documentation_required', 'underwriting', 
    'approved', 'funded', 'completed', 'declined'
  )),
  status_percentage integer DEFAULT 10,
  is_funded boolean DEFAULT false,
  estimated_funding_date date,
  actual_funding_date date,
  notes text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.borrower_loan_status ENABLE ROW LEVEL SECURITY;

-- Create policies for loan status
CREATE POLICY "Borrowers can view their loan status" 
ON public.borrower_loan_status 
FOR SELECT 
USING (auth.uid() = borrower_id);

CREATE POLICY "Loan officers and admins can manage loan status" 
ON public.borrower_loan_status 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.user_id = auth.uid() 
  AND profiles.role IN ('admin', 'loan_officer')
));

-- Add updated_at triggers
CREATE TRIGGER update_conversations_updated_at
  BEFORE UPDATE ON public.messaging_conversations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_messages_updated_at
  BEFORE UPDATE ON public.messaging_messages
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_loan_status_updated_at
  BEFORE UPDATE ON public.borrower_loan_status
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage buckets for messaging files (only if they don't exist)
INSERT INTO storage.buckets (id, name, public) 
SELECT 'message-attachments', 'message-attachments', false
WHERE NOT EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'message-attachments');

INSERT INTO storage.buckets (id, name, public) 
SELECT 'voice-messages', 'voice-messages', false
WHERE NOT EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'voice-messages');

-- Create storage policies
CREATE POLICY "Users can upload files to their conversations" 
ON storage.objects 
FOR INSERT 
WITH CHECK (
  bucket_id IN ('message-attachments', 'voice-messages') AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can view files from their conversations" 
ON storage.objects 
FOR SELECT 
USING (
  bucket_id IN ('message-attachments', 'voice-messages') AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Admins can access all message files" 
ON storage.objects 
FOR ALL 
USING (
  bucket_id IN ('message-attachments', 'voice-messages') AND
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.user_id = auth.uid() 
    AND profiles.role = 'admin'
  )
);