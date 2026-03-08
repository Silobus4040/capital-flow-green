import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const TELEGRAM_MESSAGE_LIMIT = 3800;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const humanizeKey = (key: string) =>
  key
    .replace(/[_.]/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\s+/g, ' ')
    .trim();

const flattenObject = (
  value: unknown,
  prefix = '',
  output: Array<[string, string]> = []
): Array<[string, string]> => {
  if (value === null || value === undefined || value === '') {
    return output;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      const nextKey = prefix ? `${prefix}.${index + 1}` : String(index + 1);
      flattenObject(item, nextKey, output);
    });
    return output;
  }

  if (typeof value === 'object') {
    Object.entries(value as Record<string, unknown>).forEach(([key, nestedValue]) => {
      const nextKey = prefix ? `${prefix}.${key}` : key;
      flattenObject(nestedValue, nextKey, output);
    });
    return output;
  }

  output.push([prefix || 'value', String(value)]);
  return output;
};

const chunkMessage = (message: string, maxLength = TELEGRAM_MESSAGE_LIMIT) => {
  if (message.length <= maxLength) {
    return [message];
  }

  const chunks: string[] = [];
  const lines = message.split('\n');
  let currentChunk = '';

  for (const line of lines) {
    const candidate = currentChunk ? `${currentChunk}\n${line}` : line;

    if (candidate.length <= maxLength) {
      currentChunk = candidate;
      continue;
    }

    if (currentChunk) {
      chunks.push(currentChunk);
    }

    if (line.length <= maxLength) {
      currentChunk = line;
      continue;
    }

    let remaining = line;
    while (remaining.length > maxLength) {
      chunks.push(remaining.slice(0, maxLength));
      remaining = remaining.slice(maxLength);
    }
    currentChunk = remaining;
  }

  if (currentChunk) {
    chunks.push(currentChunk);
  }

  return chunks;
};

const sendTelegramChunk = async (
  token: string,
  chatId: string,
  text: string
) => {
  const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;

  const telegramResponse = await fetch(telegramUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    }),
  });

  const result = await telegramResponse.json();

  if (!telegramResponse.ok) {
    throw new Error(result?.description || 'Telegram API error');
  }

  return result;
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const TELEGRAM_BOT_TOKEN = Deno.env.get('TELEGRAM_BOT_TOKEN')?.trim();
    const TELEGRAM_CHAT_ID = Deno.env.get('TELEGRAM_CHAT_ID')?.trim();

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      return new Response(JSON.stringify({ success: false, error: 'Telegram not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const payload = await req.json();
    const {
      applicationType,
      borrowerName,
      borrowerEmail,
      borrowerPhone,
      programName,
      requestedAmount,
      propertyAddress,
      extras,
      ...otherFields
    } = payload || {};

    let header = '🆕 NEW LOAN APPLICATION';
    if (applicationType === 'contact') header = '📩 NEW CONTACT INQUIRY';
    if (applicationType === 'referral') header = '🤝 NEW REFERRAL SIGNUP';
    if (applicationType === 'document_upload') header = '📄 NEW DOCUMENT UPLOADED';
    if (applicationType === 'borrower_message') header = '💬 NEW BORROWER MESSAGE';

    const now = new Date().toLocaleString('en-US', {
      timeZone: 'America/New_York',
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    const lines: string[] = [`<b>${header}</b>`, ''];

    if (programName) lines.push(`📋 <b>Program:</b> ${escapeHtml(String(programName))}`);
    if (borrowerName) lines.push(`👤 <b>Name:</b> ${escapeHtml(String(borrowerName))}`);
    if (borrowerEmail) lines.push(`📧 <b>Email:</b> ${escapeHtml(String(borrowerEmail))}`);
    if (borrowerPhone) lines.push(`📞 <b>Phone:</b> ${escapeHtml(String(borrowerPhone))}`);
    if (requestedAmount !== undefined && requestedAmount !== null && requestedAmount !== '') {
      lines.push(`💰 <b>Amount:</b> $${Number(requestedAmount).toLocaleString()}`);
    }
    if (propertyAddress) lines.push(`📍 <b>Address:</b> ${escapeHtml(String(propertyAddress))}`);

    const mergedExtras: Record<string, unknown> = {
      ...(extras && typeof extras === 'object' ? extras : {}),
      ...(otherFields && typeof otherFields === 'object' ? otherFields : {}),
    };

    const flattenedExtras = flattenObject(mergedExtras);

    if (flattenedExtras.length > 0) {
      lines.push('', '<b>📎 Full Application Details</b>');
      flattenedExtras.forEach(([key, value]) => {
        lines.push(`• <b>${escapeHtml(humanizeKey(key))}:</b> ${escapeHtml(value)}`);
      });
    }

    lines.push('', `⏰ <b>Submitted:</b> ${escapeHtml(now)} ET`);

    const fullMessage = lines.join('\n');
    const messageChunks = chunkMessage(fullMessage);

    for (let index = 0; index < messageChunks.length; index++) {
      const prefix =
        messageChunks.length > 1
          ? `<b>Part ${index + 1}/${messageChunks.length}</b>\n`
          : '';
      await sendTelegramChunk(TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, `${prefix}${messageChunks[index]}`);
    }

    return new Response(JSON.stringify({ success: true, partsSent: messageChunks.length }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: (error as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
