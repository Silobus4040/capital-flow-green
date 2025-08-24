import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Upload, X, FileText, Edit } from "lucide-react";

interface DocumentRequest {
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
  const [uploads] = useState<DocumentUpload[]>([
    { id: "1", file: null, documentName: "", notes: "" },
    { id: "2", file: null, documentName: "", notes: "" },
    { id: "3", file: null, documentName: "", notes: "" },
    { id: "4", file: null, documentName: "", notes: "" },
    { id: "5", file: null, documentName: "", notes: "" },
    { id: "6", file: null, documentName: "", notes: "" },
    { id: "7", file: null, documentName: "", notes: "" },
  ]);
  const { toast } = useToast();

  const acceptedFileTypes = ".pdf,.docx,.xlsx,.jpg,.png";
  const maxFileSize = 25 * 1024 * 1024; // 25MB per file

  const [uploadStates, setUploadStates] = useState<DocumentUpload[]>(uploads);

  const updateUpload = (id: string, field: keyof DocumentUpload, value: any) => {
    setUploadStates(prevUploads => 
      prevUploads.map(upload => 
        upload.id === id ? { ...upload, [field]: value } : upload
      )
    );
  };

  const handleSubmit = (uploadId: string) => {
    const upload = uploadStates.find(u => u.id === uploadId);
    if (!upload) return;

    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address before submitting.",
        variant: "destructive",
      });
      return;
    }

    if (!upload.documentName.trim()) {
      toast({
        title: "Document Name Required",
        description: "Please enter a document name before submitting.",
        variant: "destructive",
      });
      return;
    }

    if (!upload.file) {
      toast({
        title: "File Required",
        description: "Please select a file before submitting.",
        variant: "destructive",
      });
      return;
    }

    if (upload.file.size > maxFileSize) {
      toast({
        title: "File Too Large",
        description: "Please select a file smaller than 25MB.",
        variant: "destructive",
      });
      return;
    }

    // Handle file upload
    console.log("Document Submission:", {
      email,
      documentName: upload.documentName,
      fileName: upload.file.name,
      fileSize: upload.file.size,
      notes: upload.notes,
      timestamp: new Date().toISOString()
    });

    toast({
      title: "Document Received",
      description: "Thank you.",
    });

    // Clear the uploaded document
    setUploadStates(prevUploads => 
      prevUploads.map(u => 
        u.id === uploadId 
          ? { ...u, file: null, documentName: "", notes: "" }
          : u
      )
    );
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
                      <div>
                        <Label className="text-sm font-semibold">Document Upload {index + 1}</Label>
                      </div>
                      
                      <div>
                        <Label htmlFor={`doc-name-${upload.id}`}>Document Name *</Label>
                        <Input
                          id={`doc-name-${upload.id}`}
                          value={upload.documentName}
                          onChange={(e) => updateUpload(upload.id, 'documentName', e.target.value)}
                          placeholder="e.g., Appraisal Report, Purchase Agreement"
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
                          <div className="flex items-center space-x-2 mt-2">
                            <FileText className="h-4 w-4 text-primary" />
                            <span className="text-sm">{upload.file.name}</span>
                            <span className="text-xs text-muted-foreground">
                              ({formatFileSize(upload.file.size)})
                            </span>
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

                      <Button 
                        onClick={() => handleSubmit(upload.id)} 
                        className="w-full"
                      >
                        Submit Document
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}