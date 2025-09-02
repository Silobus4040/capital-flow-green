import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import ApplicantLayout from '@/components/ApplicantLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Send, MessageSquare, Clock } from 'lucide-react';

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

export default function ApplicantMessages() {
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      loadConversation();
    }
  }, [user]);

  useEffect(() => {
    if (conversation) {
      loadMessages();
      subscribeToMessages();
    }
  }, [conversation]);

  const loadConversation = async () => {
    if (!user) return;

    try {
      // Try to find existing conversation
      let { data: existingConversation } = await supabase
        .from('conversations')
        .select('*')
        .eq('borrower_id', user.id)
        .single();

      if (!existingConversation) {
        // Create new conversation
        const { data: newConversation, error: createError } = await supabase
          .from('conversations')
          .insert({
            borrower_id: user.id,
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
          sender_type: 'borrower',
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

  const formatMessageTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  if (loading) {
    return (
      <ApplicantLayout>
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </ApplicantLayout>
    );
  }

  return (
    <ApplicantLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center space-x-3">
          <MessageSquare className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold">Message Center</h1>
            <p className="text-muted-foreground">Communicate with your loan team</p>
          </div>
        </div>

        <Card className="h-[600px] flex flex-col">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center justify-between">
              <span>Messages with Loan Team</span>
              <Badge variant="outline" className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                Active
              </Badge>
            </CardTitle>
            <CardDescription>
              Send messages and get updates about your loan application
            </CardDescription>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto mb-4 space-y-3 p-4 border rounded-lg bg-slate-50 max-h-96">
              {messages.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2">No messages yet</p>
                  <p>Send a message to start the conversation with your loan team!</p>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender_type === 'borrower' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender_type === 'borrower'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-white border'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <div className="flex items-center justify-between mt-1">
                        <p className={`text-xs ${
                          message.sender_type === 'borrower' ? 'opacity-70' : 'text-muted-foreground'
                        }`}>
                          {formatMessageTime(message.created_at)}
                        </p>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            message.sender_type === 'borrower' ? 'border-primary-foreground/20' : 'bg-slate-100'
                          }`}
                        >
                          {message.sender_type === 'borrower' ? 'You' : 
                           message.sender_type === 'admin' ? 'Admin' : 'Loan Officer'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Message Input Area */}
            <div className="space-y-3">
              <Textarea
                placeholder="Type your message to the loan team..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                rows={3}
                className="min-h-[80px]"
              />
              
              <div className="flex justify-end">
                <Button 
                  onClick={sendMessage}
                  disabled={!newMessage.trim() || !conversation}
                  size="sm"
                  className="px-6"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ApplicantLayout>
  );
}