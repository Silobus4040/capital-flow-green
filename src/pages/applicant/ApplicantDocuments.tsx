import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Upload, X, FileText, Check, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import ApplicantLayout from "@/components/ApplicantLayout";

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

export default function ApplicantDocuments() {
  const { user } = useAuth();
  const { toast } = useToast();
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const [documents, setDocuments] = useState<DocumentUpload[]>([
    { id: "1", file: null, documentName: "", notes: "" },
    { id: "2", file: null, documentName: "", notes: "" },
    { id: "3", file: null, documentName: "", notes: "" },
  ]);

  const updateDocument = (id: string, field: keyof DocumentUpload, value: any) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === id ? { ...doc, [field]: value } : doc
    ));
  };

  const handleFileSelect = (id: string, file: File) => {
    updateDocument(id, "file", file);
  };

  const removeFile = (id: string) => {
    updateDocument(id, "file", null);
    if (fileInputRefs.current[id]) {
      fileInputRefs.current[id]!.value = "";
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const validateDocument = (doc: DocumentUpload): string | null => {
    if (!doc.documentName.trim()) {
      return "Document name is required";
    }
    if (!doc.file) {
      return "Please select a file";
    }
    if (doc.file.size > 10 * 1024 * 1024) { // 10MB limit
      return "File size must be less than 10MB";
    }
    return null;
  };

  const handleSubmit = async (doc: DocumentUpload) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to submit documents.",
        variant: "destructive",
      });
      return;
    }

    const error = validateDocument(doc);
    if (error) {
      toast({
        title: "Validation Error",
        description: error,
        variant: "destructive",
      });
      return;
    }

    try {
      // Upload file to Supabase Storage
      const fileExt = doc.file!.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, doc.file!);

      if (uploadError) {
        throw uploadError;
      }

      // Save document metadata to database
      const { error: dbError } = await supabase
        .from('document_submissions')
        .insert([{
          user_id: user.id,
          document_name: doc.documentName,
          file_name: doc.file!.name,
          file_path: filePath,
          file_size: doc.file!.size,
          file_type: doc.file!.type,
          notes: doc.notes || null,
        }]);

      if (dbError) {
        throw dbError;
      }

      toast({
        title: "Document Uploaded Successfully",
        description: `${doc.documentName} has been submitted for review.`,
      });

      // Reset the document
      updateDocument(doc.id, "file", null);
      updateDocument(doc.id, "documentName", "");
      updateDocument(doc.id, "notes", "");
      if (fileInputRefs.current[doc.id]) {
        fileInputRefs.current[doc.id]!.value = "";
      }

    } catch (error: any) {
      console.error('Error uploading document:', error);
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your document. Please try again.",
        variant: "destructive",
      });
    }
  };

  const addDocument = () => {
    const newId = (documents.length + 1).toString();
    setDocuments(prev => [...prev, {
      id: newId,
      file: null,
      documentName: "",
      notes: ""
    }]);
  };

  const removeDocument = (id: string) => {
    if (documents.length > 1) {
      setDocuments(prev => prev.filter(doc => doc.id !== id));
    }
  };

  return (
    <ApplicantLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Document Submission</h1>
          <p className="text-muted-foreground">
            Upload your loan documentation securely. All files are encrypted and stored safely.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Document Upload Section */}
          <div className="lg:col-span-2 space-y-6">
            {documents.map((doc, index) => (
              <Card key={doc.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg">Document #{index + 1}</CardTitle>
                  {documents.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeDocument(doc.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor={`documentName-${doc.id}`}>Document Name *</Label>
                    <Input
                      id={`documentName-${doc.id}`}
                      value={doc.documentName}
                      onChange={(e) => updateDocument(doc.id, "documentName", e.target.value)}
                      placeholder="e.g., Property Purchase Agreement"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`file-${doc.id}`}>Select File *</Label>
                    <div className="mt-1">
                      <input
                        id={`file-${doc.id}`}
                        type="file"
                        ref={(el) => fileInputRefs.current[doc.id] = el}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileSelect(doc.id, file);
                        }}
                        className="hidden"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                      />
                      <Button
                        variant="outline"
                        onClick={() => fileInputRefs.current[doc.id]?.click()}
                        className="w-full h-20 border-dashed"
                      >
                        <div className="text-center">
                          <Upload className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            Click to select file or drag and drop
                          </span>
                        </div>
                      </Button>
                    </div>
                    
                    {doc.file && (
                      <div className="mt-2 p-3 bg-accent rounded-md flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4 text-primary" />
                          <div>
                            <p className="text-sm font-medium">{doc.file.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {formatFileSize(doc.file.size)}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(doc.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor={`notes-${doc.id}`}>Notes (Optional)</Label>
                    <Textarea
                      id={`notes-${doc.id}`}
                      value={doc.notes}
                      onChange={(e) => updateDocument(doc.id, "notes", e.target.value)}
                      placeholder="Add any additional information about this document..."
                      rows={3}
                    />
                  </div>

                  <Button
                    onClick={() => handleSubmit(doc)}
                    className="w-full"
                    disabled={!doc.file || !doc.documentName.trim()}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Submit Document
                  </Button>
                </CardContent>
              </Card>
            ))}

            <Button onClick={addDocument} variant="outline" className="w-full">
              <FileText className="h-4 w-4 mr-2" />
              Add Another Document
            </Button>
          </div>

          {/* Instructions and Examples */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-primary" />
                  <span>Upload Guidelines</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Accepted File Types:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• PDF documents (.pdf)</li>
                    <li>• Word documents (.doc, .docx)</li>
                    <li>• Images (.jpg, .jpeg, .png)</li>
                    <li>• Text files (.txt)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">File Requirements:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Maximum file size: 10MB</li>
                    <li>• Files must be clear and readable</li>
                    <li>• No password-protected files</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Common Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Property Purchase Agreement</li>
                  <li>• Financial Statements</li>
                  <li>• Bank Statements (3 months)</li>
                  <li>• Tax Returns (2 years)</li>
                  <li>• Property Appraisal</li>
                  <li>• Insurance Documents</li>
                  <li>• Business License</li>
                  <li>• Lease Agreements</li>
                  <li>• Construction Plans</li>
                  <li>• Environmental Reports</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ApplicantLayout>
  );
}