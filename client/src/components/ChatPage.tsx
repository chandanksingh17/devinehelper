import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Send, Loader2 } from 'lucide-react';

interface ChatPageProps {
  language: 'en' | 'hi';
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  shloka?: {
    sanskrit: string;
    meaning: string;
    reference: string;
  };
}

const translations = {
  en: {
    title: 'DHRM Chat',
    subtitle: 'Vedic Philosophical Coaching',
    placeholder: 'Ask a question about dharma, karma, or life...',
    send: 'Send',
    emptyState: 'Start a conversation with your Vedic coach. Ask questions about life, dharma, or ancient wisdom.'
  },
  hi: {
    title: 'डीएचआरएम चैट',
    subtitle: 'वैदिक दार्शनिक मार्गदर्शन',
    placeholder: 'धर्म, कर्म या जीवन के बारे में प्रश्न पूछें...',
    send: 'भेजें',
    emptyState: 'अपने वैदिक कोच के साथ बातचीत शुरू करें। जीवन, धर्म या प्राचीन ज्ञान के बारे में प्रश्न पूछें।'
  }
};

// Mock AI response - in real app, this would call Gemini API
const getMockResponse = (question: string): Message => {
  return {
    role: 'assistant',
    content: 'The essence of dharma lies in performing one\'s duty without attachment to results. This principle teaches us to focus on our actions while surrendering the outcomes to the divine. By doing so, we free ourselves from anxiety and align with the cosmic order.',
    shloka: {
      sanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥',
      meaning: 'You have the right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Never consider yourself to be the cause of the results of your activities, nor be attached to inaction.',
      reference: 'Bhagavad Gita, Chapter 2, Verse 47'
    }
  };
};

export default function ChatPage({ language }: ChatPageProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const t = translations[language];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const aiResponse = getMockResponse(input);
      setMessages(prev => [...prev, aiResponse]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="h-screen flex flex-col animate-fade-in">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-serif font-bold text-primary" data-testid="text-page-title">
            {t.title}
          </h1>
          <p className="text-sm text-muted-foreground italic">
            {t.subtitle}
          </p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="container mx-auto max-w-4xl space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🕉️</div>
              <p className="text-muted-foreground italic max-w-md mx-auto">
                {t.emptyState}
              </p>
            </div>
          ) : (
            messages.map((message, idx) => (
              <div
                key={idx}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                <Card
                  className={`max-w-[85%] md:max-w-[75%] p-4 ${
                    message.role === 'user'
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-card'
                  }`}
                  data-testid={`message-${message.role}-${idx}`}
                >
                  <p className="text-base leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </p>

                  {message.shloka && (
                    <div className="mt-4 pt-4 border-t border-secondary/30 space-y-3">
                      <div className="font-serif text-lg leading-relaxed text-secondary" data-testid="text-shloka-sanskrit">
                        {message.shloka.sanskrit}
                      </div>
                      <div className="text-sm text-muted-foreground italic leading-relaxed" data-testid="text-shloka-meaning">
                        {message.shloka.meaning}
                      </div>
                      <div className="text-xs text-muted-foreground font-medium" data-testid="text-shloka-reference">
                        — {message.shloka.reference}
                      </div>
                    </div>
                  )}
                </Card>
              </div>
            ))
          )}
          {loading && (
            <div className="flex justify-start animate-fade-in">
              <Card className="p-4 bg-card">
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
              </Card>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-background px-4 py-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder={t.placeholder}
              className="min-h-[60px] max-h-[120px] resize-none"
              data-testid="input-chat-message"
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || loading}
              size="icon"
              className="h-[60px] w-[60px] shrink-0"
              data-testid="button-send-message"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
