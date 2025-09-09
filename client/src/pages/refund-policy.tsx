import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { CreditCard, Clock, CheckCircle, XCircle, RefreshCw, AlertCircle } from 'lucide-react';
import Navigation from '@/components/Navigation';
import DonationBanner from '@/components/DonationBanner';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

export default function RefundPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const refundScenarios = [
    {
      scenario: 'Consultation Cancellations',
      icon: Clock,
      eligible: [
        'Cancellation made 24+ hours before scheduled time',
        'Astrologer cancels the consultation',
        'Technical issues preventing the consultation'
      ],
      notEligible: [
        'Cancellation made less than 24 hours before',
        'No-show by the customer',
        'Consultation completed as scheduled'
      ],
      timeframe: '5-7 business days',
      amount: 'Full refund minus processing fees'
    },
    {
      scenario: 'Service Delivery Issues',
      icon: AlertCircle,
      eligible: [
        'Service not delivered within promised timeframe',
        'Significant quality issues with reading',
        'Wrong service delivered'
      ],
      notEligible: [
        'Customer dissatisfaction with accurate reading',
        'Change of mind after service delivery',
        'Predictions not coming true'
      ],
      timeframe: '7-10 business days',
      amount: 'Full or partial refund based on issue severity'
    },
    {
      scenario: 'Technical Failures',
      icon: RefreshCw,
      eligible: [
        'Platform downtime preventing service access',
        'Payment charged but service not activated',
        'App crashes during paid consultation'
      ],
      notEligible: [
        'User device or internet connectivity issues',
        'User error in service selection',
        'Force majeure events'
      ],
      timeframe: '3-5 business days',
      amount: 'Full refund'
    },
    {
      scenario: 'Digital Products',
      icon: CreditCard,
      eligible: [
        'Report not generated due to system error',
        'Corrupted or incomplete digital delivery',
        'Duplicate charges for same service'
      ],
      notEligible: [
        'Downloaded reports or content',
        'Customized birth charts (after delivery)',
        'Digital content accessed for 24+ hours'
      ],
      timeframe: '5-7 business days',
      amount: 'Full refund if not accessed'
    }
  ];

  const refundProcess = [
    {
      step: 1,
      title: 'Submit Request',
      description: 'Contact our support team with your order details and reason for refund',
      icon: AlertCircle
    },
    {
      step: 2,
      title: 'Review Process',
      description: 'Our team reviews your request within 48 hours and may ask for additional information',
      icon: Clock
    },
    {
      step: 3,
      title: 'Decision Notification',
      description: 'You will receive an email with our decision and next steps',
      icon: CheckCircle
    },
    {
      step: 4,
      title: 'Refund Processing',
      description: 'Approved refunds are processed to your original payment method',
      icon: CreditCard
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
              <CreditCard className="h-8 w-8 text-cosmic-900" />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
              Refund Policy
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We want you to be satisfied with our services. Here's our comprehensive refund policy.
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
              <AlertCircle className="h-4 w-4 text-primary" />
              <AlertDescription className="text-foreground">
                <strong>Important:</strong> All refund requests must be submitted within 30 days of the original purchase. 
                Refunds are processed according to the specific terms outlined below and are subject to verification.
              </AlertDescription>
            </Alert>
          </motion.div>

          {/* Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-card rounded-2xl p-8 mb-8 border border-border"
          >
            <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">
              Our Refund Commitment
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              At JMLAstro, we strive to provide exceptional astrology services and customer satisfaction. 
              While we cannot guarantee specific outcomes from astrological readings, we are committed to providing 
              quality services delivered as promised. This refund policy outlines the circumstances under which 
              refunds may be granted and the process for requesting them.
            </p>
          </motion.div>

          {/* Refund Scenarios */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8 mb-12"
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl font-serif font-bold text-foreground mb-8 text-center">
                Refund Scenarios
              </h2>
            </motion.div>
            
            {refundScenarios.map((scenario, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="glass-card border border-border overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border">
                    <CardTitle className="flex items-center text-xl font-serif font-semibold text-foreground">
                      <scenario.icon className="h-6 w-6 mr-3 text-primary" />
                      {scenario.scenario}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Eligible for Refund */}
                      <div>
                        <div className="flex items-center mb-4">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          <h4 className="text-lg font-semibold text-foreground">Eligible for Refund</h4>
                        </div>
                        <ul className="space-y-2">
                          {scenario.eligible.map((item, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 shrink-0"></div>
                              <span className="text-muted-foreground text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Not Eligible for Refund */}
                      <div>
                        <div className="flex items-center mb-4">
                          <XCircle className="h-5 w-5 text-red-500 mr-2" />
                          <h4 className="text-lg font-semibold text-foreground">Not Eligible for Refund</h4>
                        </div>
                        <ul className="space-y-2">
                          {scenario.notEligible.map((item, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 shrink-0"></div>
                              <span className="text-muted-foreground text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Refund Details */}
                    <div className="mt-6 pt-6 border-t border-border">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Badge variant="outline" className="mb-2">Processing Time</Badge>
                          <p className="text-sm text-muted-foreground">{scenario.timeframe}</p>
                        </div>
                        <div>
                          <Badge variant="outline" className="mb-2">Refund Amount</Badge>
                          <p className="text-sm text-muted-foreground">{scenario.amount}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Refund Process */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-12"
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl font-serif font-bold text-foreground mb-8 text-center">
                How to Request a Refund
              </h2>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="glass-card border border-border">
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {refundProcess.map((step, index) => (
                      <div key={index} className="text-center">
                        <div className="relative mb-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-2">
                            <step.icon className="h-6 w-6 text-cosmic-900" />
                          </div>
                          <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-cosmic-900 font-bold text-sm">
                            {step.step}
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Additional Terms */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="space-y-8"
          >
            <Card className="glass-card border border-border">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border">
                <CardTitle className="text-2xl font-serif font-semibold text-foreground">
                  Additional Terms and Conditions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-3">Processing Fees</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      A processing fee of ₹25 or 3% of the transaction amount (whichever is higher) may be deducted 
                      from refunds to cover payment gateway charges. This fee is waived for refunds due to our error 
                      or technical issues.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-3">Refund Methods</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Refunds are processed to the original payment method used for the purchase. For digital wallet 
                      payments, refunds may be issued as platform credits if the original payment method is no longer 
                      available.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-3">Subscription Services</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Subscription-based services can be cancelled at any time. Refunds for unused portions of 
                      subscriptions are calculated on a pro-rata basis, minus any applicable processing fees.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-3">Disputes and Appeals</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      If your refund request is denied, you may appeal the decision by providing additional information 
                      within 7 days. All refund decisions are final after the appeal process.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="glass-card border border-border">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border">
                <CardTitle className="text-2xl font-serif font-semibold text-foreground">
                  Need Help with Refunds?
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Our customer support team is here to help with any refund-related questions or requests:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <AlertCircle className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">Email Support</h4>
                    <p className="text-sm text-primary">refunds@jmlastro.in</p>
                    <p className="text-xs text-muted-foreground mt-1">Response within 24 hours</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">Phone Support</h4>
                    <p className="text-sm text-primary">+91 63889 27010</p>
                    <p className="text-xs text-muted-foreground mt-1">Mon-Fri, 9 AM - 6 PM IST</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <CheckCircle className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">Live Chat</h4>
                    <p className="text-sm text-primary">Available on website</p>
                    <p className="text-xs text-muted-foreground mt-1">Mon-Fri, 10 AM - 8 PM IST</p>
                  </div>
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
