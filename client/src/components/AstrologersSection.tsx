import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, GraduationCap, Languages, DollarSign, MessageCircle, Phone, Video } from "lucide-react";
import BookingModal from "./BookingModal";
import type { Astrologer } from "@shared/schema";

export default function AstrologersSection() {
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

  // Show only first 3 astrologers for the landing page section
  const featuredAstrologers = astrologers.slice(0, 3);

  return (
    <section className="py-20 bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Expert Astrologers
            </span>
          </h2>
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
                data-testid="input-search-astrologers-featured"
              />
            </div>
            <div className="flex gap-2">
              <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
                <SelectTrigger className="w-48 bg-input border-border" data-testid="select-specialization-featured">
                  <SelectValue placeholder="All Specializations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specializations</SelectItem>
                  <SelectItem value="Love & Relationships">Love & Relationships</SelectItem>
                  <SelectItem value="Career & Finance">Career & Finance</SelectItem>
                  <SelectItem value="Health & Family">Health & Family</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-40 bg-input border-border" data-testid="select-language-featured">
                  <SelectValue placeholder="All Languages" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Languages</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Hindi">Hindi</SelectItem>
                  <SelectItem value="Bengali">Bengali</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Featured Astrologers Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="glass-card rounded-xl overflow-hidden">
                <div className="p-6 animate-pulse">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 bg-muted rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-muted rounded mb-2"></div>
                      <div className="h-3 bg-muted rounded mb-2"></div>
                      <div className="h-3 bg-muted rounded w-2/3"></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-3 bg-muted rounded"></div>
                    <div className="h-3 bg-muted rounded"></div>
                    <div className="h-3 bg-muted rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredAstrologers.map((astrologer) => (
              <div 
                key={astrologer.id} 
                className="glass-card rounded-xl overflow-hidden hover:scale-105 transition-all duration-300"
                data-testid={`featured-astrologer-${astrologer.id}`}
              >
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={astrologer.profileImageUrl || `/attached_assets/generated_images/${astrologer.id % 2 === 0 ? 'Indian_male_astrologer_portrait_b6e4ad40.png' : 'Indian_female_astrologer_portrait_3eec457b.png'}`}
                      alt={astrologer.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-primary/30"
                      data-testid={`img-featured-astrologer-${astrologer.id}`}
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-foreground mb-1" data-testid={`text-featured-astrologer-name-${astrologer.id}`}>
                        {astrologer.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2" data-testid={`text-featured-astrologer-specialization-${astrologer.id}`}>
                        {astrologer.specialization?.join(', ')}
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${i < Math.floor(parseFloat(astrologer.rating)) ? 'fill-current' : ''}`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground" data-testid={`text-featured-astrologer-rating-${astrologer.id}`}>
                          {astrologer.rating} ({astrologer.reviewCount} reviews)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <GraduationCap className="w-4 h-4 text-primary" />
                      <span data-testid={`text-featured-astrologer-experience-${astrologer.id}`}>
                        {astrologer.experience} years experience
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Languages className="w-4 h-4 text-primary" />
                      <span data-testid={`text-featured-astrologer-languages-${astrologer.id}`}>
                        {astrologer.languages?.join(', ')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <DollarSign className="w-4 h-4 text-primary" />
                      <span data-testid={`text-featured-astrologer-price-${astrologer.id}`}>
                        ₹{astrologer.pricePerMinute}/min
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 mb-4">
                    <Button
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-primary to-gold-400 text-cosmic-900 hover:shadow-lg"
                      onClick={() => handleBookConsultation(astrologer, 'chat')}
                      data-testid={`button-featured-chat-${astrologer.id}`}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Chat
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-accent to-mystic-600 text-foreground hover:shadow-lg"
                      onClick={() => handleBookConsultation(astrologer, 'call')}
                      data-testid={`button-featured-call-${astrologer.id}`}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call
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
                          : 'Busy - 5 min wait'
                        : 'Offline'
                      }
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Button 
            className="px-8 py-3 bg-gradient-to-r from-primary to-gold-400 text-cosmic-900 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
            onClick={() => window.location.href = "/astrologers"}
            data-testid="button-view-all-astrologers"
          >
            View All Astrologers
          </Button>
        </div>
      </div>

      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        astrologer={selectedAstrologer}
      />
    </section>
  );
}
