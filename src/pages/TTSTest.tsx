import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAmbientNoise } from '@/hooks/useAmbientNoise';
import { mixAmbientIntoAudio, AMBIENT_PRESETS, CUSTOM_PRESET_ID } from '@/utils/mixAmbientAudio';
import { Volume2, VolumeX, Loader2, AlertTriangle, Download, ArrowLeft, Headphones } from 'lucide-react';
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
  const [originalAudioBlob, setOriginalAudioBlob] = useState<Blob | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioLoading, setAudioLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string>('');
  const [ambientEnabled, setAmbientEnabled] = useState(true);
  const [ambientVolume, setAmbientVolume] = useState(0.08);
  const [isMixing, setIsMixing] = useState(false);
  const [isAmbientMixed, setIsAmbientMixed] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState('talking-cafe');
  const [customAudioFile, setCustomAudioFile] = useState<File | null>(null);
  
  const [ttsSettings, setTtsSettings] = useState({
    stability: 0.35,
    similarity_boost: 0.80,
    style: 0.45,
    speed: 1.0
  });

  const { toast } = useToast();
  const { startAmbience, stopAmbience } = useAmbientNoise(ambientVolume);

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
      stopAmbience();
    };
  }, [audioUrl]);

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
    setIsAmbientMixed(false);

    try {
      console.log('Requesting ElevenLabs TTS with voice:', selectedVoice);

      // Get session token for auth
      const session = await supabase.auth.getSession();
      const accessToken = session?.data?.session?.access_token;

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/elevenlabs-tts`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
            'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          },
          body: JSON.stringify({
            text: text.trim(),
            voice: selectedVoice,
            model: 'eleven_multilingual_v2',
            voice_settings: {
              stability: ttsSettings.stability,
              similarity_boost: ttsSettings.similarity_boost,
              style: ttsSettings.style,
              use_speaker_boost: true,
            },
            speed: ttsSettings.speed,
          }),
        }
      );

      if (!response.ok) {
        // Error responses are JSON
        const errData = await response.json().catch(() => ({ error: `HTTP ${response.status}` }));
        throw new Error(errData.error || `TTS failed (${response.status})`);
      }

      // Edge Function now returns raw MP3 bytes directly
      const contentType = response.headers.get('Content-Type') || '';

      if (contentType.includes('audio/')) {
        // Direct audio response (new format)
        const generatedBlob = await response.blob();

        console.log('Received raw audio blob:', {
          size: generatedBlob.size,
          type: generatedBlob.type
        });

        if (generatedBlob.size < 100) {
          throw new Error('Received audio is too small, likely empty');
        }

        // Clean up previous URL
        if (audioUrl) {
          URL.revokeObjectURL(audioUrl);
        }

        const blobUrl = URL.createObjectURL(generatedBlob);

        setAudioUrl(blobUrl);
        setAudioBlob(generatedBlob);
        setDebugInfo(`Audio ready: ${Math.round(generatedBlob.size / 1024)}KB MP3`);

        toast({
          title: 'Success',
          description: `Audio generated successfully! (${Math.round(generatedBlob.size / 1024)}KB)`
        });
      } else {
        // Fallback: JSON response with base64 (legacy format)
        const data = await response.json();
        if (data?.error) throw new Error(data.error);
        if (!data?.audioContent) throw new Error('No audio content received');

        const dataUrl = `data:audio/mpeg;base64,${data.audioContent}`;
        const blobResp = await fetch(dataUrl);
        const generatedBlob = await blobResp.blob();

        if (audioUrl) URL.revokeObjectURL(audioUrl);

        const blobUrl = URL.createObjectURL(generatedBlob);
        setAudioUrl(blobUrl);
        setAudioBlob(generatedBlob);
        setOriginalAudioBlob(generatedBlob);
        setIsAmbientMixed(false);
        setDebugInfo(`Audio ready: ${Math.round(generatedBlob.size / 1024)}KB MP3 (legacy)`);

        toast({
          title: 'Success',
          description: `Audio generated! (${Math.round(generatedBlob.size / 1024)}KB)`
        });
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
          if (ambientEnabled) startAmbience();
        },
        pause: () => {
          console.log('Audio: Paused');
          setIsPlaying(false);
          stopAmbience();
        },
        ended: () => {
          console.log('Audio: Ended');
          setIsPlaying(false);
          stopAmbience();
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
          stopAmbience();
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
    stopAmbience();
  };

  // Mix or remix ambient noise into the audio blob permanently
  const mixAmbientHandler = async () => {
    if (!originalAudioBlob) return;
    setIsMixing(true);
    try {
      const mixedBlob = await mixAmbientIntoAudio(originalAudioBlob, selectedPreset, ambientVolume, customAudioFile);
      if (audioUrl) URL.revokeObjectURL(audioUrl);
      const blobUrl = URL.createObjectURL(mixedBlob);
      setAudioBlob(mixedBlob);
      setAudioUrl(blobUrl);
      setIsAmbientMixed(true);
      setDebugInfo(`Ambient mixed! File: ${Math.round(mixedBlob.size / 1024)}KB WAV`);
      toast({ title: 'Ambient mixed', description: 'Background noise is now baked into the audio.' });
    } catch (err: any) {
      console.error('Mix ambient error:', err);
      toast({ title: 'Mix Error', description: err.message, variant: 'destructive' });
    }
    setIsMixing(false);
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

            {/* Voice Settings Sliders */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-purple-50 rounded-lg border border-purple-100">
              {/* Stability */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium text-purple-900">Stability</span>
                  <span className="text-purple-600">{Math.round(ttsSettings.stability * 100)}%</span>
                </div>
                <Slider
                  value={[ttsSettings.stability]}
                  min={0} max={1} step={0.01}
                  onValueChange={([v]) => setTtsSettings(prev => ({ ...prev, stability: v }))}
                  className="w-full"
                />
                <p className="text-[10px] text-muted-foreground">Higher = more monotonic, Lower = more emotion</p>
              </div>

              {/* Similarity Boost */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium text-purple-900">Similarity</span>
                  <span className="text-purple-600">{Math.round(ttsSettings.similarity_boost * 100)}%</span>
                </div>
                <Slider
                  value={[ttsSettings.similarity_boost]}
                  min={0} max={1} step={0.01}
                  onValueChange={([v]) => setTtsSettings(prev => ({ ...prev, similarity_boost: v }))}
                  className="w-full"
                />
                <p className="text-[10px] text-muted-foreground">Closer to original voice clone characteristics</p>
              </div>

              {/* Style Exaggeration */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium text-purple-900">Style Exaggeration</span>
                  <span className="text-purple-600">{Math.round(ttsSettings.style * 100)}%</span>
                </div>
                <Slider
                  value={[ttsSettings.style]}
                  min={0} max={1} step={0.01}
                  onValueChange={([v]) => setTtsSettings(prev => ({ ...prev, style: v }))}
                  className="w-full"
                />
                <p className="text-[10px] text-muted-foreground">High = dramatic, Low = natural</p>
              </div>

              {/* Speed */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium text-purple-900">Speed</span>
                  <span className="text-purple-600">{ttsSettings.speed}x</span>
                </div>
                <Slider
                  value={[ttsSettings.speed]}
                  min={0.5} max={2.0} step={0.05}
                  onValueChange={([v]) => setTtsSettings(prev => ({ ...prev, speed: v }))}
                  className="w-full"
                />
                <p className="text-[10px] text-muted-foreground">Playback rate for the generated audio</p>
              </div>
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
              <div className="p-4 bg-slate-50 rounded-lg border space-y-4">
                <div className="flex items-center justify-between">
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
                    <Button
                      onClick={mixAmbientHandler}
                      disabled={isMixing || (selectedPreset === CUSTOM_PRESET_ID && !customAudioFile)}
                      variant={isAmbientMixed ? 'secondary' : 'outline'}
                      size="sm"
                      className={isAmbientMixed ? 'bg-purple-100 text-purple-700 hover:bg-purple-200 border-purple-300' : ''}
                    >
                      {isMixing ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Headphones className="h-4 w-4 mr-2" />
                      )}
                      {isAmbientMixed ? 'Remix Ambient' : 'Mix Ambient'}
                    </Button>
                  </div>
                </div>

                {/* Ambient Background Noise Controls */}
                <div className="p-3 bg-purple-50 rounded-lg border border-purple-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-purple-900 flex items-center gap-2">
                      🎧 Ambient Background Noise
                    </label>
                    <label className="flex items-center gap-2 text-xs text-purple-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={ambientEnabled}
                        onChange={(e) => setAmbientEnabled(e.target.checked)}
                        className="rounded border-purple-300"
                      />
                      Enabled
                    </label>
                  </div>
                  {ambientEnabled && (
                    <div className="space-y-3">
                      {/* Preset Selector */}
                      <div className="space-y-1">
                        <label className="text-xs font-medium text-purple-700">Background Type</label>
                        <select
                          value={selectedPreset}
                          onChange={(e) => { setSelectedPreset(e.target.value); setIsAmbientMixed(false); }}
                          className="w-full text-xs border border-purple-200 rounded-lg p-2 bg-white"
                        >
                          {AMBIENT_PRESETS.map(p => (
                            <option key={p.id} value={p.id}>{p.label} — {p.description}</option>
                          ))}
                        </select>
                      </div>

                      {/* Custom Upload Input */}
                      {selectedPreset === CUSTOM_PRESET_ID && (
                        <div className="pt-1 pb-2">
                          <input
                            type="file"
                            accept="audio/mp3,audio/wav,audio/mpeg,audio/ogg"
                            onChange={(e) => { setCustomAudioFile(e.target.files?.[0] || null); setIsAmbientMixed(false); }}
                            className="w-full text-[10px] text-muted-foreground file:mr-2 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-[10px] file:font-semibold file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200"
                            disabled={isMixing}
                          />
                        </div>
                      )}

                      {/* Volume Slider */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-purple-700">
                          <span>Volume</span>
                          <span>{Math.round(ambientVolume * 100)}%</span>
                        </div>
                        <Slider
                          value={[ambientVolume]}
                          min={0.01}
                          max={0.20}
                          step={0.01}
                          onValueChange={([v]) => setAmbientVolume(v)}
                          className="w-full"
                        />
                        <div className="flex justify-between text-[9px] text-purple-500">
                          <span>Subtle</span>
                          <span>Noticeable</span>
                        </div>
                      </div>
                    </div>
                  )}
                  {isAmbientMixed && (
                    <p className="text-[10px] text-purple-600 flex items-center gap-1 font-medium">
                      <Headphones className="h-3 w-3" />
                      ✓ Mixed with: {AMBIENT_PRESETS.find(p => p.id === selectedPreset)?.label}
                    </p>
                  )}
                  <p className="text-[10px] text-purple-600">
                    Adds background ambience under TTS playback. Use "Mix Ambient" to bake it into the file.
                  </p>
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