import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Send, Volume2, Shield, Loader2 } from 'lucide-react';
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
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'closing_messages', filter: `application_id=eq.${applicationId}` }, () => fetchMessages())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [applicationId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendTextMessage = async () => {
    if (!newMessage.trim() || !user) return;
    setSending(true);
    const { error } = await supabase.from('closing_messages').insert({
      application_id: applicationId,
      sender_id: user.id,
      sender_role: 'borrower',
      message_type: 'text',
      content: newMessage.trim(),
    });
    if (error) {
      toast({ title: 'Error', description: 'Failed to send message', variant: 'destructive' });
    } else {
      setNewMessage('');
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
    const { data: urlData } = supabase.storage.from('closing-files').getPublicUrl(filePath);
    await supabase.from('closing_messages').insert({
      application_id: applicationId,
      sender_id: user.id,
      sender_role: 'borrower',
      message_type: 'voice',
      audio_url: urlData.publicUrl,
      content: `Voice message (${duration}s)`,
    });
  };

  const playTTS = (audioUrl: string) => {
    const audio = new Audio(audioUrl);
    audio.play();
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
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Secure Messages</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto space-y-3 pb-2">
          {messages.length === 0 && (
            <p className="text-center text-muted-foreground text-sm py-8">No messages yet. Start a conversation below.</p>
          )}
          {messages.map((msg) => {
            const isOwn = msg.sender_id === user?.id;
            return (
              <div key={msg.id} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] rounded-lg p-3 ${isOwn ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                  <p className="text-xs opacity-70 mb-1">{msg.sender_role === 'admin' ? 'Account Executive' : 'You'}</p>
                  {msg.content && <p className="text-sm">{msg.content}</p>}
                  {msg.audio_url && (
                    <Button size="sm" variant="ghost" className="mt-1 gap-1" onClick={() => playTTS(msg.audio_url!)}>
                      <Volume2 className="h-3 w-3" /> Play Audio
                    </Button>
                  )}
                  {msg.transcript && <p className="text-xs opacity-70 mt-1 italic">Transcript: {msg.transcript}</p>}
                  <p className="text-xs opacity-50 mt-1">{new Date(msg.created_at).toLocaleString()}</p>
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </CardContent>
        <div className="p-4 border-t space-y-2">
          <div className="flex gap-2">
            <Textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="min-h-[40px] max-h-[80px]"
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendTextMessage(); } }}
            />
            <Button onClick={sendTextMessage} disabled={sending || !newMessage.trim()} size="icon">
              {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>
          <VoiceRecorder onSend={handleVoiceSend} />
        </div>
      </Card>
    </div>
  );
}
