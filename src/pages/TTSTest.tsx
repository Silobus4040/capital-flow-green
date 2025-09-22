import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Volume2, VolumeX, Loader2, AlertTriangle, Download, ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
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
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioLoading, setAudioLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string>('');
  const { toast } = useToast();
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Cleanup function
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

  // Simplified and reliable base64 to blob conversion
  const createAudioBlob = (base64Data: string): Blob | null => {
    try {
      console.log('Converting base64 to blob, length:', base64Data.length);
      
      // Simple base64 validation
      if (!base64Data || base64Data.length < 100) {
        throw new Error('Base64 data is too short or empty');
      }
      
      // Convert base64 to binary string
      const binaryString = atob(base64Data);
      
      // Convert to Uint8Array
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      
      console.log('Successfully converted to binary, size:', bytes.length, 'bytes');
      
      // Create blob with proper MIME type
      const blob = new Blob([bytes], { type: 'audio/mpeg' });
      
      console.log('Created blob successfully:', { size: blob.size, type: blob.type });
      return blob;
        
    } catch (error) {
      console.error('Blob creation failed:', error);
      
      // Fallback: try creating blob directly from base64
      try {
        console.log('Trying fallback blob creation method...');
        const binaryString = atob(base64Data);
        const blob = new Blob([binaryString], { type: 'audio/mpeg' });
        console.log('Fallback blob created successfully:', { size: blob.size });
        return blob;
      } catch (fallbackError) {
        console.error('Fallback blob creation also failed:', fallbackError);
        return null;
      }
    }
  };

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
        console.log('Received audio data from API:', {
          contentLength: data.audioContent.length,
          format: data.format,
          size: data.size
        });
        
        setDebugInfo(`Processing audio: ${data.format}, ${Math.round((data.size || 0) / 1024)}KB`);
        
        // Create audio blob
        const audioBlob = createAudioBlob(data.audioContent);
        
        if (!audioBlob) {
          throw new Error('Failed to create audio blob');
        }
        
        console.log('Audio blob created successfully:', {
          size: audioBlob.size,
          type: audioBlob.type
        });
        
        // Clean up previous URL
        if (audioUrl) {
          URL.revokeObjectURL(audioUrl);
        }
        
        // Create blob URL directly without pre-testing
        const blobUrl = URL.createObjectURL(audioBlob);
        
        // Set audio immediately
        setAudioUrl(blobUrl);
        setAudioBlob(audioBlob);
        setDebugInfo(`Audio ready: ${Math.round(audioBlob.size / 1024)}KB MP3`);
        
        toast({
          title: 'Success',
          description: `Audio generated successfully! (${Math.round(audioBlob.size / 1024)}KB)`
        });
        
      } else {
        throw new Error('No audio content received from API');
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
      toast({
        title: 'Error',
        description: 'No audio available to play',
        variant: 'destructive'
      });
      return;
    }

    try {
      setAudioLoading(true);
      console.log('Starting audio playback');

      // Stop any currently playing audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      // Create new audio element with enhanced error handling
      const audio = new Audio();
      audioRef.current = audio;

      // Set up comprehensive event listeners
      const eventListeners = {
        loadstart: () => console.log('Audio: Load started'),
        loadedmetadata: () => {
          console.log('Audio: Metadata loaded, duration:', audio.duration);
          setAudioLoading(false);
        },
        canplay: () => console.log('Audio: Can start playing'),
        canplaythrough: () => console.log('Audio: Can play through'),
        play: () => {
          console.log('Audio: Playing');
          setIsPlaying(true);
          setAudioLoading(false);
        },
        pause: () => {
          console.log('Audio: Paused');
          setIsPlaying(false);
        },
        ended: () => {
          console.log('Audio: Ended');
          setIsPlaying(false);
        },
        error: (e: Event) => {
          const target = e.target as HTMLAudioElement;
          const error = target.error;
          
          const errorMessages = {
            1: 'MEDIA_ERR_ABORTED - Playback aborted',
            2: 'MEDIA_ERR_NETWORK - Network error',
            3: 'MEDIA_ERR_DECODE - Decoding error',
            4: 'MEDIA_ERR_SRC_NOT_SUPPORTED - Format not supported'
          };
          
          const errorMsg = error ? 
            errorMessages[error.code as keyof typeof errorMessages] || `Error code ${error.code}` : 
            'Unknown error';
            
          console.error('Audio playback error:', errorMsg, {
            code: error?.code,
            message: error?.message,
            networkState: target.networkState,
            readyState: target.readyState,
            src: target.src.substring(0, 100) + '...'
          });
          
          setIsPlaying(false);
          setAudioLoading(false);
          setDebugInfo(`Playback error: ${errorMsg}`);
          
          toast({
            title: 'Playback Error',
            description: errorMsg,
            variant: 'destructive'
          });
        }
      };

      // Add all event listeners
      Object.entries(eventListeners).forEach(([event, handler]) => {
        audio.addEventListener(event, handler as EventListener);
      });

      // Set source and attempt to play
      audio.src = audioUrl;
      
      try {
        await audio.play();
        console.log('Audio playback started successfully');
      } catch (playError) {
        console.error('Play method failed:', playError);
        throw playError;
      }

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
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
  };

  const downloadAudio = () => {
    if (!audioBlob) {
      toast({
        title: 'Error',
        description: 'No audio available to download',
        variant: 'destructive'
      });
      return;
    }

    try {
      const url = URL.createObjectURL(audioBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `tts-${selectedVoice}-${Date.now()}.mp3`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: 'Success',
        description: 'Audio downloaded successfully',
      });
    } catch (error) {
      console.error('Download failed:', error);
      toast({
        title: 'Error',
        description: 'Failed to download audio',
        variant: 'destructive'
      });
    }
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
                <p className="text-slate-600">Test ElevenLabs voice synthesis with enhanced debugging</p>
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
              Enhanced TTS Generator
            </CardTitle>
            <CardDescription>
              Generate high-quality speech with robust audio processing and debugging
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
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Debug Information */}
            {debugInfo && (
              <div className="p-3 bg-gray-100 rounded-lg border">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0 text-yellow-600" />
                  <div className="text-xs font-mono text-gray-700">
                    <strong>Debug:</strong> {debugInfo}
                  </div>
                </div>
              </div>
            )}

            {/* Generate Button */}
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

            {/* Audio Controls */}
            {audioUrl && (
              <div className="p-4 bg-slate-50 rounded-lg border">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-medium">Generated Audio</h3>
                    <p className="text-sm text-muted-foreground">Voice: {selectedVoice}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      onClick={playAudio} 
                      disabled={isPlaying || audioLoading}
                      variant="default"
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
                      disabled={!isPlaying}
                      variant="outline"
                      size="sm"
                    >
                      <VolumeX className="h-4 w-4 mr-2" />
                      Stop
                    </Button>
                    <Button 
                      onClick={downloadAudio}
                      variant="outline"
                      size="sm"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
                
                {/* Native HTML5 Audio Player for testing */}
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">HTML5 Audio Player (for testing):</p>
                  <audio 
                    controls 
                    src={audioUrl} 
                    className="w-full"
                    onError={(e) => {
                      const target = e.currentTarget;
                      const error = target.error;
                      console.error('HTML5 Audio Error:', {
                        code: error?.code,
                        message: error?.message,
                        networkState: target.networkState,
                        readyState: target.readyState
                      });
                    }}
                  />
                </div>
              </div>
            )}

            {/* Troubleshooting Guide */}
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h3 className="font-medium text-yellow-900 mb-2">Troubleshooting Tips</h3>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• Check browser console for detailed error messages</li>
                <li>• Try different voices if one doesn't work</li>
                <li>• Use the download button to verify audio file integrity</li>
                <li>• Test with the HTML5 player if custom controls fail</li>
                <li>• Ensure stable internet connection for API calls</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}