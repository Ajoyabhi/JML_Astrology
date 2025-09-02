import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { 
  insertAstrologerSchema,
  insertConsultationSchema,
  insertReviewSchema,
  insertBlogPostSchema,
  insertHoroscopeSchema 
} from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

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

  // Consultation routes
  app.get("/api/consultations", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const consultations = await storage.getConsultations(userId);
      res.json(consultations);
    } catch (error) {
      console.error("Error fetching consultations:", error);
      res.status(500).json({ message: "Failed to fetch consultations" });
    }
  });

  app.post("/api/consultations", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
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
      const userId = req.user.claims.sub;
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
      const date = req.query.date ? new Date(req.query.date as string) : new Date();
      
      const horoscope = await storage.getHoroscope(sign, type, date);
      if (!horoscope) {
        return res.status(404).json({ message: "Horoscope not found" });
      }
      res.json(horoscope);
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

  const httpServer = createServer(app);
  return httpServer;
}
