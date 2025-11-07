import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

interface DivyaDrishtiPageProps {
  language: 'en' | 'hi';
}

const translations = {
  en: {
    title: 'Divya Drishti',
    subtitle: 'Divine Insights from Ancient Wisdom',
    newDrishti: 'New Drishti',
    loading: 'Receiving divine wisdom...'
  },
  hi: {
    title: 'दिव्य दृष्टि',
    subtitle: 'प्राचीन ज्ञान से दिव्य अंतर्दृष्टि',
    newDrishti: 'नई दृष्टि',
    loading: 'दिव्य ज्ञान प्राप्त कर रहे हैं...'
  }
};

// Mock quotes - in real app, these would come from Firestore
const mockQuotes = [
  {
    en: 'You have the right to perform your duties, but you are not entitled to the fruits of your actions.',
    hi: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।',
    source: 'Bhagavad Gita 2.47'
  },
  {
    en: 'The soul is neither born, and nor does it die. It is unborn, eternal, everlasting, and primeval.',
    hi: 'न जायते म्रियते वा कदाचित्।',
    source: 'Bhagavad Gita 2.20'
  },
  {
    en: 'When meditation is mastered, the mind is unwavering like the flame of a lamp in a windless place.',
    hi: 'यथा दीपो निवातस्थो नेङ्गते सोपमा स्मृता।',
    source: 'Bhagavad Gita 6.19'
  },
  {
    en: 'Set thy heart upon thy work, but never on its reward.',
    hi: 'योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय।',
    source: 'Bhagavad Gita 2.48'
  },
  {
    en: 'The mind acts like an enemy for those who do not control it.',
    hi: 'बन्धुरात्मात्मनस्तस्य येनात्मैवात्मना जितः।',
    source: 'Bhagavad Gita 6.6'
  }
];

export default function DivyaDrishtiPage({ language }: DivyaDrishtiPageProps) {
  const [currentQuote, setCurrentQuote] = useState(mockQuotes[0]);
  const [loading, setLoading] = useState(false);
  const t = translations[language];

  const fetchNewQuote = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const randomQuote = mockQuotes[Math.floor(Math.random() * mockQuotes.length)];
      setCurrentQuote(randomQuote);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen py-8 px-4 animate-fade-in">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-3" data-testid="text-page-title">
            {t.title}
          </h1>
          <p className="text-lg text-muted-foreground italic">
            {t.subtitle}
          </p>
        </div>

        <Card className="mb-8 border-2 border-secondary/30 bg-gradient-to-br from-card to-muted/30 shadow-lg">
          <CardContent className="p-8 md:p-12">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-pulse-slow text-4xl mb-4">🪷</div>
                <p className="text-muted-foreground italic">{t.loading}</p>
              </div>
            ) : (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center">
                  <p className="font-serif text-2xl md:text-3xl leading-relaxed mb-4 text-foreground" data-testid="text-quote-sanskrit">
                    {currentQuote.hi}
                  </p>
                  <p className="text-lg md:text-xl leading-relaxed text-muted-foreground italic" data-testid="text-quote-english">
                    {currentQuote.en}
                  </p>
                </div>
                <div className="text-center pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground font-medium" data-testid="text-quote-source">
                    — {currentQuote.source}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="text-center">
          <Button
            size="lg"
            onClick={fetchNewQuote}
            disabled={loading}
            data-testid="button-new-drishti"
            className="gap-2 hover-elevate active-elevate-2"
          >
            <Sparkles className="w-5 h-5" />
            {t.newDrishti}
          </Button>
        </div>
      </div>
    </div>
  );
}
