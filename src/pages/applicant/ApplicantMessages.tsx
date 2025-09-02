import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Send, 
  Mic, 
  MicOff, 
  Paperclip, 
  Search, 
  Download,
  Play,
  Pause,
  FileText,
  Image,
  MessageSquare
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Message {
  id: string;
  content: string;
  message_type: 'text' | 'voice' | 'file';
  file_path?: string;
  file_name?: string;
  file_size?: number;
  voice_duration?: number;
  is_tts: boolean;
  created_at: string;
  sender_id: string;
  sender_name: string;
  sender_role: string;
}

interface Conversation {
  id: string;
  title: string;
  last_message_at: string;
  status: string;
}

export default function ApplicantMessages() {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation);
    }
  }, [selectedConversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchConversations = async () => {
    try {
      // No auto-generated conversations - start with empty list
      setConversations([]);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (conversationId: string) => {
    try {
      // No auto-generated messages - start with empty conversation
      setMessages([]);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const messageContent = newMessage.trim();
    setNewMessage('');

    try {
      // Create new message object
      const newMsg: Message = {
        id: Date.now().toString(),
        content: messageContent,
        message_type: 'text',
        is_tts: false,
        created_at: new Date().toISOString(),
        sender_id: profile?.user_id || '',
        sender_name: profile?.full_name || 'You',
        sender_role: 'borrower'
      };

      setMessages(prev => [...prev, newMsg]);
      
      toast({
        title: 'Message sent',
        description: 'Your message has been sent successfully.'
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive'
      });
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach(file => {
      const newMsg: Message = {
        id: Date.now().toString() + Math.random(),
        content: `Uploaded file: ${file.name}`,
        message_type: 'file',
        file_name: file.name,
        file_size: file.size,
        is_tts: false,
        created_at: new Date().toISOString(),
        sender_id: profile?.user_id || '',
        sender_name: profile?.full_name || 'You',
        sender_role: 'borrower'
      };

      setMessages(prev => [...prev, newMsg]);
    });

    toast({
      title: 'Files uploaded',
      description: `${files.length} file(s) uploaded successfully.`
    });
  };

  const startVoiceRecording = async () => {
    try {
      // Check for browser support
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Voice recording not supported in this browser');
      }

      if (!window.MediaRecorder) {
        throw new Error('MediaRecorder not supported in this browser');
      }

      setIsRecording(true);
      
      // Request microphone access with better error handling
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100,
        }
      });
      
      // Try different MIME types for better compatibility
      let mimeType = 'audio/webm;codecs=opus';
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = 'audio/webm';
        if (!MediaRecorder.isTypeSupported(mimeType)) {
          mimeType = 'audio/mp4';
          if (!MediaRecorder.isTypeSupported(mimeType)) {
            mimeType = 'audio/wav';
          }
        }
      }
      
      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      
      const chunks: BlobPart[] = [];
      const startTime = Date.now();
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const endTime = Date.now();
        const duration = Math.round((endTime - startTime) / 1000);
        
        if (duration < 1) {
          toast({
            title: 'Recording too short',
            description: 'Please record for at least 1 second.',
            variant: 'destructive'
          });
          return;
        }
        
        const audioBlob = new Blob(chunks, { type: mimeType });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        // Create voice message
        const voiceMsg: Message = {
          id: Date.now().toString(),
          content: 'Voice message',
          message_type: 'voice',
          voice_duration: duration,
          is_tts: false,
          created_at: new Date().toISOString(),
          sender_id: profile?.user_id || '',
          sender_name: profile?.full_name || 'You',
          sender_role: 'borrower',
          file_path: audioUrl
        };
        
        setMessages(prev => [...prev, voiceMsg]);
        
        toast({
          title: 'Voice message recorded',
          description: `${duration} second voice message ready to send.`
        });
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };
      
      // Start recording
      mediaRecorder.start();
      
      // Auto-stop after 60 seconds
      setTimeout(() => {
        if (mediaRecorder.state === 'recording') {
          mediaRecorder.stop();
          setIsRecording(false);
        }
      }, 60000);
      
      toast({
        title: 'Recording started',
        description: 'Recording voice message... Click stop when finished.'
      });
      
    } catch (error) {
      console.error('Error starting voice recording:', error);
      let errorMessage = 'Could not access microphone. Please check permissions.';
      
      if (error instanceof Error) {
        if (error.message.includes('not supported')) {
          errorMessage = error.message;
        } else if (error.name === 'NotAllowedError') {
          errorMessage = 'Microphone access denied. Please allow microphone access and try again.';
        } else if (error.name === 'NotFoundError') {
          errorMessage = 'No microphone found. Please connect a microphone and try again.';
        }
      }
      
      toast({
        title: 'Recording failed',
        description: errorMessage,
        variant: 'destructive'
      });
      setIsRecording(false);
    }
  };

  const stopVoiceRecording = () => {
    setIsRecording(false);
  };


  const filteredMessages = messages.filter(message =>
    message.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const exportConversation = () => {
    if (!selectedConversation) {
      toast({
        title: "No Conversation Selected",
        description: "Please select a conversation to export.",
        variant: "destructive",
      });
      return;
    }

    const selectedConv = conversations.find(c => c.id === selectedConversation);
    if (!selectedConv || !messages.length) {
      toast({
        title: "No Messages to Export", 
        description: "This conversation has no messages to export.",
        variant: "destructive",
      });
      return;
    }

    // Create export content
    let exportContent = `Conversation Export: ${selectedConv.title}\n`;
    exportContent += `Export Date: ${new Date().toLocaleString()}\n`;
    exportContent += `Total Messages: ${messages.length}\n\n`;
    exportContent += "=" + "=".repeat(50) + "\n\n";

    // Data retention notice
    exportContent += "\n=== DATA RETENTION NOTICE ===\n";
    exportContent += "IMPORTANT: All conversation data including voice notes will be automatically deleted 90 days after loan repayment completion.\n";
    exportContent += "This export serves as your record of communications. Please save it in a secure location if you need future reference.\n";
    exportContent += "For questions about data retention, contact admin@ccif-inc.com\n\n";

    messages.forEach((message, index) => {
      const timestamp = formatTime(message.created_at);
      const date = formatDate(message.created_at);
      
      exportContent += `Message #${index + 1}\n`;
      exportContent += `Date: ${date} at ${timestamp}\n`;
      exportContent += `From: ${message.sender_name} (${message.sender_role})\n`;
      exportContent += `Type: ${message.message_type}\n\n`;
      
      if (message.content) {
        exportContent += `Content:\n${message.content}\n\n`;
      }
      
      if (message.file_name) {
        exportContent += `Attachment: ${message.file_name}`;
        if (message.file_size) {
          exportContent += ` (${formatFileSize(message.file_size)})`;
        }
        exportContent += `\nFile Path: ${message.file_path}\n\n`;
      }
      
      if (message.voice_duration) {
        exportContent += `Voice Note Duration: ${message.voice_duration} seconds\n`;
        exportContent += `Voice File: ${message.file_path}\n\n`;
      }
      
      exportContent += "-".repeat(40) + "\n\n";
    });

    // Create and download file  
    const blob = new Blob([exportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `conversation-${selectedConv.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Conversation Exported",
      description: "Your conversation has been downloaded as a text file.",
    });
  };

  // No loading screen - instant access

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Messages</h1>
        <p className="text-muted-foreground">
          All your loan conversations in one spot - We typically reply within one hour
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[calc(100vh-200px)] min-h-[500px]">
        {/* Conversations List - Mobile Responsive */}
        <div className="lg:col-span-1 lg:block hidden">
          <Card className="h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Conversations</CardTitle>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 text-sm"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[calc(100%-120px)]">
          <div className="space-y-2 p-4">
            {conversations.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p className="text-sm">Ready to start a conversation?</p>
                <p className="text-xs mt-1">Your loan officer will reach out soon</p>
              </div>
            ) : (
                    conversations.map((conversation) => (
                      <div
                        key={conversation.id}
                        onClick={() => setSelectedConversation(conversation.id)}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedConversation === conversation.id
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-accent'
                        }`}
                      >
                        <div className="font-medium text-sm">{conversation.title}</div>
                        <div className="text-xs opacity-75">
                          {formatDate(conversation.last_message_at)}
                        </div>
                        <Badge variant="secondary" className="mt-1">
                          {conversation.status}
                        </Badge>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Messages Area - Mobile First */}
        <div className="lg:col-span-3 col-span-1">
          <Card className="h-full flex flex-col">
            <CardHeader className="flex-shrink-0 pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">
                  {conversations.find(c => c.id === selectedConversation)?.title || 'New Loan Discussion'}
                </CardTitle>
                <div className="flex gap-2">
                  <Button onClick={exportConversation} variant="outline" size="sm" className="hidden sm:flex">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button onClick={exportConversation} variant="outline" size="sm" className="sm:hidden">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col p-0">
              {/* Messages */}
              <ScrollArea className="flex-1 p-3 sm:p-4">
                <div className="space-y-3 sm:space-y-4">
                  {filteredMessages.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
              <div className="text-center py-8 text-muted-foreground">
                <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm font-medium">Voice messages only</p>
                <p className="text-xs mt-1">Use the voice recording button below to send messages</p>
              </div>
                    </div>
                  ) : (
                    filteredMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender_role === 'borrower' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[85%] sm:max-w-[70%] p-3 rounded-lg ${
                          message.sender_role === 'borrower'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium">{message.sender_name}</span>
                          <span className="text-xs opacity-75">
                            {formatTime(message.created_at)}
                          </span>
                        </div>
                        
                        {message.message_type === 'text' && (
                          <p className="text-sm">{message.content}</p>
                        )}
                        
                        {message.message_type === 'voice' && (
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="ghost" className="p-1">
                              <Play className="h-4 w-4" />
                            </Button>
                            <span className="text-xs">
                              Voice message ({message.voice_duration}s)
                            </span>
                          </div>
                        )}
                        
                        {message.message_type === 'file' && (
                          <div className="flex items-center space-x-2">
                            {message.file_name?.includes('.pdf') || message.file_name?.includes('.doc') ? (
                              <FileText className="h-4 w-4" />
                            ) : (
                              <Image className="h-4 w-4" />
                            )}
                            <div>
                              <p className="text-xs font-medium">{message.file_name}</p>
                              {message.file_size && (
                                <p className="text-xs opacity-75">
                                  {formatFileSize(message.file_size)}
                                </p>
                              )}
                            </div>
                          </div>
                        )}
                        
                        {message.is_tts && (
                          <Badge variant="secondary" className="mt-1 text-xs">
                            TTS
                          </Badge>
                        )}
                       </div>
                     </div>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
              
              {/* Voice Recording Only - No Text Input */}
              <div className="flex justify-center">
                <Button
                  onClick={isRecording ? stopVoiceRecording : startVoiceRecording}
                  variant={isRecording ? "destructive" : "default"}
                  size="lg"
                  className="flex items-center space-x-2"
                >
                  {isRecording ? (
                    <>
                      <MicOff className="h-5 w-5" />
                      <span>Stop Recording</span>
                    </>
                  ) : (
                    <>
                      <Mic className="h-5 w-5" />
                      <span>Record Voice Message</span>
                    </>
                  )}
                </Button>
              </div>
              
              <p className="text-xs text-muted-foreground text-center">
                Voice messages only. Your loan officer can send both text and voice replies.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}