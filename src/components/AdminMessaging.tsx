import { useEffect, useState, useRef, useCallback } from 'react';
import { useAmbientNoise } from '@/hooks/useAmbientNoise';
import { mixAmbientIntoAudio, AMBIENT_PRESETS } from '@/utils/mixAmbientAudio';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Send, Play, Pause, Loader2, MessageSquare, Mic, Check, CheckCheck, Search, Settings2, ChevronDown, ChevronUp, RotateCcw, Trash2, Volume2, Headphones } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const VOICE_OPTIONS = [
  { value: 'george', label: 'George (Deep, Authoritative)' },
  { value: 'brian', label: 'Brian (Professional, Warm)' },
  { value: 'daniel', label: 'Daniel (Clear, Confident)' },
  { value: 'chris', label: 'Chris (Friendly, Conversational)' },
  { value: 'will', label: 'Will (Calm, Measured)' },
  { value: 'liam', label: 'Liam (Young, Energetic)' },
  { value: 'sarah', label: 'Sarah (Professional, Female)' },
  { value: 'laura', label: 'Laura (Warm, Friendly Female)' },
  { value: 'jessica', label: 'Jessica (Conversational Female)' },
  { value: 'lily', label: 'Lily (Soft, Gentle Female)' },
  { value: 'alice', label: 'Alice (Clear, Neutral Female)' },
];

function loadTTSSettings() {
  try {
    const saved = localStorage.getItem('ccif_tts_settings');
    if (saved) return JSON.parse(saved);
  } catch { }
  return { voice: 'george', stability: 0.35, style: 0.45, speed: 1.0 };
}
function saveTTSSettings(s: any) {
  localStorage.setItem('ccif_tts_settings', JSON.stringify(s));
}

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
  borrower_email: string;
  program_name: string;
  message_count: number;
}

export default function AdminMessaging() {
  const { startAmbience, stopAmbience } = useAmbientNoise(0.08);
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
  const [searchQuery, setSearchQuery] = useState('');

  // TTS Controls
  const [ttsSettings, setTtsSettings] = useState(loadTTSSettings);
  const [showTTSPanel, setShowTTSPanel] = useState(false);

  // TTS Preview
  const [ttsPreviewBlob, setTtsPreviewBlob] = useState<Blob | null>(null);
  const [ttsPreviewUrl, setTtsPreviewUrl] = useState<string | null>(null);
  const [ttsPreviewText, setTtsPreviewText] = useState('');
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);
  const [isMixing, setIsMixing] = useState(false);
  const [isAmbientMixed, setIsAmbientMixed] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState('office');
  const previewAudioRef = useRef<HTMLAudioElement | null>(null);

  const updateTTSSetting = useCallback((key: string, value: number | string) => {
    setTtsSettings((prev: any) => {
      const next = { ...prev, [key]: value };
      saveTTSSettings(next);
      return next;
    });
  }, []);

  useEffect(() => {
    loadAppsWithMessages();
  }, []);

  const loadAppsWithMessages = async () => {
    const { data: apps } = await supabase
      .from('loan_program_applications')
      .select('id, borrower_name, borrower_email, program_name')
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
      borrower_email: a.borrower_email || '',
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
    } else {
      // Send email notification to borrower (fire-and-forget)
      const selectedApp = appsList.find(a => a.application_id === selectedAppId);
      if (selectedApp?.borrower_email) {
        supabase.functions.invoke('send-message-notification', {
          body: {
            borrowerEmail: selectedApp.borrower_email,
            borrowerName: selectedApp.borrower_name,
            messagePreview: text,
            messageType: 'text',
          },
        }).catch(err => console.error('⚠️ Message notification failed:', err));
      }
    }
    setSending(false);
  };

  // Generate TTS preview (does NOT send yet)
  const generateTTSPreview = async () => {
    if (!newMessage.trim() || !user || !selectedAppId) return;
    const ttsText = newMessage.trim();
    setTtsLoading(true);

    try {
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
            text: ttsText,
            voice: ttsSettings.voice,
            model: 'eleven_multilingual_v2',
            voice_settings: {
              stability: ttsSettings.stability,
              similarity_boost: 0.80,
              style: ttsSettings.style,
              use_speaker_boost: true,
            },
            speed: ttsSettings.speed,
          }),
        }
      );

      if (!response.ok) {
        const errData = await response.json().catch(() => ({ error: `HTTP ${response.status}` }));
        throw new Error(errData.error || `TTS failed (${response.status})`);
      }

      const contentType = response.headers.get('Content-Type') || '';
      let audioBlob: Blob;
      if (contentType.includes('audio/')) {
        audioBlob = await response.blob();
      } else {
        const data = await response.json();
        if (data?.error) throw new Error(data.error);
        if (!data?.audioContent) throw new Error('No audio content returned');
        const dataUrl = `data:audio/mpeg;base64,${data.audioContent}`;
        const blobResp = await fetch(dataUrl);
        audioBlob = await blobResp.blob();
      }

      // Revoke previous preview URL if any
      if (ttsPreviewUrl) URL.revokeObjectURL(ttsPreviewUrl);

      const url = URL.createObjectURL(audioBlob);
      setTtsPreviewBlob(audioBlob);
      setTtsPreviewUrl(url);
      setTtsPreviewText(ttsText);
      toast({ title: 'Preview ready', description: 'Listen to the preview before sending.' });
    } catch (err: any) {
      console.error('TTS preview error:', err);
      toast({ title: 'TTS Error', description: err.message, variant: 'destructive' });
    }
    setTtsLoading(false);
  };

  // Play/pause the TTS preview with ambient background noise
  const togglePreviewPlayback = () => {
    if (!ttsPreviewUrl) return;
    if (isPreviewPlaying && previewAudioRef.current) {
      previewAudioRef.current.pause();
      stopAmbience();
      setIsPreviewPlaying(false);
    } else {
      if (previewAudioRef.current) previewAudioRef.current.pause();
      const audio = new Audio(ttsPreviewUrl);
      previewAudioRef.current = audio;
      audio.onended = () => { setIsPreviewPlaying(false); stopAmbience(); };
      audio.onerror = () => { setIsPreviewPlaying(false); stopAmbience(); toast({ title: 'Playback error', variant: 'destructive' }); };
      startAmbience();
      audio.play();
      setIsPreviewPlaying(true);
    }
  };

  // Mix ambient noise into the TTS preview blob
  const mixAmbientHandler = async () => {
    if (!ttsPreviewBlob) return;
    setIsMixing(true);
    try {
      const mixedBlob = await mixAmbientIntoAudio(ttsPreviewBlob, selectedPreset, 0.08);
      if (ttsPreviewUrl) URL.revokeObjectURL(ttsPreviewUrl);
      const url = URL.createObjectURL(mixedBlob);
      setTtsPreviewBlob(mixedBlob);
      setTtsPreviewUrl(url);
      setIsAmbientMixed(true);
      toast({ title: 'Ambient mixed', description: 'Background noise is now baked into the audio.' });
    } catch (err: any) {
      console.error('Mix ambient error:', err);
      toast({ title: 'Mix Error', description: err.message, variant: 'destructive' });
    }
    setIsMixing(false);
  };

  // Discard the TTS preview
  const discardPreview = () => {
    if (previewAudioRef.current) previewAudioRef.current.pause();
    if (ttsPreviewUrl) URL.revokeObjectURL(ttsPreviewUrl);
    setTtsPreviewBlob(null);
    setTtsPreviewUrl(null);
    setTtsPreviewText('');
    setIsPreviewPlaying(false);
    setIsAmbientMixed(false);
  };

  // Send the approved TTS preview to the borrower
  const sendTTSPreview = async () => {
    if (!ttsPreviewBlob || !user || !selectedAppId) return;
    setSending(true);

    // Optimistic update
    const tempId = `temp-tts-${Date.now()}`;
    const tempMsg: Message = {
      id: tempId,
      sender_id: user.id,
      sender_role: 'admin',
      message_type: 'voice',
      content: null,
      audio_url: null,
      transcript: null,
      is_read: false,
      created_at: new Date().toISOString(),
      _optimistic: true,
    };
    setMessages(prev => [...prev, tempMsg]);

    try {
      const fileName = `tts-${Date.now()}.mp3`;
      const filePath = `${selectedAppId}/${fileName}`;
      const { error: upErr } = await supabase.storage.from('closing-files').upload(filePath, ttsPreviewBlob, {
        contentType: 'audio/mpeg',
        cacheControl: '3600',
      });
      if (upErr) throw upErr;

      await supabase.from('closing_messages').insert({
        application_id: selectedAppId,
        sender_id: user.id,
        sender_role: 'admin',
        message_type: 'voice',
        audio_url: filePath,
        transcript: null,
        content: null,
      });

      discardPreview();
      setNewMessage('');
      toast({ title: 'Voice note sent' });

      // Send email notification to borrower (fire-and-forget)
      const selectedApp = appsList.find(a => a.application_id === selectedAppId);
      if (selectedApp?.borrower_email) {
        supabase.functions.invoke('send-message-notification', {
          body: {
            borrowerEmail: selectedApp.borrower_email,
            borrowerName: selectedApp.borrower_name,
            messagePreview: ttsPreviewText,
            messageType: 'voice',
          },
        }).catch(err => console.error('⚠️ Message notification failed:', err));
      }
    } catch (err: any) {
      console.error('TTS send error:', err);
      setMessages(prev => prev.filter(m => m.id !== tempId));
      toast({ title: 'Send Error', description: err.message, variant: 'destructive' });
    }
    setSending(false);
  };

  const playAudio = async (msg: Message) => {
    if (playingId === msg.id) {
      audioRef.current?.pause();
      stopAmbience();
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

    console.log('Playing audio from URL:', url);

    if (audioRef.current) audioRef.current.pause();
    const audio = new Audio(url);
    audioRef.current = audio;
    setPlayingId(msg.id);
    audio.onended = () => { setPlayingId(null); stopAmbience(); };
    audio.onerror = () => {
      const mediaError = audio.error;
      console.error('Audio playback error:', {
        code: mediaError?.code,
        message: mediaError?.message,
        url: url.substring(0, 100),
      });
      setPlayingId(null);
      stopAmbience();
      toast({ title: 'Playback Error', description: `Could not play audio: ${mediaError?.message || 'unknown error'}`, variant: 'destructive' });
    };

    try {
      startAmbience();
      await audio.play();
    } catch (err: any) {
      console.error('audio.play() rejected:', err);
      setPlayingId(null);
      stopAmbience();
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
            <CardHeader className="pb-2 border-b space-y-2">
              <CardTitle className="text-base">
                {appsList.find(a => a.application_id === selectedAppId)?.borrower_name || 'Chat'}
              </CardTitle>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search messages..."
                  className="w-full pl-8 pr-3 py-2 text-xs rounded-lg border border-border bg-muted/30 focus:outline-none focus:ring-1 focus:ring-primary/30"
                />
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-4 bg-muted/20">
              {messages.length === 0 && (
                <p className="text-center text-muted-foreground text-sm py-8">No messages yet.</p>
              )}
              <div className="space-y-3">
                {messages
                  .filter(msg => {
                    if (!searchQuery.trim()) return true;
                    const q = searchQuery.toLowerCase();
                    return (
                      (msg.content || '').toLowerCase().includes(q) ||
                      (msg.transcript || '').toLowerCase().includes(q)
                    );
                  })
                  .map(msg => {
                    const isAdmin = msg.sender_role === 'admin';
                    const isVoice = msg.message_type === 'voice';
                    return (
                      <div key={msg.id} className={`flex ${isAdmin ? 'justify-end' : 'justify-start'}`}>
                        <div className="max-w-[70%] space-y-1">
                          <div className={`rounded-2xl px-4 py-2.5 ${isAdmin
                            ? 'bg-primary text-primary-foreground rounded-br-md'
                            : 'bg-card border border-border rounded-bl-md'
                            }`}>
                            {!isVoice && msg.content && <p className="text-sm leading-relaxed">{msg.content}</p>}
                            {msg.audio_url && (
                              <button
                                onClick={() => playAudio(msg)}
                                className={`flex items-center gap-2 text-sm ${isAdmin ? 'text-primary-foreground/80 hover:text-primary-foreground' : 'text-primary hover:text-primary/80'}`}
                              >
                                {playingId === msg.id ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                                {playingId === msg.id ? 'Playing...' : 'Play Audio'}
                              </button>
                            )}
                            {isVoice && !msg.audio_url && (
                              <p className={`text-sm leading-relaxed ${isAdmin ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>Sending voice note…</p>
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
              {/* TTS Preview Card */}
              {ttsPreviewUrl && (
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Volume2 className="h-3.5 w-3.5" />
                    <span className="font-medium">Voice Preview</span>
                    <span className="text-[10px] opacity-60">— "{ttsPreviewText.slice(0, 50)}{ttsPreviewText.length > 50 ? '…' : ''}"</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline" className="gap-1.5 rounded-lg" onClick={togglePreviewPlayback}>
                      {isPreviewPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                      {isPreviewPlaying ? 'Pause' : 'Play'}
                    </Button>
                    <Button size="sm" variant="outline" className="gap-1.5 rounded-lg" onClick={() => { generateTTSPreview(); setIsAmbientMixed(false); }} disabled={ttsLoading}>
                      {ttsLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RotateCcw className="h-3.5 w-3.5" />}
                      Regenerate
                    </Button>
                    <Button
                      size="sm"
                      variant={isAmbientMixed ? 'default' : 'outline'}
                      className={`gap-1.5 rounded-lg ${isAmbientMixed ? 'bg-purple-600 hover:bg-purple-700 text-white' : ''}`}
                      onClick={mixAmbientHandler}
                      disabled={isMixing || isAmbientMixed}
                    >
                      {isMixing ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Headphones className="h-3.5 w-3.5" />}
                      {isAmbientMixed ? '✓ Ambient Mixed' : isMixing ? 'Mixing...' : 'Mix Ambient'}
                    </Button>
                    <Button size="sm" className="gap-1.5 rounded-lg bg-green-600 hover:bg-green-700 text-white" onClick={sendTTSPreview} disabled={sending}>
                      {sending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
                      Send
                    </Button>
                    <Button size="sm" variant="ghost" className="gap-1.5 rounded-lg text-destructive hover:text-destructive" onClick={discardPreview}>
                      <Trash2 className="h-3.5 w-3.5" />
                      Discard
                    </Button>
                  </div>
                  {/* Ambient Preset Selector */}
                  {!isAmbientMixed && (
                    <div className="flex items-center gap-2">
                      <Headphones className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                      <select
                        value={selectedPreset}
                        onChange={(e) => setSelectedPreset(e.target.value)}
                        className="flex-1 text-xs border rounded-lg p-1.5 bg-background"
                        disabled={isMixing}
                      >
                        {AMBIENT_PRESETS.map(p => (
                          <option key={p.id} value={p.id}>{p.label} — {p.description}</option>
                        ))}
                      </select>
                    </div>
                  )}
                  {isAmbientMixed && (
                    <p className="text-[10px] text-purple-600 flex items-center gap-1">
                      <Headphones className="h-3 w-3" />
                      Mixed with: {AMBIENT_PRESETS.find(p => p.id === selectedPreset)?.label}
                    </p>
                  )}
                </div>
              )}

              {/* TTS Settings Panel (collapsible) */}
              <button
                onClick={() => setShowTTSPanel(!showTTSPanel)}
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors w-full"
              >
                <Settings2 className="h-3.5 w-3.5" />
                <span>Voice Settings</span>
                {showTTSPanel ? <ChevronUp className="h-3 w-3 ml-auto" /> : <ChevronDown className="h-3 w-3 ml-auto" />}
              </button>

              {showTTSPanel && (
                <div className="bg-muted/30 rounded-xl p-3 space-y-3 border border-border/50">
                  {/* Voice Selector */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Voice</label>
                    <select
                      value={ttsSettings.voice}
                      onChange={(e) => updateTTSSetting('voice', e.target.value)}
                      className="w-full text-xs border rounded-lg p-2 bg-background"
                    >
                      {VOICE_OPTIONS.map(v => (
                        <option key={v.value} value={v.value}>{v.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Stability Slider */}
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Stability (Consistency)</label>
                      <span className="text-[10px] text-muted-foreground">{ttsSettings.stability.toFixed(2)}</span>
                    </div>
                    <Slider
                      value={[ttsSettings.stability]}
                      min={0} max={1} step={0.05}
                      onValueChange={([v]) => updateTTSSetting('stability', v)}
                      className="w-full"
                    />
                    <div className="flex justify-between text-[9px] text-muted-foreground/60">
                      <span>More Emotional</span>
                      <span>More Stable</span>
                    </div>
                  </div>

                  {/* Style Slider */}
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Style (Expressiveness)</label>
                      <span className="text-[10px] text-muted-foreground">{ttsSettings.style.toFixed(2)}</span>
                    </div>
                    <Slider
                      value={[ttsSettings.style]}
                      min={0} max={1} step={0.05}
                      onValueChange={([v]) => updateTTSSetting('style', v)}
                      className="w-full"
                    />
                    <div className="flex justify-between text-[9px] text-muted-foreground/60">
                      <span>Neutral</span>
                      <span>Dramatic</span>
                    </div>
                  </div>

                  {/* Speed Slider */}
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Speed</label>
                      <span className="text-[10px] text-muted-foreground">{ttsSettings.speed.toFixed(2)}x</span>
                    </div>
                    <Slider
                      value={[ttsSettings.speed]}
                      min={0.5} max={2.0} step={0.05}
                      onValueChange={([v]) => updateTTSSetting('speed', v)}
                      className="w-full"
                    />
                    <div className="flex justify-between text-[9px] text-muted-foreground/60">
                      <span>Slow</span>
                      <span>Fast</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Message Input + Send Buttons */}
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
                onClick={generateTTSPreview}
                disabled={ttsLoading || !newMessage.trim()}
              >
                {ttsLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mic className="h-4 w-4" />}
                {ttsLoading ? 'Generating Preview...' : 'Generate Voice Preview (TTS)'}
              </Button>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
