import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
}

const ELEVENLABS_VOICES: Record<string, string> = {
  'roger': 'CwhRBWXzGAHq8TQ4Fs17',
  'sarah': 'EXAVITQu4vr4xnSDxMaL',
  'laura': 'FGY2WhTYpPnrIDTdsKH5',
  'charlie': 'IKne3meq5aSn9XLyUdCD',
  'george': 'JBFqnCBsd6RMkjVDRZzb',
  'callum': 'N2lVS1w4EtoT3dr4eOWO',
  'river': 'SAz9YHcvj6GT2YYXdXww',
  'liam': 'TX3LPaxmHKxFdv7VOQHJ',
  'alice': 'Xb7hH8MSUJpSbSDYk0k2',
  'matilda': 'XrExE9yKIg1WjnnlVkGX',
  'will': 'bIHbv24MWmeRgasZH58o',
  'jessica': 'cgSgspJ2msm6clMCkdW9',
  'eric': 'cjVigY5qzO86Huf0OWal',
  'chris': 'iP95p4xoKVk53GoZ742B',
  'brian': 'nPczCjzI2devNBz1zQrb',
  'daniel': 'onwK4e9ZLuTAKqWW03F9',
  'lily': 'pFZP5JQG7iQjIQuC4Bku',
  'bill': 'pqHfZKP75CvOlQylNhV4',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const body = await req.json()
    const { text, voice = 'george', model = 'eleven_v3' } = body

    // Accept optional client-supplied voice_settings for emotion control
    const clientSettings = body.voice_settings || {}
    const voiceSettings = {
      stability: clientSettings.stability ?? 0.35,
      similarity_boost: clientSettings.similarity_boost ?? 0.80,
      style: clientSettings.style ?? 0.45,
      use_speaker_boost: clientSettings.use_speaker_boost ?? true,
    }
    const speed = body.speed ?? 1.0

    if (!text || typeof text !== 'string') {
      throw new Error('Valid text is required')
    }

    if (text.length > 5000) {
      throw new Error('Text too long (max 5000 characters)')
    }

    const sanitizedText = text.trim().replace(/[<>]/g, '')

    console.log("Processing ElevenLabs TTS request:", {
      length: sanitizedText.length,
      voice,
      model,
      voiceSettings,
      speed,
    })

    const ELEVENLABS_API_KEY = Deno.env.get('ELEVENLABS_API_KEY')
    if (!ELEVENLABS_API_KEY) {
      throw new Error('ELEVENLABS_API_KEY not configured')
    }

    const voiceId = ELEVENLABS_VOICES[voice.toLowerCase()] || voice

    console.log("Using ElevenLabs voice ID:", voiceId, "model:", model)

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`,
      {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'xi-api-key': ELEVENLABS_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: sanitizedText,
          model_id: model,
          voice_settings: voiceSettings,
          ...(speed !== 1.0 ? { speed } : {}),
        }),
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error('ElevenLabs API error:', response.status, errorText)
      throw new Error(`ElevenLabs API error (${response.status}): ${errorText}`)
    }

    const audioBytes = await response.arrayBuffer()

    if (audioBytes.byteLength === 0) {
      throw new Error('Received empty audio data from ElevenLabs')
    }

    console.log("Audio size:", audioBytes.byteLength, "bytes — returning raw MP3")

    // Return raw MP3 bytes directly — no base64 encoding needed
    // This eliminates the base64 encode/decode chain that was causing corruption
    return new Response(audioBytes, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioBytes.byteLength.toString(),
        'X-Audio-Voice': voice,
        'X-Audio-Model': model,
      },
    })
  } catch (error: any) {
    console.error('Error in elevenlabs-tts function:', error)

    const userMessage = error.message?.includes('Text too long')
      ? error.message
      : error.message?.includes('ElevenLabs API error')
        ? error.message
        : 'Text-to-speech service temporarily unavailable'

    return new Response(
      JSON.stringify({ error: userMessage }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    )
  }
})
