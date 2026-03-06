/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'

interface SignupEmailProps {
  siteName: string
  siteUrl: string
  recipient: string
  confirmationUrl: string
  token?: string
}

export const SignupEmail = ({
  siteName,
  siteUrl,
  recipient,
  confirmationUrl,
  token,
}: SignupEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your verification code for CCIF Capital</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoSection}>
          <Img
            src="https://capital-flow-green.lovable.app/lovable-uploads/7a51105a-a80d-4bc0-8f7b-c8e5b6b783c3.png"
            width="160"
            height="auto"
            alt="CCIF Capital"
            style={logo}
          />
        </Section>
        <Heading style={h1}>Welcome to CCIF Capital</Heading>
        <Text style={text}>
          Thanks for creating your account! Use the verification code below to confirm your email address (
          <Link href={`mailto:${recipient}`} style={link}>
            {recipient}
          </Link>
          ).
        </Text>
        <Section style={codeSection}>
          <Text style={codeLabel}>Your verification code:</Text>
          <Text style={codeStyle}>{token || '------'}</Text>
        </Section>
        <Text style={expiry}>This code expires in 10 minutes.</Text>
        <Text style={footer}>
          If you didn't create an account, you can safely ignore this email.
        </Text>
        <Text style={copyright}>© CCIF Capital — Commercial Real Estate Lending</Text>
      </Container>
    </Body>
  </Html>
)
export default SignupEmail

const main = { backgroundColor: '#ffffff', fontFamily: "'Inter', 'Lora', Arial, sans-serif" }
const container = { padding: '40px 25px', maxWidth: '560px', margin: '0 auto' }
const logoSection = { textAlign: 'center' as const, marginBottom: '24px' }
const logo = { margin: '0 auto' }
const h1 = {
  fontSize: '24px',
  fontWeight: 'bold' as const,
  color: '#333136',
  margin: '0 0 20px',
  fontFamily: "'Lora', Georgia, serif",
}
const text = {
  fontSize: '15px',
  color: '#877f90',
  lineHeight: '1.6',
  margin: '0 0 28px',
}
const link = { color: '#333136', textDecoration: 'underline' }
const codeSection = {
  textAlign: 'center' as const,
  margin: '28px 0',
  padding: '24px',
  backgroundColor: '#f5f5f5',
  borderRadius: '8px',
}
const codeLabel = {
  fontSize: '13px',
  color: '#877f90',
  margin: '0 0 8px',
  textAlign: 'center' as const,
}
const codeStyle = {
  fontSize: '36px',
  fontWeight: 'bold' as const,
  letterSpacing: '8px',
  color: '#333136',
  margin: '0',
  fontFamily: "'Courier New', monospace",
  textAlign: 'center' as const,
}
const expiry = { fontSize: '13px', color: '#877f90', margin: '0 0 28px', textAlign: 'center' as const }
const footer = { fontSize: '13px', color: '#999999', margin: '32px 0 0' }
const copyright = { fontSize: '11px', color: '#bbbbbb', margin: '16px 0 0', textAlign: 'center' as const }
