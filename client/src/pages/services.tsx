import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { Star, Clock, IndianRupee, Filter, Search, ShoppingCart } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-slate-950 dark:via-blue-950/30 dark:to-purple-950/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-amber-600 bg-clip-text text-transparent mb-4">
            Astrology Services
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover your cosmic path with our comprehensive astrology services. From personal readings to business guidance, we have everything you need.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg border border-white/20"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                data-testid="input-search-services"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <Select 
              value={selectedCategory} 
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger data-testid="select-category" className="w-full md:w-[200px]">
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
              className="w-full md:w-auto"
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
                    className="h-full cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-white/20 overflow-hidden group"
                    onClick={() => handleServiceClick(service.id)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                            {service.name}
                          </CardTitle>
                          <CardDescription className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {service.shortDescription}
                          </CardDescription>
                        </div>
                        {service.isFeatured && (
                          <Badge variant="secondary" className="ml-2 shrink-0">
                            <Star className="h-3 w-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent className="pb-4">
                      <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3 mb-4">
                        {service.description}
                      </p>

                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <Clock className="h-4 w-4 mr-2 text-blue-500" />
                          <span>{service.deliveryTime}</span>
                        </div>
                        
                        <div className="flex items-center text-sm font-medium text-gray-900 dark:text-white">
                          <IndianRupee className="h-4 w-4 mr-1 text-green-600" />
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
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all"
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
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No Services Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your search filters or browse all services.
            </p>
            <Button
              data-testid="button-clear-filters"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setShowFeatured(false);
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}