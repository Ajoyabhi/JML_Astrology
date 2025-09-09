import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { Star, Clock, IndianRupee, Filter, Search, ShoppingCart } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import type { ServiceCategory, Service } from '@shared/schema';

export default function Services() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showFeatured, setShowFeatured] = useState<boolean>(false);

  // Fetch service categories
  const { data: categories = [], isLoading: categoriesLoading } = useQuery<ServiceCategory[]>({
    queryKey: ['/api/service-categories'],
  });

  // Fetch services with filters
  const { data: services = [], isLoading: servicesLoading } = useQuery<Service[]>({
    queryKey: ['/api/services', selectedCategory, searchQuery, showFeatured],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (selectedCategory !== 'all') params.set('categoryId', selectedCategory);
      if (searchQuery) params.set('search', searchQuery);
      if (showFeatured) params.set('featured', 'true');
      
      const response = await fetch(`/api/services?${params}`);
      if (!response.ok) throw new Error('Failed to fetch services');
      return response.json();
    },
  });

  const handleServiceClick = (serviceId: string) => {
    navigate(`/services/${serviceId}`);
  };

  const handleQuickBook = (service: Service, e: React.MouseEvent) => {
    e.stopPropagation();
    toast({
      title: "Book Service",
      description: `Redirecting to book ${service.name}...`,
    });
    navigate(`/services/${service.id}/book`);
  };

  const formatPrice = (price: number, currency: string) => {
    if (currency === 'INR') {
      return `₹${price.toLocaleString('en-IN')}`;
    }
    return `${currency} ${price}`;
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
            Astrology Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover your cosmic path with our comprehensive astrology services. From personal readings to business guidance, we have everything you need.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg border border-border"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                data-testid="input-search-services"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-input border-border"
              />
            </div>

            {/* Category Filter */}
            <Select 
              value={selectedCategory} 
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger data-testid="select-category" className="w-full md:w-[200px] bg-input border-border">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Featured Toggle */}
            <Button
              data-testid="button-toggle-featured"
              variant={showFeatured ? "default" : "outline"}
              onClick={() => setShowFeatured(!showFeatured)}
              className="w-full md:w-auto bg-gradient-to-r from-primary to-gold-400 text-cosmic-900 hover:shadow-lg"
            >
              <Star className="h-4 w-4 mr-2" />
              Featured
            </Button>
          </div>
        </motion.div>

        {/* Service Categories Pills */}
        {!categoriesLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-2 mb-8 justify-center"
          >
            <Badge
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              className="cursor-pointer hover:scale-105 transition-transform px-4 py-2"
              onClick={() => setSelectedCategory('all')}
            >
              All Services
            </Badge>
            {categories.map((category) => (
              <Badge
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                className="cursor-pointer hover:scale-105 transition-transform px-4 py-2"
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Badge>
            ))}
          </motion.div>
        )}

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesLoading
            ? Array.from({ length: 9 }).map((_, i) => (
                <Card key={i} className="h-[400px]">
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-20 w-full mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4" />
                  </CardContent>
                  <CardFooter>
                    <Skeleton className="h-10 w-full" />
                  </CardFooter>
                </Card>
              ))
            : services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card 
                    data-testid={`card-service-${service.id}`}
                    className="h-full cursor-pointer glass-card hover:scale-105 transition-all duration-300 overflow-hidden group"
                    onClick={() => handleServiceClick(service.id)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                            {service.name}
                          </CardTitle>
                          <CardDescription className="text-sm text-muted-foreground mt-1">
                            {service.shortDescription}
                          </CardDescription>
                        </div>
                        {service.isFeatured && (
                          <Badge className="ml-2 shrink-0 bg-gradient-to-r from-primary to-gold-400 text-cosmic-900">
                            <Star className="h-3 w-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent className="pb-4">
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                        {service.description}
                      </p>

                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 mr-2 text-primary" />
                          <span>{service.deliveryTime}</span>
                        </div>
                        
                        <div className="flex items-center text-sm font-medium text-foreground">
                          <IndianRupee className="h-4 w-4 mr-1 text-gold-400" />
                          <span>{formatPrice(Number(service.price), service.currency || 'INR')}</span>
                        </div>
                      </div>

                      {/* Service Tags */}
                      {service.tags && service.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-3">
                          {service.tags.slice(0, 3).map((tag, tagIndex) => (
                            <Badge 
                              key={tagIndex} 
                              variant="outline" 
                              className="text-xs px-2 py-1"
                            >
                              {tag}
                            </Badge>
                          ))}
                          {service.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs px-2 py-1">
                              +{service.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}
                    </CardContent>

                    <CardFooter className="pt-0">
                      <Button 
                        data-testid={`button-book-service-${service.id}`}
                        className="w-full bg-gradient-to-r from-primary to-gold-400 text-cosmic-900 hover:shadow-lg transition-all"
                        onClick={(e) => handleQuickBook(service, e)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Book Now
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
        </div>

        {/* No Services Found */}
        {!servicesLoading && services.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🔮</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No Services Found
            </h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search filters or browse all services.
            </p>
            <Button
              data-testid="button-clear-filters"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setShowFeatured(false);
              }}
              className="bg-gradient-to-r from-primary to-gold-400 text-cosmic-900 hover:shadow-lg"
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}