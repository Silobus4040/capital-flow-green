import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Upload, FileText, CheckCircle2, X } from "lucide-react";

interface VerifiedApplicant {
  borrowerName: string;
  email: string;
  loanId: string;
  applicationId: string;
}

export default function DocumentSubmission() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [verifying, setVerifying] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [applicant, setApplicant] = useState<VerifiedApplicant | null>(null);

  const [email, setEmail] = useState("");
  const [loanId, setLoanId] = useState("");

  const [files, setFiles] = useState<File[]>([]);
  const [success, setSuccess] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setVerifying(true);
    try {
      const { data, error } = await supabase
        .from("loan_program_applications")
        .select("id, borrower_name, borrower_email, loan_id")
        .eq("borrower_email", email.trim().toLowerCase())
        .eq("loan_id", loanId.trim())
        .maybeSingle();

      if (error) throw error;
      if (!data) {
        toast({
          title: "Verification failed",
          description: "We couldn't find an application with that email and Loan ID. Please check and try again.",
          variant: "destructive",
        });
        return;
      }

      setApplicant({
        borrowerName: data.borrower_name,
        email: data.borrower_email,
        loanId: data.loan_id || loanId,
        applicationId: data.id,
      });
      toast({
        title: "Verified",
        description: `Welcome ${data.borrower_name}. You can now upload your documents.`,
      });
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Verification failed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setVerifying(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (!applicant || files.length === 0) return;
    setUploading(true);
    try {
      for (const file of files) {
        const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
        const filePath = `public/${applicant.loanId}/${Date.now()}_${safeName}`;

        const { error: uploadError } = await supabase.storage
          .from("documents")
          .upload(filePath, file, { upsert: false });

        if (uploadError) throw uploadError;

        const { error: insertError } = await supabase.from("document_uploads").insert({
          user_id: null,
          document_name: file.name,
          file_name: file.name,
          file_path: filePath,
          file_size: file.size,
          file_type: file.type,
          notes: `Loan ID: ${applicant.loanId} | Borrower: ${applicant.borrowerName} | Email: ${applicant.email}`,
        });

        if (insertError) throw insertError;
      }

      setSuccess(true);
      setFiles([]);
      toast({
        title: "Upload successful",
        description: `${files.length} document(s) submitted successfully.`,
      });
    } catch (err: any) {
      toast({
        title: "Upload failed",
        description: err.message || "Could not upload documents. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-lg border-primary/30">
          <CardHeader className="text-center">
            <CheckCircle2 className="h-16 w-16 text-primary mx-auto mb-4" />
            <CardTitle className="text-2xl">Documents Submitted</CardTitle>
            <CardDescription>
              Thank you, {applicant?.borrowerName}. Your documents for Loan ID{" "}
              <span className="font-semibold">{applicant?.loanId}</span> have been received.
              Our team will review them shortly.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full" onClick={() => setSuccess(false)}>
              Upload More Documents
            </Button>
            <Button variant="outline" className="w-full" onClick={() => navigate("/")}>
              Return Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Document Submission</h1>
          <p className="text-muted-foreground">
            Securely upload supporting documents for your loan application
          </p>
        </div>

        {!applicant ? (
          <Card>
            <CardHeader>
              <CardTitle>Verify Your Application</CardTitle>
              <CardDescription>
                Enter the email and Loan ID you received when you submitted your application.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleVerify} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="loanId">Loan ID</Label>
                  <Input
                    id="loanId"
                    required
                    value={loanId}
                    onChange={(e) => setLoanId(e.target.value)}
                    placeholder="e.g. CCIF-2025-XXXXXX"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={verifying}>
                  {verifying ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Verifying...
                    </>
                  ) : (
                    "Verify & Continue"
                  )}
                </Button>
                <p className="text-sm text-muted-foreground text-center pt-2">
                  Don't have a Loan ID yet?{" "}
                  <button
                    type="button"
                    className="text-primary underline"
                    onClick={() => navigate("/loan-programs")}
                  >
                    Apply for a loan first
                  </button>
                </p>
              </form>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Upload Documents</CardTitle>
              <CardDescription>
                <span className="block">Borrower: <span className="font-semibold text-foreground">{applicant.borrowerName}</span></span>
                <span className="block">Loan ID: <span className="font-semibold text-foreground">{applicant.loanId}</span></span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="files" className="block mb-2">Select files</Label>
                <label
                  htmlFor="files"
                  className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg p-8 cursor-pointer hover:border-primary transition"
                >
                  <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground">
                    Click to browse or drop files here
                  </span>
                  <span className="text-xs text-muted-foreground mt-1">
                    PDF, DOC, DOCX, JPG, PNG (max 20MB each)
                  </span>
                  <input
                    id="files"
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileSelect}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                </label>
              </div>

              {files.length > 0 && (
                <div className="space-y-2">
                  <Label>Selected files ({files.length})</Label>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {files.map((file, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-2 border rounded bg-muted/30"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <FileText className="h-4 w-4 text-primary shrink-0" />
                          <span className="text-sm truncate">{file.name}</span>
                          <span className="text-xs text-muted-foreground shrink-0">
                            ({(file.size / 1024).toFixed(1)} KB)
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(i)}
                          className="text-muted-foreground hover:text-destructive shrink-0"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setApplicant(null);
                    setFiles([]);
                  }}
                >
                  Back
                </Button>
                <Button
                  className="flex-1"
                  disabled={files.length === 0 || uploading}
                  onClick={handleUpload}
                >
                  {uploading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Uploading...
                    </>
                  ) : (
                    `Submit ${files.length || ""} Document${files.length === 1 ? "" : "s"}`
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
