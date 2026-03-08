import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Upload, X, FileText, Check, AlertCircle, Loader2, Download } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface DocumentUpload {
  id: string;
  file: File | null;
  documentName: string;
  notes: string;
}

interface UploadedDoc {
  id: string;
  document_name: string;
  file_name: string;
  file_path: string;
  file_size: number | null;
  created_at: string;
}

export default function ApplicantDocuments() {
  const { user } = useAuth();
  const { toast } = useToast();
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [documents, setDocuments] = useState<DocumentUpload[]>([
    { id: "1", file: null, documentName: "", notes: "" },
  ]);
  const [uploadedDocs, setUploadedDocs] = useState<UploadedDoc[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  useEffect(() => {
    if (user) loadUploadHistory();
  }, [user]);

  const loadUploadHistory = async () => {
    setLoadingHistory(true);
    const { data, error } = await supabase
      .from('document_uploads')
      .select('id, document_name, file_name, file_path, file_size, created_at')
      .order('created_at', { ascending: false });
    if (!error && data) setUploadedDocs(data as UploadedDoc[]);
    setLoadingHistory(false);
  };

  const downloadFile = async (filePath: string, fileName: string) => {
    const { data, error } = await supabase.storage.from('documents').createSignedUrl(filePath, 60);
    if (error || !data?.signedUrl) {
      toast({ title: "Error", description: "Could not generate download link.", variant: "destructive" });
      return;
    }
    window.open(data.signedUrl, '_blank');
  };

  const updateDocument = (id: string, field: keyof DocumentUpload, value: any) => {
    setDocuments(prev => prev.map(doc => doc.id === id ? { ...doc, [field]: value } : doc));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleSubmitAll = async () => {
    if (!user) {
      toast({ title: "Authentication Required", description: "Please log in to submit documents.", variant: "destructive" });
      return;
    }

    const invalidDocs = documents.filter(doc => !doc.file || !doc.documentName.trim());
    if (invalidDocs.length > 0) {
      toast({ title: "Validation Error", description: "All document entries must have a name and a file.", variant: "destructive" });
      return;
    }

    if (documents.length === 0) {
      toast({ title: "Validation Error", description: "Please add at least one document.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    let successCount = 0;

    try {
      for (const doc of documents) {
        if (!doc.file) continue;

        const fileExt = doc.file.name.split('.').pop();
        const safeDocName = doc.documentName.replace(/[^a-zA-Z0-9]/g, '_');
        const fileName = `${user.id}/${Date.now()}_${safeDocName}.${fileExt}`;

        const { error } = await supabase.storage
          .from("documents")
          .upload(fileName, doc.file);

        if (error) {
          console.error("Upload error for", doc.documentName, error);
          toast({ title: "Upload Failed", description: `Failed to upload ${doc.documentName}: ${error.message}`, variant: "destructive" });
          continue;
        }

        // Track in database
        await supabase.from('document_uploads').insert({
          user_id: user.id,
          file_name: doc.file.name,
          document_name: doc.documentName.trim(),
          file_path: fileName,
          file_size: doc.file.size,
          file_type: doc.file.type || null,
          notes: doc.notes.trim() || null,
        } as any);

        successCount++;
      }

      if (successCount === documents.length) {
        toast({ title: "Success", description: "All documents have been securely uploaded!" });
        setDocuments([{ id: "1", file: null, documentName: "", notes: "" }]);
        Object.keys(fileInputRefs.current).forEach(key => {
          if (fileInputRefs.current[key]) fileInputRefs.current[key]!.value = "";
        });
        loadUploadHistory();
      } else if (successCount > 0) {
        toast({ title: "Partial Success", description: `Uploaded ${successCount} out of ${documents.length} documents.` });
        loadUploadHistory();
      }
    } catch (error) {
      console.error("Unexpected error during multi-upload", error);
      toast({ title: "Error", description: "An unexpected error occurred during upload.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const addDocument = () => {
    const newId = (documents.length + 1).toString();
    setDocuments(prev => [...prev, { id: newId, file: null, documentName: "", notes: "" }]);
  };

  const removeDocument = (id: string) => {
    if (documents.length > 1) setDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Document Submission</h1>
        <p className="text-muted-foreground">Upload your loan documentation securely.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {documents.map((doc, index) => (
            <Card key={doc.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg">Document #{index + 1}</CardTitle>
                {documents.length > 1 && (<Button variant="ghost" size="sm" onClick={() => removeDocument(doc.id)} className="text-destructive hover:text-destructive"><X className="h-4 w-4" /></Button>)}
              </CardHeader>
              <CardContent className="space-y-4">
                <div><Label>Document Name *</Label><Input value={doc.documentName} onChange={(e) => updateDocument(doc.id, "documentName", e.target.value)} placeholder="Recorded Deed," /></div>
                <div>
                  <Label>Select File *</Label>
                  <input type="file" ref={(el) => fileInputRefs.current[doc.id] = el} onChange={(e) => { const file = e.target.files?.[0]; if (file) updateDocument(doc.id, "file", file); }} className="hidden" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt" />
                  <Button variant="outline" onClick={() => fileInputRefs.current[doc.id]?.click()} className="w-full h-20 border-dashed mt-1">
                    <div className="text-center"><Upload className="h-6 w-6 mx-auto mb-2 text-muted-foreground" /><span className="text-sm text-muted-foreground">Click to select file</span></div>
                  </Button>
                  {doc.file && (
                    <div className="mt-2 p-3 bg-accent rounded-md flex items-center justify-between">
                      <div className="flex items-center space-x-2"><FileText className="h-4 w-4 text-primary" /><div><p className="text-sm font-medium">{doc.file.name}</p><p className="text-xs text-muted-foreground">{formatFileSize(doc.file.size)}</p></div></div>
                      <Button variant="ghost" size="sm" onClick={() => { updateDocument(doc.id, "file", null); if (fileInputRefs.current[doc.id]) fileInputRefs.current[doc.id]!.value = ""; }} className="text-destructive"><X className="h-4 w-4" /></Button>
                    </div>
                  )}
                </div>
                <div><Label>Notes (Optional)</Label><Textarea value={doc.notes} onChange={(e) => updateDocument(doc.id, "notes", e.target.value)} placeholder="Add any additional information..." rows={3} /></div>
              </CardContent>
            </Card>
          ))}
          <Button onClick={addDocument} variant="outline" className="w-full"><FileText className="h-4 w-4 mr-2" />Add Another Document</Button>

          <div className="pt-6">
            <Button
              onClick={handleSubmitAll}
              className="w-full text-lg py-6"
              disabled={isSubmitting || documents.some(d => !d.file || !d.documentName.trim())}
            >
              {isSubmitting ? (
                <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Uploading Documents...</>
              ) : (
                <><Check className="mr-2 h-5 w-5" /> Submit All Documents</>
              )}
            </Button>
          </div>

          {/* Upload History */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2"><FileText className="h-5 w-5 text-primary" /><span>Previously Uploaded Documents</span></CardTitle>
            </CardHeader>
            <CardContent>
              {loadingHistory ? (
                <div className="text-center py-6 text-muted-foreground">Loading...</div>
              ) : uploadedDocs.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">No documents uploaded yet.</div>
              ) : (
                <div className="space-y-3">
                  {uploadedDocs.map(doc => (
                    <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{doc.document_name}</p>
                        <p className="text-sm text-muted-foreground">{doc.file_name} {doc.file_size ? `• ${formatFileSize(doc.file_size)}` : ''}</p>
                        <p className="text-xs text-muted-foreground">{new Date(doc.created_at).toLocaleString()}</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => downloadFile(doc.file_path, doc.file_name)}>
                        <Download className="h-4 w-4 mr-1" /> Download
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card><CardHeader><CardTitle className="flex items-center space-x-2"><AlertCircle className="h-5 w-5 text-primary" /><span>Upload Guidelines</span></CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div><h4 className="font-semibold mb-2">Accepted File Types:</h4><ul className="text-sm text-muted-foreground space-y-1"><li>• PDF documents (.pdf)</li><li>• Word documents (.doc, .docx)</li><li>• Images (.jpg, .jpeg, .png)</li></ul></div>
              <div><h4 className="font-semibold mb-2">File Requirements:</h4><ul className="text-sm text-muted-foreground space-y-1"><li>• Maximum file size: 10MB</li><li>• Files must be clear and readable</li></ul></div>
            </CardContent>
          </Card>
          <Card><CardHeader><CardTitle>Post Closing Documents</CardTitle></CardHeader>
            <CardContent><ul className="space-y-2 text-sm"><li>• Recorded Deed</li><li>• Recorded Mortgage/Deed of Trust</li><li>• Final Title Insurance Policy</li><li>• ALTA Settlement Statement</li><li>• UCC Financing Statements</li><li>• Recorded Assignment of Leases/Rents</li><li>• Hazard/Liability Insurance Certificates</li><li>• Flood Insurance Certificate</li></ul></CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
