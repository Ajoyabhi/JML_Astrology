import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useForm, Controller } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Lock, CreditCard, Shield, CheckCircle, ArrowLeft, IndianRupee, Smartphone, QrCode, Copy, Phone, Heart } from "lucide-react";

interface PaymentFormData {
  // Card payment fields
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  cardholderName: string;
  
  // UPI payment fields
  upiId: string;
  upiPhone: string;
  
  // Common fields
  paymentMethod: 'card' | 'upi';
  email: string;
  phone: string;
  billingAddress: string;
  city: string;
  state: string;
  pincode: string;
  
  // Donation fields
  donationAmount?: number;
}

export default function Payment() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderData, setOrderData] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi'>('card');
  const [upiPaymentType, setUpiPaymentType] = useState<'qr' | 'upiid' | null>(null); // Track which UPI method user selected
  const [showQR, setShowQR] = useState(false);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [selectedAmount, setSelectedAmount] = useState<number>(500);
  const [qrString, setQrString] = useState<string>('');
  const [paymentId, setPaymentId] = useState<string>('');
  const [isGeneratingQR, setIsGeneratingQR] = useState(false);
  const [isWaitingForPayment, setIsWaitingForPayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success' | 'failed'>('pending');

  const { register, handleSubmit, formState: { errors }, watch, setValue, control } = useForm<PaymentFormData>({
    defaultValues: {
      paymentMethod: 'card'
    }
  });

  useEffect(() => {
    // Get booking data from sessionStorage
    const bookingDataString = sessionStorage.getItem('pendingBooking');
    if (!bookingDataString) {
      // Redirect back if no booking data
      toast({
        title: "No Booking Found",
        description: "Please start a new booking process.",
        variant: "destructive",
      });
      navigate('/astrologers');
      return;
    }

    try {
      const bookingData = JSON.parse(bookingDataString);
      
      // Handle different booking types
      if (bookingData.bookingType === 'service') {
        // Service booking
        setOrderData({
          serviceName: bookingData.serviceName,
          description: bookingData.shortDescription,
          amount: bookingData.price,
          currency: bookingData.currency,
          orderId: bookingData.orderId,
          deliveryTime: bookingData.deliveryTime,
          tags: bookingData.tags,
          bookingType: 'service'
        });
      } else if (bookingData.bookingType === 'donation') {
        // Donation booking
        setOrderData({
          serviceName: bookingData.serviceName,
          description: bookingData.description,
          amount: bookingData.amount,
          currency: bookingData.currency,
          orderId: bookingData.orderId,
          deliveryTime: bookingData.deliveryTime,
          tags: bookingData.tags,
          bookingType: 'donation'
        });
        // Set initial selected amount from donation data
        setSelectedAmount(bookingData.amount);
      } else {
        // Consultation booking (default)
        setOrderData({
          serviceName: "Astrology Consultation",
          astrologerName: bookingData.astrologerName,
          duration: `${bookingData.duration} minutes`,
          consultationType: bookingData.consultationType?.charAt(0).toUpperCase() + bookingData.consultationType?.slice(1),
          amount: bookingData.totalPrice,
          currency: "INR",
          orderId: "JML" + Date.now(),
          topic: bookingData.topic,
          specialization: bookingData.specialization,
          pricePerMinute: bookingData.pricePerMinute,
          bookingType: 'consultation'
        });
      }
    } catch (error) {
      console.error('Error parsing booking data:', error);
      toast({
        title: "Invalid Booking Data",
        description: "Please start a new booking process.",
        variant: "destructive",
      });
      navigate('/astrologers');
    }
  }, [navigate, toast]);

  // Generate QR code when user clicks "Show QR Code" button
  const handleGenerateQR = async () => {
    if (!orderData) return;
    
    setIsGeneratingQR(true);
    
    try {
      // Get form data to send email/name for guest user creation
      const formData = watch();
      
      const qrRequest = {
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        orderNumber: orderData.orderId,
        bookingType: orderData.bookingType,
        email: formData.email || '',
        firstName: formData.billingAddress?.split(' ')[0] || 'Guest',
        lastName: formData.billingAddress?.split(' ').slice(1).join(' ') || 'User'
      };

      console.log("Generating QR code with:", qrRequest);
      
      // Use fetch directly to have better error handling
      const response = await fetch('/api/payments/generate-qr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(qrRequest)
      });

      console.log("Response: in payment.tsx", response);
      
      // Check if response is OK
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText.substring(0, 500));
        
        // Try to parse as JSON if possible
        let errorMessage = `Server error: ${response.status}`;
        try {
          const errorJson = JSON.parse(errorText);
          errorMessage = errorJson.message || errorJson.error || errorMessage;
        } catch {
          // If not JSON, use the text or status
          if (errorText.includes('<!DOCTYPE')) {
            errorMessage = `Server returned an error page. Please check if the endpoint exists.`;
          } else {
            errorMessage = errorText.substring(0, 200);
          }
        }
        
        throw new Error(errorMessage);
      }
      
      // Check content type before parsing
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error("Non-JSON response received:", text.substring(0, 200));
        throw new Error("Server returned an invalid response format. Please try again.");
      }
      
      const result = await response.json();
      console.log("QR generation response:", result);
      
      if (result.success && result.qrString) {
        // Properly URL encode the UPI link by encoding query parameter values
        let encodedQrString = result.qrString;
        try {
          // Split the URL into base and query string
          const [base, queryString] = result.qrString.split('?');
          if (queryString) {
            // Parse and encode each query parameter
            const params = queryString.split('&').map((param: string) => {
              const [key, ...valueParts] = param.split('=');
              const value = valueParts.join('='); // Handle values that might contain '='
              return `${key}=${encodeURIComponent(value)}`;
            });
            encodedQrString = `${base}?${params.join('&')}`;
          }
        } catch (e) {
          // Fallback: use encodeURI if parsing fails
          console.warn("Failed to encode UPI URL:", e);
          encodedQrString = result.qrString.replace(/ /g, '%20');
        }
        
        setQrString(encodedQrString);
        setPaymentId(result.paymentId);
        setShowQR(true);
        setIsWaitingForPayment(true);
        
        toast({
          title: "QR Code Generated",
          description: "Please scan the QR code to complete payment.",
        });
        
        // Start polling for payment status
        startPaymentPolling(result.paymentId);
      } else {
        throw new Error(result.message || "Failed to generate QR code");
      }
    } catch (error: any) {
      console.error("QR generation error:", error);
      toast({
        title: "Failed to Generate QR Code",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingQR(false);
    }
  };

  // Poll payment status
  const startPaymentPolling = (paymentId: string) => {
    const maxAttempts = 60; // Poll for 5 minutes (60 * 5 seconds = 5 minutes)
    const pollInterval = 5000; // 5 seconds
    let attempts = 0;
    let pollTimeoutId: NodeJS.Timeout | null = null;
    
    // Set overall timeout (5 minutes)
    const overallTimeout = setTimeout(() => {
      setIsWaitingForPayment(false);
      setPaymentStatus('pending');
      toast({
        title: "Payment Timeout",
        description: "Payment verification timed out after 5 minutes. If you've completed the payment, it will be processed shortly.",
        variant: "destructive",
      });
      if (pollTimeoutId) {
        clearTimeout(pollTimeoutId);
      }
    }, maxAttempts * pollInterval);
    
    const poll = async () => {
      if (attempts >= maxAttempts) {
        clearTimeout(overallTimeout);
        setIsWaitingForPayment(false);
        setPaymentStatus('pending');
        toast({
          title: "Payment Timeout",
          description: "Payment verification timed out. If you've completed the payment, it will be processed shortly.",
          variant: "destructive",
        });
        return;
      }
      
      try {
        const response = await fetch(`/api/payments/status/${paymentId}`, {
          credentials: 'include'
        });
        
        if (response.ok) {
          const status = await response.json();
          
          if (status.status === 'success') {
            // Payment successful - stop polling
            clearTimeout(overallTimeout);
            if (pollTimeoutId) {
              clearTimeout(pollTimeoutId);
            }
            setPaymentStatus('success');
            setIsWaitingForPayment(false);
            sessionStorage.removeItem('pendingBooking');
            
            const successMessage = orderData.bookingType === 'service'
              ? "Your service has been booked successfully."
              : orderData.bookingType === 'donation'
              ? "Thank you for your donation!"
              : "Your consultation has been booked successfully.";
            
            toast({
              title: "Payment Successful!",
              description: successMessage,
            });
            
            // Navigate to success page after a short delay
            setTimeout(() => {
              navigate("/payment/success");
            }, 2000);
            return;
          } else if (status.status === 'failed') {
            // Payment failed - stop polling
            clearTimeout(overallTimeout);
            if (pollTimeoutId) {
              clearTimeout(pollTimeoutId);
            }
            setPaymentStatus('failed');
            setIsWaitingForPayment(false);
            toast({
              title: "Payment Failed",
              description: "Your payment could not be processed. Please try again.",
              variant: "destructive",
            });
            return;
          }
        }
        
        // Continue polling
        attempts++;
        pollTimeoutId = setTimeout(poll, pollInterval);
      } catch (error) {
        console.error("Error polling payment status:", error);
        attempts++;
        pollTimeoutId = setTimeout(poll, pollInterval);
      }
    };
    
    // Start polling after 5 seconds
    pollTimeoutId = setTimeout(poll, pollInterval);
  };

  const onSubmit = async (data: PaymentFormData) => {
    // For UPI payments, validate that user has selected a payment type
    if (paymentMethod === 'upi') {
      if (!upiPaymentType) {
        toast({
          title: "Select Payment Method",
          description: "Please select either 'Scan QR Code' or 'Enter UPI ID' to proceed.",
          variant: "destructive",
        });
        return;
      }
      
      // If QR code method is selected but QR not generated yet
      if (upiPaymentType === 'qr' && !qrString) {
        toast({
          title: "Generate QR Code",
          description: "Please click 'Generate QR Code' button first.",
          variant: "default",
        });
        return;
      }
      
      // If UPI ID method is selected, validate UPI ID
      if (upiPaymentType === 'upiid') {
        if (!data.upiId || errors.upiId) {
          toast({
            title: "Enter UPI ID",
            description: "Please enter a valid UPI ID to proceed.",
            variant: "destructive",
          });
          return;
        }
        // For UPI ID, we'll generate QR code with the UPI ID or use a different flow
        // For now, we'll use the same QR generation but this could be enhanced
        toast({
          title: "UPI ID Payment",
          description: "UPI ID payment will be processed. Please generate QR code or use the payment link.",
          variant: "default",
        });
        return;
      }
    }
    
    // For card payments, proceed with normal flow
    console.log("Form submitted with data:", data);
    setIsProcessing(true);
    data.paymentMethod = paymentMethod;
    
    try {
      const paymentRequest = {
        paymentMethod: paymentMethod,
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        orderNumber: orderData.orderId,
        bookingType: orderData.bookingType
      };

      const response = await apiRequest('POST', '/api/payments/initiate', paymentRequest);
      const result = await response.json();
      
      if (result.success) {
        toast({
          title: "Payment Initiated",
          description: result.message || "Payment has been initiated successfully.",
        });
        
        sessionStorage.setItem('completedPayment', JSON.stringify({ 
          ...orderData, 
          paymentData: data,
          paymentId: result.paymentId,
          apitxnid: result.apitxnid
        }));
        
        sessionStorage.removeItem('pendingBooking');
        
        const successMessage = orderData.bookingType === 'service'
          ? "Your service has been booked successfully."
          : orderData.bookingType === 'donation'
          ? "Thank you for your donation!"
          : "Your consultation has been booked successfully.";
        
        toast({
          title: "Payment Successful!",
          description: successMessage,
        });
        navigate("/payment/success");
      } else {
        throw new Error(result.message || "Failed to initiate payment");
      }
    } catch (error: any) {
      console.error("Payment initiation error:", error);
      
      let errorMessage = "Failed to initiate payment. Please try again.";
      if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Payment Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handlePaymentMethodChange = (method: 'card' | 'upi') => {
    setPaymentMethod(method);
    setValue('paymentMethod', method);
    setShowQR(false);
    setUpiPaymentType(null); // Reset UPI payment type when switching payment methods
    setQrString('');
    setIsWaitingForPayment(false);
    setPaymentStatus('pending');
  };

  const handleUpiPaymentTypeChange = (type: 'qr' | 'upiid') => {
    setUpiPaymentType(type);
    setShowQR(false);
    setQrString('');
    setIsWaitingForPayment(false);
    setPaymentStatus('pending');
    
    // Clear UPI ID validation when switching to QR
    if (type === 'qr') {
      setValue('upiId', '');
    }
  };
  
  const generateUPIString = () => {
    if (qrString) return qrString;
    if (!orderData) return '';
    return `upi://pay?pa=merchant@jmlastro&pn=JML Astro&am=${orderData.amount}&cu=INR&tn=${orderData.orderId}`;
  };
  
  const copyUPIString = async () => {
    try {
      await navigator.clipboard.writeText(generateUPIString());
      toast({
        title: "UPI String Copied!",
        description: "Open any UPI app and paste to make payment.",
      });
    } catch (error) {
      console.error('Failed to copy UPI string:', error);
      toast({
        title: "Copy Failed",
        description: "Please manually copy the UPI payment string.",
        variant: "destructive"
      });
    }
  };

  const formatPrice = (price: number | undefined, currency: string) => {
    // Handle undefined or null price values
    if (price === undefined || price === null || isNaN(price)) {
      return currency === 'INR' ? '₹0' : `${currency} 0`;
    }
    
    if (currency === 'INR') {
      return `₹${price.toLocaleString('en-IN')}`;
    }
    return `${currency} ${price}`;
  };

  // Show loading while order data is being processed
  if (!orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={() => window.history.back()}
              className="mb-4 text-muted-foreground hover:text-primary"
              data-testid="button-back"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Services
            </Button>
            
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Secure Payment Gateway
                </span>
              </h1>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Lock className="w-4 h-4" />
                <span>256-bit SSL encrypted payment</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Payment Form */}
            <div className="lg:col-span-2">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-primary" />
                    Payment Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Payment Method Selection */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-foreground mb-4">Select Payment Method</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        {/* Card Payment Option */}
                        <div 
                          onClick={() => handlePaymentMethodChange('card')}
                          className={`cursor-pointer p-4 border-2 rounded-lg transition-all duration-200 ${
                            paymentMethod === 'card' 
                              ? 'border-primary bg-primary/5 shadow-md' 
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <CreditCard className={`h-6 w-6 ${
                              paymentMethod === 'card' ? 'text-primary' : 'text-muted-foreground'
                            }`} />
                            <div>
                              <h4 className={`font-semibold ${
                                paymentMethod === 'card' ? 'text-primary' : 'text-foreground'
                              }`}>Credit/Debit Card</h4>
                              <p className="text-sm text-muted-foreground">Visa, MasterCard, Rupay</p>
                            </div>
                          </div>
                        </div>
                        
                        {/* UPI Payment Option */}
                        <div 
                          onClick={() => handlePaymentMethodChange('upi')}
                          className={`cursor-pointer p-4 border-2 rounded-lg transition-all duration-200 ${
                            paymentMethod === 'upi' 
                              ? 'border-accent bg-accent/5 shadow-md' 
                              : 'border-border hover:border-accent/50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Smartphone className={`h-6 w-6 ${
                              paymentMethod === 'upi' ? 'text-accent' : 'text-muted-foreground'
                            }`} />
                            <div>
                              <h4 className={`font-semibold ${
                                paymentMethod === 'upi' ? 'text-accent' : 'text-foreground'
                              }`}>UPI Payment</h4>
                              <p className="text-sm text-muted-foreground">PhonePe, GPay, Paytm, BHIM</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Donation Amount Selection - Only for donation bookings */}
                    {orderData.bookingType === 'donation' && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                          <Heart className="h-5 w-5 text-primary" />
                          Choose Donation Amount
                        </h3>
                        
                        {/* Preset Amount Options */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                          {[100, 500, 1000, 2000].map((amount) => (
                            <Button
                              key={amount}
                              type="button"
                              variant={selectedAmount === amount ? "default" : "outline"}
                              onClick={() => {
                                setSelectedAmount(amount);
                                setCustomAmount('');
                                setOrderData((prev: any) => prev ? { ...prev, amount } : prev);
                              }}
                              className={`h-16 flex-col space-y-1 transition-all duration-200 ${
                                selectedAmount === amount 
                                  ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg scale-105' 
                                  : 'border-border hover:border-primary/50 hover:bg-primary/5'
                              }`}
                              data-testid={`button-amount-${amount}`}
                            >
                              <IndianRupee className="h-4 w-4" />
                              <span className="font-semibold">₹{amount}</span>
                            </Button>
                          ))}
                        </div>
                        
                        {/* Custom Amount Input */}
                        <div className="space-y-2">
                          <Label htmlFor="customAmount" className="text-sm font-medium">Or Enter Custom Amount</Label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">₹</span>
                            <Input
                              id="customAmount"
                              type="number"
                              min="1"
                              max="100000"
                              placeholder="Enter custom amount"
                              value={customAmount}
                              onChange={(e) => {
                                const value = e.target.value;
                                setCustomAmount(value);
                                const numValue = parseInt(value) || 0;
                                if (numValue > 0) {
                                  setSelectedAmount(numValue);
                                  setOrderData((prev: any) => prev ? { ...prev, amount: numValue } : prev);
                                }
                              }}
                              className="pl-8 bg-input border-border focus:border-primary"
                              data-testid="input-custom-amount"
                            />
                          </div>
                          {customAmount && parseInt(customAmount) > 0 && (
                            <p className="text-sm text-primary font-medium">
                              ✨ Thank you for your generous donation of ₹{parseInt(customAmount).toLocaleString('en-IN')}!
                            </p>
                          )}
                        </div>
                        
                        <div className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Heart className="h-5 w-5 text-primary" />
                            <div>
                              <p className="text-sm font-medium text-foreground">Your Support Matters</p>
                              <p className="text-xs text-muted-foreground">Every donation helps us provide better astrology services to more people</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Card Payment Form */}
                    {paymentMethod === 'card' && (
                      <div className="space-y-4">
                        <h3 className="font-semibold text-foreground mb-4">Card Information</h3>
                      
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          {...register("cardNumber", { 
                            required: "Card number is required",
                            pattern: {
                              value: /^[0-9\s]{13,19}$/,
                              message: "Please enter a valid card number"
                            }
                          })}
                          className="bg-input border-border"
                          data-testid="input-card-number"
                        />
                        {errors.cardNumber && (
                          <p className="text-red-400 text-sm mt-1">{errors.cardNumber.message}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="expiryMonth">Month</Label>
                          <Controller
                            name="expiryMonth"
                            control={control}
                            rules={{ required: "Month is required" }}
                            render={({ field }) => (
                              <Select value={field.value || ""} onValueChange={field.onChange}>
                                <SelectTrigger className="bg-input border-border" data-testid="select-expiry-month">
                                  <SelectValue placeholder="MM" />
                                </SelectTrigger>
                                <SelectContent>
                                  {Array.from({ length: 12 }, (_, i) => (
                                    <SelectItem key={i + 1} value={String(i + 1).padStart(2, '0')}>
                                      {String(i + 1).padStart(2, '0')}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}
                          />
                          {errors.expiryMonth && (
                            <p className="text-red-400 text-sm mt-1">{errors.expiryMonth.message}</p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="expiryYear">Year</Label>
                          <Controller
                            name="expiryYear"
                            control={control}
                            rules={{ required: "Year is required" }}
                            render={({ field }) => (
                              <Select value={field.value || ""} onValueChange={field.onChange}>
                                <SelectTrigger className="bg-input border-border" data-testid="select-expiry-year">
                                  <SelectValue placeholder="YYYY" />
                                </SelectTrigger>
                                <SelectContent>
                                  {Array.from({ length: 10 }, (_, i) => (
                                    <SelectItem key={i} value={String(new Date().getFullYear() + i)}>
                                      {new Date().getFullYear() + i}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}
                          />
                          {errors.expiryYear && (
                            <p className="text-red-400 text-sm mt-1">{errors.expiryYear.message}</p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            type="password"
                            maxLength={4}
                            {...register("cvv", { 
                              required: "CVV is required",
                              pattern: {
                                value: /^[0-9]{3,4}$/,
                                message: "Please enter a valid CVV"
                              }
                            })}
                            className="bg-input border-border"
                            data-testid="input-cvv"
                          />
                          {errors.cvv && (
                            <p className="text-red-400 text-sm mt-1">{errors.cvv.message}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="cardholderName">Cardholder Name</Label>
                        <Input
                          id="cardholderName"
                          placeholder="John Doe"
                          {...register("cardholderName", { required: "Cardholder name is required" })}
                          className="bg-input border-border"
                          data-testid="input-cardholder-name"
                        />
                        {errors.cardholderName && (
                          <p className="text-red-400 text-sm mt-1">{errors.cardholderName.message}</p>
                        )}
                      </div>
                      </div>
                    )}
                    
                    {/* UPI Payment Form */}
                    {paymentMethod === 'upi' && (
                      <div className="space-y-4">
                        <h3 className="font-semibold text-foreground mb-4">UPI Payment</h3>
                        
                        {/* UPI Payment Type Selection */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                          {/* QR Code Option */}
                          <div 
                            onClick={() => handleUpiPaymentTypeChange('qr')}
                            className={`cursor-pointer p-4 border-2 rounded-lg transition-all duration-200 ${
                              upiPaymentType === 'qr' 
                                ? 'border-accent bg-accent/5 shadow-md' 
                                : 'border-border hover:border-accent/50'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <QrCode className={`h-6 w-6 ${
                                upiPaymentType === 'qr' ? 'text-accent' : 'text-muted-foreground'
                              }`} />
                              <div>
                                <h4 className={`font-semibold ${
                                  upiPaymentType === 'qr' ? 'text-accent' : 'text-foreground'
                                }`}>Scan QR Code</h4>
                                <p className="text-sm text-muted-foreground">Generate QR and scan to pay</p>
                              </div>
                            </div>
                          </div>
                          
                          {/* UPI ID Option */}
                          <div 
                            onClick={() => handleUpiPaymentTypeChange('upiid')}
                            className={`cursor-pointer p-4 border-2 rounded-lg transition-all duration-200 ${
                              upiPaymentType === 'upiid' 
                                ? 'border-accent bg-accent/5 shadow-md' 
                                : 'border-border hover:border-accent/50'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <Phone className={`h-6 w-6 ${
                                upiPaymentType === 'upiid' ? 'text-accent' : 'text-muted-foreground'
                              }`} />
                              <div>
                                <h4 className={`font-semibold ${
                                  upiPaymentType === 'upiid' ? 'text-accent' : 'text-foreground'
                                }`}>Enter UPI ID</h4>
                                <p className="text-sm text-muted-foreground">Pay directly with your UPI ID</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* QR Code Payment Section */}
                        {upiPaymentType === 'qr' && (
                          <div className="p-4 border border-border rounded-lg bg-card">
                            <div className="flex items-center gap-2 mb-4">
                              <QrCode className="h-5 w-5 text-accent" />
                              <h4 className="font-semibold">Pay with QR Code</h4>
                            </div>
                            <div className="text-center">
                              {!showQR ? (
                                <Button
                                  type="button"
                                  onClick={handleGenerateQR}
                                  disabled={isGeneratingQR}
                                  className="bg-accent hover:bg-accent/80 text-white w-full mb-4"
                                >
                                  {isGeneratingQR ? (
                                    <>
                                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                                      Generating QR Code...
                                    </>
                                  ) : (
                                    <>
                                      <QrCode className="w-4 h-4 mr-2" />
                                      Generate QR Code
                                    </>
                                  )}
                                </Button>
                              ) : (
                                <>
                                  {isWaitingForPayment && (
                                    <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                                      <div className="flex items-center gap-2 mb-2">
                                        <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                                        <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                                          Waiting for payment confirmation...
                                        </p>
                                      </div>
                                      <p className="text-xs text-blue-700 dark:text-blue-300">
                                        Please complete the payment using the QR code below
                                      </p>
                                    </div>
                                  )}
                                  
                                  {paymentStatus === 'success' && (
                                    <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                                      <p className="text-sm font-medium text-green-900 dark:text-green-100">
                                        ✓ Payment Successful! Redirecting...
                                      </p>
                                    </div>
                                  )}
                                  
                                  {paymentStatus === 'failed' && (
                                    <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                                      <p className="text-sm font-medium text-red-900 dark:text-red-100">
                                        ✗ Payment Failed. Please try again.
                                      </p>
                                    </div>
                                  )}
                                  
                                    <div className="bg-white p-4 rounded-lg border">
                                      <p className="text-sm font-medium mb-2 text-foreground">Scan QR Code to Pay</p>
                                      {/* QR Code Display */}
                                      <div className="w-48 h-48 mx-auto bg-gray-100 rounded-lg flex items-center justify-center mb-2 border-2 border-dashed border-gray-300">
                                        {qrString ? (
                                          <img 
                                            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrString)}`}
                                            alt="UPI QR Code"
                                            className="w-full h-full object-contain"
                                          />
                                        ) : (
                                          <QrCode className="h-24 w-24 text-gray-400" />
                                        )}
                                      </div>
                                      <p className="text-xs text-gray-600 mb-2">Scan with any UPI app</p>
                                      <div className="text-xs bg-gray-50 p-2 rounded break-all mb-2 font-mono">
                                        {qrString || generateUPIString()}
                                      </div>
                                    <Button
                                      type="button"
                                      size="sm"
                                      onClick={copyUPIString}
                                      className="w-full mb-2"
                                    >
                                      <Copy className="h-3 w-3 mr-1" />
                                      Copy UPI String
                                    </Button>
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="sm"
                                      onClick={() => {
                                        setShowQR(false);
                                        setQrString('');
                                        setIsWaitingForPayment(false);
                                        setPaymentStatus('pending');
                                      }}
                                      className="w-full"
                                    >
                                      Generate New QR Code
                                    </Button>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        )}

                        {/* UPI ID Payment Section */}
                        {upiPaymentType === 'upiid' && (
                          <div className="p-4 border border-border rounded-lg bg-card">
                            <div className="flex items-center gap-2 mb-4">
                              <Phone className="h-5 w-5 text-accent" />
                              <h4 className="font-semibold">Pay with UPI ID</h4>
                            </div>
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="upiId">Your UPI ID</Label>
                                <Input
                                  id="upiId"
                                  type="text"
                                  placeholder="yourname@paytm"
                                  className="bg-input border-border"
                                  {...register("upiId", { 
                                    required: upiPaymentType === 'upiid' ? "UPI ID is required" : false,
                                    pattern: {
                                      value: /^[a-zA-Z0-9.\-_]+@[a-zA-Z0-9.-]+$/,
                                      message: "Please enter a valid UPI ID (e.g., yourname@paytm)"
                                    }
                                  })}
                                />
                                {errors.upiId && (
                                  <p className="text-red-400 text-sm mt-1">{errors.upiId.message}</p>
                                )}
                                <p className="text-xs text-muted-foreground mt-2">
                                  Enter your UPI ID to receive payment request
                                </p>
                              </div>
                              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                                <p className="text-xs text-blue-700 dark:text-blue-300">
                                  <strong>Note:</strong> After submitting, you'll receive a payment request on your UPI app. 
                                  Approve the payment to complete the transaction.
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Prompt to select payment type */}
                        {!upiPaymentType && (
                          <div className="p-4 border-2 border-dashed border-border rounded-lg text-center">
                            <p className="text-sm text-muted-foreground">
                              Please select a payment method above
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    <Separator />

                    {/* Contact Information */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-foreground mb-4">Contact Information</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            {...register("email", { 
                              required: "Email is required",
                              pattern: {
                                value: /^\S+@\S+$/i,
                                message: "Please enter a valid email"
                              }
                            })}
                            className="bg-input border-border"
                            data-testid="input-email"
                          />
                          {errors.email && (
                            <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            placeholder="+91 98765 43210"
                            {...register("phone", { 
                              required: "Phone number is required",
                              pattern: {
                                value: /^[\+]?[0-9\s\-\(\)]{10,}$/,
                                message: "Please enter a valid phone number"
                              }
                            })}
                            className="bg-input border-border"
                            data-testid="input-phone"
                          />
                          {errors.phone && (
                            <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Billing Address */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-foreground mb-4">Billing Address</h3>
                      
                      <div>
                        <Label htmlFor="billingAddress">Address</Label>
                        <Input
                          id="billingAddress"
                          placeholder="Street address"
                          {...register("billingAddress", { required: "Address is required" })}
                          className="bg-input border-border"
                          data-testid="input-billing-address"
                        />
                        {errors.billingAddress && (
                          <p className="text-red-400 text-sm mt-1">{errors.billingAddress.message}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            placeholder="Mumbai"
                            {...register("city", { required: "City is required" })}
                            className="bg-input border-border"
                            data-testid="input-city"
                          />
                          {errors.city && (
                            <p className="text-red-400 text-sm mt-1">{errors.city.message}</p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="state">State</Label>
                          <Input
                            id="state"
                            placeholder="Maharashtra"
                            {...register("state", { required: "State is required" })}
                            className="bg-input border-border"
                            data-testid="input-state"
                          />
                          {errors.state && (
                            <p className="text-red-400 text-sm mt-1">{errors.state.message}</p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="pincode">PIN Code</Label>
                          <Input
                            id="pincode"
                            placeholder="400001"
                            {...register("pincode", { 
                              required: "PIN code is required",
                              pattern: {
                                value: /^[0-9]{6}$/,
                                message: "Please enter a valid PIN code"
                              }
                            })}
                            className="bg-input border-border"
                            data-testid="input-pincode"
                          />
                          {errors.pincode && (
                            <p className="text-red-400 text-sm mt-1">{errors.pincode.message}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-primary to-gold-400 text-cosmic-900 hover:shadow-lg text-lg py-6"
                      disabled={isProcessing}
                      data-testid="button-process-payment"
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-cosmic-900/30 border-t-cosmic-900 rounded-full animate-spin mr-2" />
                          Processing {paymentMethod === 'upi' ? 'UPI' : 'Card'} Payment...
                        </>
                      ) : (
                        <>
                          {paymentMethod === 'upi' ? (
                            <Smartphone className="w-5 h-5 mr-2" />
                          ) : (
                            <Lock className="w-5 h-5 mr-2" />
                          )}
                          Pay {formatPrice(orderData.amount, orderData.currency)} via {paymentMethod === 'upi' ? 'UPI' : 'Card'}
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-foreground">{orderData.serviceName}</h4>
                        {orderData.bookingType === 'consultation' ? (
                          <p className="text-sm text-muted-foreground">with {orderData.astrologerName}</p>
                        ) : (
                          <p className="text-sm text-muted-foreground">{orderData.description}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        {orderData.bookingType === 'consultation' ? (
                          <>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Duration:</span>
                              <span>{orderData.duration}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Type:</span>
                              <span>{orderData.consultationType}</span>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Delivery:</span>
                              <span>{orderData.deliveryTime}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Service Type:</span>
                              <span>Digital Service</span>
                            </div>
                          </>
                        )}
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Order ID:</span>
                          <span className="font-mono text-xs">{orderData.orderId}</span>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>{formatPrice(orderData.amount, orderData.currency)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Platform Fee:</span>
                        <span className="text-green-400">Free</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Total:</span>
                        <span className="text-primary flex items-center">
                          <IndianRupee className="w-4 h-4 mr-1" />
                          {formatPrice(orderData.amount, orderData.currency)}
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 space-y-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Shield className="w-4 h-4 text-green-400" />
                        <span>100% Secure Payment</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span>Instant Booking Confirmation</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Lock className="w-4 h-4 text-green-400" />
                        <span>Bank-level Security</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}