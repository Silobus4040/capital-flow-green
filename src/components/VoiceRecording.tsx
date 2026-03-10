import React, { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Mic, MicOff, Send } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface VoiceRecordingProps {
  onRecordingComplete: (audioBlob: Blob, duration: number) => void;
  onSendRecording: (audioBlob: Blob, duration: number) => Promise<void>;
  disabled?: boolean;
}

export default function VoiceRecording({ onRecordingComplete, onSendRecording, disabled }: VoiceRecordingProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState<Blob | null>(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [isSending, setIsSending] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const startTimeRef = useRef<number>(0);
  const durationIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  
  const { toast } = useToast();

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });
      
      streamRef.current = stream;
      
      // Use webm format with opus codec for better compression and quality
      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus') 
        ? 'audio/webm;codecs=opus' 
        : 'audio/webm';
        
      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
        const duration = Math.round((Date.now() - startTimeRef.current) / 1000);
        
        setRecordedAudio(audioBlob);
        setRecordingDuration(duration);
        onRecordingComplete(audioBlob, duration);
        
        // Clean up stream
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
          streamRef.current = null;
        }
      };
      
      mediaRecorder.start(250); // Record in 250ms chunks
      setIsRecording(true);
      startTimeRef.current = Date.now();
      
      // Update duration display every second
      durationIntervalRef.current = setInterval(() => {
        const elapsed = Math.round((Date.now() - startTimeRef.current) / 1000);
        setRecordingDuration(elapsed);
      }, 1000);
      
    } catch (error) {
      console.error('Error starting recording:', error);
      toast({
        title: 'Recording Failed',
        description: 'Unable to access microphone. Please check permissions.',
        variant: 'destructive'
      });
    }
  }, [onRecordingComplete, toast]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    
    setIsRecording(false);
    
    if (durationIntervalRef.current) {
      clearInterval(durationIntervalRef.current);
      durationIntervalRef.current = null;
    }
  }, []);

  const sendRecording = useCallback(async () => {
    if (!recordedAudio) return;
    
    setIsSending(true);
    try {
      await onSendRecording(recordedAudio, recordingDuration);
      
      // Reset state after successful send
      setRecordedAudio(null);
      setRecordingDuration(0);
      
      toast({
        title: 'Voice Message Sent',
        description: `${recordingDuration} second voice message sent successfully`,
      });
    } catch (error) {
      console.error('Error sending recording:', error);
      toast({
        title: 'Send Failed',
        description: 'Failed to send voice message. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsSending(false);
    }
  }, [recordedAudio, recordingDuration, onSendRecording, toast]);

  const cancelRecording = useCallback(() => {
    if (isRecording) {
      stopRecording();
    }
    setRecordedAudio(null);
    setRecordingDuration(0);
  }, [isRecording, stopRecording]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center space-x-2">
      {!recordedAudio ? (
        <>
          <Button
            type="button"
            onClick={isRecording ? stopRecording : startRecording}
            variant={isRecording ? "destructive" : "outline"}
            size="sm"
            disabled={disabled}
            className={isRecording ? "animate-pulse" : ""}
          >
            {isRecording ? (
              <>
                <MicOff className="h-4 w-4 mr-2" />
                Stop ({formatDuration(recordingDuration)})
              </>
            ) : (
              <>
                <Mic className="h-4 w-4 mr-2" />
                Record Voice
              </>
            )}
          </Button>
        </>
      ) : (
        <>
          <Button
            type="button"
            onClick={sendRecording}
            disabled={isSending}
            size="sm"
          >
            <Send className="h-4 w-4 mr-2" />
            {isSending ? 'Sending...' : `Send ${formatDuration(recordingDuration)}`}
          </Button>
          <Button
            type="button"
            onClick={cancelRecording}
            variant="outline"
            size="sm"
          >
            Cancel
          </Button>
        </>
      )}
    </div>
  );
}