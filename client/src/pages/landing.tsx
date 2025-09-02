import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import CalculatorsSection from "@/components/CalculatorsSection";
import AstrologersSection from "@/components/AstrologersSection";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";

export default function Landing() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <CalculatorsSection />
      <section className="py-20 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Your Horoscope Awaits
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Discover what the stars have in store for you today
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
              {[
                { sign: "aries", symbol: "♈", name: "Aries", dates: "Mar 21 - Apr 19" },
                { sign: "taurus", symbol: "♉", name: "Taurus", dates: "Apr 20 - May 20" },
                { sign: "gemini", symbol: "♊", name: "Gemini", dates: "May 21 - Jun 20" },
                { sign: "cancer", symbol: "♋", name: "Cancer", dates: "Jun 21 - Jul 22" },
                { sign: "leo", symbol: "♌", name: "Leo", dates: "Jul 23 - Aug 22" },
                { sign: "virgo", symbol: "♍", name: "Virgo", dates: "Aug 23 - Sep 22" },
                { sign: "libra", symbol: "♎", name: "Libra", dates: "Sep 23 - Oct 22" },
                { sign: "scorpio", symbol: "♏", name: "Scorpio", dates: "Oct 23 - Nov 21" },
                { sign: "sagittarius", symbol: "♐", name: "Sagittarius", dates: "Nov 22 - Dec 21" },
                { sign: "capricorn", symbol: "♑", name: "Capricorn", dates: "Dec 22 - Jan 19" },
                { sign: "aquarius", symbol: "♒", name: "Aquarius", dates: "Jan 20 - Feb 18" },
                { sign: "pisces", symbol: "♓", name: "Pisces", dates: "Feb 19 - Mar 20" },
              ].map((zodiac) => (
                <div
                  key={zodiac.sign}
                  className="glass-card rounded-xl p-4 text-center hover:scale-105 transition-all duration-300 cursor-pointer group"
                  data-testid={`zodiac-${zodiac.sign}`}
                >
                  <div className="text-3xl mb-2">{zodiac.symbol}</div>
                  <div className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                    {zodiac.name}
                  </div>
                  <div className="text-xs text-muted-foreground">{zodiac.dates}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <AstrologersSection />
      <BlogSection />
      <Footer />
    </div>
  );
}
