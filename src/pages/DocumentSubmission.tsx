import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Upload, X, FileText } from "lucide-react";

interface FileUpload {
  id: string;
  file: File | null;
  name: string;
}

export default function DocumentSubmission() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState<FileUpload[]>([
    { id: "1", file: null, name: "Document 1" },
    { id: "2", file: null, name: "Document 2" },
    { id: "3", file: null, name: "Document 3" },
    { id: "4", file: null, name: "Document 4" },
    { id: "5", file: null, name: "Document 5" },
    { id: "6", file: null, name: "Document 6" },
    { id: "7", file: null, name: "Document 7" },
  ]);
  const { toast } = useToast();

  const acceptedFileTypes = ".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg";
  const maxFileSize = 25 * 1024 * 1024; // 25MB per file

  const handleFileChange = (index: number, file: File | null) => {
    if (file && file.size > maxFileSize) {
      toast({
        title: "File Too Large",
        description: "Please select a file smaller than 25MB.",
        variant: "destructive",
      });
      return;
    }

    const updatedFiles = [...files];
    updatedFiles[index].file = file;
    setFiles(updatedFiles);
  };

  const removeFile = (index: number) => {
    const updatedFiles = [...files];
    updatedFiles[index].file = null;
    setFiles(updatedFiles);
  };

  const handleSubmit = () => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address before submitting.",
        variant: "destructive",
      });
      return;
    }

    const attachedFiles = files.filter(f => f.file !== null);
    if (attachedFiles.length === 0) {
      toast({
        title: "No Documents Attached",
        description: "Please attach at least one document before submitting.",
        variant: "destructive",
      });
      return;
    }

    // Here you would handle the actual file upload
    console.log("Document Submission:", {
      email,
      message,
      files: attachedFiles.map(f => ({ name: f.file?.name, size: f.file?.size })),
      timestamp: new Date().toISOString()
    });

    toast({
      title: "Documents Submitted Successfully",
      description: `${attachedFiles.length} document(s) have been submitted for review.`,
    });

    // Reset form
    setEmail("");
    setMessage("");
    setFiles(files.map(f => ({ ...f, file: null })));
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
            Submit your loan application and supporting documents securely through our portal. 
            You can upload up to 7 documents with a maximum file size of 25MB each.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Document Submission Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <p className="mb-4">
                Please use this secure portal to submit your loan application and all supporting documentation. 
                Our team will review your submission and contact you within 24-48 hours.
              </p>
              
              <h4 className="font-semibold mb-2">Commonly Required Documents:</h4>
              <ul className="list-disc list-inside space-y-1 mb-4">
                <li>Completed loan application</li>
                <li>Property appraisal or valuation</li>
                <li>Financial statements (personal and/or business)</li>
                <li>Tax returns (last 2 years)</li>
                <li>Property operating statements</li>
                <li>Rent rolls (for income-producing properties)</li>
                <li>Insurance declarations</li>
                <li>Purchase agreement or contract</li>
                <li>Environmental reports (if applicable)</li>
                <li>Construction plans and budgets (for development loans)</li>
              </ul>

              <h4 className="font-semibold mb-2">File Requirements:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Accepted formats: PDF, Word (.doc, .docx), Excel (.xls, .xlsx), Images (.png, .jpg, .jpeg)</li>
                <li>Maximum file size: 25MB per document</li>
                <li>Maximum 7 documents per submission</li>
                <li>Files should be clearly named and organized</li>
              </ul>
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
              <Label htmlFor="message">Additional Message (Optional)</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Add any additional notes or context about your submission..."
                className="mt-1"
                rows={3}
              />
            </div>

            <div>
              <Label className="text-base font-semibold">Document Upload</Label>
              <p className="text-sm text-muted-foreground mb-4">
                Upload up to 7 documents. Accepted formats: PDF, Word, Excel, Images
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                {files.map((fileSlot, index) => (
                  <div key={fileSlot.id} className="border-2 border-dashed border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-sm font-medium">{fileSlot.name}</Label>
                      {fileSlot.file && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                          className="h-6 w-6 p-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    
                    {fileSlot.file ? (
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{fileSlot.file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatFileSize(fileSlot.file.size)}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <Input
                          type="file"
                          accept={acceptedFileTypes}
                          onChange={(e) => handleFileChange(index, e.target.files?.[0] || null)}
                          className="hidden"
                          id={`file-${index}`}
                        />
                        <Label
                          htmlFor={`file-${index}`}
                          className="cursor-pointer text-sm text-primary hover:text-primary-dark"
                        >
                          Click to upload file
                        </Label>
                        <p className="text-xs text-muted-foreground mt-1">Max 25MB</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <Button onClick={handleSubmit} size="lg" className="w-full">
                Submit Documents
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-2">
                By submitting, you confirm that all information is accurate and complete.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}