import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Calendar, MessageCircle, Home } from "lucide-react";

export default function PaymentSuccess() {
  const [, navigate] = useLocation();
  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    // Get completed payment data from sessionStorage
    const paymentDataString = sessionStorage.getItem('completedPayment');
    if (!paymentDataString) {
      // Redirect to home if no payment data found
      navigate('/');
      return;
    }

    try {
      const paymentData = JSON.parse(paymentDataString);
      setOrderData({
        orderId: paymentData.orderId,
        serviceName: paymentData.serviceName,
        astrologerName: paymentData.astrologerName,
        duration: paymentData.duration,
        consultationType: paymentData.consultationType,
        scheduledDate: "Today, 3:00 PM", // This would be calculated based on booking time
        amount: paymentData.amount,
        paymentMethod: "Credit Card ending in ****",
        topic: paymentData.topic,
        specialization: paymentData.specialization
      });
      
      // Clean up completed payment data after reading
      sessionStorage.removeItem('completedPayment');
    } catch (error) {
      console.error('Error parsing payment data:', error);
      navigate('/');
    }

    // Auto redirect after 10 seconds
    const timer = setTimeout(() => {
      navigate("/");
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Show loading while order data is being processed */}
          {!orderData ? (
            <div className="text-center py-20">
              <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-muted-foreground">Loading payment details...</p>
            </div>
          ) : (
            <>
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Payment Successful!
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your consultation has been booked successfully. You'll receive a confirmation email shortly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Booking Details */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Booking Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Order ID</p>
                    <p className="font-mono text-sm bg-muted px-2 py-1 rounded" data-testid="text-order-id">
                      {orderData.orderId}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Service</p>
                    <p className="font-semibold" data-testid="text-service-name">
                      {orderData.serviceName}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Astrologer</p>
                    <p className="font-semibold" data-testid="text-astrologer-name">
                      {orderData.astrologerName}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p data-testid="text-duration">{orderData.duration}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Type</p>
                      <p data-testid="text-consultation-type">{orderData.consultationType}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Scheduled</p>
                    <p className="font-semibold text-primary" data-testid="text-scheduled-date">
                      {orderData.scheduledDate}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Details */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  Payment Confirmed
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Amount Paid</p>
                    <p className="text-2xl font-bold text-green-400" data-testid="text-amount-paid">
                      ₹{orderData.amount.toLocaleString('en-IN')}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Payment Method</p>
                    <p data-testid="text-payment-method">{orderData.paymentMethod}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Transaction Date</p>
                    <p data-testid="text-transaction-date">
                      {new Date().toLocaleDateString('en-IN', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>

                <div className="bg-green-50/10 border border-green-200/20 rounded-lg p-4">
                  <p className="text-sm text-green-400 font-medium">
                    ✨ Your payment has been processed successfully and your consultation is confirmed!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Next Steps */}
          <Card className="glass-card mt-8">
            <CardHeader>
              <CardTitle>What's Next?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-6 h-6 text-cosmic-900" />
                  </div>
                  <h3 className="font-semibold mb-2">Confirmation Email</h3>
                  <p className="text-sm text-muted-foreground">
                    You'll receive a detailed confirmation email with your booking details and join instructions.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent to-gold-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-6 h-6 text-cosmic-900" />
                  </div>
                  <h3 className="font-semibold mb-2">Join Your Session</h3>
                  <p className="text-sm text-muted-foreground">
                    Use the meeting link sent to your email to join your consultation at the scheduled time.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-mystic-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-6 h-6 text-cosmic-900" />
                  </div>
                  <h3 className="font-semibold mb-2">Get Insights</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive personalized astrological insights and guidance from your expert astrologer.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button
              onClick={() => navigate("/")}
              className="bg-gradient-to-r from-primary to-gold-400 text-cosmic-900 hover:shadow-lg"
              data-testid="button-go-home"
            >
              <Home className="w-4 h-4 mr-2" />
              Return to Home
            </Button>
            
            <Button
              onClick={() => navigate("/astrologers")}
              variant="outline"
              className="border-primary/30 text-primary hover:bg-primary/10"
              data-testid="button-book-another"
            >
              Book Another Consultation
            </Button>
          </div>

          <div className="text-center mt-8 text-sm text-muted-foreground">
            <p>Redirecting to home page in <span className="text-primary">10 seconds</span>...</p>
          </div>
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}