import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { HelpCircle, Search, ChevronDown, ChevronRight, MessageCircle, Mail, Phone, Star, CreditCard, User, Settings, BookOpen } from 'lucide-react';
import Navigation from '@/components/Navigation';
import DonationBanner from '@/components/DonationBanner';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    {
      icon: User,
      title: 'Account & Profile',
      description: 'Manage your account settings',
      color: 'text-blue-500',
      count: 8
    },
    {
      icon: CreditCard,
      title: 'Billing & Payments',
      description: 'Payment issues and billing',
      color: 'text-green-500',
      count: 6
    },
    {
      icon: Star,
      title: 'Consultations',
      description: 'Booking and consultation help',
      color: 'text-purple-500',
      count: 10
    },
    {
      icon: Settings,
      title: 'Technical Support',
      description: 'App and website issues',
      color: 'text-orange-500',
      count: 7
    },
    {
      icon: BookOpen,
      title: 'Services & Features',
      description: 'Understanding our services',
      color: 'text-pink-500',
      count: 9
    },
    {
      icon: MessageCircle,
      title: 'General Questions',
      description: 'Common inquiries',
      color: 'text-indigo-500',
      count: 12
    }
  ];

  const faqs = [
    {
      id: 'account-1',
      category: 'Account & Profile',
      question: 'How do I create an account?',
      answer: 'To create an account, click the "Sign Up" button in the top navigation, fill in your details including name, email, and birth information. You can also sign up using Google or other social media accounts.'
    },
    {
      id: 'account-2',
      category: 'Account & Profile',
      question: 'How do I update my birth details?',
      answer: 'Go to your profile settings, click on "Birth Information" and update your birth date, time, and location. Accurate birth details are crucial for precise astrological readings.'
    },
    {
      id: 'billing-1',
      category: 'Billing & Payments',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit/debit cards, UPI, net banking, and digital wallets. All payments are processed securely through our payment gateway partners.'
    },
    {
      id: 'billing-2',
      category: 'Billing & Payments',
      question: 'How do refunds work?',
      answer: 'Refunds are processed according to our refund policy. Generally, cancellations made 24+ hours before scheduled consultations are eligible for full refunds. Please check our Refund Policy for detailed terms.'
    },
    {
      id: 'consultation-1',
      category: 'Consultations',
      question: 'How do I book a consultation?',
      answer: 'Browse our astrologers page, select your preferred astrologer, choose a time slot, and proceed to payment. You\'ll receive a confirmation email with meeting details.'
    },
    {
      id: 'consultation-2',
      category: 'Consultations',
      question: 'What if my astrologer is late or doesn\'t show up?',
      answer: 'If your astrologer is more than 15 minutes late, you can reschedule or request a refund. Contact our support team immediately for assistance.'
    },
    {
      id: 'technical-1',
      category: 'Technical Support',
      question: 'The website/app is not loading properly',
      answer: 'Try clearing your browser cache, disable ad blockers, or try a different browser. For mobile apps, try restarting the app or updating to the latest version.'
    },
    {
      id: 'technical-2',
      category: 'Technical Support',
      question: 'I can\'t join my consultation call',
      answer: 'Ensure you have a stable internet connection, allow camera/microphone permissions, and try refreshing the page. If issues persist, contact support immediately.'
    },
    {
      id: 'services-1',
      category: 'Services & Features',
      question: 'What types of astrology services do you offer?',
      answer: 'We offer personal consultations, birth chart analysis, compatibility readings, career guidance, health predictions, and various astrology tools and calculators.'
    },
    {
      id: 'services-2',
      category: 'Services & Features',
      question: 'How accurate are the predictions?',
      answer: 'Our astrologers are experienced professionals, but astrology is an interpretive art. Predictions are based on astrological principles and should be used as guidance, not absolute certainty.'
    },
    {
      id: 'general-1',
      category: 'General Questions',
      question: 'Is my personal information secure?',
      answer: 'Yes, we take data security seriously. All personal information is encrypted and stored securely. We never share your data with third parties without consent. Read our Privacy Policy for details.'
    },
    {
      id: 'general-2',
      category: 'General Questions',
      question: 'Do you offer services in multiple languages?',
      answer: 'Yes, we have astrologers who speak Hindi, English, and several regional languages. You can filter astrologers by language preference when booking.'
    }
  ];

  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <DonationBanner />
      
      <main className="pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 pt-8"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full mb-6 floating-element">
              <HelpCircle className="h-8 w-8 text-cosmic-900" />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
              Help Center
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Find answers to common questions and get the support you need for your cosmic journey.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search for help articles, FAQs, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 h-12 text-lg border-border bg-input"
              />
            </div>
          </motion.div>

          {/* Categories */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          >
            {categories.map((category, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="glass-card border border-border hover:scale-105 transition-all duration-300 cursor-pointer h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-full bg-background ${category.color}`}>
                        <category.icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-2">{category.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
                        <Badge variant="outline" className="text-xs">
                          {category.count} articles
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-serif font-bold text-foreground mb-8 text-center">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              {filteredFAQs.map((faq) => (
                <Card key={faq.id} className="glass-card border border-border">
                  <Collapsible
                    open={openFAQ === faq.id}
                    onOpenChange={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
                  >
                    <CollapsibleTrigger className="w-full">
                      <CardHeader className="hover:bg-muted/30 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3 text-left">
                            <Badge variant="outline" className="text-xs shrink-0">
                              {faq.category}
                            </Badge>
                            <CardTitle className="text-lg font-medium text-foreground">
                              {faq.question}
                            </CardTitle>
                          </div>
                          {openFAQ === faq.id ? (
                            <ChevronDown className="h-5 w-5 text-muted-foreground" />
                          ) : (
                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                      </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent className="pt-0 pb-6">
                        <p className="text-muted-foreground leading-relaxed pl-3 border-l-2 border-primary/30">
                          {faq.answer}
                        </p>
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              ))}
            </div>

            {filteredFAQs.length === 0 && searchQuery && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No results found
                </h3>
                <p className="text-muted-foreground mb-6">
                  Try different keywords or browse our categories above.
                </p>
                <Button 
                  onClick={() => setSearchQuery('')}
                  className="bg-gradient-to-r from-primary to-accent text-cosmic-900"
                >
                  Clear Search
                </Button>
              </div>
            )}
          </motion.div>

          {/* Contact Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="glass-card border border-primary/30 bg-gradient-to-r from-primary/5 to-accent/5">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-serif font-bold text-foreground mb-4">
                  Still need help?
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Can't find what you're looking for? Our support team is here to help you with any questions or issues you might have.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild className="bg-gradient-to-r from-primary to-accent text-cosmic-900 hover:shadow-lg">
                    <a href="/contact-us">
                      <Mail className="h-4 w-4 mr-2" />
                      Contact Support
                    </a>
                  </Button>
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Us: +91 63889 27010
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
