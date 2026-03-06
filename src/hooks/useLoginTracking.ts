import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { supabase } from '@/integrations/supabase/client';

export async function trackLogin(userId: string) {
  try {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    
    await supabase.from('borrower_logins' as any).insert({
      user_id: userId,
      fingerprint_id: result.visitorId,
      user_agent: navigator.userAgent,
    });
  } catch (error) {
    console.error('Login tracking error:', error);
  }
}
