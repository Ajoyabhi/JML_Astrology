import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { isUnauthorizedError } from "@/lib/authUtils";
import { MessageCircle, Phone, Video, X } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  astrologer: any;
}

export default function BookingModal({ isOpen, onClose, astrologer }: BookingModalProps) {
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  
  const [consultationType, setConsultationType] = useState<string>(astrologer?.consultationType || "chat");
  const [duration, setDuration] = useState<string>("15");
  const [topic, setTopic] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("wallet");

  const bookingMutation = useMutation({
    mutationFn: async (data: any) => {
      if (!isAuthenticated) {
        window.location.href = "/api/login";
        return;
      }
      
      const response = await apiRequest("POST", "/api/consultations", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Consultation Booked!",
        description: "Your consultation has been successfully booked. You will receive a confirmation shortly.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/consultations"] });
      onClose();
      // Reset form
      setTopic("");
      setDuration("15");
      setPaymentMethod("wallet");
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Booking Failed",
        description: "Failed to book consultation. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!astrologer) return;

    const durationMinutes = parseInt(duration);
    const pricePerMinute = parseFloat(astrologer.pricePerMinute);
    const totalPrice = durationMinutes * pricePerMinute;

    bookingMutation.mutate({
      astrologerId: astrologer.id,
      type: consultationType,
      duration: durationMinutes,
      price: totalPrice,
      topic: topic || undefined,
      scheduledAt: new Date().toISOString(),
    });
  };

  if (!astrologer) return null;

  const durationMinutes = parseInt(duration);
  const pricePerMinute = parseFloat(astrologer.pricePerMinute);
  const totalPrice = durationMinutes * pricePerMinute;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card max-w-md max-h-[90vh] overflow-y-auto" data-testid="booking-modal">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-serif font-bold text-foreground">
              Book Consultation
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-lg"
              data-testid="button-close-modal"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Astrologer Info */}
          <div className="flex items-center gap-4 p-4 bg-muted/20 rounded-lg" data-testid="selected-astrologer-info">
            <img
              src={astrologer.profileImageUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"}
              alt={astrologer.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h4 className="font-semibold text-foreground" data-testid="text-selected-astrologer-name">
                {astrologer.name}
              </h4>
              <p className="text-sm text-muted-foreground" data-testid="text-selected-astrologer-specialization">
                {astrologer.specialization?.join(', ')}
              </p>
              <p className="text-sm text-primary" data-testid="text-selected-astrologer-price">
                ₹{astrologer.pricePerMinute}/min
              </p>
            </div>
          </div>

          {/* Consultation Type */}
          <div>
            <Label className="text-sm font-medium text-foreground mb-3 block">Consultation Type</Label>
            <div className="grid grid-cols-3 gap-2">
              <Button
                type="button"
                variant={consultationType === "chat" ? "default" : "outline"}
                className={`p-3 text-center ${
                  consultationType === "chat" 
                    ? "bg-gradient-to-r from-primary to-gold-400 text-cosmic-900" 
                    : "glass-card hover:bg-primary/20"
                }`}
                onClick={() => setConsultationType("chat")}
                data-testid="button-select-chat"
              >
                <div className="flex flex-col items-center">
                  <MessageCircle className="w-5 h-5 mb-1" />
                  <span className="text-sm">Chat</span>
                </div>
              </Button>
              <Button
                type="button"
                variant={consultationType === "call" ? "default" : "outline"}
                className={`p-3 text-center ${
                  consultationType === "call" 
                    ? "bg-gradient-to-r from-accent to-mystic-600 text-foreground" 
                    : "glass-card hover:bg-accent/20"
                }`}
                onClick={() => setConsultationType("call")}
                data-testid="button-select-call"
              >
                <div className="flex flex-col items-center">
                  <Phone className="w-5 h-5 mb-1" />
                  <span className="text-sm">Call</span>
                </div>
              </Button>
              <Button
                type="button"
                variant={consultationType === "video" ? "default" : "outline"}
                className={`p-3 text-center ${
                  consultationType === "video" 
                    ? "bg-gradient-to-r from-gold-400 to-primary text-cosmic-900" 
                    : "glass-card hover:bg-gold-400/20"
                }`}
                onClick={() => setConsultationType("video")}
                data-testid="button-select-video"
              >
                <div className="flex flex-col items-center">
                  <Video className="w-5 h-5 mb-1" />
                  <span className="text-sm">Video</span>
                </div>
              </Button>
            </div>
          </div>

          {/* Duration */}
          <div>
            <Label htmlFor="duration" className="text-sm font-medium text-foreground mb-3 block">
              Duration
            </Label>
            <Select value={duration} onValueChange={setDuration} data-testid="select-duration">
              <SelectTrigger className="bg-input border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 minutes - ₹{(15 * pricePerMinute).toFixed(0)}</SelectItem>
                <SelectItem value="30">30 minutes - ₹{(30 * pricePerMinute).toFixed(0)}</SelectItem>
                <SelectItem value="45">45 minutes - ₹{(45 * pricePerMinute).toFixed(0)}</SelectItem>
                <SelectItem value="60">60 minutes - ₹{(60 * pricePerMinute).toFixed(0)}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Question/Topic */}
          <div>
            <Label htmlFor="topic" className="text-sm font-medium text-foreground mb-3 block">
              Your Question/Topic
            </Label>
            <Textarea
              id="topic"
              placeholder="Briefly describe what you'd like to discuss..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="bg-input border-border resize-none"
              rows={3}
              data-testid="textarea-topic"
            />
          </div>

          {/* Payment Method */}
          <div>
            <Label className="text-sm font-medium text-foreground mb-3 block">Payment Method</Label>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} data-testid="radio-payment-method">
              <div className="flex items-center p-3 glass-card rounded-lg cursor-pointer hover:bg-primary/10 transition-colors duration-200">
                <RadioGroupItem value="wallet" id="wallet" className="sr-only" />
                <Label htmlFor="wallet" className="flex items-center w-full cursor-pointer">
                  <div className={`w-4 h-4 border-2 border-primary rounded-full mr-3 flex items-center justify-center ${
                    paymentMethod === "wallet" ? "bg-primary" : ""
                  }`}>
                    {paymentMethod === "wallet" && <div className="w-2 h-2 bg-cosmic-900 rounded-full"></div>}
                  </div>
                  <div className="flex-1">
                    <div className="text-foreground">Wallet Balance</div>
                    <div className="text-sm text-muted-foreground">₹2,500 available</div>
                  </div>
                </Label>
              </div>
              <div className="flex items-center p-3 glass-card rounded-lg cursor-pointer hover:bg-primary/10 transition-colors duration-200">
                <RadioGroupItem value="upi" id="upi" className="sr-only" />
                <Label htmlFor="upi" className="flex items-center w-full cursor-pointer">
                  <div className={`w-4 h-4 border-2 border-primary rounded-full mr-3 flex items-center justify-center ${
                    paymentMethod === "upi" ? "bg-primary" : ""
                  }`}>
                    {paymentMethod === "upi" && <div className="w-2 h-2 bg-cosmic-900 rounded-full"></div>}
                  </div>
                  <div className="flex-1">
                    <div className="text-foreground">UPI Payment</div>
                    <div className="text-sm text-muted-foreground">Pay via UPI apps</div>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Book Button */}
          <Button
            type="submit"
            className="w-full px-6 py-4 bg-gradient-to-r from-primary to-gold-400 text-cosmic-900 rounded-lg font-semibold text-lg hover:shadow-xl transition-all duration-300"
            disabled={bookingMutation.isPending}
            data-testid="button-confirm-booking"
          >
            {bookingMutation.isPending 
              ? "Booking..." 
              : `Book Consultation - ₹${totalPrice.toFixed(0)}`
            }
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
