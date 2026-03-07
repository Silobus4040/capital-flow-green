import { z } from 'zod';
import DOMPurify from 'dompurify';

// Input sanitization utility
export const sanitizeInput = (input: string): string => {
  // First sanitize with DOMPurify
  const cleaned = DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: []
  });

  // Additional sanitization for specific characters
  return cleaned
    .replace(/[<>\"'&]/g, (match) => {
      const map: { [key: string]: string } = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '&': '&amp;'
      };
      return map[match] || match;
    })
    .trim();
};

// Common validation schemas
export const emailSchema = z.string()
  .email('Invalid email format')
  .max(254, 'Email too long')
  .transform(val => val.toLowerCase().trim());

export const phoneSchema = z.string()
  .min(1, 'Phone number required')
  .max(20, 'Phone number too long')
  .regex(/^[\d\s\-\+\(\)\.]+$/, 'Invalid phone number format')
  .transform(sanitizeInput);

export const nameSchema = z.string()
  .min(1, 'Name required')
  .max(100, 'Name too long')
  .transform(sanitizeInput);

export const textFieldSchema = z.string()
  .max(1000, 'Text too long')
  .transform(sanitizeInput);

// Form validation schemas
export const contactFormSchema = z.object({
  fullName: nameSchema,
  email: emailSchema,
  phone: phoneSchema.optional(),
  message: textFieldSchema
});

export const loanApplicationSchema = z.object({
  borrowerName: nameSchema,
  borrowerEmail: emailSchema,
  borrowerPhone: phoneSchema,
  programName: z.string().min(1, 'Program required').max(100, 'Program name too long'),
  propertyAddress: z.string().max(200, 'Address too long').optional(),
  requestedAmount: z.number().min(1, 'Amount required').max(100000000, 'Amount too large').optional()
});

// Rate limiting utilities
interface RateLimitStore {
  [key: string]: { count: number; resetTime: number };
}

const rateLimitStore: RateLimitStore = {};

export const checkRateLimit = (
  identifier: string,
  maxAttempts: number = 5,
  windowMs: number = 15 * 60 * 1000 // 15 minutes
): boolean => {
  const now = Date.now();
  const record = rateLimitStore[identifier];

  if (!record || now > record.resetTime) {
    rateLimitStore[identifier] = { count: 1, resetTime: now + windowMs };
    return true;
  }

  if (record.count >= maxAttempts) {
    return false;
  }

  record.count++;
  return true;
};

// Security headers utility
export const getSecurityHeaders = () => ({
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https:; connect-src 'self' https: wss: data:; media-src 'self' blob: https://kkcdgwbavrpwwdwjifwe.supabase.co;",
  'Permissions-Policy': 'camera=(), geolocation=()'
});