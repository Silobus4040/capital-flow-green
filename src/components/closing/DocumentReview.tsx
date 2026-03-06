import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Upload, Download, FileText, Eye, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Doc {
  id: string;
  file_name: string;
  file_url: string;
  file_type: string | null;
  uploaded_by_role: string;
  esign_status: string | null;
  audit_trail: any[];
  created_at: string;
}

interface DocumentReviewProps {
  applicationId: string;
}

export default function DocumentReview({ applicationId }: DocumentReviewProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [docs, setDocs] = useState<Doc[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const fetchDocs = async () => {
    const { data } = await supabase
      .from('closing_documents')
      .select('*')
      .eq('application_id', applicationId)
      .order('created_at', { ascending: false });
    if (data) setDocs(data);
    setLoading(false);
  };

  useEffect(() => { fetchDocs(); }, [applicationId]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setUploading(true);
    const filePath = `${applicationId}/${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage.from('closing-files').upload(filePath, file);
    if (uploadError) {
      toast({ title: 'Upload failed', description: uploadError.message, variant: 'destructive' });
      setUploading(false);
      return;
    }
    const { data: urlData } = supabase.storage.from('closing-files').getPublicUrl(filePath);
    await supabase.from('closing_documents').insert({
      application_id: applicationId,
      file_name: file.name,
      file_url: urlData.publicUrl,
      file_type: file.type,
      file_size: file.size,
      uploaded_by: user.id,
      uploaded_by_role: 'borrower',
      audit_trail: [{ action: 'uploaded', by: user.id, at: new Date().toISOString() }],
    });
    toast({ title: 'Document uploaded successfully' });
    setUploading(false);
    fetchDocs();
  };

  const esignColor = (s: string | null) => {
    switch (s) {
      case 'signed': return 'border-green-200 text-green-700 bg-green-50';
      case 'pending': return 'border-amber-200 text-amber-700 bg-amber-50';
      case 'rejected': return 'border-destructive text-destructive';
      default: return '';
    }
  };

  if (loading) return <div className="p-6 text-center text-muted-foreground">Loading documents...</div>;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5 text-primary" /> Documents</CardTitle>
          <label className="cursor-pointer">
            <Input type="file" className="hidden" onChange={handleUpload} disabled={uploading} />
            <Button variant="outline" size="sm" disabled={uploading} asChild>
              <span>{uploading ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Upload className="h-4 w-4 mr-1" />} Upload</span>
            </Button>
          </label>
        </CardHeader>
        <CardContent>
          {docs.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">No documents yet.</p>
          ) : (
            <div className="space-y-3">
              {docs.map(doc => (
                <div key={doc.id} className="flex items-center justify-between p-3 rounded-md bg-muted/50">
                  <div className="flex items-center gap-3 min-w-0">
                    <FileText className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="font-medium text-sm truncate">{doc.file_name}</p>
                      <p className="text-xs text-muted-foreground">
                        {doc.uploaded_by_role === 'admin' ? 'Account Executive' : 'You'} · {new Date(doc.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {doc.esign_status && (
                      <Badge variant="outline" className={esignColor(doc.esign_status)}>
                        {doc.esign_status === 'signed' ? '✓ Signed' : doc.esign_status === 'pending' ? 'Awaiting Signature' : doc.esign_status}
                      </Badge>
                    )}
                    <Button size="icon" variant="ghost" asChild>
                      <a href={doc.file_url} target="_blank" rel="noopener noreferrer"><Download className="h-4 w-4" /></a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
