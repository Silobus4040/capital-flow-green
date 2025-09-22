import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const ELEVENLABS_VOICES = {
  'aria': '9BWtsMINqrJLrRacOk9x',
  'roger': 'CwhRBWXzGAHq8TQ4Fs17',
  'sarah': 'EXAVITQu4vr4xnSDxMaL',
  'laura': 'FGY2WhTYpPnrIDTdsKH5',
  'charlie': 'IKne3meq5aSn9XLyUdCD',
  'george': 'JBFqnCBsd6RMkjVDRZzb',
  'callum': 'N2lVS1w4EtoT3dr4eOWO',
  'river': 'SAz9YHcvj6GT2YYXdXww',
  'liam': 'TX3LPaxmHKxFdv7VOQHJ',
  'charlotte': 'XB0fDUnXU5powFXDhCwa',
  'alice': 'Xb7hH8MSUJpSbSDYk0k2',
  'matilda': 'XrExE9yKIg1WjnnlVkGX',
  'will': 'bIHbv24MWmeRgasZH58o',
  'jessica': 'cgSgspJ2msm6clMCkdW9',
  'eric': 'cjVigY5qzO86Huf0OWal',
  'chris': 'iP95p4xoKVk53GoZ742B',
  'brian': 'nPczCjzI2devNBz1zQrb',
  'daniel': 'onwK4e9ZLuTAKqWW03F9',
  'lily': 'pFZP5JQG7iQjIQuC4Bku',
  'bill': 'pqHfZKP75CvOlQylNhV4'
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { text, voice = 'aria', model = 'eleven_multilingual_v2' } = await req.json()

    // Input validation
    if (!text || typeof text !== 'string') {
      throw new Error('Valid text is required')
    }

    // Length validation
    if (text.length > 5000) {
      throw new Error('Text too long (max 5000 characters)')
    }

    // Sanitize text input
    const sanitizedText = text.trim().replace(/[<>]/g, '')

    console.log("Processing ElevenLabs TTS request:", {
      length: sanitizedText.length,
      voice: voice,
      model: model
    })

    const ELEVENLABS_API_KEY = Deno.env.get('ELEVENLABS_API_KEY')
    if (!ELEVENLABS_API_KEY) {
      throw new Error('ELEVENLABS_API_KEY not configured')
    }

    // Get voice ID from our mapping or use the provided voice directly
    const voiceId = ELEVENLABS_VOICES[voice.toLowerCase() as keyof typeof ELEVENLABS_VOICES] || voice

    console.log("Using ElevenLabs voice ID:", voiceId, "model:", model)

    // Generate speech using ElevenLabs API
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'xi-api-key': ELEVENLABS_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: sanitizedText,
        model_id: model,
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5,
          style: 0.0,
          use_speaker_boost: true
        }
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('ElevenLabs API error:', response.status, errorText)
      throw new Error(`ElevenLabs API error (${response.status}): ${errorText}`)
    }

    // Convert audio buffer to base64 using chunked method to prevent call stack overflow
    const arrayBuffer = await response.arrayBuffer()
    const uint8Array = new Uint8Array(arrayBuffer)
    
    // Validate audio size
    if (arrayBuffer.byteLength === 0) {
      throw new Error('Received empty audio data from ElevenLabs')
    }
    
    console.log("Converting to base64, audio size:", arrayBuffer.byteLength, "bytes")
    
    // Use chunked base64 conversion to prevent "Maximum call stack size exceeded"
    const chunkSize = 8192; // Process in 8KB chunks
    let binaryString = '';
    
    for (let i = 0; i < uint8Array.length; i += chunkSize) {
      const chunk = uint8Array.slice(i, i + chunkSize);
      binaryString += String.fromCharCode.apply(null, Array.from(chunk));
    }
    
    const base64Audio = btoa(binaryString);

    console.log("Successfully generated ElevenLabs audio, size:", arrayBuffer.byteLength, "bytes")

    return new Response(
      JSON.stringify({ 
        audioContent: base64Audio, 
        format: 'mp3',
        size: arrayBuffer.byteLength,
        voice: voice,
        model: model
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  } catch (error: any) {
    console.error('Error in elevenlabs-tts function:', error)
    
    // Don't expose internal error details to client
    const userMessage = error.message?.includes('Text too long') ? error.message : 'Text-to-speech service temporarily unavailable'
    
    return new Response(
      JSON.stringify({ error: userMessage }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    )
  }
})