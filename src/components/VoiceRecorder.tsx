import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Send, Trash2, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface VoiceRecorderProps {
  onSend: (audioBlob: Blob, duration: number) => Promise<void>;
  disabled?: boolean;
}

export default function VoiceRecorder({ onSend, disabled = false }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [duration, setDuration] = useState(0);
  const [isSending, setIsSending] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const startTimeRef = useRef<number>(0);
  const intervalRef = useRef<number | null>(null);
  const { toast } = useToast();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });
      
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      startTimeRef.current = Date.now();
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setAudioBlob(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start(100); // Collect data every 100ms
      setIsRecording(true);
      
      // Update duration every second
      intervalRef.current = window.setInterval(() => {
        setDuration(Math.floor((Date.now() - startTimeRef.current) / 1000));
      }, 1000);
      
    } catch (error) {
      console.error('Error starting recording:', error);
      toast({
        title: 'Recording Error',
        description: 'Could not access microphone. Please check permissions.',
        variant: 'destructive'
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  };

  const cancelRecording = () => {
    if (isRecording) {
      stopRecording();
    }
    setAudioBlob(null);
    setDuration(0);
  };

  const sendRecording = async () => {
    if (!audioBlob) return;
    
    setIsSending(true);
    try {
      await onSend(audioBlob, duration);
      setAudioBlob(null);
      setDuration(0);
      toast({
        title: 'Voice Message Sent',
        description: 'Your voice message has been sent successfully.'
      });
    } catch (error) {
      console.error('Error sending recording:', error);
      toast({
        title: 'Send Error',
        description: 'Failed to send voice message. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsSending(false);
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (disabled) {
    return (
      <Button variant="outline" disabled>
        <MicOff className="h-4 w-4 mr-2" />
        Voice Recording Disabled
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {!isRecording && !audioBlob && (
        <Button onClick={startRecording} variant="outline" size="sm">
          <Mic className="h-4 w-4 mr-2" />
          Record Voice
        </Button>
      )}

      {isRecording && (
        <div className="flex items-center gap-2">
          <Button onClick={stopRecording} variant="destructive" size="sm">
            <MicOff className="h-4 w-4 mr-2" />
            Stop ({formatDuration(duration)})
          </Button>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2" />
            <span className="text-sm text-muted-foreground">Recording...</span>
          </div>
        </div>
      )}

      {audioBlob && !isRecording && (
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-accent px-3 py-2 rounded-md">
            <Mic className="h-4 w-4 mr-2" />
            <span className="text-sm">Voice message ({formatDuration(duration)})</span>
          </div>
          <Button 
            onClick={sendRecording} 
            size="sm" 
            disabled={isSending}
            className="bg-primary hover:bg-primary/90"
          >
            {isSending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
          <Button onClick={cancelRecording} variant="ghost" size="sm">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}