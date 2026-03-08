import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Upload, X, FileText, Edit, Loader2, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface DocumentAction {
  id: string;
  label: string;
  isEditing: boolean;
}

interface DocumentUpload {
  id: string;
  file: File | null;
  documentName: string;
  notes: string;
}

export default function DocumentSubmission() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const acceptedFileTypes = ".pdf,.docx,.xlsx,.jpg,.png";
  const maxFileSize = 25 * 1024 * 1024; // 25MB per file

  const [uploadStates, setUploadStates] = useState<DocumentUpload[]>([
    { id: "1", file: null, documentName: "", notes: "" },
  ]);

  const updateUpload = (id: string, field: keyof DocumentUpload, value: any) => {
    setUploadStates(prevUploads =>
      prevUploads.map(upload =>
        upload.id === id ? { ...upload, [field]: value } : upload
      )
    );
  };

  const addDocument = () => {
    const newId = (uploadStates.length + 1).toString();
    setUploadStates(prev => [...prev, { id: newId, file: null, documentName: "", notes: "" }]);
  };

  const removeDocument = (id: string) => {
    if (uploadStates.length > 1) {
      setUploadStates(prev => prev.filter(upload => upload.id !== id));
    }
  };

  const handleSubmitAll = async () => {
    if (!email) {
      toast({ title: "Email Required", description: "Please enter your email address before submitting.", variant: "destructive" });
      return;
    }

    const invalidDocs = uploadStates.filter(doc => !doc.file || !doc.documentName.trim());
    if (invalidDocs.length > 0) {
      toast({ title: "Validation Error", description: "All document entries must have a name and a file.", variant: "destructive" });
      return;
    }

    if (uploadStates.some(doc => doc.file && doc.file.size > maxFileSize)) {
      toast({ title: "File Too Large", description: "Please ensure all files are smaller than 25MB.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    let successCount = 0;

    try {
      for (const doc of uploadStates) {
        if (!doc.file) continue;

        const fileExt = doc.file.name.split('.').pop();
        const safeDocName = doc.documentName.replace(/[^a-zA-Z0-9]/g, '_');
        // Using email as a folder since this is the public submission
        const safeEmail = email.replace(/[^a-zA-Z0-9]/g, '_');
        const fileName = `public_submissions/${safeEmail}/${Date.now()}_${safeDocName}.${fileExt}`;

        const { error } = await supabase.storage
          .from("documents")
          .upload(fileName, doc.file);

        if (error) {
          console.error("Upload error for", doc.documentName, error);
          toast({ title: "Upload Failed", description: `Failed to upload ${doc.documentName}: ${error.message}`, variant: "destructive" });
          continue;
        }

        successCount++;
      }

      if (successCount === uploadStates.length) {
        toast({ title: "Success", description: "All documents have been securely uploaded!", variant: "success" as any });

        // Send Telegram notification (fire-and-forget)
        supabase.functions.invoke('send-telegram-notification', {
          body: {
            applicationType: 'document_upload',
            borrowerName: email,
            borrowerEmail: email,
            extras: {
              'Documents Uploaded': successCount.toString(),
              'Document Names': uploadStates.map(d => d.documentName).join(', '),
              'Source': 'Public Document Submission Portal',
            },
          },
        }).catch(err => console.error('⚠️ Telegram notification failed:', err));

        setUploadStates([{ id: "1", file: null, documentName: "", notes: "" }]);
      } else if (successCount > 0) {
        toast({ title: "Partial Success", description: `Uploaded ${successCount} out of ${uploadStates.length} documents.`, variant: "success" as any });
      }

    } catch (error) {
      console.error("Unexpected error during multi-upload", error);
      toast({ title: "Error", description: "An unexpected error occurred during upload.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen py-12 px-4 bg-accent/20">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Document Submission Portal</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Upload your documents below. Name each file exactly as instructed (for example, Appraisal Report, Purchase Agreement).
            The Document Name field is mandatory for every upload.
          </p>
        </div>

        {/* Requested Documents Examples */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Document Examples</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <span className="flex-1">1. Appraisal Report</span>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <span className="flex-1">2. Purchase Agreement</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Submit Your Documents</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="email">Your Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="mt-1"
              />
              <p className="text-sm text-muted-foreground mt-1">
                We'll use this email to confirm receipt and communicate about your submission.
              </p>
            </div>

            <div>
              <Label className="text-base font-semibold">Document Uploads</Label>
              <p className="text-sm text-muted-foreground mb-4">
                Accepted formats: PDF, DOCX, XLSX, JPG, PNG. Maximum file size: 25MB per document.
              </p>

              <div className="space-y-6">
                {uploadStates.map((upload, index) => (
                  <Card key={upload.id} className="p-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b pb-2 mb-2">
                        <Label className="text-lg font-bold">Document {index + 1}</Label>
                        {uploadStates.length > 1 && (
                          <Button variant="ghost" size="sm" onClick={() => removeDocument(upload.id)} className="text-destructive h-8 w-8 p-0">
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      <div>
                        <Label htmlFor={`doc-name-${upload.id}`}>Document Name *</Label>
                        <Input
                          id={`doc-name-${upload.id}`}
                          value={upload.documentName}
                          onChange={(e) => updateUpload(upload.id, 'documentName', e.target.value)}
                          placeholder="Recorded Deed,"
                          className="mt-1"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor={`file-${upload.id}`}>Choose File *</Label>
                        <Input
                          id={`file-${upload.id}`}
                          type="file"
                          accept={acceptedFileTypes}
                          onChange={(e) => updateUpload(upload.id, 'file', e.target.files?.[0] || null)}
                          className="mt-1"
                          required
                        />
                        {upload.file && (
                          <div className="flex items-center space-x-2 mt-2 bg-accent/50 p-2 rounded">
                            <FileText className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium">{upload.file.name}</span>
                            <span className="text-xs text-muted-foreground">
                              ({formatFileSize(upload.file.size)})
                            </span>
                            <Button variant="ghost" size="sm" onClick={() => updateUpload(upload.id, "file", null)} className="ml-auto h-6 w-6 p-0 text-destructive"><X className="h-4 w-4" /></Button>
                          </div>
                        )}
                      </div>

                      <div>
                        <Label htmlFor={`notes-${upload.id}`}>Notes (Optional)</Label>
                        <Textarea
                          id={`notes-${upload.id}`}
                          value={upload.notes}
                          onChange={(e) => updateUpload(upload.id, 'notes', e.target.value)}
                          placeholder="Add any additional notes about this document..."
                          className="mt-1"
                          rows={2}
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="mt-4">
                <Button onClick={addDocument} variant="outline" className="w-full border-dashed"><FileText className="h-4 w-4 mr-2" />Add Another Document</Button>
              </div>

              <div className="mt-8 pt-6 border-t">
                <Button
                  onClick={handleSubmitAll}
                  className="w-full text-lg py-6"
                  disabled={isSubmitting || !email || uploadStates.some(d => !d.file || !d.documentName.trim())}
                >
                  {isSubmitting ? (
                    <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Uploading Documents...</>
                  ) : (
                    <><Check className="mr-2 h-5 w-5" /> Submit All Documents</>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}