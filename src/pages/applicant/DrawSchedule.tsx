import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Calendar, DollarSign, Plus, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Draw {
  id: string;
  application_id: string;
  draw_number: number;
  description: string;
  requested_amount: number;
  approved_amount: number | null;
  status: string;
  requested_at: string;
  approved_at: string | null;
  funded_at: string | null;
  notes: string | null;
}

interface App {
  id: string;
  program_name: string;
}

export default function DrawSchedule() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [draws, setDraws] = useState<Draw[]>([]);
  const [apps, setApps] = useState<App[]>([]);
  const [selectedAppId, setSelectedAppId] = useState('');
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const fetch = async () => {
      if (!user) return;
      const { data: appData } = await supabase
        .from('loan_program_applications')
        .select('id, program_name')
        .eq('user_id', user.id);
      if (appData && appData.length > 0) {
        setApps(appData);
        setSelectedAppId(appData[0].id);
      }
      setLoading(false);
    };
    fetch();
  }, [user]);

  useEffect(() => {
    if (!selectedAppId) return;
    const fetchDraws = async () => {
      const { data } = await supabase
        .from('draw_schedules')
        .select('*')
        .eq('application_id', selectedAppId)
        .order('draw_number', { ascending: true });
      if (data) setDraws(data);
    };
    fetchDraws();
  }, [selectedAppId]);

  const submitDraw = async () => {
    if (!description.trim() || !amount || !selectedAppId) return;
    setSubmitting(true);
    const nextNum = draws.length > 0 ? Math.max(...draws.map(d => d.draw_number)) + 1 : 1;
    const { error } = await supabase.from('draw_schedules').insert({
      application_id: selectedAppId,
      draw_number: nextNum,
      description: description.trim(),
      requested_amount: parseFloat(amount),
    });
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Draw request submitted' });
      setShowForm(false);
      setDescription('');
      setAmount('');
      const { data } = await supabase.from('draw_schedules').select('*').eq('application_id', selectedAppId).order('draw_number');
      if (data) setDraws(data);
    }
    setSubmitting(false);
  };

  const formatCurrency = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
  const statusColor = (s: string) => {
    switch (s) {
      case 'approved': return 'border-green-200 text-green-700 bg-green-50';
      case 'funded': return 'border-blue-200 text-blue-700 bg-blue-50';
      case 'pending': return 'border-amber-200 text-amber-700 bg-amber-50';
      case 'rejected': return 'border-destructive text-destructive';
      default: return '';
    }
  };

  if (loading) return <div className="p-6 text-center text-muted-foreground">Loading...</div>;

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-serif">Draw Schedule</h1>
          <p className="text-muted-foreground text-sm">Manage and track draw requests</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} size="sm"><Plus className="h-4 w-4 mr-1" /> New Draw</Button>
      </div>

      {apps.length > 1 && (
        <select className="border rounded-md p-2 text-sm" value={selectedAppId} onChange={(e) => setSelectedAppId(e.target.value)}>
          {apps.map(a => <option key={a.id} value={a.id}>{a.program_name} — #{a.id.slice(0, 8)}</option>)}
        </select>
      )}

      {showForm && (
        <Card>
          <CardHeader><CardTitle className="text-base">New Draw Request</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <Textarea placeholder="Description of work completed..." value={description} onChange={(e) => setDescription(e.target.value)} />
            <Input type="number" placeholder="Amount requested ($)" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <div className="flex gap-2">
              <Button onClick={submitDraw} disabled={submitting || !description.trim() || !amount}>
                {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : null} Submit
              </Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {draws.length === 0 ? (
        <Card><CardContent className="p-6 text-center text-muted-foreground">No draw requests yet.</CardContent></Card>
      ) : (
        <div className="space-y-3">
          {draws.map(d => (
            <Card key={d.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold">Draw #{d.draw_number}</span>
                    <Badge variant="outline" className={statusColor(d.status)}>{d.status}</Badge>
                  </div>
                  <span className="font-semibold">{formatCurrency(Number(d.requested_amount))}</span>
                </div>
                <p className="text-sm text-muted-foreground">{d.description}</p>
                <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Requested: {new Date(d.requested_at).toLocaleDateString()}</span>
                  {d.approved_amount != null && <span className="flex items-center gap-1"><DollarSign className="h-3 w-3" /> Approved: {formatCurrency(Number(d.approved_amount))}</span>}
                  {d.funded_at && <span>Funded: {new Date(d.funded_at).toLocaleDateString()}</span>}
                </div>
                {d.notes && <p className="text-xs text-muted-foreground mt-1 italic">{d.notes}</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
