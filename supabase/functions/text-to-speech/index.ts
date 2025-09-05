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
    const { text, voice = 'alloy', format = 'mp3' } = await req.json()

    // Input validation
    if (!text || typeof text !== 'string') {
      throw new Error('Valid text is required')
    }

    // Length validation (OpenAI has character limits)
    if (text.length > 4096) {
      throw new Error('Text too long (max 4096 characters)')
    }

    // Sanitize text input
    const sanitizedText = text.trim().replace(/[<>]/g, '')

    console.log("Processing TTS request, length:", sanitizedText.length, "format:", format, "voice:", voice)

    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY')
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY not configured')
    }

    // OpenAI TTS voices
    const validVoices = ['alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer']
    const selectedVoice = validVoices.includes(voice) ? voice : 'alloy'

    // Determine response format
    const responseFormat = format === 'wav' ? 'wav' : 'mp3'
    
    console.log("Using OpenAI voice:", selectedVoice, "format:", responseFormat)

    // Generate speech from text using OpenAI
    const response = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'tts-1',
        input: sanitizedText,
        voice: selectedVoice,
        response_format: responseFormat,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('OpenAI API error:', response.status, errorText)
      throw new Error(`OpenAI API error (${response.status}): ${errorText}`)
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