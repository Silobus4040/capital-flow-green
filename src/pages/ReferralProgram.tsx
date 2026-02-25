import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, DollarSign, Clock, Users, Award } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
  "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
  "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
  "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico",
  "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
  "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
  "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];

export default function ReferralProgram() {
  const [formData, setFormData] = useState({
    isInstitutionalBroker: "", firstName: "", lastName: "", phone: "", email: "",
    addressLine1: "", addressLine2: "", city: "", state: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const sanitizeInput = (input: string) => input.trim().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async () => {
    if (isSubmitting) return;
    
    const requiredFields = ['isInstitutionalBroker', 'firstName', 'lastName', 'phone', 'email', 'addressLine1', 'city', 'state'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast({ title: "Required Fields Missing", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }

    if (!validateEmail(formData.email)) {
      toast({ title: "Invalid Email", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);

    try {
      const fullName = sanitizeInput(`${formData.firstName} ${formData.lastName}`);
      const address = sanitizeInput(`${formData.addressLine1}${formData.addressLine2 ? ', ' + formData.addressLine2 : ''}, ${formData.city}, ${formData.state}`);
      const brokerType = formData.isInstitutionalBroker === 'yes' ? 'Institutional Broker' : 'Individual Referrer';

      // Store as referral-type application in loan_program_applications
      const { error } = await supabase
        .from('loan_program_applications')
        .insert({
          application_type: 'referral',
          program_id: 'referral-program',
          program_name: 'Referral Program Signup',
          borrower_name: fullName,
          borrower_email: sanitizeInput(formData.email),
          borrower_phone: sanitizeInput(formData.phone),
          property_address: address,
          program_specific_data: { brokerType, address },
        });

      if (error) {
        console.error('Database error:', error);
        toast({ title: "Submission Failed", description: "There was an error submitting your application. Please try again.", variant: "destructive" });
        return;
      }

      // Send Telegram notification (fire-and-forget)
      supabase.functions.invoke('send-telegram-notification', {
        body: {
          applicationType: 'referral',
          borrowerName: fullName,
          borrowerEmail: sanitizeInput(formData.email),
          borrowerPhone: sanitizeInput(formData.phone),
          programName: 'Referral Program Signup',
          extras: { 'Broker Type': brokerType, Address: address },
        },
      }).catch(err => console.error('⚠️ Telegram notification failed:', err));

      // Send email notification
      try {
        await supabase.functions.invoke('send-referral-signup', {
          body: { fullName, email: sanitizeInput(formData.email), phone: sanitizeInput(formData.phone), brokerType, address }
        });
      } catch (emailError) {
        console.error('Email error:', emailError);
      }

      setIsSubmitted(true);
      toast({ title: "Application Submitted", description: "Thank you for joining our referral program. We'll contact you soon!" });
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({ title: "Submission Failed", description: "There was an unexpected error. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen py-12 px-4 bg-accent/20">
        <div className="container mx-auto max-w-2xl">
          <Card className="text-center">
            <CardContent className="pt-8">
              <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
              <p className="text-muted-foreground">Our team will reach out shortly with your referral access details.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 bg-accent/20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Referral Program</h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-6">Empower a Borrower, Empower Yourself</h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            Commercial Capital and Investment Finance Inc. is revolutionizing the way referral programs are made. Whether you are an institutional broker or an individual looking to refer a friend or a business partner, we have the right commission structure for you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card><CardContent className="pt-6 text-center"><DollarSign className="h-12 w-12 text-primary mx-auto mb-4" /><h3 className="font-semibold mb-2">Competitive Commissions</h3><p className="text-sm text-muted-foreground">Transparent commission structure with competitive rates</p></CardContent></Card>
          <Card><CardContent className="pt-6 text-center"><Clock className="h-12 w-12 text-primary mx-auto mb-4" /><h3 className="font-semibold mb-2">Fast Updates</h3><p className="text-sm text-muted-foreground">Quick referral intake and real-time status updates</p></CardContent></Card>
          <Card><CardContent className="pt-6 text-center"><Users className="h-12 w-12 text-primary mx-auto mb-4" /><h3 className="font-semibold mb-2">Dedicated Support</h3><p className="text-sm text-muted-foreground">Personal support for brokers and individual referrers</p></CardContent></Card>
          <Card><CardContent className="pt-6 text-center"><Award className="h-12 w-12 text-primary mx-auto mb-4" /><h3 className="font-semibold mb-2">Multi-Asset Expertise</h3><p className="text-sm text-muted-foreground">Comprehensive commercial lending across all asset types</p></CardContent></Card>
        </div>

        <Card>
          <CardHeader><CardTitle>Join the Referral Network</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-base font-semibold">Are you an institutional broker? *</Label>
              <RadioGroup value={formData.isInstitutionalBroker} onValueChange={(value) => handleInputChange('isInstitutionalBroker', value)} className="flex space-x-6 mt-2">
                <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="yes" /><Label htmlFor="yes">Yes</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="no" /><Label htmlFor="no">No</Label></div>
              </RadioGroup>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div><Label htmlFor="firstName">First Name *</Label><Input id="firstName" value={formData.firstName} onChange={(e) => handleInputChange('firstName', e.target.value)} className="mt-1" required /></div>
              <div><Label htmlFor="lastName">Last Name *</Label><Input id="lastName" value={formData.lastName} onChange={(e) => handleInputChange('lastName', e.target.value)} className="mt-1" required /></div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div><Label htmlFor="phone">Phone *</Label><Input id="phone" type="tel" value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} className="mt-1" required /></div>
              <div><Label htmlFor="email">Email *</Label><Input id="email" type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} className="mt-1" required /></div>
            </div>
            <div><Label htmlFor="addressLine1">Street Address (Line 1) *</Label><Input id="addressLine1" value={formData.addressLine1} onChange={(e) => handleInputChange('addressLine1', e.target.value)} className="mt-1" required /></div>
            <div><Label htmlFor="addressLine2">Street Address (Line 2)</Label><Input id="addressLine2" value={formData.addressLine2} onChange={(e) => handleInputChange('addressLine2', e.target.value)} className="mt-1" /></div>
            <div className="grid md:grid-cols-2 gap-4">
              <div><Label htmlFor="city">City *</Label><Input id="city" value={formData.city} onChange={(e) => handleInputChange('city', e.target.value)} className="mt-1" required /></div>
              <div><Label htmlFor="state">State *</Label>
                <Select onValueChange={(value) => handleInputChange('state', value)}>
                  <SelectTrigger className="mt-1"><SelectValue placeholder="Select state" /></SelectTrigger>
                  <SelectContent>{US_STATES.map((state) => (<SelectItem key={state} value={state}>{state}</SelectItem>))}</SelectContent>
                </Select>
              </div>
            </div>
            <div className="pt-4"><Button onClick={handleSubmit} size="lg" className="w-full" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Join the Referral Network'}</Button></div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
