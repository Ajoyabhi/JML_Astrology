import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import type { Consultation, User } from "@shared/schema";
import { TrendingUp, MessageCircle, Calculator, User as UserIcon, Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
  const { user } = useAuth();
  const { t } = useLanguage();
  
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
              {t('home.welcome')} <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {(user as User)?.firstName || t('home.cosmic_seeker')}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('home.dashboard')}
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="glass-card rounded-xl p-6 text-center hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-gold-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-cosmic-900" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{t('home.daily_horoscope')}</h3>
              <p className="text-muted-foreground mb-4">{t('home.daily_horoscope_desc')}</p>
              <button 
                className="px-6 py-2 bg-gradient-to-r from-primary to-gold-400 text-cosmic-900 rounded-lg font-medium hover:shadow-lg transition-all duration-200"
                data-testid="button-daily-horoscope"
              >
                {t('home.read_now')}
              </button>
            </div>

            <div className="glass-card rounded-xl p-6 text-center hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-mystic-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{t('home.quick_consultation')}</h3>
              <p className="text-muted-foreground mb-4">{t('home.quick_consultation_desc')}</p>
              <button 
                className="px-6 py-2 bg-gradient-to-r from-accent to-mystic-600 text-foreground rounded-lg font-medium hover:shadow-lg transition-all duration-200"
                data-testid="button-quick-chat"
              >
                {t('home.start_chat')}
              </button>
            </div>

            <div className="glass-card rounded-xl p-6 text-center hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Calculator className="h-8 w-8 text-cosmic-900" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{t('home.birth_chart')}</h3>
              <p className="text-muted-foreground mb-4">{t('home.birth_chart_desc')}</p>
              <button 
                className="px-6 py-2 bg-gradient-to-r from-gold-400 to-primary text-cosmic-900 rounded-lg font-medium hover:shadow-lg transition-all duration-200"
                data-testid="button-birth-chart"
              >
                {t('home.generate')}
              </button>
            </div>
          </div>

          {/* Recent Consultations */}
          <div className="glass-card rounded-xl p-6">
            <h2 className="text-2xl font-serif font-bold mb-6 text-foreground">{t('home.recent_consultations')}</h2>
            {consultations.length > 0 ? (
              <div className="space-y-4">
                {consultations.slice(0, 3).map((consultation) => (
                  <div key={consultation.id} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                        <UserIcon className="h-6 w-6 text-cosmic-900" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{consultation.type} Consultation</h4>
                        <p className="text-sm text-muted-foreground">
                          {consultation.createdAt ? new Date(consultation.createdAt).toLocaleDateString() : 'Recent'}
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
                <Calendar className="h-16 w-16 text-muted-foreground mb-4 mx-auto" />
                <p className="text-muted-foreground">{t('home.no_consultations')}</p>
                <button 
                  className="mt-4 px-6 py-2 bg-gradient-to-r from-primary to-gold-400 text-cosmic-900 rounded-lg font-medium hover:shadow-lg transition-all duration-200"
                  data-testid="button-book-first-consultation"
                >
                  {t('home.book_first')}
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
