import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Send, Play, Pause, Shield, Loader2, Check, CheckCheck } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import VoiceRecorder from '@/components/VoiceRecorder';

interface Message {
  id: string;
  sender_id: string;
  sender_role: string;
  message_type: string;
  content: string | null;
  audio_url: string | null;
  transcript: string | null;
  is_read: boolean;
  created_at: string;
  _optimistic?: boolean;
}

interface CommunicationPortalProps {
  applicationId: string;
}

export default function CommunicationPortal({ applicationId }: CommunicationPortalProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const fetchMessages = async () => {
    const { data } = await supabase
      .from('closing_messages')
      .select('*')
      .eq('application_id', applicationId)
      .order('created_at', { ascending: true });
    if (data) setMessages(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
    const channel = supabase
      .channel(`messages-${applicationId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'closing_messages', filter: `application_id=eq.${applicationId}` }, () => fetchMessages())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [applicationId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendTextMessage = async () => {
    if (!newMessage.trim() || !user) return;
    const text = newMessage.trim();
    setNewMessage('');
    setSending(true);

    // Optimistic update
    const tempMsg: Message = {
      id: `temp-${Date.now()}`,
      sender_id: user.id,
      sender_role: 'borrower',
      message_type: 'text',
      content: text,
      audio_url: null,
      transcript: null,
      is_read: false,
      created_at: new Date().toISOString(),
      _optimistic: true,
    };
    setMessages(prev => [...prev, tempMsg]);

    const { error } = await supabase.from('closing_messages').insert({
      application_id: applicationId,
      sender_id: user.id,
      sender_role: 'borrower',
      message_type: 'text',
      content: text,
    });
    if (error) {
      toast({ title: 'Error', description: 'Failed to send message', variant: 'destructive' });
      setMessages(prev => prev.filter(m => m.id !== tempMsg.id));
    }
    setSending(false);
  };

  const handleVoiceSend = async (audioBlob: Blob, duration: number) => {
    if (!user) return;
    const fileName = `voice-${Date.now()}.webm`;
    const filePath = `${applicationId}/${fileName}`;
    const { error: uploadError } = await supabase.storage.from('closing-files').upload(filePath, audioBlob);
    if (uploadError) {
      toast({ title: 'Error', description: 'Failed to upload voice recording', variant: 'destructive' });
      return;
    }
    // Store the raw file path, NOT the signed URL
    await supabase.from('closing_messages').insert({
      application_id: applicationId,
      sender_id: user.id,
      sender_role: 'borrower',
      message_type: 'voice',
      audio_url: filePath,
      content: `Voice message (${duration}s)`,
    });
  };

  const playAudio = async (msg: Message) => {
    if (playingId === msg.id) {
      audioRef.current?.pause();
      setPlayingId(null);
      return;
    }

    const storedPath = msg.audio_url;
    if (!storedPath) return;

    // Always generate a fresh signed URL from the raw path
    let url = storedPath;
    if (!storedPath.startsWith('http')) {
      // It's a raw storage path
      const { data } = await supabase.storage.from('closing-files').createSignedUrl(storedPath, 3600);
      if (data?.signedUrl) {
        url = data.signedUrl;
      } else {
        toast({ title: 'Playback Error', description: 'Could not generate audio URL', variant: 'destructive' });
        return;
      }
    } else if (storedPath.includes('closing-files')) {
      // Legacy: try to extract path from old signed URL
      const pathMatch = storedPath.match(/closing-files\/(.+?)(\?|$)/);
      if (pathMatch) {
        const { data } = await supabase.storage.from('closing-files').createSignedUrl(decodeURIComponent(pathMatch[1]), 3600);
        if (data?.signedUrl) url = data.signedUrl;
      }
    }

    if (audioRef.current) audioRef.current.pause();
    const audio = new Audio(url);
    audioRef.current = audio;
    setPlayingId(msg.id);
    audio.onended = () => setPlayingId(null);
    audio.onerror = () => {
      setPlayingId(null);
      toast({ title: 'Playback Error', description: 'Could not play audio', variant: 'destructive' });
    };
    audio.play();
  };

  const formatTime = (dateStr: string) => {
    const d = new Date(dateStr);
    const now = new Date();
    const isToday = d.toDateString() === now.toDateString();
    if (isToday) return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return d.toLocaleDateString([], { month: 'short', day: 'numeric' }) + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) return <div className="p-6 text-center text-muted-foreground">Loading messages...</div>;

  return (
    <div className="space-y-4">
      <Alert className="border-amber-200 bg-amber-50">
        <Shield className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-amber-800 text-xs">
          CCIF assumes 100% liability for all communication data — fully retained for loan life + 180 days post-repayment.
        </AlertDescription>
      </Alert>

      <Card className="flex flex-col" style={{ height: '500px' }}>
        <CardHeader className="pb-2 border-b">
          <CardTitle className="text-base">Secure Messages</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-4 bg-muted/20">
          {messages.length === 0 && (
            <p className="text-center text-muted-foreground text-sm py-8">No messages yet. Start a conversation below.</p>
          )}
          <div className="space-y-3">
            {messages.map((msg) => {
              const isOwn = msg.sender_id === user?.id;
              return (
                <div key={msg.id} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                  <div className="max-w-[70%] space-y-1">
                    <div className={`rounded-2xl px-4 py-2.5 ${
                      isOwn
                        ? 'bg-primary text-primary-foreground rounded-br-md'
                        : 'bg-card border border-border rounded-bl-md'
                    }`}>
                      {msg.content && <p className="text-sm leading-relaxed">{msg.content}</p>}
                      {msg.audio_url && (
                        <button
                          onClick={() => playAudio(msg)}
                          className={`flex items-center gap-2 mt-1 text-sm ${isOwn ? 'text-primary-foreground/80 hover:text-primary-foreground' : 'text-primary hover:text-primary/80'}`}
                        >
                          {playingId === msg.id ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                          {playingId === msg.id ? 'Playing...' : 'Play Audio'}
                        </button>
                      )}
                      {msg.transcript && (
                        <p className={`text-xs mt-1 italic ${isOwn ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>
                          {msg.transcript}
                        </p>
                      )}
                    </div>
                    <div className={`flex items-center gap-1 px-1 ${isOwn ? 'justify-end' : 'justify-start'}`}>
                      <span className="text-[10px] text-muted-foreground">{formatTime(msg.created_at)}</span>
                      {isOwn && (
                        msg._optimistic
                          ? <Check className="h-3 w-3 text-muted-foreground/50" />
                          : <CheckCheck className={`h-3 w-3 ${msg.is_read ? 'text-primary' : 'text-muted-foreground/50'}`} />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div ref={bottomRef} />
        </CardContent>
        <div className="p-3 border-t bg-card space-y-2">
          <div className="flex gap-2 items-end">
            <Textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="min-h-[40px] max-h-[80px] resize-none rounded-2xl border-border"
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendTextMessage(); } }}
            />
            <Button onClick={sendTextMessage} disabled={sending || !newMessage.trim()} size="icon" className="rounded-full h-10 w-10 shrink-0">
              {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>
          <VoiceRecorder onSend={handleVoiceSend} />
        </div>
      </Card>
    </div>
  );
}
