import { useEffect, useState, useRef, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Bell, DollarSign } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

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
  const [newBidIds, setNewBidIds] = useState<Set<string>>(new Set());
  const [notification, setNotification] = useState<{ label: string; amount: number } | null>(null);
  const prevBidsRef = useRef<Bid[]>([]);
  const isInitialLoad = useRef(true);
  const { toast } = useToast();

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

  const fetchBids = useCallback(async () => {
    const { data } = await supabase
      .from('closing_bids')
      .select('*')
      .eq('application_id', applicationId)
      .order('created_at', { ascending: false });

    if (data) {
      const prev = prevBidsRef.current;

      // Detect new or updated bids (skip on initial load)
      if (!isInitialLoad.current && prev.length > 0) {
        const prevMap = new Map(prev.map(b => [b.id, b]));
        const freshIds = new Set<string>();

        for (const bid of data) {
          const old = prevMap.get(bid.id);
          if (!old) {
            // Brand new bid
            freshIds.add(bid.id);
            toast({
              title: '🎉 New Investor Bid!',
              description: `${bid.investor_label} placed a bid of ${formatCurrency(Number(bid.bid_amount))}`,
            });
            setNotification({ label: bid.investor_label, amount: Number(bid.bid_amount) });
          } else if (Number(old.bid_amount) !== Number(bid.bid_amount) && Number(bid.bid_amount) > 0) {
            // Bid amount changed
            freshIds.add(bid.id);
            toast({
              title: '💰 Bid Updated!',
              description: `${bid.investor_label} updated their bid to ${formatCurrency(Number(bid.bid_amount))}`,
            });
            setNotification({ label: bid.investor_label, amount: Number(bid.bid_amount) });
          }
        }

        if (freshIds.size > 0) {
          setNewBidIds(freshIds);
          // Clear the "NEW" badges after 8 seconds
          setTimeout(() => setNewBidIds(new Set()), 8000);
          // Clear notification banner after 10 seconds
          setTimeout(() => setNotification(null), 10000);
        }
      }

      isInitialLoad.current = false;
      prevBidsRef.current = data;
      setBids(data);
    }
    setLoading(false);
  }, [applicationId, toast]);

  useEffect(() => {
    fetchBids();
    const channel = supabase
      .channel(`bids-${applicationId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'closing_bids', filter: `application_id=eq.${applicationId}` }, () => fetchBids())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [applicationId, fetchBids]);

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

  if (loading) return <div className="p-6 text-center text-muted-foreground">Loading bids...</div>;

  return (
    <div className="space-y-4">
      {/* Real-time notification banner */}
      {notification && (
        <div className="animate-in slide-in-from-top-2 fade-in duration-500 bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-lg flex items-center gap-3 shadow-lg">
          <div className="bg-white/20 rounded-full p-2">
            <Bell className="h-5 w-5 animate-bounce" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-sm">New Investor Activity!</p>
            <p className="text-sm opacity-90">
              {notification.label} bid {formatCurrency(notification.amount)} on your loan
            </p>
          </div>
          <DollarSign className="h-8 w-8 opacity-50" />
        </div>
      )}

      {/* Funding progress card */}
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

      {/* Bid list */}
      {bids.length === 0 ? (
        <Card><CardContent className="p-6 text-center text-muted-foreground">No investor bids yet. Check back soon.</CardContent></Card>
      ) : (
        <div className="space-y-3">
          {bids.map((bid) => {
            const isNew = newBidIds.has(bid.id);
            return (
              <Card
                key={bid.id}
                className={`transition-all duration-500 ${isNew ? 'ring-2 ring-green-500 shadow-lg shadow-green-100' : ''}`}
              >
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {isNew && (
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                      </span>
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">{bid.investor_label}</p>
                        {isNew && (
                          <Badge className="bg-green-500 text-white text-[10px] px-1.5 py-0 animate-pulse">NEW</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{new Date(bid.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`font-bold text-lg ${isNew ? 'text-green-600' : ''}`}>
                      {formatCurrency(Number(bid.bid_amount))}
                    </span>
                    <Badge variant="outline" className={statusColor(bid.status)}>
                      {bid.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </Badge>
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
