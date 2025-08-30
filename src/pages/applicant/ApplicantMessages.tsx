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
  Image
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
      // Mock conversations for now
      const mockConversations: Conversation[] = [
        {
          id: '1',
          title: 'General Loan Discussion',
          last_message_at: new Date().toISOString(),
          status: 'active'
        },
        {
          id: '2', 
          title: 'Document Requirements',
          last_message_at: new Date(Date.now() - 86400000).toISOString(),
          status: 'active'
        }
      ];
      
      setConversations(mockConversations);
      if (mockConversations.length > 0 && !selectedConversation) {
        setSelectedConversation(mockConversations[0].id);
      }
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (conversationId: string) => {
    try {
      // Mock messages for now
      const mockMessages: Message[] = [
        {
          id: '1',
          content: 'Hello! I wanted to check on the status of my loan application. Are there any updates?',
          message_type: 'text',
          is_tts: false,
          created_at: new Date(Date.now() - 3600000).toISOString(),
          sender_id: profile?.user_id || '',
          sender_name: profile?.full_name || 'You',
          sender_role: 'borrower'
        },
        {
          id: '2',
          content: 'Thank you for reaching out! Your application is currently in underwriting. We expect to have an update by end of week.',
          message_type: 'text',
          is_tts: true,
          created_at: new Date(Date.now() - 1800000).toISOString(),
          sender_id: 'loan-officer-1',
          sender_name: 'Sarah Johnson',
          sender_role: 'loan_officer'
        },
        {
          id: '3',
          content: 'We may need a few additional documents. I\'ll send you the list shortly.',
          message_type: 'text',
          is_tts: true,
          created_at: new Date(Date.now() - 1700000).toISOString(),
          sender_id: 'loan-officer-1',
          sender_name: 'Sarah Johnson',
          sender_role: 'loan_officer'
        }
      ];
      
      setMessages(mockMessages);
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

  const startVoiceRecording = () => {
    setIsRecording(true);
    toast({
      title: 'Recording started',
      description: 'Voice recording functionality will be implemented.'
    });
    
    // Mock recording - in real implementation, use Web Audio API
    setTimeout(() => {
      setIsRecording(false);
      const voiceMsg: Message = {
        id: Date.now().toString(),
        content: 'Voice message',
        message_type: 'voice',
        voice_duration: 15,
        is_tts: false,
        created_at: new Date().toISOString(),
        sender_id: profile?.user_id || '',
        sender_name: profile?.full_name || 'You',
        sender_role: 'borrower'
      };
      setMessages(prev => [...prev, voiceMsg]);
      toast({
        title: 'Voice message sent',
        description: 'Your voice message has been recorded and sent.'
      });
    }, 3000);
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

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Messages</h1>
        <p className="text-muted-foreground">
          All your loan conversations in one spot - We typically reply within one hour
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
        {/* Conversations List */}
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg">Conversations</CardTitle>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-80">
                <div className="space-y-2 p-4">
                  {conversations.map((conversation) => (
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
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Messages Area */}
        <div className="lg:col-span-3">
          <Card className="h-full flex flex-col">
            <CardHeader className="flex-shrink-0">
              <div className="flex justify-between items-center">
                <CardTitle>
                  {conversations.find(c => c.id === selectedConversation)?.title || 'Select a conversation'}
                </CardTitle>
                <Button onClick={exportConversation} variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col p-0">
              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {filteredMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender_role === 'borrower' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-lg ${
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
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
              
              {/* Message Input */}
              <div className="border-t p-4 space-y-3">
                <div className="flex space-x-2">
                  <Textarea
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                    className="flex-1 min-h-[40px] max-h-[120px]"
                  />
                  <div className="flex flex-col space-y-2">
                    <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={isRecording ? stopVoiceRecording : startVoiceRecording}
                    className={isRecording ? 'bg-red-500 text-white' : ''}
                  >
                    {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    {isRecording ? 'Stop Recording' : 'Voice Note'}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Paperclip className="h-4 w-4 mr-2" />
                    Attach Files
                  </Button>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}