import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Book, X } from 'lucide-react';

interface BooksPageProps {
  language: 'en' | 'hi';
}

interface BookData {
  id: string;
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  content: string;
}

const translations = {
  en: {
    title: 'Holy Scriptures',
    subtitle: 'Ancient Wisdom for Modern Times',
    close: 'Close',
    read: 'Read'
  },
  hi: {
    title: 'पवित्र ग्रंथ',
    subtitle: 'आधुनिक समय के लिए प्राचीन ज्ञान',
    close: 'बंद करें',
    read: 'पढ़ें'
  }
};

// Mock books data - in real app, this would come from Firestore
const mockBooks: BookData[] = [
  {
    id: '1',
    title: 'Bhagavad Gita',
    titleHi: 'भगवद गीता',
    description: 'The eternal dialogue between Lord Krishna and Arjuna on the battlefield of Kurukshetra.',
    descriptionHi: 'कुरुक्षेत्र के युद्ध के मैदान में भगवान कृष्ण और अर्जुन के बीच शाश्वत संवाद।',
    content: `Chapter 1: Arjuna Vishada Yoga

On the battlefield of Kurukshetra, when Arjuna saw his kinsmen, teachers, and friends arrayed against him, he was overcome with grief and confusion. Laying down his bow, he turned to Lord Krishna for guidance.

"O Krishna, seeing my own people arrayed and eager for battle, my limbs fail me and my mouth is parched. My body trembles and my hair stands on end. How can I fight against those whom I should honor?"

Lord Krishna responded, "You grieve for those who should not be grieved for. The wise grieve neither for the living nor the dead. Never was there a time when I did not exist, nor you, nor these kings. Nor will there be a time when we shall cease to be."

Chapter 2: Sankhya Yoga

"You have the right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Never consider yourself to be the cause of the results of your activities, nor be attached to inaction.

Perform your duty equipoised, O Arjuna, abandoning all attachment to success or failure. Such equanimity is called yoga."

The soul is never born and never dies. It is unborn, eternal, everlasting, and primeval. It is not slain when the body is slain.

As a person sheds worn-out garments and wears new ones, likewise, at the time of death, the soul casts off its worn-out body and enters a new one.`
  },
  {
    id: '2',
    title: 'Upanishads',
    titleHi: 'उपनिषद',
    description: 'Ancient philosophical texts forming the theoretical basis for the Hindu religion.',
    descriptionHi: 'प्राचीन दार्शनिक ग्रंथ जो हिंदू धर्म के लिए सैद्धांतिक आधार बनाते हैं।',
    content: `From the Mundaka Upanishad:

"Two birds, inseparable companions, perch on the same tree. One eats the fruit, the other looks on in detachment.

The first bird represents the individual self, caught in the pleasure and pain of the material world. The second bird is the Universal Self, watching without attachment.

When the first bird comes to know the second bird, it realizes its true nature and becomes free from all sorrow."

From the Chandogya Upanishad:

"In the beginning, there was only Being, one without a second. Some say there was only Non-being, one without a second. But how could Being come from Non-being?

In truth, there was only Being in the beginning, one without a second. Being thought, 'May I become many. May I grow forth.' Thus, it created fire.

The essence of all beings is That. That is Reality. That is the Self. Tat tvam asi - That thou art."`
  },
  {
    id: '3',
    title: 'Yoga Sutras',
    titleHi: 'योग सूत्र',
    description: 'Patanjali\'s classical text on the philosophy and practice of yoga.',
    descriptionHi: 'योग के दर्शन और अभ्यास पर पतंजलि का शास्त्रीय ग्रंथ।',
    content: `Patanjali's Yoga Sutras - Book One: Samadhi Pada

Sutra 1.1: Now, the teachings of yoga begin.

Sutra 1.2: Yoga is the cessation of the fluctuations of the mind.

Sutra 1.3: Then the seer abides in its own true nature.

Sutra 1.12: Practice and non-attachment are the means to still the movements of consciousness.

Sutra 1.13: Practice is the effort to secure steadiness.

Sutra 1.14: This practice becomes firmly established when it has been cultivated for a long time, without interruption, and with sincere devotion.

Book Two: Sadhana Pada

Sutra 2.1: Yoga in practice is of three parts: discipline, self-study, and orientation toward the ideal of pure awareness.

Sutra 2.29: The eight limbs of yoga are: yama (moral restraints), niyama (observances), asana (posture), pranayama (breath control), pratyahara (sense withdrawal), dharana (concentration), dhyana (meditation), and samadhi (absorption).`
  }
];

export default function BooksPage({ language }: BooksPageProps) {
  const [selectedBook, setSelectedBook] = useState<BookData | null>(null);
  const t = translations[language];

  return (
    <div className="min-h-screen py-8 px-4 animate-fade-in">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-3" data-testid="text-page-title">
            {t.title}
          </h1>
          <p className="text-lg text-muted-foreground italic">
            {t.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockBooks.map((book) => (
            <Card
              key={book.id}
              className="hover-elevate active-elevate-2 cursor-pointer transition-all duration-300 hover:scale-105"
              onClick={() => setSelectedBook(book)}
              data-testid={`card-book-${book.id}`}
            >
              <CardHeader className="gap-3">
                <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center">
                  <Book className="w-8 h-8 text-secondary" />
                </div>
                <CardTitle className="text-2xl font-serif">
                  {language === 'en' ? book.title : book.titleHi}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {language === 'en' ? book.description : book.descriptionHi}
                </CardDescription>
                <Button
                  variant="outline"
                  className="mt-4 w-full hover-elevate active-elevate-2"
                  data-testid={`button-read-${book.id}`}
                >
                  {t.read}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Book Reading Modal */}
        <Dialog open={!!selectedBook} onOpenChange={() => setSelectedBook(null)}>
          <DialogContent className="max-w-3xl max-h-[80vh]">
            <DialogHeader>
              <DialogTitle className="text-3xl font-serif text-primary">
                {selectedBook && (language === 'en' ? selectedBook.title : selectedBook.titleHi)}
              </DialogTitle>
              <DialogDescription>
                {selectedBook && (language === 'en' ? selectedBook.description : selectedBook.descriptionHi)}
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="h-[50vh] pr-4">
              <div className="prose prose-sm max-w-none">
                <p className="text-base leading-relaxed whitespace-pre-line text-foreground">
                  {selectedBook?.content}
                </p>
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
