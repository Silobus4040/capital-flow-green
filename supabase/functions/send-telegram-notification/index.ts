import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const TELEGRAM_BOT_TOKEN = Deno.env.get('TELEGRAM_BOT_TOKEN');
    const TELEGRAM_CHAT_ID = Deno.env.get('TELEGRAM_CHAT_ID');

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error('Missing Telegram configuration');
      return new Response(JSON.stringify({ success: false, error: 'Telegram not configured' }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { applicationType, borrowerName, borrowerEmail, borrowerPhone, programName, requestedAmount, propertyAddress, extras } = await req.json();

    // Build message based on type
    let header = '🆕 NEW LOAN APPLICATION';
    if (applicationType === 'contact') header = '📩 NEW CONTACT INQUIRY';
    if (applicationType === 'referral') header = '🤝 NEW REFERRAL SIGNUP';

    const now = new Date().toLocaleString('en-US', { timeZone: 'America/New_York', dateStyle: 'medium', timeStyle: 'short' });

    let message = `<b>${header}</b>\n\n`;
    if (programName) message += `📋 <b>Program:</b> ${programName}\n`;
    message += `👤 <b>Name:</b> ${borrowerName}\n`;
    message += `📧 <b>Email:</b> ${borrowerEmail}\n`;
    message += `📞 <b>Phone:</b> ${borrowerPhone}\n`;
    if (requestedAmount) message += `💰 <b>Amount:</b> $${Number(requestedAmount).toLocaleString()}\n`;
    if (propertyAddress) message += `📍 <b>Address:</b> ${propertyAddress}\n`;

    // Add extras
    if (extras && typeof extras === 'object') {
      for (const [key, value] of Object.entries(extras)) {
        if (value) message += `ℹ️ <b>${key}:</b> ${value}\n`;
      }
    }

    message += `\n⏰ <b>Submitted:</b> ${now} ET`;

    // Send to Telegram
    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const telegramResponse = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    const result = await telegramResponse.json();

    if (!telegramResponse.ok) {
      console.error('Telegram API error:', result);
      return new Response(JSON.stringify({ success: false, error: result.description }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error sending Telegram notification:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
