import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Star, Users, Globe, GraduationCap, Languages, DollarSign, Phone, MessageCircle, Video } from "lucide-react";
import { CardSkeleton } from "@/components/SkeletonLoader";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Astrologer } from "@shared/schema";

export default function Astrologers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [selectedAstrologer, setSelectedAstrologer] = useState<(Astrologer & { consultationType?: string }) | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const { data: astrologers = [], isLoading } = useQuery<Astrologer[]>({
    queryKey: ["/api/astrologers", searchQuery, selectedSpecialization, selectedLanguage],
  });

  const handleBookConsultation = (astrologer: Astrologer, type: string) => {
    setSelectedAstrologer({ ...astrologer, consultationType: type });
    setShowBookingModal(true);
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Expert Astrologers
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Connect with certified astrologers for personalized consultations
            </p>
            
            {/* Search and Filters */}
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4 mb-12">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Search by name, specialization, or language..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-input border-border"
                  data-testid="input-search-astrologers"
                />
              </div>
              <div className="flex gap-2">
                <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
                  <SelectTrigger className="w-48 bg-input border-border" data-testid="select-specialization">
                    <SelectValue placeholder="All Specializations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Specializations</SelectItem>
                    <SelectItem value="Love & Relationships">Love & Relationships</SelectItem>
                    <SelectItem value="Career & Finance">Career & Finance</SelectItem>
                    <SelectItem value="Health & Family">Health & Family</SelectItem>
                    <SelectItem value="Vedic Astrology">Vedic Astrology</SelectItem>
                    <SelectItem value="Tarot Reading">Tarot Reading</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger className="w-40 bg-input border-border" data-testid="select-language">
                    <SelectValue placeholder="All Languages" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Languages</SelectItem>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Hindi">Hindi</SelectItem>
                    <SelectItem value="Bengali">Bengali</SelectItem>
                    <SelectItem value="Tamil">Tamil</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Astrologers Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {astrologers.map((astrologer) => (
                <Card key={astrologer.id} className="glass-card hover:scale-105 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <img
                        src={astrologer.profileImageUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"}
                        alt={astrologer.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-primary/30"
                        data-testid={`img-astrologer-${astrologer.id}`}
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-foreground mb-1" data-testid={`text-astrologer-name-${astrologer.id}`}>
                          {astrologer.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2" data-testid={`text-astrologer-specialization-${astrologer.id}`}>
                          {astrologer.specialization?.join(', ')}
                        </p>
                        <div className="flex items-center gap-2">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${i < Math.floor(parseFloat(astrologer.rating || '0')) ? 'fill-current' : ''}`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground" data-testid={`text-astrologer-rating-${astrologer.id}`}>
                            {astrologer.rating} ({astrologer.reviewCount} reviews)
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <GraduationCap className="w-4 h-4 text-primary" />
                        <span data-testid={`text-astrologer-experience-${astrologer.id}`}>
                          {astrologer.experience} years experience
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Languages className="w-4 h-4 text-primary" />
                        <span data-testid={`text-astrologer-languages-${astrologer.id}`}>
                          {astrologer.languages?.join(', ')}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <DollarSign className="w-4 h-4 text-primary" />
                        <span data-testid={`text-astrologer-price-${astrologer.id}`}>
                          ₹{astrologer.pricePerMinute}/min
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2 mb-4">
                      <Button
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-primary to-gold-400 text-cosmic-900 hover:shadow-lg"
                        onClick={() => handleBookConsultation(astrologer, 'chat')}
                        data-testid={`button-chat-${astrologer.id}`}
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Chat
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-accent to-mystic-600 text-foreground hover:shadow-lg"
                        onClick={() => handleBookConsultation(astrologer, 'call')}
                        data-testid={`button-call-${astrologer.id}`}
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-mystic-500 to-accent text-foreground hover:shadow-lg"
                        onClick={() => handleBookConsultation(astrologer, 'video')}
                        data-testid={`button-video-${astrologer.id}`}
                      >
                        <Video className="w-4 h-4 mr-2" />
                        Video
                      </Button>
                    </div>

                    <div className="flex items-center justify-center">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        astrologer.isOnline && astrologer.status === 'available'
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : astrologer.isOnline && astrologer.status === 'busy'
                          ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                          : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                      }`}>
                        <span className={`w-2 h-2 rounded-full mr-1 ${
                          astrologer.isOnline && astrologer.status === 'available'
                            ? 'bg-green-400 animate-pulse'
                            : astrologer.isOnline && astrologer.status === 'busy'
                            ? 'bg-yellow-400'
                            : 'bg-gray-400'
                        }`}></span>
                        {astrologer.isOnline 
                          ? astrologer.status === 'available' 
                            ? 'Online Now' 
                            : 'Busy'
                          : 'Offline'
                        }
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {astrologers.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">No astrologers found matching your criteria</p>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedSpecialization("");
                  setSelectedLanguage("");
                }}
                className="bg-gradient-to-r from-primary to-gold-400 text-cosmic-900"
                data-testid="button-clear-filters"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>

      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        astrologer={selectedAstrologer}
      />
      
      <Footer />
    </div>
  );
}
