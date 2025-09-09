import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Shield, Lock, Eye, Database, Mail, Phone } from 'lucide-react';
import Navigation from '@/components/Navigation';
import DonationBanner from '@/components/DonationBanner';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      id: 'information-collection',
      title: 'Information We Collect',
      icon: Database,
      content: [
        {
          subtitle: 'Personal Information',
          text: 'We collect personal information that you voluntarily provide to us when you register for an account, make a consultation booking, or contact us. This includes your name, email address, phone number, date of birth, time of birth, place of birth, and payment information.'
        },
        {
          subtitle: 'Astrological Data',
          text: 'For accurate astrological readings, we collect and store your birth details including exact birth time, location coordinates, and any specific questions or concerns you share during consultations.'
        },
        {
          subtitle: 'Usage Information',
          text: 'We automatically collect information about how you use our platform, including pages visited, time spent on pages, and interaction patterns to improve our services.'
        },
        {
          subtitle: 'Device Information',
          text: 'We collect information about the device you use to access our platform, including IP address, browser type, operating system, and mobile device identifiers.'
        }
      ]
    },
    {
      id: 'information-use',
      title: 'How We Use Your Information',
      icon: Eye,
      content: [
        {
          subtitle: 'Service Provision',
          text: 'We use your personal and astrological information to provide accurate consultations, generate birth charts, and deliver the astrology services you request.'
        },
        {
          subtitle: 'Communication',
          text: 'We use your contact information to send you service updates, appointment confirmations, and important platform notifications. You can opt out of marketing communications at any time.'
        },
        {
          subtitle: 'Platform Improvement',
          text: 'We analyze usage patterns and feedback to improve our platform features, develop new services, and enhance user experience.'
        },
        {
          subtitle: 'Legal Compliance',
          text: 'We may use your information to comply with legal obligations, protect our rights, and ensure the security and integrity of our platform.'
        }
      ]
    },
    {
      id: 'information-sharing',
      title: 'Information Sharing and Disclosure',
      icon: Shield,
      content: [
        {
          subtitle: 'Astrologers and Consultants',
          text: 'We share necessary information with our verified astrologers and consultants to provide you with personalized readings and consultations. All our practitioners are bound by confidentiality agreements.'
        },
        {
          subtitle: 'Service Providers',
          text: 'We may share information with third-party service providers who assist us in operating our platform, processing payments, or providing customer support. These providers are contractually bound to protect your information.'
        },
        {
          subtitle: 'Legal Requirements',
          text: 'We may disclose your information if required by law, court order, or government regulation, or to protect the rights, property, or safety of JMLAstro, our users, or others.'
        },
        {
          subtitle: 'Business Transfers',
          text: 'In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the business transaction, subject to equivalent privacy protections.'
        }
      ]
    },
    {
      id: 'data-security',
      title: 'Data Security and Protection',
      icon: Lock,
      content: [
        {
          subtitle: 'Security Measures',
          text: 'We implement industry-standard security measures including encryption, secure servers, and access controls to protect your personal information from unauthorized access, alteration, disclosure, or destruction.'
        },
        {
          subtitle: 'Data Retention',
          text: 'We retain your personal information for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements. You can request data deletion at any time.'
        },
        {
          subtitle: 'International Transfers',
          text: 'Your information may be processed and stored in countries other than your own. We ensure adequate protection for international data transfers through appropriate safeguards.'
        }
      ]
    },
    {
      id: 'your-rights',
      title: 'Your Privacy Rights',
      icon: Shield,
      content: [
        {
          subtitle: 'Access and Portability',
          text: 'You have the right to access, review, and obtain a copy of your personal information. You can request a downloadable copy of your data at any time.'
        },
        {
          subtitle: 'Correction and Updates',
          text: 'You can update or correct your personal information through your account settings or by contacting our support team. We encourage you to keep your information current and accurate.'
        },
        {
          subtitle: 'Deletion and Erasure',
          text: 'You have the right to request deletion of your personal information, subject to certain legal and operational requirements. We will respond to deletion requests within 30 days.'
        },
        {
          subtitle: 'Marketing Communications',
          text: 'You can opt out of marketing emails by clicking the unsubscribe link in any marketing message or by updating your communication preferences in your account settings.'
        }
      ]
    }
  ];

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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 pt-8"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full mb-6 floating-element">
              <Shield className="h-8 w-8 text-cosmic-900" />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
            </p>
            <div className="mt-6 text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </motion.div>

          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card rounded-2xl p-8 mb-8 border border-border"
          >
            <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">
              Introduction
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Welcome to JMLAstro ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our astrology services. 
              Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site or use our services.
            </p>
          </motion.div>

          {/* Sections */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {sections.map((section, index) => (
              <motion.div key={section.id} variants={itemVariants}>
                <Card className="glass-card border border-border overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border">
                    <CardTitle className="flex items-center text-2xl font-serif font-semibold text-foreground">
                      <section.icon className="h-6 w-6 mr-3 text-primary" />
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      {section.content.map((item, itemIndex) => (
                        <div key={itemIndex}>
                          <h4 className="text-lg font-semibold text-foreground mb-3">
                            {item.subtitle}
                          </h4>
                          <p className="text-muted-foreground leading-relaxed">
                            {item.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12"
          >
            <Card className="glass-card border border-border">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border">
                <CardTitle className="flex items-center text-2xl font-serif font-semibold text-foreground">
                  <Mail className="h-6 w-6 mr-3 text-primary" />
                  Contact Us About Privacy
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <p className="text-muted-foreground leading-relaxed mb-6">
                  If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, 
                  please don't hesitate to contact us using the information below:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium text-foreground">Email</div>
                      <div className="text-muted-foreground">privacy@jmlastro.in</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium text-foreground">Phone</div>
                      <div className="text-muted-foreground">+91 63889 27010</div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Response Time:</strong> We aim to respond to all privacy-related inquiries within 48 hours. 
                    For data deletion requests, please allow up to 30 days for complete processing.
                  </p>
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
