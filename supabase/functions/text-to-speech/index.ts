import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { text, voice = 'Aria', format = 'wav' } = await req.json()

    // Input validation
    if (!text || typeof text !== 'string') {
      throw new Error('Valid text is required')
    }

    // Length validation (ElevenLabs has character limits)
    if (text.length > 5000) {
      throw new Error('Text too long (max 5000 characters)')
    }

    // Sanitize text input
    const sanitizedText = text.trim().replace(/[<>]/g, '')

    console.log("Processing TTS request, length:", sanitizedText.length, "format:", format)

    const ELEVENLABS_API_KEY = Deno.env.get('ELEVENLABS_API_KEY')
    if (!ELEVENLABS_API_KEY) {
      throw new Error('ELEVENLABS_API_KEY not configured')
    }

    // Map voice names to ElevenLabs voice IDs
    const voiceMap: { [key: string]: string } = {
      'Aria': '9BWtsMINqrJLrRacOk9x',
      'Roger': 'CwhRBWXzGAHq8TQ4Fs17',
      'Sarah': 'EXAVITQu4vr4xnSDxMaL',
      'Laura': 'FGY2WhTYpPnrIDTdsKH5',
      'Charlie': 'IKne3meq5aSn9XLyUdCD',
      'George': 'JBFqnCBsd6RMkjVDRZzb',
      'Callum': 'N2lVS1w4EtoT3dr4eOWO',
      'River': 'SAz9YHcvj6GT2YYXdXww',
      'Liam': 'TX3LPaxmHKxFdv7VOQHJ',
      'Charlotte': 'XB0fDUnXU5powFXDhCwa',
      'Alice': 'Xb7hH8MSUJpSbSDYk0k2',
      'Matilda': 'XrExE9yKIg1WjnnlVkGX',
      'Will': 'bIHbv24MWmeRgasZH58o',
      'Jessica': 'cgSgspJ2msm6clMCkdW9',
      'Eric': 'cjVigY5qzO86Huf0OWal',
      'Chris': 'iP95p4xoKVk53GoZ742B',
      'Brian': 'nPczCjzI2devNBz1zQrb',
      'Daniel': 'onwK4e9ZLuTAKqWW03F9',
      'Lily': 'pFZP5JQG7iQjIQuC4Bku',
      'Bill': 'pqHfZKP75CvOlQylNhV4'
    }

    const voiceId = voiceMap[voice] || voiceMap['Aria']

    // Determine output format and content type
    const outputFormat = format === 'wav' ? 'wav' : 'mp3_44100_128'
    const contentType = format === 'wav' ? 'audio/wav' : 'audio/mpeg'
    
    console.log("Using voice ID:", voiceId, "output format:", outputFormat)

    // Generate speech from text using ElevenLabs
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Accept': contentType,
        'Content-Type': 'application/json',
        'xi-api-key': ELEVENLABS_API_KEY,
      },
      body: JSON.stringify({
        text: sanitizedText,
        model_id: 'eleven_multilingual_v2',
        output_format: outputFormat,
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

    // Convert audio buffer to base64 in chunks to prevent stack overflow
    const arrayBuffer = await response.arrayBuffer()
    const uint8Array = new Uint8Array(arrayBuffer)
    
    // Process in chunks to avoid "Maximum call stack size exceeded"
    const chunkSize = 8192
    let binary = ''
    
    for (let i = 0; i < uint8Array.length; i += chunkSize) {
      const chunk = uint8Array.subarray(i, Math.min(i + chunkSize, uint8Array.length))
      binary += String.fromCharCode.apply(null, Array.from(chunk))
    }
    
    const base64Audio = btoa(binary)

    console.log("Successfully generated audio, size:", arrayBuffer.byteLength, "bytes")

    return new Response(
      JSON.stringify({ 
        audioContent: base64Audio, 
        format: format,
        size: arrayBuffer.byteLength 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  } catch (error: any) {
    console.error('Error in text-to-speech function:', error)
    
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