import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { supabase } from '@/integrations/supabase/client';

async function fetchIp(): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);
    const res = await fetch('https://api.ipify.org?format=json', { signal: controller.signal });
    clearTimeout(timeout);
    const data = await res.json();
    return data.ip || null;
  } catch {
    return null;
  }
}

export async function trackLogin(userId: string) {
  try {
    const [fpResult, ipAddress] = await Promise.all([
      FingerprintJS.load().then(fp => fp.get()),
      fetchIp(),
    ]);

    await supabase.from('borrower_logins' as any).insert({
      user_id: userId,
      fingerprint_id: fpResult.visitorId,
      user_agent: navigator.userAgent,
      ip_address: ipAddress,
    });
  } catch (error) {
    console.error('Login tracking error:', error);
  }
}
