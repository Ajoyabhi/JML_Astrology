import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./googleAuth";
import { 
  insertAstrologerSchema,
  insertConsultationSchema,
  insertReviewSchema,
  insertBlogPostSchema,
  insertHoroscopeSchema,
  insertServiceCategorySchema,
  insertServiceSchema,
  insertOrderSchema,
  insertPaymentSchema,
  insertServiceReviewSchema 
} from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // User routes handled by googleAuth.ts

  // Astrologer routes
  app.get("/api/astrologers", async (req, res) => {
    try {
      const { search, specialization, language } = req.query;
      let astrologers;
      
      // Filter out "all" values which are used as placeholders
      const filterSpecialization = specialization && specialization !== "all" ? specialization as string : undefined;
      const filterLanguage = language && language !== "all" ? language as string : undefined;
      
      if (search || filterSpecialization || filterLanguage) {
        astrologers = await storage.searchAstrologers(
          search as string || "",
          filterSpecialization,
          filterLanguage
        );
      } else {
        astrologers = await storage.getAstrologers();
      }
      
      res.json(astrologers);
    } catch (error) {
      console.error("Error fetching astrologers:", error);
      res.status(500).json({ message: "Failed to fetch astrologers" });
    }
  });

  app.get("/api/astrologers/:id", async (req, res) => {
    try {
      const astrologer = await storage.getAstrologer(req.params.id);
      if (!astrologer) {
        return res.status(404).json({ message: "Astrologer not found" });
      }
      res.json(astrologer);
    } catch (error) {
      console.error("Error fetching astrologer:", error);
      res.status(500).json({ message: "Failed to fetch astrologer" });
    }
  });

  app.post("/api/astrologers", async (req, res) => {
    try {
      const astrologerData = insertAstrologerSchema.parse(req.body);
      const astrologer = await storage.createAstrologer(astrologerData);
      res.status(201).json(astrologer);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Invalid astrologer data", errors: error.errors });
      }
      console.error("Error creating astrologer:", error);
      res.status(500).json({ message: "Failed to create astrologer" });
    }
  });

  app.put("/api/astrologers/:id", async (req, res) => {
    try {
      const astrologer = await storage.updateAstrologer(req.params.id, req.body);
      res.json(astrologer);
    } catch (error) {
      console.error("Error updating astrologer:", error);
      res.status(500).json({ message: "Failed to update astrologer" });
    }
  });

  // Helper endpoint to update astrologer images
  app.post("/api/astrologers/update-images", async (req, res) => {
    try {
      const astrologers = await storage.getAstrologers();
      const imageMap = {
        "Pandit Rajesh Kumar": "/api/images/Elder_Indian_astrologer_portrait_b6960649.png",
        "Shrimati Priya Sharma": "/api/images/Indian_female_astrologer_portrait_3eec457b.png", 
        "Acharya Vikram Singh": "/api/images/Indian_male_astrologer_portrait_b6e4ad40.png",
        "Swami Arjun Dev": "/api/images/Young_Indian_astrologer_portrait_ebf342cd.png"
      };

      const updates = [];
      for (const astrologer of astrologers) {
        const imagePath = imageMap[astrologer.name as keyof typeof imageMap];
        if (imagePath && astrologer.profileImageUrl !== imagePath) {
          await storage.updateAstrologer(astrologer.id, { profileImageUrl: imagePath });
          updates.push({ name: astrologer.name, newImageUrl: imagePath });
        }
      }

      res.json({ message: "Image paths updated", updates });
    } catch (error) {
      console.error("Error updating astrologer images:", error);
      res.status(500).json({ message: "Failed to update astrologer images" });
    }
  });

  // Consultation routes
  app.get("/api/consultations", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const consultations = await storage.getConsultations(userId);
      res.json(consultations);
    } catch (error) {
      console.error("Error fetching consultations:", error);
      res.status(500).json({ message: "Failed to fetch consultations" });
    }
  });

  app.post("/api/consultations", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const consultationData = insertConsultationSchema.parse({
        ...req.body,
        userId
      });
      const consultation = await storage.createConsultation(consultationData);
      res.status(201).json(consultation);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Invalid consultation data", errors: error.errors });
      }
      console.error("Error creating consultation:", error);
      res.status(500).json({ message: "Failed to create consultation" });
    }
  });

  // Review routes
  app.get("/api/astrologers/:id/reviews", async (req, res) => {
    try {
      const reviews = await storage.getReviews(req.params.id);
      res.json(reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      res.status(500).json({ message: "Failed to fetch reviews" });
    }
  });

  app.post("/api/reviews", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const reviewData = insertReviewSchema.parse({
        ...req.body,
        userId
      });
      const review = await storage.createReview(reviewData);
      res.status(201).json(review);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Invalid review data", errors: error.errors });
      }
      console.error("Error creating review:", error);
      res.status(500).json({ message: "Failed to create review" });
    }
  });

  // Blog routes
  app.get("/api/blog", async (req, res) => {
    try {
      const posts = await storage.getBlogPosts();
      res.json(posts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogPost(req.params.slug);
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  // Horoscope routes
  app.get("/api/horoscope/:sign/:type", async (req, res) => {
    try {
      const { sign, type } = req.params;
      const requestedDate = req.query.date ? new Date(req.query.date as string) : new Date();
      const today = new Date();
      
      // First, try to get horoscope for the requested date
      let horoscope = await storage.getHoroscope(sign, type, requestedDate);
      
      // If not found, try to get the most recent horoscope for this sign/type
      if (!horoscope) {
        horoscope = await storage.getLatestHoroscopeForSign(sign, type);
      }
      
      if (!horoscope) {
        return res.status(404).json({ message: "Horoscope not found" });
      }
      
      // Always return with today's date for UI display, but keep original content
      const responseHoroscope = {
        ...horoscope,
        date: today.toISOString() // Always show today's date in UI
      };
      
      res.json(responseHoroscope);
    } catch (error) {
      console.error("Error fetching horoscope:", error);
      res.status(500).json({ message: "Failed to fetch horoscope" });
    }
  });

  app.get("/api/horoscopes/:type", async (req, res) => {
    try {
      const horoscopes = await storage.getLatestHoroscopes(req.params.type);
      res.json(horoscopes);
    } catch (error) {
      console.error("Error fetching horoscopes:", error);
      res.status(500).json({ message: "Failed to fetch horoscopes" });
    }
  });

  // =================== SERVICE ROUTES ===================

  // Get all service categories
  app.get("/api/service-categories", async (req, res) => {
    try {
      const categories = await storage.getServiceCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching service categories:", error);
      res.status(500).json({ message: "Failed to fetch service categories" });
    }
  });

  // Get services with optional filters
  app.get("/api/services", async (req, res) => {
    try {
      const { categoryId, search, featured } = req.query;
      const filters = {
        categoryId: categoryId as string,
        search: search as string,
        featured: featured === 'true'
      };
      
      const services = await storage.getServices(filters);
      res.json(services);
    } catch (error) {
      console.error("Error fetching services:", error);
      res.status(500).json({ message: "Failed to fetch services" });
    }
  });

  // Get specific service
  app.get("/api/services/:id", async (req, res) => {
    try {
      const service = await storage.getService(req.params.id);
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      res.json(service);
    } catch (error) {
      console.error("Error fetching service:", error);
      res.status(500).json({ message: "Failed to fetch service" });
    }
  });

  // Get service reviews
  app.get("/api/services/:id/reviews", async (req, res) => {
    try {
      const reviews = await storage.getServiceReviews(req.params.id);
      res.json(reviews);
    } catch (error) {
      console.error("Error fetching service reviews:", error);
      res.status(500).json({ message: "Failed to fetch service reviews" });
    }
  });

  // =================== ORDER ROUTES ===================

  // Get user orders
  app.get("/api/orders", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const orders = await storage.getOrders(userId);
      res.json(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });

  // Get specific order
  app.get("/api/orders/:id", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const order = await storage.getOrder(req.params.id, userId);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      console.error("Error fetching order:", error);
      res.status(500).json({ message: "Failed to fetch order" });
    }
  });

  // Create order (book service)
  app.post("/api/orders", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      
      // Validate request body
      const validatedData = insertOrderSchema.omit({ id: true, createdAt: true, updatedAt: true }).parse({
        ...req.body,
        userId,
      });

      const order = await storage.createOrder(validatedData);
      res.status(201).json(order);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      console.error("Error creating order:", error);
      res.status(500).json({ message: "Failed to create order" });
    }
  });

  // Get order deliverables
  app.get("/api/orders/:id/deliverables", isAuthenticated, async (req: any, res) => {
    try {
      const deliverables = await storage.getServiceDeliverables(req.params.id);
      res.json(deliverables);
    } catch (error) {
      console.error("Error fetching order deliverables:", error);
      res.status(500).json({ message: "Failed to fetch order deliverables" });
    }
  });

  // Calculator routes (mock calculations for now)
  app.post("/api/calculators/love-match", async (req, res) => {
    try {
      const { person1, person2 } = req.body;
      
      // Mock love match calculation
      const compatibility = Math.floor(Math.random() * 40) + 60; // 60-100%
      
      res.json({
        compatibility,
        message: `${person1.name} and ${person2.name} have ${compatibility}% compatibility`,
        details: {
          emotional: Math.floor(Math.random() * 20) + 80,
          intellectual: Math.floor(Math.random() * 30) + 70,
          physical: Math.floor(Math.random() * 25) + 75,
        }
      });
    } catch (error) {
      console.error("Error calculating love match:", error);
      res.status(500).json({ message: "Failed to calculate love match" });
    }
  });

  app.post("/api/calculators/numerology", async (req, res) => {
    try {
      const { name, birthDate } = req.body;
      
      // Mock numerology calculation
      const lifePathNumber = Math.floor(Math.random() * 9) + 1;
      
      res.json({
        lifePathNumber,
        meaning: `Life Path Number ${lifePathNumber} represents leadership and independence`,
        luckyNumbers: [lifePathNumber, lifePathNumber + 2, lifePathNumber + 5],
        compatibleNumbers: [1, 3, 5, 7, 9].filter(n => n !== lifePathNumber).slice(0, 3)
      });
    } catch (error) {
      console.error("Error calculating numerology:", error);
      res.status(500).json({ message: "Failed to calculate numerology" });
    }
  });

  app.post("/api/calculators/birth-chart", async (req, res) => {
    try {
      const { birthDate, birthTime, birthPlace } = req.body;
      
      // Mock birth chart calculation
      const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 
                   'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
      
      res.json({
        sunSign: signs[Math.floor(Math.random() * signs.length)],
        moonSign: signs[Math.floor(Math.random() * signs.length)],
        ascendant: signs[Math.floor(Math.random() * signs.length)],
        planets: {
          mercury: signs[Math.floor(Math.random() * signs.length)],
          venus: signs[Math.floor(Math.random() * signs.length)],
          mars: signs[Math.floor(Math.random() * signs.length)],
        }
      });
    } catch (error) {
      console.error("Error generating birth chart:", error);
      res.status(500).json({ message: "Failed to generate birth chart" });
    }
  });

  // =================== SERVICE MARKETPLACE ROUTES ===================

  // Service Categories
  app.get("/api/service-categories", async (req, res) => {
    try {
      const categories = await storage.getServiceCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching service categories:", error);
      res.status(500).json({ message: "Failed to fetch service categories" });
    }
  });

  // Services - Public marketplace
  app.get("/api/services", async (req, res) => {
    try {
      const { category, search, featured } = req.query;
      const services = await storage.getServices({
        categoryId: category as string,
        search: search as string,
        featured: featured === 'true'
      });
      res.json(services);
    } catch (error) {
      console.error("Error fetching services:", error);
      res.status(500).json({ message: "Failed to fetch services" });
    }
  });

  app.get("/api/services/:id", async (req, res) => {
    try {
      const service = await storage.getService(req.params.id);
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      res.json(service);
    } catch (error) {
      console.error("Error fetching service:", error);
      res.status(500).json({ message: "Failed to fetch service" });
    }
  });

  // Orders - Protected routes
  app.get("/api/orders", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const orders = await storage.getOrders(userId);
      res.json(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });

  app.get("/api/orders/:id", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const order = await storage.getOrder(req.params.id, userId);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      console.error("Error fetching order:", error);
      res.status(500).json({ message: "Failed to fetch order" });
    }
  });

  app.post("/api/orders", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const orderData = insertOrderSchema.parse({
        ...req.body,
        userId,
        orderNumber: `JML${Date.now()}` // Generate unique order number
      });
      
      const order = await storage.createOrder(orderData);
      res.status(201).json(order);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Invalid order data", errors: error.errors });
      }
      console.error("Error creating order:", error);
      res.status(500).json({ message: "Failed to create order" });
    }
  });

  // Payment Integration - Bank API endpoints
  app.post("/api/payments/initiate", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const { orderId, paymentMethod } = req.body;
      
      // Validate order belongs to user
      const order = await storage.getOrder(orderId, userId);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      // Create payment record
      const paymentData = insertPaymentSchema.parse({
        orderId,
        userId,
        amount: order.totalAmount,
        currency: order.currency,
        paymentMethod,
        status: "pending"
      });

      const payment = await storage.createPayment(paymentData);

      // TODO: Integrate with your bank's API here
      // For now, we'll return payment initiation data
      res.json({
        paymentId: payment.id,
        bankPaymentUrl: `/api/payments/mock-bank-redirect?paymentId=${payment.id}`,
        qrCode: `upi://pay?pa=merchant@jmlastro&pn=JML Astro&am=${order.totalAmount}&cu=INR&tn=${order.orderNumber}`,
        message: "Payment initiated successfully"
      });

    } catch (error) {
      console.error("Error initiating payment:", error);
      res.status(500).json({ message: "Failed to initiate payment" });
    }
  });

  app.post("/api/payments/webhook", async (req, res) => {
    try {
      // This will handle webhook from your bank's API
      const { paymentId, status, bankTransactionId, bankResponse } = req.body;
      
      // Verify webhook signature here (implement based on your bank's requirements)
      
      const result = await storage.updatePaymentStatus(paymentId, {
        status,
        bankTransactionId,
        bankResponse
      });

      if (status === "success") {
        // Update order status
        await storage.updateOrderStatus(result.orderId, "confirmed", "completed");
      }

      res.json({ message: "Webhook processed successfully" });
    } catch (error) {
      console.error("Error processing payment webhook:", error);
      res.status(500).json({ message: "Failed to process webhook" });
    }
  });

  app.get("/api/payments/status/:paymentId", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const payment = await storage.getPayment(req.params.paymentId, userId);
      
      if (!payment) {
        return res.status(404).json({ message: "Payment not found" });
      }

      res.json({
        status: payment.status,
        amount: payment.amount,
        paymentMethod: payment.paymentMethod,
        createdAt: payment.createdAt
      });
    } catch (error) {
      console.error("Error fetching payment status:", error);
      res.status(500).json({ message: "Failed to fetch payment status" });
    }
  });

  // Service Reviews
  app.get("/api/services/:id/reviews", async (req, res) => {
    try {
      const reviews = await storage.getServiceReviews(req.params.id);
      res.json(reviews);
    } catch (error) {
      console.error("Error fetching service reviews:", error);
      res.status(500).json({ message: "Failed to fetch service reviews" });
    }
  });

  app.post("/api/service-reviews", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const reviewData = insertServiceReviewSchema.parse({
        ...req.body,
        userId
      });
      
      const review = await storage.createServiceReview(reviewData);
      res.status(201).json(review);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Invalid review data", errors: error.errors });
      }
      console.error("Error creating service review:", error);
      res.status(500).json({ message: "Failed to create service review" });
    }
  });

  // Service Deliverables
  app.get("/api/orders/:orderId/deliverables", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      
      // Verify order belongs to user
      const order = await storage.getOrder(req.params.orderId, userId);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      const deliverables = await storage.getServiceDeliverables(req.params.orderId);
      res.json(deliverables);
    } catch (error) {
      console.error("Error fetching deliverables:", error);
      res.status(500).json({ message: "Failed to fetch deliverables" });
    }
  });

  // Admin/Astrologer routes (for service management)
  app.post("/api/admin/services", isAuthenticated, async (req: any, res) => {
    try {
      // TODO: Add admin/astrologer role check
      const serviceData = insertServiceSchema.parse(req.body);
      const service = await storage.createService(serviceData);
      res.status(201).json(service);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Invalid service data", errors: error.errors });
      }
      console.error("Error creating service:", error);
      res.status(500).json({ message: "Failed to create service" });
    }
  });

  // Mock bank redirect for development
  app.get("/api/payments/mock-bank-redirect", async (req, res) => {
    const { paymentId } = req.query;
    
    // Simulate bank redirect page
    res.send(`
      <html>
        <head><title>Mock Bank Payment</title></head>
        <body style="font-family: Arial; max-width: 500px; margin: 50px auto; padding: 20px;">
          <h2>Mock Bank Payment</h2>
          <p><strong>Payment ID:</strong> ${paymentId}</p>
          <div style="margin: 20px 0;">
            <button onclick="processPayment('success')" style="background: #4CAF50; color: white; padding: 10px 20px; border: none; border-radius: 5px; margin: 5px;">
              Simulate Success
            </button>
            <button onclick="processPayment('failed')" style="background: #f44336; color: white; padding: 10px 20px; border: none; border-radius: 5px; margin: 5px;">
              Simulate Failure
            </button>
          </div>
          <script>
            function processPayment(status) {
              fetch('/api/payments/webhook', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  paymentId: '${paymentId}',
                  status: status,
                  bankTransactionId: 'TXN' + Date.now(),
                  bankResponse: { mockResponse: true, status: status }
                })
              }).then(() => {
                alert('Payment ' + status + '! Redirecting back to app...');
                window.location.href = '/orders';
              });
            }
          </script>
        </body>
      </html>
    `);
  });

  const httpServer = createServer(app);
  return httpServer;
}
