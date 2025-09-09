import { useState } from "react";
import Navigation from "@/components/Navigation";
import DonationBanner from "@/components/DonationBanner";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import type { Horoscope } from "@shared/schema";
import { Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Horoscope() {
  const [selectedSign, setSelectedSign] = useState<string>("aries");
  const [activeType, setActiveType] = useState<string>("daily");
  const { t } = useLanguage();

  const { data: horoscope, isLoading } = useQuery<Horoscope>({
    queryKey: ["/api/horoscope", selectedSign, activeType],
    enabled: !!selectedSign && !!activeType,
  });

  const zodiacSigns = [
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
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <DonationBanner />
      
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {t('horoscope.title')}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('horoscope.subtitle')}
            </p>
          </div>

          {/* Horoscope Type Tabs */}
          <Tabs value={activeType} onValueChange={setActiveType} className="w-full mb-8">
            <TabsList className="grid w-full grid-cols-4 glass-card max-w-md mx-auto">
              <TabsTrigger value="daily" data-testid="tab-daily">{t('horoscope.daily')}</TabsTrigger>
              <TabsTrigger value="weekly" data-testid="tab-weekly">{t('horoscope.weekly')}</TabsTrigger>
              <TabsTrigger value="monthly" data-testid="tab-monthly">{t('horoscope.monthly')}</TabsTrigger>
              <TabsTrigger value="yearly" data-testid="tab-yearly">{t('horoscope.yearly')}</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Zodiac Signs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
            {zodiacSigns.map((zodiac) => (
              <button
                key={zodiac.sign}
                onClick={() => setSelectedSign(zodiac.sign)}
                className={`glass-card rounded-xl p-4 text-center hover:scale-105 transition-all duration-300 group ${
                  selectedSign === zodiac.sign ? 'ring-2 ring-primary bg-primary/10' : ''
                }`}
                data-testid={`select-zodiac-${zodiac.sign}`}
              >
                <div className="text-3xl mb-2">{zodiac.symbol}</div>
                <div className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                  {zodiac.name}
                </div>
                <div className="text-xs text-muted-foreground">{zodiac.dates}</div>
              </button>
            ))}
          </div>

          {/* Horoscope Content */}
          <Card className="glass-card border-primary/30">
            <CardContent className="p-8">
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Loading your horoscope...</p>
                </div>
              ) : horoscope ? (
                <div data-testid="horoscope-content">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-6xl">
                      {zodiacSigns.find(z => z.sign === selectedSign)?.symbol}
                    </div>
                    <div>
                      <h2 className="text-2xl font-serif font-bold text-foreground">
                        {zodiacSigns.find(z => z.sign === selectedSign)?.name}
                      </h2>
                      <p className="text-muted-foreground capitalize">{activeType} Horoscope</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(horoscope.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-lg text-foreground leading-relaxed">{horoscope.content}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="h-16 w-16 text-muted-foreground mb-4 mx-auto" />
                  <p className="text-muted-foreground mb-4">
                    No horoscope available for {zodiacSigns.find(z => z.sign === selectedSign)?.name} ({activeType})
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Check back later for updated cosmic insights.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
