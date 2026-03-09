import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Plus, Save, Loader2, TrendingUp, Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Bid {
  id: string;
  application_id: string;
  investor_label: string;
  bid_amount: number;
  status: string;
  notes: string | null;
}

interface App {
  id: string;
  borrower_name: string;
  borrower_email: string;
  program_name: string;
  requested_amount: number | null;
}

interface InvestorStats {
  [label: string]: number; // total bids across all apps
}

export default function AdminBidManager() {
  const { toast } = useToast();
  const [apps, setApps] = useState<App[]>([]);
  const [selectedAppId, setSelectedAppId] = useState('');
  const [bids, setBids] = useState<Bid[]>([]);
  const [editedBids, setEditedBids] = useState<Record<string, Partial<Bid>>>({});
  const [investorStats, setInvestorStats] = useState<InvestorStats>({});
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from('loan_program_applications')
        .select('id, borrower_name, borrower_email, program_name, requested_amount')
        .order('created_at', { ascending: false });
      if (data && data.length > 0) {
        setApps(data as App[]);
        setSelectedAppId(data[0].id);
      }
      // Load global investor stats
      const { data: allBids } = await supabase.from('closing_bids').select('investor_label, bid_amount');
      const stats: InvestorStats = {};
      (allBids || []).forEach((b: any) => {
        stats[b.investor_label] = (stats[b.investor_label] || 0) + Number(b.bid_amount);
      });
      setInvestorStats(stats);
      setLoading(false);
    };
    load();
  }, []);

  useEffect(() => {
    if (!selectedAppId) return;
    const fetchBids = async () => {
      const { data } = await supabase
        .from('closing_bids')
        .select('*')
        .eq('application_id', selectedAppId)
        .order('created_at', { ascending: true });
      if (data) setBids(data);
      setEditedBids({});
    };
    fetchBids();
  }, [selectedAppId]);

  const selectedApp = apps.find(a => a.id === selectedAppId);
  const requestedAmount = selectedApp?.requested_amount || 0;
  const totalBidAmount = bids.reduce((s, b) => {
    const edited = editedBids[b.id];
    return s + Number(edited?.bid_amount ?? b.bid_amount);
  }, 0);
  const percentFunded = requestedAmount > 0 ? Math.min((totalBidAmount / requestedAmount) * 100, 100) : 0;

  const formatCurrency = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

  const updateBidField = (bidId: string, field: string, value: any) => {
    setEditedBids(prev => ({
      ...prev,
      [bidId]: { ...prev[bidId], [field]: value },
    }));
  };

  const addBid = async () => {
    if (bids.length >= 9) {
      toast({ title: 'Max 9 investors', variant: 'destructive' });
      return;
    }
    const nextNum = bids.length + 1;
    const { error } = await supabase.from('closing_bids').insert({
      application_id: selectedAppId,
      investor_label: `Investor-${String(nextNum).padStart(3, '0')}`,
      bid_amount: 0,
      status: 'bidded',
    });
    if (error) toast({ title: 'Error', description: error.message, variant: 'destructive' });
    else {
      const { data } = await supabase.from('closing_bids').select('*').eq('application_id', selectedAppId).order('created_at');
      if (data) setBids(data);
    }
  };

  const saveAll = async () => {
    setSaving(true);
    // Track which bids had amount changes for notifications
    const bidAmountChanges: { label: string; amount: number }[] = [];
    for (const [bidId, changes] of Object.entries(editedBids)) {
      const updateData: any = {};
      if (changes.investor_label !== undefined) updateData.investor_label = changes.investor_label;
      if (changes.bid_amount !== undefined) {
        updateData.bid_amount = Number(changes.bid_amount);
        const origBid = bids.find(b => b.id === bidId);
        if (origBid && Number(changes.bid_amount) > 0 && Number(changes.bid_amount) !== origBid.bid_amount) {
          bidAmountChanges.push({
            label: changes.investor_label ?? origBid.investor_label,
            amount: Number(changes.bid_amount),
          });
        }
      }
      if (changes.status !== undefined) updateData.status = changes.status;
      if (Object.keys(updateData).length > 0) {
        await supabase.from('closing_bids').update(updateData).eq('id', bidId);
      }
    }
    setEditedBids({});
    const { data } = await supabase.from('closing_bids').select('*').eq('application_id', selectedAppId).order('created_at');
    if (data) setBids(data);
    // Refresh stats
    const { data: allBids } = await supabase.from('closing_bids').select('investor_label, bid_amount');
    const stats: InvestorStats = {};
    (allBids || []).forEach((b: any) => {
      stats[b.investor_label] = (stats[b.investor_label] || 0) + Number(b.bid_amount);
    });
    setInvestorStats(stats);
    toast({ title: 'Bids saved' });
    setSaving(false);

    // Send email notifications for bid amount changes
    if (bidAmountChanges.length > 0 && selectedApp?.borrower_email) {
      console.log(`📧 Sending ${bidAmountChanges.length} bid notification(s) to ${selectedApp.borrower_email}`);
      for (const change of bidAmountChanges) {
        try {
          const { data: fnData, error: fnError } = await supabase.functions.invoke('send-bid-notification', {
            body: {
              borrowerEmail: selectedApp.borrower_email,
              borrowerName: selectedApp.borrower_name,
              investorLabel: change.label,
              bidAmount: change.amount,
              programName: selectedApp.program_name,
            },
          });
          if (fnError) {
            console.error('⚠️ Bid notification error:', fnError);
            toast({ title: '⚠️ Email notification failed', description: fnError.message || 'Edge Function error', variant: 'destructive' });
          } else {
            console.log('✅ Bid notification sent:', fnData);
            toast({ title: '📧 Email sent', description: `Bid notification sent to ${selectedApp.borrower_email}` });
          }
        } catch (err: any) {
          console.error('⚠️ Bid notification exception:', err);
          toast({ title: '⚠️ Email notification failed', description: err?.message || 'Unknown error', variant: 'destructive' });
        }
      }
    } else if (bidAmountChanges.length > 0) {
      console.warn('⚠️ No borrower email found for bid notification');
      toast({ title: '⚠️ No email sent', description: 'Borrower email not found for this application', variant: 'destructive' });
    }
  };

  const deleteBid = async (bidId: string) => {
    await supabase.from('closing_bids').delete().eq('id', bidId);
    setBids(prev => prev.filter(b => b.id !== bidId));
  };

  if (loading) return <div className="p-6 text-center text-muted-foreground">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <select className="border rounded-md p-2 text-sm" value={selectedAppId} onChange={(e) => setSelectedAppId(e.target.value)}>
          {apps.map(a => (
            <option key={a.id} value={a.id}>{a.borrower_name} — {a.program_name}</option>
          ))}
        </select>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={addBid} disabled={bids.length >= 9}>
            <Plus className="h-4 w-4 mr-1" /> Add Investor ({bids.length}/9)
          </Button>
          {Object.keys(editedBids).length > 0 && (
            <Button size="sm" onClick={saveAll} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Save className="h-4 w-4 mr-1" />} Save All
            </Button>
          )}
        </div>
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="font-semibold text-sm">Funding: {percentFunded.toFixed(1)}%</span>
            <span className="text-xs text-muted-foreground ml-auto">{formatCurrency(totalBidAmount)} of {formatCurrency(requestedAmount)}</span>
          </div>
          <Progress value={percentFunded} className="h-3" />
        </CardContent>
      </Card>

      {/* Bids table */}
      {bids.length === 0 ? (
        <Card><CardContent className="p-6 text-center text-muted-foreground">No bids yet. Add an investor to start.</CardContent></Card>
      ) : (
        <div className="space-y-2">
          {bids.map(bid => {
            const edited = editedBids[bid.id] || {};
            const label = edited.investor_label ?? bid.investor_label;
            const amount = edited.bid_amount ?? bid.bid_amount;
            const status = edited.status ?? bid.status;
            const pct = requestedAmount > 0 ? ((Number(amount) / requestedAmount) * 100).toFixed(1) : '0.0';
            const platformTotal = investorStats[bid.investor_label] || 0;

            return (
              <Card key={bid.id}>
                <CardContent className="p-3">
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-3 items-center">
                    <Input
                      value={label}
                      onChange={(e) => updateBidField(bid.id, 'investor_label', e.target.value)}
                      className="text-sm h-8"
                    />
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-muted-foreground">$</span>
                      <Input
                        type="number"
                        value={amount}
                        onChange={(e) => updateBidField(bid.id, 'bid_amount', e.target.value)}
                        className="text-sm h-8"
                      />
                    </div>
                    <select
                      className="border rounded-md p-1 text-sm h-8"
                      value={status}
                      onChange={(e) => updateBidField(bid.id, 'status', e.target.value)}
                    >
                      <option value="bidded">Bidded</option>
                      <option value="liquidation_pending">Liquidation Pending</option>
                      <option value="committed">Committed</option>
                    </select>
                    <Badge variant="outline" className="text-xs justify-center">{pct}%</Badge>
                    <span className="text-xs text-muted-foreground text-center">Platform: {formatCurrency(platformTotal)}</span>
                    <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => deleteBid(bid.id)}>
                      <Trash2 className="h-3.5 w-3.5 text-destructive" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
