import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import type { Consultation, User } from "@shared/schema";
import { TrendingUp, MessageCircle, Calculator, User as UserIcon, Calendar, Sparkles, Star, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

export default function Home() {
  const { user } = useAuth();
  const { t } = useLanguage();
  
  const { data: consultations = [] } = useQuery<Consultation[]>({
    queryKey: ["/api/consultations"],
    queryFn: async () => {
      const response = await fetch('/api/consultations', { credentials: 'include' });
      if (!response.ok) throw new Error('Failed to fetch consultations');
      return response.json();
    },
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const slideInVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const slideInFromLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const slideInFromRight = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const scaleInVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-20 pb-16 overflow-hidden">
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Hero Welcome Section */}
          <motion.div 
            className="text-center mb-20 relative"
            variants={slideInVariants}
          >
            {/* Floating decoration */}
            <motion.div
              className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8"
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Sparkles className="h-8 w-8 text-gold-400" />
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight"
              variants={slideInVariants}
            >
              {t('home.welcome')}{" "}
              <motion.span 
                className="bg-gradient-to-r from-primary via-accent to-gold-400 bg-clip-text text-transparent"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{ backgroundSize: "200% 100%" }}
              >
                {(user as User)?.firstName || t('home.cosmic_seeker')}
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              variants={slideInVariants}
            >
              {t('home.dashboard')}
            </motion.p>

            {/* Floating stars */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${20 + i * 30}%`,
                  top: `${10 + i * 20}%`
                }}
                animate={{
                  y: [0, -15, 0],
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  delay: i * 0.5
                }}
              >
                <Star className="h-4 w-4 text-gold-400 fill-current" />
              </motion.div>
            ))}
          </motion.div>

          {/* Quick Actions - Enhanced with slide animations */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
            variants={containerVariants}
          >
            {[
              {
                icon: TrendingUp,
                gradient: "from-primary to-gold-400",
                title: t('home.daily_horoscope'),
                desc: t('home.daily_horoscope_desc'),
                button: t('home.read_now'),
                testId: "button-daily-horoscope",
                delay: 0
              },
              {
                icon: MessageCircle,
                gradient: "from-accent to-mystic-600",
                title: t('home.quick_consultation'),
                desc: t('home.quick_consultation_desc'),
                button: t('home.start_chat'),
                testId: "button-quick-chat",
                delay: 0.1
              },
              {
                icon: Calculator,
                gradient: "from-gold-400 to-primary",
                title: t('home.birth_chart'),
                desc: t('home.birth_chart_desc'),
                button: t('home.generate'),
                testId: "button-birth-chart",
                delay: 0.2
              }
            ].map((action, index) => (
              <motion.div
                key={index}
                className="group"
                variants={slideInVariants}
                whileHover={{ 
                  scale: 1.05,
                  y: -10,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="glass-card rounded-2xl p-8 text-center relative overflow-hidden h-full">
                  {/* Background glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  {/* Animated icon container */}
                  <motion.div 
                    className={`w-20 h-20 bg-gradient-to-br ${action.gradient} rounded-full flex items-center justify-center mx-auto mb-6 relative`}
                    whileHover={{ 
                      rotate: [0, -10, 10, 0],
                      scale: 1.1
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <action.icon className="h-10 w-10 text-cosmic-900" />
                    
                    {/* Pulse effect */}
                    <motion.div
                      className={`absolute inset-0 rounded-full bg-gradient-to-br ${action.gradient} opacity-30`}
                      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>

                  <motion.h3 
                    className="text-2xl font-semibold text-foreground mb-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + action.delay }}
                  >
                    {action.title}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-muted-foreground mb-6 leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + action.delay }}
                  >
                    {action.desc}
                  </motion.p>
                  
                  <motion.button 
                    className={`group/btn px-8 py-3 bg-gradient-to-r ${action.gradient} text-cosmic-900 rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 relative overflow-hidden`}
                    data-testid={action.testId}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + action.delay }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {action.button}
                      <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </span>
                    
                    {/* Button shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Recent Consultations - Enhanced with animations */}
          <motion.div 
            className="glass-card rounded-2xl p-8 relative overflow-hidden"
            variants={slideInVariants}
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
            
            <motion.h2 
              className="text-3xl font-serif font-bold mb-8 text-foreground relative z-10"
              variants={slideInFromLeft}
            >
              {t('home.recent_consultations')}
            </motion.h2>
            
            {consultations.length > 0 ? (
              <motion.div 
                className="space-y-6 relative z-10"
                variants={containerVariants}
              >
                {consultations.slice(0, 3).map((consultation, index) => (
                  <motion.div
                    key={consultation.id}
                    className="flex items-center justify-between p-6 bg-muted/10 rounded-xl hover:bg-muted/20 transition-all duration-300 border border-gray-800/50"
                    variants={slideInFromRight}
                    whileHover={{ scale: 1.02, x: 10 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center gap-6">
                      <motion.div 
                        className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <UserIcon className="h-7 w-7 text-cosmic-900" />
                      </motion.div>
                      <div>
                        <h4 className="font-semibold text-foreground text-lg">{consultation.type} Consultation</h4>
                        <p className="text-muted-foreground">
                          {consultation.createdAt ? new Date(consultation.createdAt).toLocaleDateString() : 'Recent'}
                        </p>
                      </div>
                    </div>
                    <motion.span 
                      className={`px-4 py-2 rounded-full text-sm font-medium ${
                        consultation.status === 'completed' 
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                          : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                      }`}
                      whileHover={{ scale: 1.1 }}
                    >
                      {consultation.status}
                    </motion.span>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                className="text-center py-16 relative z-10"
                variants={scaleInVariants}
              >
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Calendar className="h-20 w-20 text-muted-foreground mb-6 mx-auto" />
                </motion.div>
                
                <motion.p 
                  className="text-muted-foreground text-lg mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {t('home.no_consultations')}
                </motion.p>
                
                <motion.button 
                  className="group px-8 py-4 bg-gradient-to-r from-primary to-gold-400 text-cosmic-900 rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
                  data-testid="button-book-first-consultation"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {t('home.book_first')}
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  
                  {/* Button shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
                  />
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
}
