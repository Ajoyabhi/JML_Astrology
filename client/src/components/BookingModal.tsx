import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { isUnauthorizedError } from "@/lib/authUtils";
import { useLocation } from "wouter";
import { MessageCircle, Phone, Video } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  astrologer: any;
}

export default function BookingModal({ isOpen, onClose, astrologer }: BookingModalProps) {
  const { toast } = useToast();
  const [, navigate] = useLocation();
  
  const [consultationType, setConsultationType] = useState<string>(astrologer?.consultationType || "chat");
  const [duration, setDuration] = useState<string>("15");
  const [topic, setTopic] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("wallet");


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!astrologer) return;

    const durationMinutes = parseInt(duration);
    const pricePerMinute = parseFloat(astrologer.pricePerMinute);
    const totalPrice = durationMinutes * pricePerMinute;

    // Store booking details in sessionStorage to pass to payment page
    const bookingData = {
      astrologerId: astrologer.id,
      astrologerName: astrologer.name,
      astrologerImage: astrologer.profileImageUrl,
      specialization: astrologer.specialization,
      pricePerMinute: astrologer.pricePerMinute,
      consultationType,
      duration: durationMinutes,
      totalPrice,
      topic: topic || undefined,
      paymentMethod,
      scheduledAt: new Date().toISOString()
    };
    
    sessionStorage.setItem('pendingBooking', JSON.stringify(bookingData));
    
    // Close modal and redirect to payment
    onClose();
    navigate('/payment');
    
    toast({
      title: "Redirecting to Payment",
      description: "Please complete your payment to confirm the booking.",
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
          <DialogTitle className="text-2xl font-serif font-bold text-foreground">
            Book Consultation
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Astrologer Info */}
          <div className="flex items-center gap-4 p-4 bg-muted/20 rounded-lg" data-testid="selected-astrologer-info">
            <img
              src={astrologer.profileImageUrl || `/attached_assets/generated_images/${astrologer.id % 2 === 0 ? 'Indian_male_astrologer_portrait_b6e4ad40.png' : 'Indian_female_astrologer_portrait_3eec457b.png'}`}
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

          {/* Booking Summary */}
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-4 rounded-lg border border-primary/20">
            <h4 className="text-sm font-semibold text-foreground mb-2">Booking Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration:</span>
                <span className="text-foreground">{duration} minutes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Type:</span>
                <span className="text-foreground capitalize">{consultationType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Rate:</span>
                <span className="text-foreground">₹{pricePerMinute}/min</span>
              </div>
              <div className="border-t border-primary/20 pt-2 flex justify-between font-semibold">
                <span className="text-foreground">Total:</span>
                <span className="text-primary">₹{totalPrice.toFixed(0)}</span>
              </div>
            </div>
          </div>

          {/* Book Button */}
          <Button
            type="submit"
            className="w-full px-6 py-4 bg-gradient-to-r from-primary to-gold-400 text-cosmic-900 rounded-lg font-semibold text-lg hover:shadow-xl transition-all duration-300"
disabled={false}
            data-testid="button-confirm-booking"
          >
Proceed to Payment - ₹{totalPrice.toFixed(0)}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
