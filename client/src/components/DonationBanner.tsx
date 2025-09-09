import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles, Star, Gift } from "lucide-react";
import { useLocation } from "wouter";

export default function DonationBanner() {
  const [, navigate] = useLocation();

  const handleDonateClick = () => {
    // Store donation data for payment page
    const donationData = {
      serviceId: "donation",
      serviceName: "Support JMLAstro",
      description: "Help us spread astrology wisdom to more souls around the universe!",
      shortDescription: "Cosmic Mission Support",
      price: 500, // Default amount, user can change on payment page
      amount: 500, // Add explicit amount field
      currency: "INR",
      deliveryTime: "Instant",
      tags: ["donation", "support"],
      isFeatured: true,
      bookingType: "donation",
      orderId: "DONATE" + Date.now()
    };
    
    sessionStorage.setItem('pendingBooking', JSON.stringify(donationData));
    navigate('/payment');
  };

  return (
      <motion.div
        initial={{ opacity: 0, y: -100, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ 
          duration: 0.8, 
          ease: "easeOut",
          type: "spring",
          bounce: 0.3
        }}
        className="relative overflow-hidden sticky top-16 z-40"
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 animate-gradient-x"></div>
        
        {/* Overlay pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_50%)] opacity-20"></div>
        
        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-2 left-1/4"
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Sparkles className="h-4 w-4 text-yellow-300/60" />
          </motion.div>
          <motion.div
            className="absolute top-3 right-1/3"
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, -10, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          >
            <Star className="h-3 w-3 text-white/40" />
          </motion.div>
          <motion.div
            className="absolute bottom-2 left-1/3"
            animate={{ 
              y: [0, -8, 0],
              x: [0, 5, 0],
              scale: [1, 1.15, 1]
            }}
            transition={{ 
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          >
            <Gift className="h-4 w-4 text-pink-300/50" />
          </motion.div>
        </div>

        <div className="relative z-10 px-4 py-3 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3 flex-1">
              {/* Pulsating heart icon */}
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-full backdrop-blur-sm"
              >
                <Heart className="h-5 w-5 text-white fill-current" />
              </motion.div>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                <motion.h3 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-sm sm:text-base font-bold text-white leading-tight"
                >
                  ✨ Support Our Cosmic Mission! ✨
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="text-xs sm:text-sm text-white/90 leading-tight"
                >
                  Help us spread astrology wisdom to more souls around the universe! 🌟
                </motion.p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 ml-4">
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, duration: 0.5, type: "spring" }}
              >
                <Button 
                  size="sm"
                  onClick={handleDonateClick}
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm transition-all duration-300 hover:scale-105 font-medium shadow-lg"
                  variant="outline"
                  data-testid="button-donate"
                >
                  <Heart className="h-4 w-4 mr-2 fill-current" />
                  Donate Now
                </Button>
              </motion.div>
              
            </div>
          </div>
        </div>
        
        {/* Shimmer effect */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "linear",
            delay: 2
          }}
        />
      </motion.div>
  );
}