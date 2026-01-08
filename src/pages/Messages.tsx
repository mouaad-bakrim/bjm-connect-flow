import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Send, Paperclip, MoreVertical, Phone, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: number;
  content: string;
  sender: 'me' | 'other';
  timestamp: string;
}

interface Conversation {
  id: number;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  avatar: string;
}

const mockConversations: Conversation[] = [
  {
    id: 1,
    name: 'Textile Fès',
    lastMessage: 'Bonjour, je suis intéressé par vos caftans',
    timestamp: '10:30',
    unread: 2,
    avatar: 'TF',
  },
  {
    id: 2,
    name: 'Argan Essaouira',
    lastMessage: 'Le prix pour 100 unités?',
    timestamp: 'Hier',
    unread: 0,
    avatar: 'AE',
  },
  {
    id: 3,
    name: 'Cuir Marrakech',
    lastMessage: 'Merci pour votre commande!',
    timestamp: 'Mar',
    unread: 0,
    avatar: 'CM',
  },
];

const mockMessages: Message[] = [
  { id: 1, content: 'Bonjour, je suis intéressé par vos caftans traditionnels.', sender: 'me', timestamp: '10:15' },
  { id: 2, content: 'Bonjour! Merci pour votre intérêt. Quelle quantité vous intéresse?', sender: 'other', timestamp: '10:20' },
  { id: 3, content: 'Je cherche environ 50 pièces pour mon magasin.', sender: 'me', timestamp: '10:25' },
  { id: 4, content: 'Parfait! Pour 50 pièces, nous pouvons vous proposer un prix de 400 MAD/unité.', sender: 'other', timestamp: '10:28' },
  { id: 5, content: 'Ça m\'intéresse. Quels sont les délais de livraison?', sender: 'me', timestamp: '10:30' },
];

export default function Messages() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(mockConversations[0]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [showSidebar, setShowSidebar] = useState(true);

  const handleSend = () => {
    if (!message.trim()) return;
    
    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        content: message,
        sender: 'me',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setMessage('');
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] overflow-hidden rounded-xl border border-border bg-card">
      {/* Conversations List */}
      <div
        className={cn(
          "w-full border-r border-border md:w-80 md:flex-shrink-0",
          selectedConversation && !showSidebar && "hidden md:block"
        )}
      >
        <div className="border-b border-border p-4">
          <h2 className="mb-4 text-lg font-semibold">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Rechercher..." className="pl-10" />
          </div>
        </div>
        
        <ScrollArea className="h-[calc(100%-5rem)]">
          {mockConversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => {
                setSelectedConversation(conv);
                setShowSidebar(false);
              }}
              className={cn(
                "flex w-full items-center gap-3 border-b border-border p-4 text-left transition-colors hover:bg-muted",
                selectedConversation?.id === conv.id && "bg-muted"
              )}
            >
              <Avatar>
                <AvatarFallback className="bg-primary/10 text-primary">
                  {conv.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{conv.name}</span>
                  <span className="text-xs text-muted-foreground">{conv.timestamp}</span>
                </div>
                <p className="truncate text-sm text-muted-foreground">{conv.lastMessage}</p>
              </div>
              {conv.unread > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {conv.unread}
                </span>
              )}
            </button>
          ))}
        </ScrollArea>
      </div>

      {/* Chat Area */}
      {selectedConversation ? (
        <div className={cn("flex flex-1 flex-col", showSidebar && "hidden md:flex")}>
          {/* Chat Header */}
          <div className="flex items-center gap-3 border-b border-border p-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setShowSidebar(true)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Avatar>
              <AvatarFallback className="bg-primary/10 text-primary">
                {selectedConversation.avatar}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="font-medium">{selectedConversation.name}</div>
              <div className="text-xs text-success">En ligne</div>
            </div>
            <Button variant="ghost" size="icon">
              <Phone className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex",
                    msg.sender === 'me' ? 'justify-end' : 'justify-start'
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[70%] rounded-2xl px-4 py-2",
                      msg.sender === 'me'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    )}
                  >
                    <p>{msg.content}</p>
                    <p
                      className={cn(
                        "mt-1 text-xs",
                        msg.sender === 'me' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                      )}
                    >
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="border-t border-border p-4">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Paperclip className="h-5 w-5" />
              </Button>
              <Input
                placeholder="Écrivez votre message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1"
              />
              <Button size="icon" onClick={handleSend} disabled={!message.trim()}>
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden flex-1 items-center justify-center md:flex">
          <p className="text-muted-foreground">Sélectionnez une conversation</p>
        </div>
      )}
    </div>
  );
}
