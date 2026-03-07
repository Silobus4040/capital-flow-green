import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Send, Play, Pause, Loader2, MessageSquare, Mic, Check, CheckCheck } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Message {
  id: string;
  sender_id: string;
  sender_role: string;
  message_type: string;
  content: string | null;
  audio_url: string | null;
  transcript: string | null;
  is_read: boolean | null;
  created_at: string;
  _optimistic?: boolean;
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
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadAppsWithMessages();
  }, []);

  const loadAppsWithMessages = async () => {
    const { data: apps } = await supabase
      .from('loan_program_applications')
      .select('id, borrower_name, program_name')
      .order('created_at', { ascending: false });

    if (!apps) { setLoading(false); return; }

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
      .on('postgres_changes', { event: '*', schema: 'public', table: 'closing_messages', filter: `application_id=eq.${selectedAppId}` }, () => fetchMessages(selectedAppId))
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [selectedAppId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendText = async () => {
    if (!newMessage.trim() || !user || !selectedAppId) return;
    const text = newMessage.trim();
    setNewMessage('');
    setSending(true);

    // Optimistic update
    const tempMsg: Message = {
      id: `temp-${Date.now()}`,
      sender_id: user.id,
      sender_role: 'admin',
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
      application_id: selectedAppId,
      sender_id: user.id,
      sender_role: 'admin',
      message_type: 'text',
      content: text,
    });
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
      setMessages(prev => prev.filter(m => m.id !== tempMsg.id));
    }
    setSending(false);
  };

  const sendAsTTS = async () => {
    if (!newMessage.trim() || !user || !selectedAppId) return;
    setTtsLoading(true);
    try {
      // Use supabase.functions.invoke for proper session-based auth
      const { data, error: fnError } = await supabase.functions.invoke('elevenlabs-tts', {
        body: { text: newMessage.trim(), voice: 'george', model: 'eleven_multilingual_v2' },
      });

      if (fnError) {
        throw new Error(fnError.message || 'TTS function call failed');
      }

      if (!data?.audioContent) {
        throw new Error(data?.error || 'No audio content returned from TTS');
      }

      // Convert base64 to blob for upload
      const binaryString = atob(data.audioContent);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const audioBlob = new Blob([bytes], { type: 'audio/mpeg' });

      const fileName = `tts-${Date.now()}.mp3`;
      const filePath = `${selectedAppId}/${fileName}`;
      const { error: upErr } = await supabase.storage.from('closing-files').upload(filePath, audioBlob);
      if (upErr) throw upErr;

      // Store raw file path, NOT signed URL
      await supabase.from('closing_messages').insert({
        application_id: selectedAppId,
        sender_id: user.id,
        sender_role: 'admin',
        message_type: 'voice',
        audio_url: filePath,
        transcript: newMessage.trim(),
        content: 'Voice note from Account Executive',
      });
      setNewMessage('');
      toast({ title: 'Voice note sent' });
    } catch (err: any) {
      console.error('TTS error:', err);
      toast({ title: 'TTS Error', description: err.message, variant: 'destructive' });
    }
    setTtsLoading(false);
  };

  const playAudio = async (msg: Message) => {
    if (playingId === msg.id) {
      audioRef.current?.pause();
      setPlayingId(null);
      return;
    }

    const storedPath = msg.audio_url;
    if (!storedPath) return;

    // Always generate a fresh signed URL
    let url = storedPath;
    if (!storedPath.startsWith('http')) {
      const { data, error } = await supabase.storage.from('closing-files').createSignedUrl(storedPath, 3600);
      if (error || !data?.signedUrl) {
        console.error('Signed URL error:', error);
        toast({ title: 'Playback Error', description: 'Could not generate audio URL', variant: 'destructive' });
        return;
      }
      url = data.signedUrl;
    } else if (storedPath.includes('closing-files')) {
      const pathMatch = storedPath.match(/closing-files\/(.+?)(\?|$)/);
      if (pathMatch) {
        const { data } = await supabase.storage.from('closing-files').createSignedUrl(decodeURIComponent(pathMatch[1]), 3600);
        if (data?.signedUrl) url = data.signedUrl;
      }
    }

    if (audioRef.current) audioRef.current.pause();
    const audio = new Audio();
    audio.crossOrigin = 'anonymous';
    audio.src = url;
    audioRef.current = audio;
    setPlayingId(msg.id);
    audio.onended = () => setPlayingId(null);
    audio.onerror = (e) => {
      console.error('Audio playback error:', e, 'URL:', url);
      setPlayingId(null);
      toast({ title: 'Playback Error', description: 'Could not play audio file', variant: 'destructive' });
    };

    try {
      await audio.play();
    } catch (err) {
      console.error('audio.play() rejected:', err);
      setPlayingId(null);
      toast({ title: 'Playback Error', description: 'Browser blocked audio playback. Try clicking again.', variant: 'destructive' });
    }
  };

  const formatTime = (dateStr: string) => {
    const d = new Date(dateStr);
    const now = new Date();
    const isToday = d.toDateString() === now.toDateString();
    if (isToday) return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return d.toLocaleDateString([], { month: 'short', day: 'numeric' }) + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) return <div className="p-6 text-center text-muted-foreground">Loading...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ height: '600px' }}>
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
            <CardContent className="flex-1 overflow-y-auto p-4 bg-muted/20">
              {messages.length === 0 && (
                <p className="text-center text-muted-foreground text-sm py-8">No messages yet.</p>
              )}
              <div className="space-y-3">
                {messages.map(msg => {
                  const isAdmin = msg.sender_role === 'admin';
                  return (
                    <div key={msg.id} className={`flex ${isAdmin ? 'justify-end' : 'justify-start'}`}>
                      <div className="max-w-[70%] space-y-1">
                        <div className={`rounded-2xl px-4 py-2.5 ${isAdmin
                            ? 'bg-primary text-primary-foreground rounded-br-md'
                            : 'bg-card border border-border rounded-bl-md'
                          }`}>
                          {msg.content && <p className="text-sm leading-relaxed">{msg.content}</p>}
                          {msg.audio_url && (
                            <button
                              onClick={() => playAudio(msg)}
                              className={`flex items-center gap-2 mt-1 text-sm ${isAdmin ? 'text-primary-foreground/80 hover:text-primary-foreground' : 'text-primary hover:text-primary/80'}`}
                            >
                              {playingId === msg.id ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                              {playingId === msg.id ? 'Playing...' : 'Play Audio'}
                            </button>
                          )}
                          {msg.transcript && (
                            <p className={`text-xs mt-1 italic ${isAdmin ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>
                              {msg.transcript}
                            </p>
                          )}
                        </div>
                        <div className={`flex items-center gap-1 px-1 ${isAdmin ? 'justify-end' : 'justify-start'}`}>
                          <span className="text-[10px] text-muted-foreground">{formatTime(msg.created_at)}</span>
                          {isAdmin && (
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
                  className="min-h-[40px] max-h-[80px] resize-none rounded-2xl"
                  onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendText(); } }}
                />
                <Button onClick={sendText} disabled={sending || !newMessage.trim()} size="icon" className="rounded-full h-10 w-10 shrink-0">
                  {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full gap-2 rounded-xl"
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
