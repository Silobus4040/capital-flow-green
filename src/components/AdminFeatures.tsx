import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Users, UserPlus, MessageSquare, Volume2 } from 'lucide-react';

interface Applicant {
  id: string;
  borrower_name: string;
  borrower_email: string;
  program_name: string;
  status: string;
  created_at: string;
  assigned_loan_officer?: string;
  program_specific_data?: any;
}

interface LoanOfficer {
  id: string;
  email: string;
  full_name: string;
}

export default function AdminFeatures() {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loanOfficers, setLoanOfficers] = useState<LoanOfficer[]>([]);
  const [selectedApplicant, setSelectedApplicant] = useState<string>('');
  const [selectedOfficer, setSelectedOfficer] = useState<string>('');
  const [ttsMessage, setTtsMessage] = useState<string>('');
  const [isGeneratingTTS, setIsGeneratingTTS] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile?.role === 'admin') {
      fetchApplicants();
      fetchLoanOfficers();
    }
  }, [profile]);

  const fetchApplicants = async () => {
    try {
      const { data, error } = await supabase
        .from('loan_program_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplicants(data || []);
    } catch (error) {
      console.error('Error fetching applicants:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLoanOfficers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'loan_officer');

      if (error) throw error;
      setLoanOfficers(data || []);
    } catch (error) {
      console.error('Error fetching loan officers:', error);
    }
  };

  const assignLoanOfficer = async () => {
    if (!selectedApplicant || !selectedOfficer) {
      toast({
        title: 'Missing Selection',
        description: 'Please select both an applicant and a loan officer',
        variant: 'destructive'
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('loan_program_applications')
        .update({ 
          admin_notes: `Assigned to loan officer: ${selectedOfficer}`
        })
        .eq('id', selectedApplicant);

      if (error) throw error;

      toast({
        title: 'Assignment Successful',
        description: 'Loan officer has been assigned to the applicant'
      });

      fetchApplicants(); // Refresh data
      setSelectedApplicant('');
      setSelectedOfficer('');
    } catch (error) {
      console.error('Error assigning loan officer:', error);
      toast({
        title: 'Assignment Failed',
        description: 'Failed to assign loan officer',
        variant: 'destructive'
      });
    }
  };

  const generateAdminTTS = async () => {
    if (!ttsMessage.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a message to convert to speech',
        variant: 'destructive'
      });
      return;
    }

    setIsGeneratingTTS(true);
    try {
      const { data, error } = await supabase.functions.invoke('text-to-speech', {
        body: { 
          text: ttsMessage,
          voice: 'Charlotte'
        }
      });

      if (error) throw error;

      if (!data || !data.audioContent) {
        throw new Error('No audio data received');
      }

      // Convert base64 audio to blob and play
      const audioData = atob(data.audioContent);
      const audioBytes = new Uint8Array(audioData.length);
      for (let i = 0; i < audioData.length; i++) {
        audioBytes[i] = audioData.charCodeAt(i);
      }
      
      const audioBlob = new Blob([audioBytes], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      
      audio.play();
      audio.onended = () => URL.revokeObjectURL(audioUrl);

      toast({
        title: 'TTS Generated',
        description: 'Text converted to speech successfully'
      });

      setTtsMessage('');
    } catch (error: any) {
      console.error('Error generating TTS:', error);
      toast({
        title: 'TTS Failed',
        description: error.message || 'Failed to generate text-to-speech',
        variant: 'destructive'
      });
    } finally {
      setIsGeneratingTTS(false);
    }
  };

  if (profile?.role !== 'admin') {
    return null;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Loan Officer Assignment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <UserPlus className="mr-2 h-5 w-5" />
            Assign Loan Officer
          </CardTitle>
          <CardDescription>
            Assign loan officers to applicants for personalized service
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="applicant">Select Applicant</Label>
              <Select value={selectedApplicant} onValueChange={setSelectedApplicant}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose applicant" />
                </SelectTrigger>
                <SelectContent>
                  {applicants.map((applicant) => (
                    <SelectItem key={applicant.id} value={applicant.id}>
                      {applicant.borrower_name} - {applicant.program_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="officer">Select Loan Officer</Label>
              <Select value={selectedOfficer} onValueChange={setSelectedOfficer}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose loan officer" />
                </SelectTrigger>
                <SelectContent>
                  {loanOfficers.map((officer) => (
                    <SelectItem key={officer.id} value={officer.id}>
                      {officer.full_name} ({officer.email})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={assignLoanOfficer} className="w-full">
            <Users className="mr-2 h-4 w-4" />
            Assign Loan Officer
          </Button>
        </CardContent>
      </Card>

      {/* Admin Text-to-Speech */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Volume2 className="mr-2 h-5 w-5" />
            Text-to-Speech Generator
          </CardTitle>
          <CardDescription>
            Convert text to speech for internal use and communication
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="ttsMessage">Message to Convert</Label>
            <Input
              id="ttsMessage"
              value={ttsMessage}
              onChange={(e) => setTtsMessage(e.target.value)}
              placeholder="Enter text to convert to speech..."
              className="w-full"
            />
          </div>

          <Button 
            onClick={generateAdminTTS} 
            disabled={!ttsMessage.trim() || isGeneratingTTS}
            className="w-full"
          >
            <Volume2 className="mr-2 h-4 w-4" />
            {isGeneratingTTS ? 'Generating...' : 'Generate Speech'}
          </Button>
        </CardContent>
      </Card>

      {/* Recent Applicants */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="mr-2 h-5 w-5" />
            Recent Applications
          </CardTitle>
          <CardDescription>
            Overview of recent loan applications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {applicants.slice(0, 5).map((applicant) => (
              <div key={applicant.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{applicant.borrower_name}</p>
                  <p className="text-sm text-muted-foreground">{applicant.program_name}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{applicant.status}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(applicant.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}