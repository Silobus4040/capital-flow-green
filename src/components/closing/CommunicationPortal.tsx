import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Send, Play, Pause, Shield, Loader2, Check, CheckCheck, Search } from 'lucide-react';
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
  const [searchQuery, setSearchQuery] = useState('');

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
    } else {
      // Send Telegram notification for borrower message (fire-and-forget)
      supabase.functions.invoke('send-telegram-notification', {
        body: {
          applicationType: 'borrower_message',
          borrowerName: user.email,
          borrowerEmail: user.email,
          extras: {
            'Message': text,
            'Application ID': applicationId,
          },
        },
      }).catch(err => console.error('⚠️ Telegram notification failed:', err));
    }
    setSending(false);
  };

  const handleVoiceSend = async (audioBlob: Blob, duration: number) => {
    if (!user) return;

    // Optimistic update — show message immediately
    const tempId = `temp-voice-${Date.now()}`;
    const tempMsg: Message = {
      id: tempId,
      sender_id: user.id,
      sender_role: 'borrower',
      message_type: 'voice',
      content: `Voice message (${duration}s)`,
      audio_url: null,
      transcript: null,
      is_read: false,
      created_at: new Date().toISOString(),
      _optimistic: true,
    };
    setMessages(prev => [...prev, tempMsg]);

    const fileName = `voice-${Date.now()}.webm`;
    const filePath = `${applicationId}/${fileName}`;
    // Explicitly set contentType so Supabase storage serves the correct MIME type
    const { error: uploadError } = await supabase.storage.from('closing-files').upload(filePath, audioBlob, {
      contentType: 'audio/webm',
      cacheControl: '3600',
    });
    if (uploadError) {
      toast({ title: 'Error', description: 'Failed to upload voice recording', variant: 'destructive' });
      setMessages(prev => prev.filter(m => m.id !== tempId));
      return;
    }
    // Store the raw file path, NOT the signed URL
    const { error: insertError } = await supabase.from('closing_messages').insert({
      application_id: applicationId,
      sender_id: user.id,
      sender_role: 'borrower',
      message_type: 'voice',
      audio_url: filePath,
      content: `Voice message (${duration}s)`,
    });
    if (insertError) {
      toast({ title: 'Error', description: 'Failed to send voice message', variant: 'destructive' });
      setMessages(prev => prev.filter(m => m.id !== tempId));
    }
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

    console.log('Playing audio from URL:', url);

    if (audioRef.current) audioRef.current.pause();
    const audio = new Audio(url);
    audioRef.current = audio;
    setPlayingId(msg.id);
    audio.onended = () => setPlayingId(null);
    audio.onerror = () => {
      const mediaError = audio.error;
      console.error('Audio playback error:', {
        code: mediaError?.code,
        message: mediaError?.message,
        url: url.substring(0, 100),
      });
      setPlayingId(null);
      toast({ title: 'Playback Error', description: `Could not play audio: ${mediaError?.message || 'unknown error'}`, variant: 'destructive' });
    };

    try {
      await audio.play();
    } catch (err: any) {
      console.error('audio.play() rejected:', err);
      setPlayingId(null);
      toast({ title: 'Playback Error', description: err.message || 'Browser blocked audio playback', variant: 'destructive' });
    }
  };

  const formatTime = (dateStr: string) => {
    const d = new Date(dateStr);
    const now = new Date();
    const isToday = d.toDateString() === now.toDateString();
    if (isToday) return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return d.toLocaleDateString([], { month: 'short', day: 'numeric' }) + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDateSeparator = (dateStr: string) => {
    const d = new Date(dateStr);
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (d.toDateString() === now.toDateString()) return 'Today';
    if (d.toDateString() === yesterday.toDateString()) return 'Yesterday';
    return d.toLocaleDateString([], { month: 'short', day: 'numeric', year: d.getFullYear() !== now.getFullYear() ? 'numeric' : undefined });
  };

  // Admin identity config (easily changeable later)
  const ADMIN_NAME = 'CCIF Account Manager';
  const ADMIN_AVATAR = '/ccif-logo.png';

  if (loading) return <div className="p-6 text-center text-muted-foreground">Loading messages...</div>;

  // Group messages by date for separators
  const filteredMessages = messages.filter(msg => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      (msg.content || '').toLowerCase().includes(q) ||
      (msg.transcript || '').toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-3">
      {/* Messenger-style Chat Container */}
      <div className="flex flex-col rounded-2xl border border-border bg-card overflow-hidden shadow-sm" style={{ height: '560px' }}>
        {/* Chat Header — Facebook Messenger style */}
        <div className="px-4 py-3 border-b bg-card flex items-center gap-3">
          <div className="relative">
            <img src={ADMIN_AVATAR} alt={ADMIN_NAME} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" />
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-card" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm truncate">{ADMIN_NAME}</p>
            <p className="text-[11px] text-green-600 font-medium">Active now</p>
          </div>
          {/* Search */}
          <div className="relative w-40">
            <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-full border border-border bg-muted/30 focus:outline-none focus:ring-1 focus:ring-primary/30"
            />
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 py-3" style={{ background: 'linear-gradient(to bottom, hsl(var(--muted)/0.15), hsl(var(--muted)/0.05))' }}>
          {filteredMessages.length === 0 && (
            <div className="text-center py-12">
              <img src={ADMIN_AVATAR} alt="" className="w-16 h-16 rounded-full mx-auto mb-3 border-2 border-muted shadow" />
              <p className="font-semibold text-sm">{ADMIN_NAME}</p>
              <p className="text-xs text-muted-foreground mt-1">Start a conversation with your account manager</p>
            </div>
          )}
          <div className="space-y-1">
            {filteredMessages.map((msg, idx) => {
              const isOwn = msg.sender_id === user?.id;
              const isVoice = msg.message_type === 'voice';
              const prevMsg = idx > 0 ? filteredMessages[idx - 1] : null;
              const nextMsg = idx < filteredMessages.length - 1 ? filteredMessages[idx + 1] : null;

              // Date separator
              const msgDate = new Date(msg.created_at).toDateString();
              const prevDate = prevMsg ? new Date(prevMsg.created_at).toDateString() : null;
              const showDateSep = !prevMsg || msgDate !== prevDate;

              // Group logic: is this the first/last in a consecutive group from the same sender?
              const isFirstInGroup = !prevMsg || prevMsg.sender_id !== msg.sender_id || showDateSep;
              const isLastInGroup = !nextMsg || nextMsg.sender_id !== msg.sender_id || new Date(nextMsg.created_at).toDateString() !== msgDate;

              return (
                <div key={msg.id}>
                  {/* Date Separator */}
                  {showDateSep && (
                    <div className="flex items-center justify-center my-3">
                      <span className="px-3 py-0.5 text-[10px] font-medium text-muted-foreground bg-muted/60 rounded-full">{formatDateSeparator(msg.created_at)}</span>
                    </div>
                  )}

                  {/* Message Row */}
                  <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} ${isFirstInGroup ? 'mt-3' : 'mt-0.5'}`}>
                    {/* Admin Avatar (only for admin messages, only first in group) */}
                    {!isOwn && (
                      <div className="w-8 mr-2 flex-shrink-0">
                        {isFirstInGroup ? (
                          <img src={ADMIN_AVATAR} alt="" className="w-7 h-7 rounded-full object-cover mt-1" />
                        ) : <div className="w-7" />}
                      </div>
                    )}

                    <div className={`max-w-[65%] ${isOwn ? '' : ''}`}>
                      {/* Admin name above first message in group */}
                      {!isOwn && isFirstInGroup && (
                        <p className="text-[10px] text-muted-foreground font-medium mb-0.5 ml-1">{ADMIN_NAME}</p>
                      )}

                      {/* Bubble */}
                      <div className={`px-3 py-2 ${isOwn
                        ? `bg-[#0084ff] text-white ${isFirstInGroup ? 'rounded-t-2xl' : 'rounded-t-lg'} ${isLastInGroup ? 'rounded-b-2xl rounded-br-md' : 'rounded-b-lg'} rounded-l-2xl`
                        : `bg-[#f0f0f0] text-gray-900 ${isFirstInGroup ? 'rounded-t-2xl' : 'rounded-t-lg'} ${isLastInGroup ? 'rounded-b-2xl rounded-bl-md' : 'rounded-b-lg'} rounded-r-2xl`
                        }`}>
                        {!isVoice && msg.content && <p className="text-[13px] leading-relaxed">{msg.content}</p>}
                        {msg.audio_url && (
                          <button
                            onClick={() => playAudio(msg)}
                            className={`flex items-center gap-2 text-[13px] ${isOwn ? 'text-white/80 hover:text-white' : 'text-blue-600 hover:text-blue-700'}`}
                          >
                            {playingId === msg.id ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                            {playingId === msg.id ? 'Playing...' : '▶ Play Audio'}
                          </button>
                        )}

                        {isVoice && !msg.audio_url && (
                          <p className={`text-[13px] ${isOwn ? 'text-white/60' : 'text-gray-400'}`}>Sending voice note…</p>
                        )}
                      </div>

                      {/* Timestamp + read receipts — only on last in group */}
                      {isLastInGroup && (
                        <div className={`flex items-center gap-1 mt-0.5 px-1 ${isOwn ? 'justify-end' : 'justify-start'}`}>
                          <span className="text-[10px] text-muted-foreground">{formatTime(msg.created_at)}</span>
                          {isOwn && (
                            msg._optimistic
                              ? <Check className="h-3 w-3 text-muted-foreground/50" />
                              : <CheckCheck className={`h-3 w-3 ${msg.is_read ? 'text-[#0084ff]' : 'text-muted-foreground/50'}`} />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div ref={bottomRef} />
        </div>

        {/* Messenger-style Input Bar */}
        {(() => {
          const adminHasMessaged = messages.some(m => m.sender_role === 'admin' && !m._optimistic);
          if (!adminHasMessaged) {
            return (
              <div className="px-3 py-4 border-t bg-card">
                <div className="flex items-center gap-3 justify-center text-center">
                  <div className="bg-muted/50 rounded-full p-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your CCIF account manager will reach out to you shortly. You'll be able to reply once they send the first message.
                  </p>
                </div>
              </div>
            );
          }
          return (
            <div className="px-3 py-2 border-t bg-card">
              <div className="flex gap-2 items-end">
                <Textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Aa"
                  className="min-h-[38px] max-h-[80px] resize-none rounded-full border-border bg-muted/30 px-4 text-sm"
                  onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendTextMessage(); } }}
                />
                <Button onClick={sendTextMessage} disabled={sending || !newMessage.trim()} size="icon" className="rounded-full h-9 w-9 shrink-0 bg-[#0084ff] hover:bg-[#0073e6]">
                  {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </div>
              <div className="mt-1.5">
                <VoiceRecorder onSend={handleVoiceSend} />
              </div>
            </div>
          );
        })()}
      </div>

      {/* Liability Notice — moved below chat */}
      <Alert className="border-amber-200 bg-amber-50">
        <Shield className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-amber-800 text-xs">
          CCIF assumes 100% liability for all communication data — fully retained for loan life + 180 days post-repayment.
        </AlertDescription>
      </Alert>
    </div>
  );
}
