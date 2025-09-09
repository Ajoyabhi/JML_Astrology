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
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Lock, CreditCard, Shield, CheckCircle, ArrowLeft, IndianRupee } from "lucide-react";

interface PaymentFormData {
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  cardholderName: string;
  email: string;
  phone: string;
  billingAddress: string;
  city: string;
  state: string;
  pincode: string;
}

export default function Payment() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderData, setOrderData] = useState<any>(null);

  const { register, handleSubmit, formState: { errors }, watch } = useForm<PaymentFormData>();

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
      setOrderData({
        serviceName: "Astrology Consultation",
        astrologerName: bookingData.astrologerName,
        duration: `${bookingData.duration} minutes`,
        consultationType: bookingData.consultationType.charAt(0).toUpperCase() + bookingData.consultationType.slice(1),
        amount: bookingData.totalPrice,
        currency: "INR",
        orderId: "JML" + Date.now(),
        topic: bookingData.topic,
        specialization: bookingData.specialization,
        pricePerMinute: bookingData.pricePerMinute
      });
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

  const onSubmit = async (data: PaymentFormData) => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Here you would integrate with your bank's payment API
    console.log("Payment data:", data);
    console.log("Order data:", orderData);
    
    toast({
      title: "Payment Processing",
      description: "Your payment is being processed. Please wait...",
    });
    
    // Store successful payment data for success page
    sessionStorage.setItem('completedPayment', JSON.stringify({ ...orderData, paymentData: data }));
    
    // Simulate successful payment
    setTimeout(() => {
      setIsProcessing(false);
      
      // Clear the pending booking since payment is complete
      sessionStorage.removeItem('pendingBooking');
      
      toast({
        title: "Payment Successful!",
        description: "Your consultation has been booked successfully.",
      });
      navigate("/payment/success");
    }, 2000);
  };

  const formatPrice = (price: number, currency: string) => {
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
              onClick={() => navigate(-1)}
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
                    {/* Card Information */}
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
                          <Select {...register("expiryMonth", { required: "Month is required" })}>
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
                        </div>

                        <div>
                          <Label htmlFor="expiryYear">Year</Label>
                          <Select {...register("expiryYear", { required: "Year is required" })}>
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
                          Processing Payment...
                        </>
                      ) : (
                        <>
                          <Lock className="w-5 h-5 mr-2" />
                          Pay {formatPrice(orderData.amount, orderData.currency)}
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
                        <p className="text-sm text-muted-foreground">with {orderData.astrologerName}</p>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Duration:</span>
                          <span>{orderData.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Type:</span>
                          <span>{orderData.consultationType}</span>
                        </div>
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