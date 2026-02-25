import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", company: "", loanAmount: "", propertyType: "", message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const sanitizeInput = (input: string) => input.trim().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async () => {
    if (isSubmitting) return;
    if (!formData.name || !formData.email || !formData.phone) {
      toast({ title: "Missing Information", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }
    if (!validateEmail(formData.email)) {
      toast({ title: "Invalid Email", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      // Store as a contact-type application
      const { error } = await supabase
        .from('loan_program_applications')
        .insert({
          application_type: 'contact',
          program_id: 'contact-form',
          program_name: 'Contact Form Inquiry',
          borrower_name: sanitizeInput(formData.name),
          borrower_email: sanitizeInput(formData.email),
          borrower_phone: sanitizeInput(formData.phone),
          loan_purpose: sanitizeInput(`Company: ${formData.company}\nLoan Amount: ${formData.loanAmount}\nProperty Type: ${formData.propertyType}\nMessage: ${formData.message}`),
        });

      if (error) {
        console.error('Error saving contact submission:', error);
        toast({ title: "Submission Failed", description: "There was an error submitting your message. Please try again.", variant: "destructive" });
        return;
      }

      // Send Telegram notification (fire-and-forget)
      supabase.functions.invoke('send-telegram-notification', {
        body: {
          applicationType: 'contact',
          borrowerName: sanitizeInput(formData.name),
          borrowerEmail: sanitizeInput(formData.email),
          borrowerPhone: sanitizeInput(formData.phone),
          programName: 'Contact Form Inquiry',
          extras: {
            Company: formData.company,
            'Loan Amount': formData.loanAmount,
            'Property Type': formData.propertyType,
            Message: formData.message,
          },
        },
      }).catch(err => console.error('⚠️ Telegram notification failed:', err));

      toast({ title: "Message Sent Successfully", description: "Thank you for contacting us. We'll respond within 24 hours." });
      setFormData({ name: "", email: "", phone: "", company: "", loanAmount: "", propertyType: "", message: "" });
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({ title: "Submission Failed", description: "There was an unexpected error. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to discuss your commercial real estate financing needs? Our experienced lending team is here to help you find the right solution.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle>Get in Touch</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-primary mt-1" />
                  <div><h3 className="font-semibold mb-1">Phone</h3><p className="text-muted-foreground">619 343 3609</p><p className="text-sm text-muted-foreground">Monday - Friday, 8 AM - 6 PM EST</p></div>
                </div>
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-primary mt-1" />
                  <div><h3 className="font-semibold mb-1">Email</h3><p className="text-muted-foreground">admin@ccif-inc.com</p><p className="text-sm text-muted-foreground">We respond within 24 hours</p></div>
                </div>
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-primary mt-1" />
                  <div><h3 className="font-semibold mb-1">Office Address</h3><p className="text-muted-foreground">600 W Broadway<br />San Diego, CA 92101</p></div>
                </div>
                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-primary mt-1" />
                  <div><h3 className="font-semibold mb-1">Business Hours</h3><p className="text-muted-foreground">Monday - Friday: 8:00 AM - 6:00 PM EST<br />Saturday: 9:00 AM - 2:00 PM EST<br />Sunday: Closed</p></div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Why Choose Us?</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-2"><div className="w-2 h-2 bg-primary rounded-full mt-2"></div><span><strong>Asset-Based Lending:</strong> Focus on property value, not credit scores</span></li>
                  <li className="flex items-start space-x-2"><div className="w-2 h-2 bg-primary rounded-full mt-2"></div><span><strong>Fast Approval:</strong> Quick decisions and streamlined process</span></li>
                  <li className="flex items-start space-x-2"><div className="w-2 h-2 bg-primary rounded-full mt-2"></div><span><strong>Flexible Terms:</strong> Customized loan structures for your needs</span></li>
                  <li className="flex items-start space-x-2"><div className="w-2 h-2 bg-primary rounded-full mt-2"></div><span><strong>100% Financing:</strong> Complete financing solutions available</span></li>
                  <li className="flex items-start space-x-2"><div className="w-2 h-2 bg-primary rounded-full mt-2"></div><span><strong>Experienced Team:</strong> Decades of commercial lending expertise</span></li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Send Us a Message</CardTitle>
              <p className="text-muted-foreground">Fill out the form below and we'll get back to you within 24 hours</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div><Label htmlFor="name">Full Name *</Label><Input id="name" value={formData.name} onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} placeholder="Enter your full name" required /></div>
                <div><Label htmlFor="email">Email Address *</Label><Input id="email" type="email" value={formData.email} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} placeholder="Enter your email" required /></div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div><Label htmlFor="phone">Phone Number *</Label><Input id="phone" type="tel" value={formData.phone} onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))} placeholder="Enter your phone number" required /></div>
                <div><Label htmlFor="company">Company (Optional)</Label><Input id="company" value={formData.company} onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))} placeholder="Enter your company name" /></div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div><Label htmlFor="loanAmount">Loan Amount Needed</Label><Input id="loanAmount" value={formData.loanAmount} onChange={(e) => setFormData(prev => ({ ...prev, loanAmount: e.target.value }))} placeholder="e.g., $1,000,000" /></div>
                <div><Label htmlFor="propertyType">Property Type</Label><Input id="propertyType" value={formData.propertyType} onChange={(e) => setFormData(prev => ({ ...prev, propertyType: e.target.value }))} placeholder="e.g., Office, Retail, Industrial" /></div>
              </div>
              <div><Label htmlFor="message">Message</Label><Textarea id="message" value={formData.message} onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))} placeholder="Tell us about your financing needs..." rows={4} /></div>
              <Button onClick={handleSubmit} className="w-full" size="lg" disabled={isSubmitting}>{isSubmitting ? 'Sending...' : 'Send Message'}</Button>
              <p className="text-xs text-muted-foreground text-center">By submitting this form, you agree to be contacted by our team regarding your inquiry.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
