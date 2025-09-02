import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import type { Consultation, User } from "@shared/schema";

export default function Home() {
  const { user } = useAuth();
  
  const { data: consultations = [] } = useQuery<Consultation[]>({
    queryKey: ["/api/consultations"],
  });

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Welcome back, <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {(user as User)?.firstName || 'Cosmic Seeker'}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your personalized astrology dashboard awaits
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="glass-card rounded-xl p-6 text-center hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-gold-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-chart-line text-2xl text-cosmic-900"></i>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Today's Horoscope</h3>
              <p className="text-muted-foreground mb-4">Get your daily cosmic guidance</p>
              <button 
                className="px-6 py-2 bg-gradient-to-r from-primary to-gold-400 text-cosmic-900 rounded-lg font-medium hover:shadow-lg transition-all duration-200"
                data-testid="button-daily-horoscope"
              >
                Read Now
              </button>
            </div>

            <div className="glass-card rounded-xl p-6 text-center hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-mystic-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-comments text-2xl text-foreground"></i>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Quick Consultation</h3>
              <p className="text-muted-foreground mb-4">Chat with available astrologers</p>
              <button 
                className="px-6 py-2 bg-gradient-to-r from-accent to-mystic-600 text-foreground rounded-lg font-medium hover:shadow-lg transition-all duration-200"
                data-testid="button-quick-chat"
              >
                Start Chat
              </button>
            </div>

            <div className="glass-card rounded-xl p-6 text-center hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-calculator text-2xl text-cosmic-900"></i>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Birth Chart</h3>
              <p className="text-muted-foreground mb-4">Generate your complete natal chart</p>
              <button 
                className="px-6 py-2 bg-gradient-to-r from-gold-400 to-primary text-cosmic-900 rounded-lg font-medium hover:shadow-lg transition-all duration-200"
                data-testid="button-birth-chart"
              >
                Generate
              </button>
            </div>
          </div>

          {/* Recent Consultations */}
          <div className="glass-card rounded-xl p-6">
            <h2 className="text-2xl font-serif font-bold mb-6 text-foreground">Recent Consultations</h2>
            {consultations.length > 0 ? (
              <div className="space-y-4">
                {consultations.slice(0, 3).map((consultation) => (
                  <div key={consultation.id} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                        <i className="fas fa-user text-cosmic-900"></i>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{consultation.type} Consultation</h4>
                        <p className="text-sm text-muted-foreground">
                          {new Date(consultation.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      consultation.status === 'completed' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {consultation.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <i className="fas fa-calendar-alt text-4xl text-muted-foreground mb-4"></i>
                <p className="text-muted-foreground">No consultations yet</p>
                <button 
                  className="mt-4 px-6 py-2 bg-gradient-to-r from-primary to-gold-400 text-cosmic-900 rounded-lg font-medium hover:shadow-lg transition-all duration-200"
                  data-testid="button-book-first-consultation"
                >
                  Book Your First Consultation
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
