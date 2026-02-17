import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./googleAuth";
import { unpayPayin } from "./unpay";
import { db } from "./db";
import { payments } from "@shared/schema";
import { eq } from "drizzle-orm";
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
      const validatedData = insertOrderSchema.parse({
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

  // Payment Integration - Unpay API endpoints
  // Works for both authenticated and unauthenticated users
  app.post("/api/payments/initiate", async (req: any, res) => {
    try {
      // Get userId from authenticated user or create/use guest user
      let userId: string;
      if (req.user && req.user.id) {
        userId = req.user.id;
      } else {
        // For guest users, create or get a guest user
        // Use email from request to find or create guest user
        const { email } = req.body;
        let guestUser;
        
        if (email) {
          // Try to find existing user by email
          guestUser = await storage.getUserByEmail(email);
        }
        
        if (!guestUser) {
          // Create a guest user for this payment
          const guestEmail = email || `guest_${Date.now()}@jmlastro.guest`;
          guestUser = await storage.createUser({
            email: guestEmail,
            firstName: req.body.firstName || "Guest",
            lastName: req.body.lastName || "User",
            authProvider: "guest",
            isEmailVerified: false,
          });
        }
        
        userId = guestUser.id;
      }
      
      const { orderId, paymentMethod, amount, currency, orderNumber, bookingType } = req.body;
      
      let order;
      let paymentAmount: number;
      let paymentCurrency: string;
      let referenceId: string;

      // Handle case where orderId is provided (existing order)
      if (orderId) {
        // Try to get the order - for authenticated users, check ownership
        // For guest users, we'll try to get it by orderId only
        try {
          if (req.user && req.user.id) {
            order = await storage.getOrder(orderId, userId);
          } else {
            // For guests, try to get order without userId check
            // Note: This is less secure but allows guest payments
            // In production, you might want to add a guest token or session-based validation
            const allOrders = await storage.getOrders(userId);
            order = allOrders.find(o => o.id === orderId);
          }
        } catch (error) {
          console.warn("Could not fetch order:", error);
          order = null;
        }
        
        if (order) {
          paymentAmount = parseFloat(order.totalAmount.toString());
          paymentCurrency = order.currency || "INR";
          referenceId = order.orderNumber || `JML${Date.now()}`;
        } else {
          // If order not found, fall back to direct payment
          if (!amount || !orderNumber) {
            return res.status(400).json({ message: "Order not found. Please provide amount and orderNumber." });
          }
          paymentAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
          paymentCurrency = currency || "INR";
          referenceId = orderNumber;
        }
      } else {
        // Handle direct payment (from booking flow)
        if (!amount || !orderNumber) {
          return res.status(400).json({ message: "Amount and orderNumber are required" });
        }
        paymentAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
        paymentCurrency = currency || "INR";
        referenceId = orderNumber;
      }

      // For direct payments without order, we need to create a temporary order
      // Since payment schema requires orderId, we'll create a minimal order first
      let finalOrderId = order?.id;
      if (!finalOrderId) {
        // Get or create a temporary service for guest orders
        // First, try to get services to find any existing service
        const services = await storage.getServices({});
        let serviceId = "temp-service";
        
        // If we have services, use the first one, otherwise we'll need to handle the error
        if (services && services.length > 0) {
          serviceId = services[0].id;
        }
        
        try {
          // Generate a unique order number for this temporary order to avoid
          // collisions with the unique constraint on orders.order_number.
          const uniqueOrderNumber = `${referenceId}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

          const tempOrderData = insertOrderSchema.parse({
            userId,
            serviceId: serviceId,
            orderNumber: uniqueOrderNumber,
            totalAmount: paymentAmount.toString(),
            currency: paymentCurrency,
            status: "pending",
            paymentStatus: "pending"
          });
          const tempOrder = await storage.createOrder(tempOrderData);
          finalOrderId = tempOrder.id;
        } catch (orderError: any) {
          console.error("Could not create temp order:", orderError.message);
          return res.status(500).json({ 
            success: false,
            message: "Failed to create order. Please try again.",
            error: orderError.message 
          });
        }
      }

      // Create payment record
      const paymentData = insertPaymentSchema.parse({
        orderId: finalOrderId!,
        userId,
        amount: paymentAmount.toString(),
        currency: paymentCurrency,
        paymentMethod: paymentMethod || 'upi',
        status: "pending"
      });

      const payment = await storage.createPayment(paymentData);

      // Initiate payment with Unpay API
      try {
        const unpayResponse = await unpayPayin(
          {
            order_amount: paymentAmount,
            reference_id: referenceId
          },
          userId
        );

        // Update payment with transaction ID
        if (unpayResponse.data?.apitxnid) {
          await storage.updatePaymentStatus(payment.id, {
            status: "pending",
            bankTransactionId: unpayResponse.data.apitxnid,
            bankResponse: unpayResponse
          });
        }

        // Return response based on payment method
        if (paymentMethod === 'upi' && unpayResponse.statuscode === "TXN" && unpayResponse.data?.qrString) {
          res.json({
            success: true,
            paymentId: payment.id,
            statuscode: unpayResponse.statuscode,
            message: unpayResponse.message,
            qrString: unpayResponse.data.qrString,
            apitxnid: unpayResponse.data.apitxnid,
            amount: paymentAmount,
            currency: paymentCurrency,
            referenceId: referenceId
          });
        } else if (paymentMethod === 'card') {
          // For card payments, you might need a different flow
          res.json({
            success: true,
            paymentId: payment.id,
            message: "Card payment initiated",
            redirectUrl: `/api/payments/mock-bank-redirect?paymentId=${payment.id}`,
            amount: paymentAmount,
            currency: paymentCurrency,
            referenceId: referenceId
          });
        } else {
          res.json({
            success: false,
            paymentId: payment.id,
            statuscode: unpayResponse.statuscode,
            message: unpayResponse.message || "Payment initiation failed",
            data: unpayResponse.data
          });
        }
      } catch (unpayError: any) {
        console.error("Unpay API error:", unpayError);
        
        // Update payment status to failed
        await storage.updatePaymentStatus(payment.id, {
          status: "failed",
          bankTransactionId: "",
          bankResponse: { error: unpayError.message }
        });

        res.status(500).json({
          success: false,
          message: "Failed to initiate payment with payment gateway",
          error: unpayError.message
        });
      }

    } catch (error: any) {
      console.error("Error initiating payment:", error);
      res.status(500).json({ 
        success: false,
        message: "Failed to initiate payment",
        error: error.message 
      });
    }
  });

  // Unpay webhook callback
  app.post("/api/payments/unpay/callback", async (req, res) => {
    try {
      // This will handle webhook from Unpay API
      const { apitxnid, status, message, data } = req.body;
      
      console.log("Unpay webhook received:", req.body);
      
      // Find payment by transaction ID
      // Note: You may need to add a method to find payment by bankTransactionId
      // For now, we'll need to store the mapping or search by reference
      
      // Verify webhook signature here (implement based on Unpay's requirements)
      
      // Map Unpay status to our payment status
      let paymentStatus = "pending";
      if (status === "SUCCESS" || status === "TXN") {
        paymentStatus = "success";
      } else if (status === "FAILED" || status === "FAILURE") {
        paymentStatus = "failed";
      }

      // TODO: Find payment by apitxnid and update
      // This requires adding a method to search payments by bankTransactionId
      // For now, we'll just acknowledge the webhook
      
      res.json({ 
        success: true,
        message: "Webhook processed successfully" 
      });
    } catch (error) {
      console.error("Error processing Unpay webhook:", error);
      res.status(500).json({ message: "Failed to process webhook" });
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

  // Payment status endpoint - works for both authenticated and unauthenticated users
  app.get("/api/payments/status/:paymentId", async (req: any, res) => {
    try {
      // For authenticated users, check ownership
      // For guest users, allow access to payment status by paymentId
      let payment;
      if (req.user && req.user.id) {
        payment = await storage.getPayment(req.params.paymentId, req.user.id);
      } else {
        // For guests, we need to get payment without userId check
        // This is less secure but necessary for guest payments
        // In production, you might want to add additional validation
        const [paymentRecord] = await db
          .select()
          .from(payments)
          .where(eq(payments.id, req.params.paymentId));
        payment = paymentRecord;
      }
      
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
