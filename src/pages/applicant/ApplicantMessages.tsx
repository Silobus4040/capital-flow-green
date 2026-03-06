import { useEffect, useState } from 'react';
import ApplicantLayout from '@/components/ApplicantLayout';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { MessageSquare } from 'lucide-react';
import CommunicationPortal from '@/components/closing/CommunicationPortal';

interface App {
  id: string;
  program_name: string;
}

export default function ApplicantMessages() {
  const { user } = useAuth();
  const [apps, setApps] = useState<App[]>([]);
  const [selectedAppId, setSelectedAppId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      if (!user) return;
      const { data } = await supabase
        .from('loan_program_applications')
        .select('id, program_name')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (data && data.length > 0) {
        setApps(data);
        setSelectedAppId(data[0].id);
      }
      setLoading(false);
    };
    fetch();
  }, [user]);

  return (
    <ApplicantLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center space-x-3">
          <MessageSquare className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold">Message Center</h1>
            <p className="text-muted-foreground">Communicate with your Dedicated Account Manager</p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading...</div>
        ) : apps.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No applications found. Submit a loan application first.</p>
          </div>
        ) : (
          <>
            {apps.length > 1 && (
              <select
                className="border rounded-md p-2 text-sm"
                value={selectedAppId}
                onChange={(e) => setSelectedAppId(e.target.value)}
              >
                {apps.map(a => (
                  <option key={a.id} value={a.id}>{a.program_name} — #{a.id.slice(0, 8)}</option>
                ))}
              </select>
            )}
            {selectedAppId && <CommunicationPortal applicationId={selectedAppId} />}
          </>
        )}
      </div>
    </ApplicantLayout>
  );
}
