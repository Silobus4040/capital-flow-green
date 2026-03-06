import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp } from 'lucide-react';

interface Bid {
  id: string;
  investor_label: string;
  bid_amount: number;
  status: string;
  created_at: string;
}

interface LiveBiddingFeedProps {
  applicationId: string;
  requestedAmount: number;
}

export default function LiveBiddingFeed({ applicationId, requestedAmount }: LiveBiddingFeedProps) {
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBids = async () => {
    const { data } = await supabase
      .from('closing_bids')
      .select('*')
      .eq('application_id', applicationId)
      .order('created_at', { ascending: false });
    if (data) setBids(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBids();
    const channel = supabase
      .channel(`bids-${applicationId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'closing_bids', filter: `application_id=eq.${applicationId}` }, () => fetchBids())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [applicationId]);

  const totalFunded = bids.reduce((sum, b) => sum + Number(b.bid_amount), 0);
  const percentFunded = requestedAmount > 0 ? Math.min((totalFunded / requestedAmount) * 100, 100) : 0;

  const statusColor = (s: string) => {
    switch (s) {
      case 'bidded': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'liquidation_pending': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'committed': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const formatCurrency = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

  if (loading) return <div className="p-6 text-center text-muted-foreground">Loading bids...</div>;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Funding Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{percentFunded.toFixed(1)}% Funded</span>
              <span className="font-semibold">{formatCurrency(totalFunded)} of {formatCurrency(requestedAmount)}</span>
            </div>
            <Progress value={percentFunded} className="h-4" />
            <p className="text-xs text-muted-foreground">{bids.length} investor bid{bids.length !== 1 ? 's' : ''} received</p>
          </div>
        </CardContent>
      </Card>

      {bids.length === 0 ? (
        <Card><CardContent className="p-6 text-center text-muted-foreground">No investor bids yet. Check back soon.</CardContent></Card>
      ) : (
        <div className="space-y-3">
          {bids.map((bid) => (
            <Card key={bid.id}>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold">{bid.investor_label}</p>
                  <p className="text-sm text-muted-foreground">{new Date(bid.created_at).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-lg">{formatCurrency(Number(bid.bid_amount))}</span>
                  <Badge variant="outline" className={statusColor(bid.status)}>
                    {bid.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
