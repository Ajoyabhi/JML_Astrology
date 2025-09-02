import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Star, Moon, Sun, TrendingUp, MessageCircle, Users, Heart, Globe } from "lucide-react";

export default function HeroSection() {
  const [, setLocation] = useLocation();

  return (
    <section className="relative min-h-screen flex items-center justify-center hero-gradient overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Celestial Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="star text-xs" style={{ top: '10%', left: '15%', animationDelay: '0s' }}>✦</div>
        <div className="star text-sm" style={{ top: '20%', left: '80%', animationDelay: '0.5s' }}>★</div>
        <div className="star text-xs" style={{ top: '30%', left: '25%', animationDelay: '1s' }}>✦</div>
        <div className="star text-lg" style={{ top: '50%', left: '70%', animationDelay: '1.5s' }}>✧</div>
        <div className="star text-xs" style={{ top: '70%', left: '20%', animationDelay: '2s' }}>★</div>
        <div className="star text-sm" style={{ top: '80%', left: '85%', animationDelay: '2.5s' }}>✦</div>
      </div>
      
      {/* Floating Cosmic Elements */}
      <div className="absolute top-20 left-10 floating-element opacity-30">
        <Star className="h-10 w-10 text-primary" />
      </div>
      <div className="absolute top-40 right-20 floating-element opacity-20" style={{ animationDelay: '2s' }}>
        <Moon className="h-16 w-16 text-accent" />
      </div>
      <div className="absolute bottom-40 left-20 floating-element opacity-25" style={{ animationDelay: '4s' }}>
        <Sun className="h-12 w-12 text-gold-400" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-primary via-gold-300 to-accent bg-clip-text text-transparent">
              Unlock Your
            </span>
            <br />
            <span className="text-foreground">Cosmic Destiny</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Connect with expert astrologers, discover your birth chart, and navigate life's journey with celestial wisdom.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              onClick={() => setLocation("/horoscope")}
              className="px-8 py-4 bg-gradient-to-r from-primary to-gold-400 text-cosmic-900 rounded-xl font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 min-w-[200px]"
              data-testid="button-get-horoscope"
            >
              <TrendingUp className="h-5 w-5 mr-2" />
              Get Your Horoscope
            </Button>
            <Button
              onClick={() => setLocation("/astrologers")}
              className="px-8 py-4 bg-gradient-to-r from-accent to-mystic-600 text-foreground rounded-xl font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 min-w-[200px]"
              data-testid="button-talk-astrologer"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Talk to Astrologer
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div className="glass-card rounded-xl p-4 text-center" data-testid="stat-astrologers">
              <Users className="h-6 w-6 text-primary mb-2 mx-auto" />
              <div className="text-2xl font-bold text-foreground">500+</div>
              <div className="text-sm text-muted-foreground">Expert Astrologers</div>
            </div>
            <div className="glass-card rounded-xl p-4 text-center" data-testid="stat-consultations">
              <Star className="h-6 w-6 text-primary mb-2 mx-auto" />
              <div className="text-2xl font-bold text-foreground">50K+</div>
              <div className="text-sm text-muted-foreground">Consultations</div>
            </div>
            <div className="glass-card rounded-xl p-4 text-center" data-testid="stat-rating">
              <Heart className="h-6 w-6 text-primary mb-2 mx-auto" />
              <div className="text-2xl font-bold text-foreground">4.8</div>
              <div className="text-sm text-muted-foreground">User Rating</div>
            </div>
            <div className="glass-card rounded-xl p-4 text-center" data-testid="stat-languages">
              <Globe className="h-6 w-6 text-primary mb-2 mx-auto" />
              <div className="text-2xl font-bold text-foreground">15+</div>
              <div className="text-sm text-muted-foreground">Languages</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
