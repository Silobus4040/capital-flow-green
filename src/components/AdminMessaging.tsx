import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Send, Volume2, Loader2, MessageSquare, Mic } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Message {
  id: string;
  sender_id: string;
  sender_role: string;
  message_type: string;
  content: string | null;
  audio_url: string | null;
  transcript: string | null;
  created_at: string;
}

interface AppWithMessages {
  application_id: string;
  borrower_name: string;
  program_name: string;
  message_count: number;
}

export default function AdminMessaging() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [appsList, setAppsList] = useState<AppWithMessages[]>([]);
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [ttsLoading, setTtsLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadAppsWithMessages();
  }, []);

  const loadAppsWithMessages = async () => {
    // Get all apps
    const { data: apps } = await supabase
      .from('loan_program_applications')
      .select('id, borrower_name, program_name')
      .order('created_at', { ascending: false });

    if (!apps) { setLoading(false); return; }

    // Get message counts
    const { data: msgCounts } = await supabase
      .from('closing_messages')
      .select('application_id');

    const countMap: Record<string, number> = {};
    (msgCounts || []).forEach((m: any) => {
      countMap[m.application_id] = (countMap[m.application_id] || 0) + 1;
    });

    const list: AppWithMessages[] = apps.map(a => ({
      application_id: a.id,
      borrower_name: a.borrower_name,
      program_name: a.program_name,
      message_count: countMap[a.id] || 0,
    }));

    // Sort: apps with messages first
    list.sort((a, b) => b.message_count - a.message_count);
    setAppsList(list);
    setLoading(false);
  };

  const fetchMessages = async (appId: string) => {
    const { data } = await supabase
      .from('closing_messages')
      .select('*')
      .eq('application_id', appId)
      .order('created_at', { ascending: true });
    if (data) setMessages(data);
  };

  useEffect(() => {
    if (!selectedAppId) return;
    fetchMessages(selectedAppId);
    const channel = supabase
      .channel(`admin-messages-${selectedAppId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'closing_messages', filter: `application_id=eq.${selectedAppId}` }, () => fetchMessages(selectedAppId))
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [selectedAppId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendText = async () => {
    if (!newMessage.trim() || !user || !selectedAppId) return;
    setSending(true);
    const { error } = await supabase.from('closing_messages').insert({
      application_id: selectedAppId,
      sender_id: user.id,
      sender_role: 'admin',
      message_type: 'text',
      content: newMessage.trim(),
    });
    if (error) toast({ title: 'Error', description: error.message, variant: 'destructive' });
    else setNewMessage('');
    setSending(false);
  };

  const sendAsTTS = async () => {
    if (!newMessage.trim() || !user || !selectedAppId) return;
    setTtsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/elevenlabs-tts`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ text: newMessage.trim(), voiceId: 'JBFqnCBsd6RMkjVDRZzb' }),
        }
      );
      if (!response.ok) throw new Error('TTS failed');
      const audioBlob = await response.blob();
      const fileName = `tts-${Date.now()}.mp3`;
      const filePath = `${selectedAppId}/${fileName}`;
      const { error: upErr } = await supabase.storage.from('closing-files').upload(filePath, audioBlob);
      if (upErr) throw upErr;
      const { data: urlData } = supabase.storage.from('closing-files').getPublicUrl(filePath);

      await supabase.from('closing_messages').insert({
        application_id: selectedAppId,
        sender_id: user.id,
        sender_role: 'admin',
        message_type: 'voice',
        audio_url: urlData.publicUrl,
        transcript: newMessage.trim(),
        content: 'Voice note from Account Executive',
      });
      setNewMessage('');
      toast({ title: 'Voice note sent' });
    } catch (err: any) {
      toast({ title: 'TTS Error', description: err.message, variant: 'destructive' });
    }
    setTtsLoading(false);
  };

  const playAudio = (url: string) => {
    const audio = new Audio(url);
    audio.play();
  };

  if (loading) return <div className="p-6 text-center text-muted-foreground">Loading...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ height: '600px' }}>
      {/* App list */}
      <Card className="md:col-span-1 overflow-y-auto">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Conversations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 p-2">
          {appsList.map(a => (
            <div
              key={a.application_id}
              className={`p-3 rounded-lg cursor-pointer transition-colors ${selectedAppId === a.application_id ? 'bg-primary/10 border border-primary/20' : 'hover:bg-muted'}`}
              onClick={() => setSelectedAppId(a.application_id)}
            >
              <p className="font-medium text-sm">{a.borrower_name}</p>
              <p className="text-xs text-muted-foreground">{a.program_name}</p>
              {a.message_count > 0 && (
                <Badge variant="secondary" className="mt-1 text-xs">{a.message_count} messages</Badge>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Chat panel */}
      <Card className="md:col-span-2 flex flex-col">
        {!selectedAppId ? (
          <CardContent className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>Select a conversation to start messaging</p>
            </div>
          </CardContent>
        ) : (
          <>
            <CardHeader className="pb-2 border-b">
              <CardTitle className="text-base">
                {appsList.find(a => a.application_id === selectedAppId)?.borrower_name || 'Chat'}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto space-y-3 p-4">
              {messages.length === 0 && (
                <p className="text-center text-muted-foreground text-sm py-8">No messages yet.</p>
              )}
              {messages.map(msg => {
                const isAdmin = msg.sender_role === 'admin';
                return (
                  <div key={msg.id} className={`flex ${isAdmin ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] rounded-lg p-3 ${isAdmin ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                      <p className="text-xs opacity-70 mb-1">{isAdmin ? 'You (Admin)' : 'Borrower'}</p>
                      {msg.content && <p className="text-sm">{msg.content}</p>}
                      {msg.audio_url && (
                        <Button size="sm" variant="ghost" className="mt-1 gap-1" onClick={() => playAudio(msg.audio_url!)}>
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
                  onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendText(); } }}
                />
                <Button onClick={sendText} disabled={sending || !newMessage.trim()} size="icon">
                  {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full gap-2"
                onClick={sendAsTTS}
                disabled={ttsLoading || !newMessage.trim()}
              >
                {ttsLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mic className="h-4 w-4" />}
                Send as Voice Note (TTS)
              </Button>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
