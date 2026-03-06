import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Calendar, CheckCircle2, Clock } from 'lucide-react';

interface Repayment {
  id: string;
  payment_number: number;
  principal: number;
  interest: number;
  total_amount: number;
  due_date: string;
  paid_at: string | null;
  status: string;
  remaining_balance: number;
}

interface App {
  id: string;
  program_name: string;
}

export default function LoanRepayment() {
  const { user } = useAuth();
  const [repayments, setRepayments] = useState<Repayment[]>([]);
  const [apps, setApps] = useState<App[]>([]);
  const [selectedAppId, setSelectedAppId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      if (!user) return;
      const { data } = await supabase.from('loan_program_applications').select('id, program_name').eq('user_id', user.id);
      if (data && data.length > 0) {
        setApps(data);
        setSelectedAppId(data[0].id);
      }
      setLoading(false);
    };
    fetch();
  }, [user]);

  useEffect(() => {
    if (!selectedAppId) return;
    const fetchRepayments = async () => {
      const { data } = await supabase
        .from('loan_repayments')
        .select('*')
        .eq('application_id', selectedAppId)
        .order('payment_number', { ascending: true });
      if (data) setRepayments(data);
    };
    fetchRepayments();
  }, [selectedAppId]);

  const formatCurrency = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

  const totalPaid = repayments.filter(r => r.status === 'paid').reduce((s, r) => s + Number(r.total_amount), 0);
  const totalRemaining = repayments.filter(r => r.status !== 'paid').reduce((s, r) => s + Number(r.total_amount), 0);
  const nextPayment = repayments.find(r => r.status === 'upcoming');

  if (loading) return <div className="p-6 text-center text-muted-foreground">Loading...</div>;

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-serif">Loan Repayment</h1>
        <p className="text-muted-foreground text-sm">Track your payment schedule and history</p>
      </div>

      {apps.length > 1 && (
        <select className="border rounded-md p-2 text-sm" value={selectedAppId} onChange={(e) => setSelectedAppId(e.target.value)}>
          {apps.map(a => <option key={a.id} value={a.id}>{a.program_name} — #{a.id.slice(0, 8)}</option>)}
        </select>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center"><CheckCircle2 className="h-5 w-5 text-green-600" /></div>
            <div><p className="text-xs text-muted-foreground">Total Paid</p><p className="font-bold text-lg">{formatCurrency(totalPaid)}</p></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center"><DollarSign className="h-5 w-5 text-amber-600" /></div>
            <div><p className="text-xs text-muted-foreground">Remaining</p><p className="font-bold text-lg">{formatCurrency(totalRemaining)}</p></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center"><Calendar className="h-5 w-5 text-blue-600" /></div>
            <div>
              <p className="text-xs text-muted-foreground">Next Payment</p>
              <p className="font-bold text-sm">{nextPayment ? `${formatCurrency(Number(nextPayment.total_amount))} — ${new Date(nextPayment.due_date).toLocaleDateString()}` : 'N/A'}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {repayments.length === 0 ? (
        <Card><CardContent className="p-6 text-center text-muted-foreground">No repayment schedule available yet.</CardContent></Card>
      ) : (
        <Card>
          <CardHeader><CardTitle className="text-base">Payment Schedule</CardTitle></CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="pb-2 pr-4">#</th>
                    <th className="pb-2 pr-4">Due Date</th>
                    <th className="pb-2 pr-4">Principal</th>
                    <th className="pb-2 pr-4">Interest</th>
                    <th className="pb-2 pr-4">Total</th>
                    <th className="pb-2 pr-4">Balance</th>
                    <th className="pb-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {repayments.map(r => (
                    <tr key={r.id} className="border-b last:border-0">
                      <td className="py-3 pr-4 font-medium">{r.payment_number}</td>
                      <td className="py-3 pr-4">{new Date(r.due_date).toLocaleDateString()}</td>
                      <td className="py-3 pr-4">{formatCurrency(Number(r.principal))}</td>
                      <td className="py-3 pr-4">{formatCurrency(Number(r.interest))}</td>
                      <td className="py-3 pr-4 font-semibold">{formatCurrency(Number(r.total_amount))}</td>
                      <td className="py-3 pr-4">{formatCurrency(Number(r.remaining_balance))}</td>
                      <td className="py-3">
                        <Badge variant="outline" className={
                          r.status === 'paid' ? 'border-green-200 text-green-700 bg-green-50' :
                          r.status === 'overdue' ? 'border-destructive text-destructive' :
                          'border-amber-200 text-amber-700 bg-amber-50'
                        }>
                          {r.status === 'paid' ? <CheckCircle2 className="h-3 w-3 mr-1" /> : <Clock className="h-3 w-3 mr-1" />}
                          {r.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
