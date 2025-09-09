import { useState } from "react";
import Navigation from "@/components/Navigation";
import DonationBanner from "@/components/DonationBanner";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Star } from "lucide-react";

export default function Calculators() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("love-match");

  const loveMatchMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/calculators/love-match", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Love Match Calculated!",
        description: data.message,
      });
    },
  });

  const numerologyMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/calculators/numerology", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Numerology Calculated!",
        description: `Your Life Path Number is ${data.lifePathNumber}`,
      });
    },
  });

  const birthChartMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/calculators/birth-chart", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Birth Chart Generated!",
        description: `Your Sun Sign is ${data.sunSign}`,
      });
    },
  });

  return (
    <div className="min-h-screen">
      <Navigation />
      <DonationBanner />
      
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Astrology Calculators
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover insights about yourself with our comprehensive suite of astrology tools
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 glass-card">
              <TabsTrigger value="love-match" data-testid="tab-love-match">Love Match</TabsTrigger>
              <TabsTrigger value="numerology" data-testid="tab-numerology">Numerology</TabsTrigger>
              <TabsTrigger value="birth-chart" data-testid="tab-birth-chart">Birth Chart</TabsTrigger>
              <TabsTrigger value="nakshatra" data-testid="tab-nakshatra">Nakshatra</TabsTrigger>
            </TabsList>

            <TabsContent value="love-match" className="mt-8">
              <Card className="glass-card border-primary/30">
                <CardHeader>
                  <CardTitle className="text-foreground">Love Compatibility Calculator</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Discover your compatibility with your partner based on astrological principles
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    loveMatchMutation.mutate({
                      person1: {
                        name: formData.get('person1Name'),
                        birthDate: formData.get('person1BirthDate'),
                      },
                      person2: {
                        name: formData.get('person2Name'),
                        birthDate: formData.get('person2BirthDate'),
                      }
                    });
                  }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-foreground">Person 1</h3>
                        <div>
                          <Label htmlFor="person1Name">Name</Label>
                          <Input 
                            id="person1Name" 
                            name="person1Name" 
                            placeholder="Enter your name" 
                            required 
                            data-testid="input-person1-name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="person1BirthDate">Birth Date</Label>
                          <Input 
                            id="person1BirthDate" 
                            name="person1BirthDate" 
                            type="date" 
                            required 
                            data-testid="input-person1-birthdate"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-foreground">Person 2</h3>
                        <div>
                          <Label htmlFor="person2Name">Name</Label>
                          <Input 
                            id="person2Name" 
                            name="person2Name" 
                            placeholder="Enter partner's name" 
                            required 
                            data-testid="input-person2-name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="person2BirthDate">Birth Date</Label>
                          <Input 
                            id="person2BirthDate" 
                            name="person2BirthDate" 
                            type="date" 
                            required 
                            data-testid="input-person2-birthdate"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full mt-6 bg-gradient-to-r from-primary to-gold-400 text-cosmic-900 hover:shadow-lg"
                      disabled={loveMatchMutation.isPending}
                      data-testid="button-calculate-love-match"
                    >
                      {loveMatchMutation.isPending ? "Calculating..." : "Calculate Compatibility"}
                    </Button>
                  </form>

                  {loveMatchMutation.data && (
                    <div className="mt-6 p-4 glass-card rounded-lg" data-testid="result-love-match">
                      <h4 className="text-lg font-semibold text-foreground mb-2">
                        Compatibility: {loveMatchMutation.data.compatibility}%
                      </h4>
                      <p className="text-muted-foreground mb-4">{loveMatchMutation.data.message}</p>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">{loveMatchMutation.data.details.emotional}%</div>
                          <div className="text-sm text-muted-foreground">Emotional</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-accent">{loveMatchMutation.data.details.intellectual}%</div>
                          <div className="text-sm text-muted-foreground">Intellectual</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gold-400">{loveMatchMutation.data.details.physical}%</div>
                          <div className="text-sm text-muted-foreground">Physical</div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="numerology" className="mt-8">
              <Card className="glass-card border-accent/30">
                <CardHeader>
                  <CardTitle className="text-foreground">Numerology Calculator</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Uncover the hidden meanings behind numbers in your life and destiny
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    numerologyMutation.mutate({
                      name: formData.get('name'),
                      birthDate: formData.get('birthDate'),
                    });
                  }}>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          name="name" 
                          placeholder="Enter your full name" 
                          required 
                          data-testid="input-numerology-name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="birthDate">Birth Date</Label>
                        <Input 
                          id="birthDate" 
                          name="birthDate" 
                          type="date" 
                          required 
                          data-testid="input-numerology-birthdate"
                        />
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full mt-6 bg-gradient-to-r from-accent to-mystic-600 text-foreground hover:shadow-lg"
                      disabled={numerologyMutation.isPending}
                      data-testid="button-calculate-numerology"
                    >
                      {numerologyMutation.isPending ? "Calculating..." : "Calculate Numbers"}
                    </Button>
                  </form>

                  {numerologyMutation.data && (
                    <div className="mt-6 p-4 glass-card rounded-lg" data-testid="result-numerology">
                      <h4 className="text-lg font-semibold text-foreground mb-2">
                        Life Path Number: {numerologyMutation.data.lifePathNumber}
                      </h4>
                      <p className="text-muted-foreground mb-4">{numerologyMutation.data.meaning}</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium text-foreground mb-2">Lucky Numbers</h5>
                          <div className="flex gap-2">
                            {numerologyMutation.data.luckyNumbers.map((num: number) => (
                              <span key={num} className="w-8 h-8 bg-primary/20 text-primary rounded-full flex items-center justify-center text-sm font-bold">
                                {num}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="font-medium text-foreground mb-2">Compatible Numbers</h5>
                          <div className="flex gap-2">
                            {numerologyMutation.data.compatibleNumbers.map((num: number) => (
                              <span key={num} className="w-8 h-8 bg-accent/20 text-accent rounded-full flex items-center justify-center text-sm font-bold">
                                {num}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="birth-chart" className="mt-8">
              <Card className="glass-card border-gold-400/30">
                <CardHeader>
                  <CardTitle className="text-foreground">Birth Chart Generator</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Generate your complete natal chart with detailed planetary positions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    birthChartMutation.mutate({
                      birthDate: formData.get('birthDate'),
                      birthTime: formData.get('birthTime'),
                      birthPlace: formData.get('birthPlace'),
                    });
                  }}>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="birthDate">Birth Date</Label>
                        <Input 
                          id="birthDate" 
                          name="birthDate" 
                          type="date" 
                          required 
                          data-testid="input-birth-date"
                        />
                      </div>
                      <div>
                        <Label htmlFor="birthTime">Birth Time</Label>
                        <Input 
                          id="birthTime" 
                          name="birthTime" 
                          type="time" 
                          required 
                          data-testid="input-birth-time"
                        />
                      </div>
                      <div>
                        <Label htmlFor="birthPlace">Birth Place</Label>
                        <Input 
                          id="birthPlace" 
                          name="birthPlace" 
                          placeholder="City, Country" 
                          required 
                          data-testid="input-birth-place"
                        />
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full mt-6 bg-gradient-to-r from-gold-400 to-primary text-cosmic-900 hover:shadow-lg"
                      disabled={birthChartMutation.isPending}
                      data-testid="button-generate-birth-chart"
                    >
                      {birthChartMutation.isPending ? "Generating..." : "Generate Birth Chart"}
                    </Button>
                  </form>

                  {birthChartMutation.data && (
                    <div className="mt-6 p-4 glass-card rounded-lg" data-testid="result-birth-chart">
                      <h4 className="text-lg font-semibold text-foreground mb-4">Your Birth Chart</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-primary/20 rounded-lg">
                          <h5 className="font-medium text-primary mb-2">Sun Sign</h5>
                          <div className="text-xl font-bold text-foreground">{birthChartMutation.data.sunSign}</div>
                        </div>
                        <div className="text-center p-4 bg-accent/20 rounded-lg">
                          <h5 className="font-medium text-accent mb-2">Moon Sign</h5>
                          <div className="text-xl font-bold text-foreground">{birthChartMutation.data.moonSign}</div>
                        </div>
                        <div className="text-center p-4 bg-gold-400/20 rounded-lg">
                          <h5 className="font-medium text-gold-400 mb-2">Ascendant</h5>
                          <div className="text-xl font-bold text-foreground">{birthChartMutation.data.ascendant}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="nakshatra" className="mt-8">
              <Card className="glass-card border-mystic-500/30">
                <CardHeader>
                  <CardTitle className="text-foreground">Nakshatra Finder</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Discover your birth star and its significance in Vedic astrology
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Star className="h-16 w-16 text-mystic-500 mb-4 mx-auto" />
                    <p className="text-muted-foreground mb-4">Coming Soon!</p>
                    <p className="text-sm text-muted-foreground">
                      Advanced Nakshatra calculations will be available in the next update.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
