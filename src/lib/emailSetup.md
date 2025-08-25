# EmailJS Setup Instructions

To receive form submissions via email, you need to configure EmailJS:

## Step 1: Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Sign up for a free account
3. Connect your Gmail account

## Step 2: Create Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Select Gmail and connect your account
4. Name it "service_contact"

## Step 3: Create Email Templates
Create these templates with these IDs:

### Template 1: "template_contact" (Contact Form)
**Subject:** New Contact Form Submission
**Content:**
```
New contact form submission from {{from_name}}

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}

Message:
{{message}}
```

### Template 2: "template_application" (Loan Application)
**Subject:** {{subject}}
**Content:**
```
New loan application request from {{from_name}}

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Program: {{program_name}}
```

### Template 3: "template_referral" (Referral Signup)
**Subject:** New Referral Program Signup
**Content:**
```
New referral program signup from {{from_name}}

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Type: {{broker_type}}
Address: {{address}}
```

## Step 4: Get Your Public Key
1. Go to "Account" in EmailJS dashboard
2. Copy your Public Key
3. Replace "user_public_key" in the code with your actual public key

## Step 5: Update Code
Replace "user_public_key" in all three files with your actual EmailJS public key.

All form submissions will now be sent to sundrycapitalsolutions@gmail.com automatically!