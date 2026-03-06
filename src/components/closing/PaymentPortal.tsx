import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, CreditCard, Landmark } from 'lucide-react';

interface Payment {
  id: string;
  payment_type: string;
  description: string;
  amount: number;
  status: string;
  wire_reference: string | null;
  escrow_balance: number;
  due_date: string | null;
  paid_at: string | null;
}

interface PaymentPortalProps {
  applicationId: string;
}

export default function PaymentPortal({ applicationId }: PaymentPortalProps) {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from('closing_payments')
        .select('*')
        .eq('application_id', applicationId)
        .order('created_at', { ascending: true });
      if (data) setPayments(data);
      setLoading(false);
    };
    fetch();
  }, [applicationId]);

  const formatCurrency = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

  const totalDue = payments.filter(p => p.status !== 'paid').reduce((s, p) => s + Number(p.amount), 0);
  const totalPaid = payments.filter(p => p.status === 'paid').reduce((s, p) => s + Number(p.amount), 0);
  const latestEscrow = payments.length > 0 ? Number(payments[payments.length - 1].escrow_balance) : 0;

  const statusColor = (s: string) => {
    switch (s) {
      case 'paid': return 'border-green-200 text-green-700 bg-green-50';
      case 'pending': return 'border-amber-200 text-amber-700 bg-amber-50';
      case 'overdue': return 'border-destructive text-destructive';
      default: return '';
    }
  };

  if (loading) return <div className="p-6 text-center text-muted-foreground">Loading payment info...</div>;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Paid</p>
              <p className="font-bold text-lg">{formatCurrency(totalPaid)}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Remaining Due</p>
              <p className="font-bold text-lg">{formatCurrency(totalDue)}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Landmark className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Escrow Balance</p>
              <p className="font-bold text-lg">{formatCurrency(latestEscrow)}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {payments.length === 0 ? (
        <Card><CardContent className="p-6 text-center text-muted-foreground">No payment details available yet.</CardContent></Card>
      ) : (
        <Card>
          <CardHeader><CardTitle className="text-base">Closing Cost Breakdown</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {payments.map(p => (
                <div key={p.id} className="flex items-center justify-between p-3 rounded-md bg-muted/50">
                  <div>
                    <p className="font-medium text-sm">{p.description}</p>
                    <p className="text-xs text-muted-foreground">{p.payment_type.replace('_', ' ')} {p.due_date ? `· Due ${new Date(p.due_date).toLocaleDateString()}` : ''}</p>
                    {p.wire_reference && <p className="text-xs text-muted-foreground">Wire Ref: {p.wire_reference}</p>}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold">{formatCurrency(Number(p.amount))}</span>
                    <Badge variant="outline" className={statusColor(p.status)}>{p.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
