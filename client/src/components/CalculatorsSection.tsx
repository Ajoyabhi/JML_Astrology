import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function CalculatorsSection() {
  const [, setLocation] = useLocation();

  const calculators = [
    {
      id: "love-match",
      icon: "fas fa-heart",
      title: "Love Match Calculator",
      description: "Discover your compatibility with your partner based on astrological principles",
      gradient: "from-primary to-gold-400",
      textColor: "text-primary",
      bgColor: "bg-primary/20",
      borderColor: "border-primary/30",
    },
    {
      id: "numerology",
      icon: "fas fa-calculator",
      title: "Numerology Calculator",
      description: "Uncover the hidden meanings behind numbers in your life and destiny",
      gradient: "from-accent to-mystic-600",
      textColor: "text-accent",
      bgColor: "bg-accent/20",
      borderColor: "border-accent/30",
    },
    {
      id: "birth-chart",
      icon: "fas fa-chart-pie",
      title: "Birth Chart Generator",
      description: "Generate your complete natal chart with detailed planetary positions",
      gradient: "from-gold-400 to-primary",
      textColor: "text-gold-400",
      bgColor: "bg-gold-400/20",
      borderColor: "border-gold-400/30",
    },
    {
      id: "nakshatra",
      icon: "fas fa-star",
      title: "Nakshatra Finder",
      description: "Discover your birth star and its significance in Vedic astrology",
      gradient: "from-mystic-500 to-accent",
      textColor: "text-mystic-500",
      bgColor: "bg-mystic-500/20",
      borderColor: "border-mystic-500/30",
    },
    {
      id: "dasha",
      icon: "fas fa-clock",
      title: "Dasha Calculator",
      description: "Calculate your planetary periods and their influence on your life",
      gradient: "from-primary to-mystic-500",
      textColor: "text-primary",
      bgColor: "bg-primary/20",
      borderColor: "border-primary/30",
    },
    {
      id: "moon-phase",
      icon: "fas fa-moon",
      title: "Moon Phase Tracker",
      description: "Track lunar phases and their impact on your emotional cycles",
      gradient: "from-accent to-gold-400",
      textColor: "text-accent",
      bgColor: "bg-accent/20",
      borderColor: "border-accent/30",
    },
  ];

  return (
    <section className="py-20 bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Astrology Calculators
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover insights about yourself with our comprehensive suite of astrology tools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {calculators.map((calculator) => (
            <div
              key={calculator.id}
              className="glass-card rounded-xl p-6 hover:scale-105 transition-all duration-300 group"
              data-testid={`calculator-card-${calculator.id}`}
            >
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${calculator.gradient} rounded-lg flex items-center justify-center mr-4`}>
                  <i className={`${calculator.icon} text-cosmic-900 text-xl`}></i>
                </div>
                <h3 className="text-xl font-semibold text-foreground">{calculator.title}</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                {calculator.description}
              </p>
              <Button
                onClick={() => setLocation("/calculators")}
                className={`w-full bg-gradient-to-r ${calculator.bgColor} border ${calculator.borderColor} ${calculator.textColor} hover:bg-gradient-to-r hover:${calculator.gradient} hover:text-cosmic-900 transition-all duration-200`}
                variant="outline"
                data-testid={`button-calculator-${calculator.id}`}
              >
                Calculate Now
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
