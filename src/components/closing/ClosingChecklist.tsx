import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Circle, AlertTriangle, ClipboardList } from 'lucide-react';

interface ChecklistItem {
  id: string;
  title: string;
  category: string;
  is_completed: boolean;
  deadline: string | null;
  completed_at: string | null;
  notes: string | null;
}

interface ClosingChecklistProps {
  applicationId: string;
}

export default function ClosingChecklist({ applicationId }: ClosingChecklistProps) {
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from('closing_checklist_items')
        .select('*')
        .eq('application_id', applicationId)
        .order('created_at', { ascending: true });
      if (data) setItems(data);
      setLoading(false);
    };
    fetch();
  }, [applicationId]);

  const completed = items.filter(i => i.is_completed).length;
  const total = items.length;
  const categories = [...new Set(items.map(i => i.category))];

  const isOverdue = (deadline: string | null) => {
    if (!deadline) return false;
    return new Date(deadline) < new Date() ;
  };

  if (loading) return <div className="p-6 text-center text-muted-foreground">Loading checklist...</div>;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-primary" />
            Progress: {completed} of {total} Complete
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full bg-muted rounded-full h-3">
            <div className="bg-primary h-3 rounded-full transition-all" style={{ width: total > 0 ? `${(completed / total) * 100}%` : '0%' }} />
          </div>
        </CardContent>
      </Card>

      {items.length === 0 ? (
        <Card><CardContent className="p-6 text-center text-muted-foreground">No checklist items yet. Your account executive will add items as your loan progresses.</CardContent></Card>
      ) : (
        categories.map(cat => (
          <Card key={cat}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">{cat.replace('_', ' ')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {items.filter(i => i.category === cat).map(item => (
                <div key={item.id} className="flex items-start gap-3 p-3 rounded-md bg-muted/50">
                  {item.is_completed ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium text-sm ${item.is_completed ? 'line-through text-muted-foreground' : ''}`}>{item.title}</p>
                    {item.notes && <p className="text-xs text-muted-foreground mt-1">{item.notes}</p>}
                    <div className="flex gap-2 mt-1">
                      {item.deadline && (
                        <Badge variant="outline" className={isOverdue(item.deadline) && !item.is_completed ? 'border-destructive text-destructive' : ''}>
                          {isOverdue(item.deadline) && !item.is_completed && <AlertTriangle className="h-3 w-3 mr-1" />}
                          Due: {new Date(item.deadline).toLocaleDateString()}
                        </Badge>
                      )}
                      {item.completed_at && (
                        <Badge variant="outline" className="border-green-200 text-green-700">
                          Completed {new Date(item.completed_at).toLocaleDateString()}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
