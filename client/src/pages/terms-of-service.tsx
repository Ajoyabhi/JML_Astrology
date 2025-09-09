import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { FileText, Users, CreditCard, Shield, AlertTriangle, Scale } from 'lucide-react';
import Navigation from '@/components/Navigation';
import DonationBanner from '@/components/DonationBanner';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function TermsOfService() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      icon: FileText,
      content: [
        {
          subtitle: 'Agreement to Terms',
          text: 'By accessing and using JMLAstro, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.'
        },
        {
          subtitle: 'Modification of Terms',
          text: 'We reserve the right to update, change or replace any part of these Terms of Service by posting updates and/or changes to our website. It is your responsibility to check this page periodically for changes.'
        },
        {
          subtitle: 'Age Requirements',
          text: 'You must be at least 18 years old to use our services. By using our platform, you represent and warrant that you are at least 18 years of age.'
        }
      ]
    },
    {
      id: 'services',
      title: 'Description of Services',
      icon: Users,
      content: [
        {
          subtitle: 'Astrology Services',
          text: 'JMLAstro provides astrology consultations, birth chart readings, horoscope analysis, and related spiritual guidance services. Our services are for entertainment and educational purposes and should not replace professional medical, legal, or financial advice.'
        },
        {
          subtitle: 'Service Availability',
          text: 'We strive to maintain continuous service availability but do not guarantee uninterrupted access. Services may be temporarily unavailable due to maintenance, technical issues, or circumstances beyond our control.'
        },
        {
          subtitle: 'Accuracy Disclaimer',
          text: 'While we strive for accuracy in our astrological readings and interpretations, we cannot guarantee the accuracy, completeness, or reliability of any astrological information or predictions provided through our platform.'
        },
        {
          subtitle: 'Practitioner Network',
          text: 'Our platform connects users with independent astrologers and spiritual practitioners. While we verify credentials and maintain quality standards, each practitioner is responsible for their own services and conduct.'
        }
      ]
    },
    {
      id: 'user-accounts',
      title: 'User Accounts and Responsibilities',
      icon: Users,
      content: [
        {
          subtitle: 'Account Creation',
          text: 'To access certain features, you must create an account with accurate and complete information. You are responsible for maintaining the confidentiality of your account credentials.'
        },
        {
          subtitle: 'Prohibited Conduct',
          text: 'You agree not to use our platform for any unlawful purpose or to violate any laws. Prohibited activities include harassment, spam, impersonation, or any activity that could harm our platform or other users.'
        },
        {
          subtitle: 'Content Responsibility',
          text: 'You are responsible for any content you post or share through our platform. You grant us a non-exclusive license to use, display, and distribute your content as necessary to provide our services.'
        },
        {
          subtitle: 'Account Termination',
          text: 'We reserve the right to suspend or terminate your account at any time for violation of these terms, fraudulent activity, or any other reason we deem necessary to protect our platform and users.'
        }
      ]
    },
    {
      id: 'payments',
      title: 'Payment Terms and Billing',
      icon: CreditCard,
      content: [
        {
          subtitle: 'Payment Processing',
          text: 'All payments are processed securely through our third-party payment processors. By making a payment, you authorize us to charge your chosen payment method for the services requested.'
        },
        {
          subtitle: 'Pricing and Fees',
          text: 'Service prices are displayed in Indian Rupees (INR) and are subject to change without notice. Additional fees may apply for premium services or features.'
        },
        {
          subtitle: 'Booking and Cancellation',
          text: 'Consultation bookings require advance payment. Cancellations must be made at least 24 hours before the scheduled time to be eligible for a refund, subject to our refund policy.'
        },
        {
          subtitle: 'Refund Policy',
          text: 'Refunds are processed according to our separate Refund Policy. Generally, refunds are available for cancelled sessions, technical issues preventing service delivery, or significant service quality issues.'
        }
      ]
    },
    {
      id: 'intellectual-property',
      title: 'Intellectual Property Rights',
      icon: Shield,
      content: [
        {
          subtitle: 'Platform Content',
          text: 'All content on the JMLAstro platform, including text, graphics, logos, images, and software, is the property of JMLAstro or its content suppliers and is protected by intellectual property laws.'
        },
        {
          subtitle: 'User License',
          text: 'We grant you a limited, non-exclusive, non-transferable license to access and use our platform for personal, non-commercial purposes in accordance with these terms.'
        },
        {
          subtitle: 'Restrictions',
          text: 'You may not reproduce, distribute, modify, or create derivative works from our content without explicit written permission. You may not use our platform for any commercial purpose without authorization.'
        },
        {
          subtitle: 'Trademark Rights',
          text: 'JMLAstro, our logo, and other marks are trademarks of our company. You may not use our trademarks without prior written consent.'
        }
      ]
    },
    {
      id: 'limitations',
      title: 'Limitations and Disclaimers',
      icon: AlertTriangle,
      content: [
        {
          subtitle: 'Service Limitations',
          text: 'Our astrology services are provided "as is" without warranties of any kind. We disclaim all warranties, express or implied, including warranties of merchantability and fitness for a particular purpose.'
        },
        {
          subtitle: 'Liability Limitations',
          text: 'To the maximum extent permitted by law, JMLAstro shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services.'
        },
        {
          subtitle: 'Maximum Liability',
          text: 'Our total liability to you for any claims arising from these terms or your use of our services shall not exceed the amount you paid us in the 12 months preceding the claim.'
        },
        {
          subtitle: 'Third-Party Services',
          text: 'Our platform may integrate with third-party services or contain links to third-party websites. We are not responsible for the content, privacy practices, or terms of service of these third parties.'
        }
      ]
    },
    {
      id: 'dispute-resolution',
      title: 'Dispute Resolution and Governing Law',
      icon: Scale,
      content: [
        {
          subtitle: 'Governing Law',
          text: 'These terms and your use of our services are governed by the laws of India, without regard to conflict of law principles. Any legal action must be filed in the courts of New Delhi, India.'
        },
        {
          subtitle: 'Dispute Resolution Process',
          text: 'We encourage users to contact us directly to resolve any disputes. If direct resolution is not possible, disputes will be resolved through binding arbitration in accordance with Indian arbitration laws.'
        },
        {
          subtitle: 'Class Action Waiver',
          text: 'You agree to resolve disputes individually and waive your right to participate in class action lawsuits or similar group proceedings against JMLAstro.'
        },
        {
          subtitle: 'Limitation Period',
          text: 'Any claim arising from these terms or your use of our services must be filed within one year after the claim arose, or it will be permanently barred.'
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
              <FileText className="h-8 w-8 text-cosmic-900" />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
              Terms of Service
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Please read these terms carefully before using our astrology platform and services.
            </p>
            <div className="mt-6 text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </motion.div>

          {/* Important Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <Alert className="border-primary/30 bg-primary/10">
              <AlertTriangle className="h-4 w-4 text-primary" />
              <AlertDescription className="text-foreground">
                <strong>Important:</strong> Our astrology services are provided for entertainment and educational purposes only. 
                They should not be considered as substitutes for professional medical, legal, financial, or psychological advice. 
                Please consult qualified professionals for specific concerns in these areas.
              </AlertDescription>
            </Alert>
          </motion.div>

          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-card rounded-2xl p-8 mb-8 border border-border"
          >
            <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">
              Welcome to JMLAstro
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms of Service ("Terms") govern your use of the JMLAstro website and mobile application (collectively, the "Platform") 
              operated by JMLAstro ("we," "us," or "our"). By accessing or using our Platform, you agree to be bound by these Terms. 
              If you disagree with any part of these terms, then you may not access our Platform or use our services.
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

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12"
          >
            <Card className="glass-card border border-border">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border">
                <CardTitle className="flex items-center text-2xl font-serif font-semibold text-foreground">
                  <FileText className="h-6 w-6 mr-3 text-primary" />
                  Questions About These Terms?
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <div className="space-y-2">
                  <p className="text-foreground">
                    <strong>Email:</strong> <span className="text-primary">legal@jmlastro.in</span>
                  </p>
                  <p className="text-foreground">
                    <strong>Phone:</strong> <span className="text-primary">+91 63889 27010</span>
                  </p>
                  <p className="text-foreground">
                    <strong>Address:</strong> <span className="text-muted-foreground">Nauka vihar near richi rich cafe gorakhpur pin 273017</span>
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
