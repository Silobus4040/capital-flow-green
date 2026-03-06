import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, TrendingUp, MessageSquare, ClipboardList, FileText, DollarSign, Archive } from 'lucide-react';
import LiveBiddingFeed from '@/components/closing/LiveBiddingFeed';
import CommunicationPortal from '@/components/closing/CommunicationPortal';
import ClosingChecklist from '@/components/closing/ClosingChecklist';
import DocumentReview from '@/components/closing/DocumentReview';
import PaymentPortal from '@/components/closing/PaymentPortal';
import PostCloseAccess from '@/components/closing/PostCloseAccess';

interface Application {
  id: string;
  program_name: string;
  requested_amount: number;
  status: string | null;
}

export default function ClosingDashboard() {
  const { user } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      if (!user) return;
      const { data } = await supabase
        .from('loan_program_applications')
        .select('id, program_name, requested_amount, status')
        .eq('user_id', user.id)
        .in('status', ['closing', 'funded', 'post_close', 'repaying']);
      if (data && data.length > 0) {
        setApplications(data);
        setSelectedApp(data[0]);
      }
      setLoading(false);
    };
    fetch();
  }, [user]);

  if (loading) return <div className="p-6 text-center text-muted-foreground">Loading closing dashboard...</div>;

  if (!selectedApp) {
    return (
      <div className="p-6">
        <Alert>
          <Shield className="h-4 w-4" />
          <AlertDescription>
            No applications in closing status. This dashboard becomes available once your loan enters the closing phase.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-4">
      <div>
        <h1 className="text-2xl font-bold font-serif">Closing Dashboard</h1>
        <p className="text-muted-foreground text-sm">{selectedApp.program_name} — Loan #{selectedApp.id.slice(0, 8).toUpperCase()}</p>
      </div>

      {applications.length > 1 && (
        <select
          className="border rounded-md p-2 text-sm"
          value={selectedApp.id}
          onChange={(e) => setSelectedApp(applications.find(a => a.id === e.target.value) || null)}
        >
          {applications.map(a => (
            <option key={a.id} value={a.id}>{a.program_name} — #{a.id.slice(0, 8)}</option>
          ))}
        </select>
      )}

      <Alert className="border-amber-200 bg-amber-50">
        <Shield className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-amber-800 text-xs font-medium">
          ⚖️ Legal Notice: CCIF assumes 100% liability for all communication data — fully retained for loan life + 180 days post-repayment.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="bidding" className="w-full">
        <TabsList className="w-full flex flex-wrap h-auto gap-1 bg-muted p-1">
          <TabsTrigger value="bidding" className="flex items-center gap-1 text-xs"><TrendingUp className="h-3 w-3" /> Bidding</TabsTrigger>
          <TabsTrigger value="communication" className="flex items-center gap-1 text-xs"><MessageSquare className="h-3 w-3" /> Messages</TabsTrigger>
          <TabsTrigger value="checklist" className="flex items-center gap-1 text-xs"><ClipboardList className="h-3 w-3" /> Checklist</TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-1 text-xs"><FileText className="h-3 w-3" /> Documents</TabsTrigger>
          <TabsTrigger value="payments" className="flex items-center gap-1 text-xs"><DollarSign className="h-3 w-3" /> Payments</TabsTrigger>
          <TabsTrigger value="postclose" className="flex items-center gap-1 text-xs"><Archive className="h-3 w-3" /> Post-Close</TabsTrigger>
        </TabsList>

        <TabsContent value="bidding">
          <LiveBiddingFeed applicationId={selectedApp.id} requestedAmount={Number(selectedApp.requested_amount) || 0} />
        </TabsContent>
        <TabsContent value="communication">
          <CommunicationPortal applicationId={selectedApp.id} />
        </TabsContent>
        <TabsContent value="checklist">
          <ClosingChecklist applicationId={selectedApp.id} />
        </TabsContent>
        <TabsContent value="documents">
          <DocumentReview applicationId={selectedApp.id} />
        </TabsContent>
        <TabsContent value="payments">
          <PaymentPortal applicationId={selectedApp.id} />
        </TabsContent>
        <TabsContent value="postclose">
          <PostCloseAccess applicationId={selectedApp.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
