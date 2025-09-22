import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Send, Volume2, Mic, MicOff, Play, Pause } from 'lucide-react';
import VoiceRecording from './VoiceRecording';

interface Message {
  id: string;
  content: string;
  sender_type: 'borrower' | 'loan_officer' | 'admin';
  sender_id: string;
  created_at: string;
  message_type: 'text' | 'voice';
  voice_duration?: number;
  file_path?: string;
}

interface Conversation {
  id: string;
  borrower_id: string;
  status: string;
  last_message_at: string;
}

interface LoanOfficerMessagingProps {
  clientId: string;
  clientName: string;
  clientEmail: string;
}

export default function LoanOfficerMessaging({ clientId, clientName, clientEmail }: LoanOfficerMessagingProps) {
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isGeneratingTTS, setIsGeneratingTTS] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    loadConversation();
  }, [clientId]);

  useEffect(() => {
    if (conversation) {
      loadMessages();
      subscribeToMessages();
    }
  }, [conversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadConversation = async () => {
    try {
      // Try to find existing conversation
      let { data: existingConversation } = await supabase
        .from('conversations')
        .select('*')
        .eq('borrower_id', clientId)
        .single();

      if (!existingConversation) {
        // Create new conversation
        const { data: newConversation, error: createError } = await supabase
          .from('conversations')
          .insert({
            borrower_id: clientId,
            status: 'active'
          })
          .select()
          .single();

        if (createError) throw createError;
        existingConversation = newConversation;
      }

      setConversation(existingConversation);
    } catch (error) {
      console.error('Error loading conversation:', error);
      toast({
        title: 'Error',
        description: 'Failed to load conversation',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async () => {
    if (!conversation) return;

    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversation.id)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages((data || []) as Message[]);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const subscribeToMessages = () => {
    if (!conversation) return;

    const channel = supabase
      .channel(`conversation-${conversation.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversation.id}`
        },
        (payload) => {
          const newMessage = payload.new as any;
          setMessages(prev => [...prev, {
            ...newMessage,
            sender_type: newMessage.sender_type as 'borrower' | 'loan_officer' | 'admin'
          }]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !conversation || !user) return;

    try {
      const { error } = await supabase
        .from('messages')
        .insert({
          conversation_id: conversation.id,
          sender_type: profile?.role === 'admin' ? 'admin' : 'loan_officer',
          sender_id: user.id,
          content: newMessage,
          message_type: 'text'
        });

      if (error) throw error;
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message',
        variant: 'destructive'
      });
    }
  };

  const generateTTSMessage = async () => {
    if (!newMessage.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a message to convert to speech',
        variant: 'destructive'
      });
      return;
    }

    if (!conversation || !user) {
      toast({
        title: 'Error',
        description: 'No conversation selected',
        variant: 'destructive'
      });
      return;
    }

    setIsGeneratingTTS(true);
    try {
      const { data, error } = await supabase.functions.invoke('elevenlabs-tts', {
        body: { 
          text: newMessage,
          voice: 'aria',
          model: 'eleven_multilingual_v2'
        }
      });

      if (error) {
        console.error('TTS function error:', error);
        throw new Error(error.message || 'Failed to generate speech');
      }

      if (!data || !data.audioContent) {
        throw new Error('No audio data received from TTS service');
      }

      // Convert base64 audio to blob
      const audioData = atob(data.audioContent);
      const audioBytes = new Uint8Array(audioData.length);
      for (let i = 0; i < audioData.length; i++) {
        audioBytes[i] = audioData.charCodeAt(i);
      }
      
      const audioBlob = new Blob([audioBytes], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(audioBlob);
      
      // Send as voice message (not text)
      const { error: messageError } = await supabase
        .from('messages')
        .insert({
          conversation_id: conversation.id,
          sender_type: profile?.role === 'admin' ? 'admin' : 'loan_officer',
          sender_id: user.id,
          content: newMessage,
          message_type: 'voice',
          voice_duration: Math.ceil(audioData.length / 16000), // Estimate duration
          file_path: audioUrl
        });

      if (messageError) {
        console.error('Error saving voice message:', messageError);
        throw messageError;
      }

      setNewMessage('');

      toast({
        title: 'Voice Message Sent',
        description: 'Text converted to speech and sent as voice message',
      });
    } catch (error: any) {
      console.error('Error generating TTS:', error);
      toast({
        title: 'TTS Failed',
        description: error.message || 'Failed to generate text-to-speech',
        variant: 'destructive'
      });
    } finally {
      setIsGeneratingTTS(false);
    }
  };

  const handleRecordingComplete = (audioBlob: Blob, duration: number) => {
    console.log('Recording completed:', { size: audioBlob.size, duration });
  };

  const handleSendRecording = async (audioBlob: Blob, duration: number) => {
    if (!conversation || !user) {
      throw new Error('No conversation or user available');
    }

    try {
      // Upload audio to Supabase storage
      const fileName = `voice-${Date.now()}.webm`;
      const filePath = `conversation-files/${conversation.id}/${fileName}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('conversation-files')
        .upload(filePath, audioBlob, {
          contentType: 'audio/webm',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // Save voice message to database
      const { error: messageError } = await supabase
        .from('messages')
        .insert({
          conversation_id: conversation.id,
          sender_type: profile?.role === 'admin' ? 'admin' : 'loan_officer',
          sender_id: user.id,
          content: `Voice message (${duration} seconds)`,
          message_type: 'voice',
          voice_duration: duration,
          file_path: filePath
        });

      if (messageError) throw messageError;

    } catch (error) {
      console.error('Error sending voice recording:', error);
      throw error;
    }
  };

  const formatMessageTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <span>Communication with {clientName}</span>
          <Badge variant="outline">{clientEmail}</Badge>
        </CardTitle>
        <CardDescription>
          Secure messaging with text-to-speech capabilities
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto mb-4 space-y-3 p-4 border rounded-lg bg-slate-50 max-h-96">
          {messages.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              No messages yet. Start the conversation!
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender_type === 'borrower' ? 'justify-start' : 'justify-end'
                }`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.sender_type === 'borrower'
                      ? 'bg-white border'
                      : 'bg-blue-500 text-white'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs opacity-70">
                      {formatMessageTime(message.created_at)}
                    </p>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        message.sender_type === 'borrower' ? 'bg-slate-100' : 'bg-blue-400'
                      }`}
                    >
                      {message.sender_type === 'borrower' ? 'Client' : 
                       message.sender_type === 'admin' ? 'Admin' : 'Loan Officer'}
                    </Badge>
                  </div>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input Area */}
        <div className="space-y-3">
          <Textarea
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            rows={3}
          />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <VoiceRecording
                onRecordingComplete={handleRecordingComplete}
                onSendRecording={handleSendRecording}
                disabled={!conversation}
              />
              
              <Button
                onClick={generateTTSMessage}
                variant="outline"
                size="sm"
                disabled={!newMessage.trim() || isGeneratingTTS || !conversation}
              >
                <Volume2 className="h-4 w-4 mr-2" />
                {isGeneratingTTS ? 'Generating...' : 'Send with TTS'}
              </Button>
            </div>
            
            <Button 
              onClick={sendMessage}
              disabled={!newMessage.trim() || !conversation}
              size="sm"
            >
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}