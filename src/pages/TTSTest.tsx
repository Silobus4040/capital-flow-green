import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Volume2, VolumeX, Loader2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const voices = [
  { id: 'Aria', name: 'Aria - Natural and warm' },
  { id: 'Roger', name: 'Roger - Professional male' },
  { id: 'Sarah', name: 'Sarah - Clear and friendly' },
  { id: 'Laura', name: 'Laura - Smooth and elegant' },
  { id: 'Charlie', name: 'Charlie - Energetic male' },
  { id: 'George', name: 'George - Deep and authoritative' },
  { id: 'Callum', name: 'Callum - British accent' },
  { id: 'River', name: 'River - Calm and soothing' },
  { id: 'Liam', name: 'Liam - Young and dynamic' },
  { id: 'Charlotte', name: 'Charlotte - Professional female' }
];

export default function TTSTest() {
  const [text, setText] = useState('Welcome to CCIF Capital. We specialize in providing flexible financing solutions for your commercial real estate investments.');
  const [selectedVoice, setSelectedVoice] = useState('Aria');
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { toast } = useToast();

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
    
    try {
      const { data, error } = await supabase.functions.invoke('text-to-speech', {
        body: {
          text: text.trim(),
          voice: selectedVoice
        }
      });

      if (error) throw error;

      if (data?.audioContent) {
        // Convert base64 to blob and create URL
        const audioBlob = new Blob(
          [Uint8Array.from(atob(data.audioContent), c => c.charCodeAt(0))],
          { type: 'audio/mpeg' }
        );
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        
        toast({
          title: 'Success',
          description: 'Audio generated successfully!'
        });
      } else {
        throw new Error('No audio content received');
      }
    } catch (error: any) {
      console.error('TTS Error:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to generate speech',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const playAudio = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
      setIsPlaying(true);
      
      audio.onended = () => {
        setIsPlaying(false);
      };
      
      audio.onerror = () => {
        setIsPlaying(false);
        toast({
          title: 'Error',
          description: 'Failed to play audio',
          variant: 'destructive'
        });
      };
    }
  };

  const stopAudio = () => {
    setIsPlaying(false);
    // Note: In a full implementation, you'd keep a reference to the audio element to actually stop it
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
              Enter text below and select a voice to generate natural-sounding speech using ElevenLabs AI.
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
                maxLength={1000}
              />
              <p className="text-xs text-muted-foreground">
                {text.length}/1000 characters
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
            </div>

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
                        disabled={isPlaying}
                        variant="outline"
                        size="sm"
                      >
                        <Volume2 className="h-4 w-4 mr-2" />
                        Play
                      </Button>
                      {isPlaying && (
                        <Button 
                          onClick={stopAudio}
                          variant="outline"
                          size="sm"
                        >
                          <VolumeX className="h-4 w-4 mr-2" />
                          Stop
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {/* Native HTML5 Audio Player */}
                  <div className="mt-3">
                    <audio 
                      controls 
                      src={audioUrl} 
                      className="w-full"
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      onEnded={() => setIsPlaying(false)}
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
