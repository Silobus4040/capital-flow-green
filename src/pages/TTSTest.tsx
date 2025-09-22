import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Volume2, VolumeX, Loader2, ArrowLeft, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const voices = [
  { id: 'aria', name: 'Aria - Natural and expressive' },
  { id: 'roger', name: 'Roger - Clear and professional' },
  { id: 'sarah', name: 'Sarah - Warm and friendly' },
  { id: 'laura', name: 'Laura - Smooth and articulate' },
  { id: 'charlie', name: 'Charlie - Youthful and energetic' },
  { id: 'george', name: 'George - Deep and authoritative' },
  { id: 'callum', name: 'Callum - British accent' },
  { id: 'river', name: 'River - Calm and soothing' },
  { id: 'liam', name: 'Liam - Confident and clear' },
  { id: 'charlotte', name: 'Charlotte - Elegant and refined' },
  { id: 'alice', name: 'Alice - Bright and cheerful' },
  { id: 'matilda', name: 'Matilda - Storytelling voice' }
];

export default function TTSTest() {
  const [text, setText] = useState('Welcome to CCIF Capital. We specialize in providing flexible financing solutions for your commercial real estate investments.');
  const [selectedVoice, setSelectedVoice] = useState('aria');
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioLoading, setAudioLoading] = useState(false);
  // ElevenLabs only supports MP3 format
  const [debugInfo, setDebugInfo] = useState<string>('');
  const { toast } = useToast();
  
  // Single audio element reference for proper control
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Cleanup old audio URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioUrl]);

  // Check browser MP3 support (ElevenLabs only provides MP3)
  useEffect(() => {
    const audio = document.createElement('audio');
    const supportsMp3 = audio.canPlayType('audio/mpeg') !== '';
    
    console.log('Browser MP3 support:', supportsMp3);
    setDebugInfo(`Browser supports MP3: ${supportsMp3}`);
  }, []);

  const generateSpeech = async () => {
    if (!text.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter some text to convert to speech',
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);
    setDebugInfo('Generating audio...');
    
    try {
      console.log('Requesting ElevenLabs TTS with voice:', selectedVoice);
      const { data, error } = await supabase.functions.invoke('elevenlabs-tts', {
        body: {
          text: text.trim(),
          voice: selectedVoice,
          model: 'eleven_multilingual_v2'
        }
      });

      if (error) throw error;

      if (data?.audioContent) {
        console.log('Received audio data:', {
          contentLength: data.audioContent.length,
          format: data.format,
          size: data.size
        });
        
        setDebugInfo(`Audio received: ${data.format}, ${Math.round((data.size || 0) / 1024)}KB`);
        
        // Enhanced base64 to blob conversion with robust error handling
        try {
          const base64Data = data.audioContent;
          
          // Validate base64 format
          if (!/^[A-Za-z0-9+/]*={0,2}$/.test(base64Data)) {
            throw new Error('Invalid base64 format received from API');
          }
          
          console.log('Base64 validation passed, length:', base64Data.length);
          
          // More robust base64 decoding using Uint8Array.from
          let bytes: Uint8Array;
          try {
            const binaryString = atob(base64Data);
            bytes = Uint8Array.from(binaryString, char => char.charCodeAt(0));
            console.log('Successfully decoded to bytes array, length:', bytes.length);
          } catch (decodeError) {
            console.error('Base64 decode failed:', decodeError);
            throw new Error('Failed to decode base64 audio data');
          }
          
          // Validate MP3 file signature
          if (bytes.length < 10) {
            throw new Error('Audio data too short to be valid MP3');
          }
          
          // Check for MP3 format signatures
          const hasID3 = bytes[0] === 0x49 && bytes[1] === 0x44 && bytes[2] === 0x33; // "ID3"
          const hasMPEGSync = (bytes[0] === 0xFF && (bytes[1] & 0xE0) === 0xE0); // MPEG frame sync
          
          if (!hasID3 && !hasMPEGSync) {
            console.warn('Audio data may not have valid MP3 headers', {
              firstBytes: Array.from(bytes.slice(0, 10)).map(b => '0x' + b.toString(16).padStart(2, '0')).join(' ')
            });
          }
          
          // Create audio blob with proper MIME type
          const audioBlob = new Blob([bytes], { type: 'audio/mpeg' });
          
          if (audioBlob.size === 0) {
            throw new Error('Generated audio blob is empty');
          }
          
          console.log('Created audio blob:', {
            size: audioBlob.size,
            type: audioBlob.type,
            hasValidHeaders: hasID3 || hasMPEGSync,
            expectedSize: data.size
          });
          
          // Clean up previous URL
          if (audioUrl) {
            URL.revokeObjectURL(audioUrl);
          }
          
          // Try blob URL first
          let finalUrl: string;
          try {
            finalUrl = URL.createObjectURL(audioBlob);
            console.log('Created blob URL:', finalUrl);
            
            // Quick validation test
            const testBlob = new Response(bytes).blob();
            console.log('Blob validation test passed');
            
            setAudioUrl(finalUrl);
            setDebugInfo(`Audio ready: MP3, ${Math.round(audioBlob.size / 1024)}KB, ${hasID3 ? 'ID3' : hasMPEGSync ? 'MPEG' : 'Raw'} format`);
          } catch (blobUrlError) {
            console.error('Blob URL creation failed, trying data URL:', blobUrlError);
            
            // Fallback to data URL
            finalUrl = `data:audio/mpeg;base64,${base64Data}`;
            setAudioUrl(finalUrl);
            setDebugInfo(`Audio ready (fallback): MP3 data URL, ${Math.round(bytes.length / 1024)}KB`);
          }
          
          toast({
            title: 'Success',
            description: `Audio generated successfully! (${Math.round(audioBlob.size / 1024)}KB, MP3)`
          });
          
        } catch (conversionError) {
          console.error('Audio conversion error:', conversionError);
          setDebugInfo(`Conversion failed: ${conversionError.message}`);
          
          // Last resort: try direct data URL without validation
          try {
            const dataUrl = `data:audio/mpeg;base64,${data.audioContent}`;
            setAudioUrl(dataUrl);
            setDebugInfo(`Using direct data URL as last resort`);
            
            toast({
              title: 'Audio Generated',
              description: 'Audio created using fallback method',
              variant: 'default'
            });
          } catch (fallbackError) {
            console.error('All audio creation methods failed:', fallbackError);
            throw new Error('Unable to create playable audio with any method');
          }
        }
      } else {
        throw new Error('No audio content received');
      }
    } catch (error: any) {
      console.error('TTS Error:', error);
      setDebugInfo(`Error: ${error.message}`);
      toast({
        title: 'Error',
        description: error.message || 'Failed to generate speech',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const playAudio = async () => {
    if (!audioUrl) {
      console.error('No audio URL available');
      return;
    }

    try {
      setAudioLoading(true);
      console.log('Starting audio playback for URL:', audioUrl);

      // Stop any currently playing audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      // Create new audio element
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      // Enhanced audio event handling
      audio.addEventListener('loadstart', () => {
        console.log('Audio loading started');
      });

      audio.addEventListener('loadedmetadata', () => {
        console.log('Audio metadata loaded, duration:', audio.duration);
        setAudioLoading(false);
      });

      audio.addEventListener('loadeddata', () => {
        console.log('Audio data loaded');
      });

      audio.addEventListener('canplay', () => {
        console.log('Audio can start playing');
      });

      audio.addEventListener('play', () => {
        console.log('Audio play event fired');
        setIsPlaying(true);
        setAudioLoading(false);
      });

      audio.addEventListener('pause', () => {
        console.log('Audio paused');
        setIsPlaying(false);
      });

      audio.addEventListener('ended', () => {
        console.log('Audio playback ended');
        setIsPlaying(false);
      });

      audio.addEventListener('error', (e) => {
        console.error('Audio error:', e);
        setIsPlaying(false);
        setAudioLoading(false);
        toast({
          title: 'Playback Error',
          description: 'Failed to play audio. The audio file may be corrupted.',
          variant: 'destructive'
        });
      });

      // Start playback
      await audio.play();
      console.log('Audio play() called successfully');

    } catch (error) {
      console.error('Error in playAudio:', error);
      setIsPlaying(false);
      setAudioLoading(false);
      toast({
        title: 'Playback Error',
        description: error instanceof Error ? error.message : 'Failed to play audio',
        variant: 'destructive'
      });
    }
  };

  const stopAudio = () => {
    console.log('Stopping audio playback');
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      console.log('Audio stopped and reset to beginning');
    }
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <div className="border-b bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/admin-dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div className="bg-purple-100 w-10 h-10 rounded-lg flex items-center justify-center">
                <Volume2 className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Text-to-Speech Test</h1>
                <p className="text-slate-600">Test ElevenLabs voice synthesis</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Volume2 className="h-6 w-6 mr-2 text-purple-600" />
              Text-to-Speech Generator
            </CardTitle>
            <CardDescription>
              Enter text below and select a voice to generate natural-sounding speech using ElevenLabs' premium TTS API.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Text Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Text to Convert</label>
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter the text you want to convert to speech..."
                rows={4}
                className="resize-none"
                maxLength={4096}
              />
              <p className="text-xs text-muted-foreground">
                {text.length}/4096 characters
              </p>
            </div>

            {/* Voice Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Voice</label>
              <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {voices.map((voice) => (
                    <SelectItem key={voice.id} value={voice.id}>
                      {voice.name}
                    </SelectItem>
                  ))
                  }
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                ElevenLabs provides audio in MP3 format
              </p>
            </div>

            {/* Debug Information */}
            {debugInfo && (
              <div className="p-3 bg-gray-100 rounded-lg border text-xs font-mono text-gray-600">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Debug Info:</strong> {debugInfo}
                  </div>
                </div>
              </div>
            )}

            {/* Generate Button */}
            <div className="flex flex-col space-y-4">
              <Button 
                onClick={generateSpeech} 
                disabled={loading || !text.trim()}
                size="lg"
                className="w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating Speech...
                  </>
                ) : (
                  <>
                    <Volume2 className="h-4 w-4 mr-2" />
                    Generate Speech
                  </>
                )}
              </Button>

              {/* Audio Player */}
              {audioUrl && (
                <div className="p-4 bg-slate-50 rounded-lg border">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Generated Audio</h3>
                      <p className="text-sm text-muted-foreground">Voice: {selectedVoice}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        onClick={playAudio} 
                        disabled={isPlaying || audioLoading}
                        variant="outline"
                        size="sm"
                      >
                        {audioLoading ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <Volume2 className="h-4 w-4 mr-2" />
                        )}
                        {audioLoading ? 'Loading...' : 'Play'}
                      </Button>
                      <Button 
                        onClick={stopAudio}
                        disabled={!isPlaying && !audioLoading}
                        variant="outline"
                        size="sm"
                      >
                        <VolumeX className="h-4 w-4 mr-2" />
                        Stop
                      </Button>
                    </div>
                  </div>
                  
                  {/* Native HTML5 Audio Player (Fallback) */}
                  <div className="mt-3">
                    <div className="text-xs text-muted-foreground mb-2">
                      Fallback HTML5 Player (use buttons above for better experience):
                    </div>
                    <audio 
                      controls 
                      src={audioUrl} 
                      className="w-full"
                      onLoadStart={() => console.log('HTML5 audio: loadstart')}
                      onLoadedMetadata={(e) => console.log('HTML5 audio: metadata loaded, duration:', e.currentTarget.duration)}
                      onPlay={() => {
                        console.log('HTML5 audio: play event');
                        setIsPlaying(true);
                      }}
                      onPause={() => {
                        console.log('HTML5 audio: pause event');
                        setIsPlaying(false);
                      }}
                      onEnded={() => {
                        console.log('HTML5 audio: ended event');
                        setIsPlaying(false);
                      }}
                       onError={(e) => {
                        const error = e.currentTarget.error;
                        const errorCodes = {
                          1: 'MEDIA_ERR_ABORTED - Audio loading was aborted',
                          2: 'MEDIA_ERR_NETWORK - Network error occurred',
                          3: 'MEDIA_ERR_DECODE - Audio decoding failed',
                          4: 'MEDIA_ERR_SRC_NOT_SUPPORTED - Audio format not supported'
                        };
                        
                        const errorMessage = error ? errorCodes[error.code as keyof typeof errorCodes] || `Unknown error (code: ${error.code})` : 'Unknown audio error';
                        
                        console.error('HTML5 audio error details:', {
                          code: error?.code,
                          message: error?.message,
                          src: e.currentTarget.src,
                          readyState: e.currentTarget.readyState,
                          networkState: e.currentTarget.networkState
                        });
                        
                        setDebugInfo(`HTML5 Audio Error: ${errorMessage}`);
                        toast({
                          title: 'Audio Error',
                          description: errorMessage,
                          variant: 'destructive'
                        });
                      }}
                    >
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                </div>
              )}
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-medium text-blue-900 mb-2">How to Use</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Enter your text in the textarea above (max 1000 characters)</li>
                <li>• Select your preferred voice from the dropdown</li>
                <li>• Click "Generate Speech" to create the audio</li>
                <li>• Use the audio player to listen to the generated speech</li>
                <li>• Try different voices to find the best fit for your needs</li>
              </ul>
            </div>

            {/* Voice Examples */}
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h3 className="font-medium text-purple-900 mb-2">Voice Recommendations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-purple-800">
                <div>
                  <strong>For Professional Content:</strong>
                  <p>Roger, Sarah, Charlotte</p>
                </div>
                <div>
                  <strong>For Friendly Communication:</strong>
                  <p>Aria, Laura, River</p>
                </div>
                <div>
                  <strong>For Authoritative Content:</strong>
                  <p>George, Callum</p>
                </div>
                <div>
                  <strong>For Dynamic Presentations:</strong>
                  <p>Charlie, Liam</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
