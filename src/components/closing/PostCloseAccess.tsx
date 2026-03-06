import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Download, Archive, FileText, Info } from 'lucide-react';

interface PostDoc {
  id: string;
  document_type: string;
  file_name: string;
  file_url: string;
  description: string | null;
  is_archived: boolean;
  created_at: string;
}

interface PostCloseAccessProps {
  applicationId: string;
}

export default function PostCloseAccess({ applicationId }: PostCloseAccessProps) {
  const [docs, setDocs] = useState<PostDoc[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from('post_close_documents')
        .select('*')
        .eq('application_id', applicationId)
        .order('created_at', { ascending: false });
      if (data) setDocs(data);
      setLoading(false);
    };
    fetch();
  }, [applicationId]);

  const typeLabel = (t: string) => {
    switch (t) {
      case 'final_doc': return 'Final Document';
      case 'payoff_schedule': return 'Payoff Schedule';
      case 'closing_statement': return 'Closing Statement';
      default: return t.replace('_', ' ');
    }
  };

  if (loading) return <div className="p-6 text-center text-muted-foreground">Loading post-close documents...</div>;

  return (
    <div className="space-y-6">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription className="text-xs">
          Post-close documents are automatically archived 180 days after full loan repayment for data hygiene compliance.
        </AlertDescription>
      </Alert>

      {docs.length === 0 ? (
        <Card><CardContent className="p-6 text-center text-muted-foreground">No post-close documents available yet.</CardContent></Card>
      ) : (
        <div className="space-y-3">
          {docs.map(doc => (
            <Card key={doc.id} className={doc.is_archived ? 'opacity-60' : ''}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  {doc.is_archived ? <Archive className="h-5 w-5 text-muted-foreground flex-shrink-0" /> : <FileText className="h-5 w-5 text-primary flex-shrink-0" />}
                  <div className="min-w-0">
                    <p className="font-medium text-sm truncate">{doc.file_name}</p>
                    <p className="text-xs text-muted-foreground">{doc.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{typeLabel(doc.document_type)}</Badge>
                  {doc.is_archived ? (
                    <Badge variant="secondary">Archived</Badge>
                  ) : (
                    <Button size="icon" variant="ghost" asChild>
                      <a href={doc.file_url} target="_blank" rel="noopener noreferrer"><Download className="h-4 w-4" /></a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
