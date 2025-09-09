import {
  users,
  astrologers,
  consultations,
  reviews,
  blogPosts,
  horoscopes,
  serviceCategories,
  services,
  orders,
  payments,
  serviceDeliverables,
  serviceReviews,
  type User,
  type UpsertUser,
  type Astrologer,
  type InsertAstrologer,
  type Consultation,
  type InsertConsultation,
  type Review,
  type InsertReview,
  type BlogPost,
  type InsertBlogPost,
  type Horoscope,
  type InsertHoroscope,
  type ServiceCategory,
  type InsertServiceCategory,
  type Service,
  type InsertService,
  type Order,
  type InsertOrder,
  type Payment,
  type InsertPayment,
  type ServiceDeliverable,
  type InsertServiceDeliverable,
  type ServiceReview,
  type InsertServiceReview,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, like, or, sql } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByGoogleId(googleId: string): Promise<User | undefined>;
  createUser(user: UpsertUser): Promise<User>;
  linkGoogleAccount(userId: string, googleId: string): Promise<User>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Astrologer operations
  getAstrologers(): Promise<Astrologer[]>;
  getAstrologer(id: string): Promise<Astrologer | undefined>;
  createAstrologer(astrologer: InsertAstrologer): Promise<Astrologer>;
  updateAstrologer(id: string, astrologer: Partial<InsertAstrologer>): Promise<Astrologer>;
  searchAstrologers(query: string, specialization?: string, language?: string): Promise<Astrologer[]>;
  
  // Consultation operations
  getConsultations(userId: string): Promise<Consultation[]>;
  getConsultation(id: string): Promise<Consultation | undefined>;
  createConsultation(consultation: InsertConsultation): Promise<Consultation>;
  updateConsultation(id: string, consultation: Partial<InsertConsultation>): Promise<Consultation>;
  
  // Review operations
  getReviews(astrologerId: string): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
  
  // Blog operations
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  
  // Horoscope operations
  getHoroscope(zodiacSign: string, type: string, date: Date): Promise<Horoscope | undefined>;
  createHoroscope(horoscope: InsertHoroscope): Promise<Horoscope>;
  getLatestHoroscopes(type: string): Promise<Horoscope[]>;
  
  // Service operations
  getServiceCategories(): Promise<ServiceCategory[]>;
  getServices(filters: { categoryId?: string; search?: string; featured?: boolean }): Promise<Service[]>;
  getService(id: string): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  
  // Order operations
  getOrders(userId: string): Promise<Order[]>;
  getOrder(id: string, userId: string): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrderStatus(orderId: string, status: string, paymentStatus: string): Promise<Order>;
  
  // Payment operations
  createPayment(payment: InsertPayment): Promise<Payment>;
  updatePaymentStatus(paymentId: string, updates: { status: string; bankTransactionId: string; bankResponse: any }): Promise<Payment>;
  getPayment(id: string, userId: string): Promise<Payment | undefined>;
  
  // Service deliverables operations
  getServiceDeliverables(orderId: string): Promise<ServiceDeliverable[]>;
  
  // Service review operations
  getServiceReviews(serviceId: string): Promise<ServiceReview[]>;
  createServiceReview(review: InsertServiceReview): Promise<ServiceReview>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async getUserByGoogleId(googleId: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.googleId, googleId));
    return user;
  }

  async createUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .returning();
    return user;
  }

  async linkGoogleAccount(userId: string, googleId: string): Promise<User> {
    const [user] = await db
      .update(users)
      .set({
        googleId,
        authProvider: "google",
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Astrologer operations
  async getAstrologers(): Promise<Astrologer[]> {
    return await db.select().from(astrologers).orderBy(desc(astrologers.rating));
  }

  async getAstrologer(id: string): Promise<Astrologer | undefined> {
    const [astrologer] = await db.select().from(astrologers).where(eq(astrologers.id, id));
    return astrologer;
  }

  async createAstrologer(astrologerData: InsertAstrologer): Promise<Astrologer> {
    const [astrologer] = await db
      .insert(astrologers)
      .values(astrologerData)
      .returning();
    return astrologer;
  }

  async updateAstrologer(id: string, astrologerData: Partial<InsertAstrologer>): Promise<Astrologer> {
    const [astrologer] = await db
      .update(astrologers)
      .set({ ...astrologerData, updatedAt: new Date() })
      .where(eq(astrologers.id, id))
      .returning();
    return astrologer;
  }

  async searchAstrologers(query: string, specialization?: string, language?: string): Promise<Astrologer[]> {
    let conditions = [];
    
    if (query) {
      conditions.push(
        or(
          like(astrologers.name, `%${query}%`),
          sql`array_to_string(${astrologers.specialization}, ',') ILIKE ${'%' + query + '%'}`,
          sql`array_to_string(${astrologers.languages}, ',') ILIKE ${'%' + query + '%'}`
        )
      );
    }
    
    if (specialization) {
      conditions.push(sql`${specialization} = ANY(${astrologers.specialization})`);
    }
    
    if (language) {
      conditions.push(sql`${language} = ANY(${astrologers.languages})`);
    }

    return await db
      .select()
      .from(astrologers)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(astrologers.rating));
  }

  // Consultation operations
  async getConsultations(userId: string): Promise<Consultation[]> {
    return await db
      .select()
      .from(consultations)
      .where(eq(consultations.userId, userId))
      .orderBy(desc(consultations.createdAt));
  }

  async getConsultation(id: string): Promise<Consultation | undefined> {
    const [consultation] = await db.select().from(consultations).where(eq(consultations.id, id));
    return consultation;
  }

  async createConsultation(consultationData: InsertConsultation): Promise<Consultation> {
    const [consultation] = await db
      .insert(consultations)
      .values(consultationData)
      .returning();
    return consultation;
  }

  async updateConsultation(id: string, consultationData: Partial<InsertConsultation>): Promise<Consultation> {
    const [consultation] = await db
      .update(consultations)
      .set({ ...consultationData, updatedAt: new Date() })
      .where(eq(consultations.id, id))
      .returning();
    return consultation;
  }

  // Review operations
  async getReviews(astrologerId: string): Promise<Review[]> {
    return await db
      .select()
      .from(reviews)
      .where(eq(reviews.astrologerId, astrologerId))
      .orderBy(desc(reviews.createdAt));
  }

  async createReview(reviewData: InsertReview): Promise<Review> {
    const [review] = await db
      .insert(reviews)
      .values(reviewData)
      .returning();
    
    // Update astrologer rating
    const allReviews = await this.getReviews(reviewData.astrologerId);
    const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
    
    await db
      .update(astrologers)
      .set({ 
        rating: avgRating.toFixed(2),
        reviewCount: allReviews.length,
        updatedAt: new Date()
      })
      .where(eq(astrologers.id, reviewData.astrologerId));
    
    return review;
  }

  // Blog operations
  async getBlogPosts(): Promise<BlogPost[]> {
    return await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.isPublished, true))
      .orderBy(desc(blogPosts.createdAt));
  }

  async getBlogPost(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db
      .select()
      .from(blogPosts)
      .where(and(eq(blogPosts.slug, slug), eq(blogPosts.isPublished, true)));
    return post;
  }

  async createBlogPost(postData: InsertBlogPost): Promise<BlogPost> {
    const [post] = await db
      .insert(blogPosts)
      .values(postData)
      .returning();
    return post;
  }

  // Horoscope operations
  async getHoroscope(zodiacSign: string, type: string, date: Date): Promise<Horoscope | undefined> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    // Capitalize the zodiac sign to match the database format
    const capitalizedSign = zodiacSign.charAt(0).toUpperCase() + zodiacSign.slice(1).toLowerCase();

    const [horoscope] = await db
      .select()
      .from(horoscopes)
      .where(
        and(
          eq(horoscopes.zodiacSign, capitalizedSign),
          eq(horoscopes.type, type),
          sql`${horoscopes.date} >= ${startOfDay}`,
          sql`${horoscopes.date} <= ${endOfDay}`
        )
      );
    return horoscope;
  }

  async createHoroscope(horoscopeData: InsertHoroscope): Promise<Horoscope> {
    const [horoscope] = await db
      .insert(horoscopes)
      .values(horoscopeData)
      .returning();
    return horoscope;
  }

  async getLatestHoroscopes(type: string): Promise<Horoscope[]> {
    return await db
      .select()
      .from(horoscopes)
      .where(eq(horoscopes.type, type))
      .orderBy(desc(horoscopes.date))
      .limit(12);
  }

  // =================== SERVICE OPERATIONS ===================

  // Service categories
  async getServiceCategories(): Promise<ServiceCategory[]> {
    return await db
      .select()
      .from(serviceCategories)
      .where(eq(serviceCategories.isActive, true))
      .orderBy(serviceCategories.displayOrder, serviceCategories.name);
  }

  // Services
  async getServices(filters: { categoryId?: string; search?: string; featured?: boolean }): Promise<Service[]> {
    let conditions = [eq(services.isActive, true)];
    
    if (filters.categoryId) {
      conditions.push(eq(services.categoryId, filters.categoryId));
    }
    
    if (filters.search) {
      conditions.push(
        or(
          like(services.name, `%${filters.search}%`),
          like(services.description, `%${filters.search}%`),
          sql`array_to_string(${services.tags}, ',') ILIKE ${'%' + filters.search + '%'}`
        )!
      );
    }
    
    if (filters.featured) {
      conditions.push(eq(services.isFeatured, true));
    }

    return await db
      .select()
      .from(services)
      .where(and(...conditions))
      .orderBy(desc(services.isFeatured), services.name);
  }

  async getService(id: string): Promise<Service | undefined> {
    const [service] = await db
      .select()
      .from(services)
      .where(and(eq(services.id, id), eq(services.isActive, true)));
    return service;
  }

  async createService(serviceData: InsertService): Promise<Service> {
    const [service] = await db
      .insert(services)
      .values(serviceData)
      .returning();
    return service;
  }

  // =================== ORDER OPERATIONS ===================

  async getOrders(userId: string): Promise<Order[]> {
    return await db
      .select()
      .from(orders)
      .where(eq(orders.userId, userId))
      .orderBy(desc(orders.createdAt));
  }

  async getOrder(id: string, userId: string): Promise<Order | undefined> {
    const [order] = await db
      .select()
      .from(orders)
      .where(and(eq(orders.id, id), eq(orders.userId, userId)));
    return order;
  }

  async createOrder(orderData: InsertOrder): Promise<Order> {
    const [order] = await db
      .insert(orders)
      .values(orderData)
      .returning();
    return order;
  }

  async updateOrderStatus(orderId: string, status: string, paymentStatus: string): Promise<Order> {
    const [order] = await db
      .update(orders)
      .set({ 
        status, 
        paymentStatus,
        updatedAt: new Date(),
        ...(status === 'completed' ? { completedAt: new Date() } : {})
      })
      .where(eq(orders.id, orderId))
      .returning();
    return order;
  }

  // =================== PAYMENT OPERATIONS ===================

  async createPayment(paymentData: InsertPayment): Promise<Payment> {
    const [payment] = await db
      .insert(payments)
      .values(paymentData)
      .returning();
    return payment;
  }

  async updatePaymentStatus(paymentId: string, updates: { status: string; bankTransactionId: string; bankResponse: any }): Promise<Payment> {
    const [payment] = await db
      .update(payments)
      .set({
        ...updates,
        updatedAt: new Date()
      })
      .where(eq(payments.id, paymentId))
      .returning();
    return payment;
  }

  async getPayment(id: string, userId: string): Promise<Payment | undefined> {
    const [payment] = await db
      .select()
      .from(payments)
      .where(and(eq(payments.id, id), eq(payments.userId, userId)));
    return payment;
  }

  // =================== SERVICE DELIVERABLES OPERATIONS ===================

  async getServiceDeliverables(orderId: string): Promise<ServiceDeliverable[]> {
    return await db
      .select()
      .from(serviceDeliverables)
      .where(eq(serviceDeliverables.orderId, orderId))
      .orderBy(desc(serviceDeliverables.createdAt));
  }

  // =================== SERVICE REVIEW OPERATIONS ===================

  async getServiceReviews(serviceId: string): Promise<ServiceReview[]> {
    return await db
      .select()
      .from(serviceReviews)
      .where(and(eq(serviceReviews.serviceId, serviceId), eq(serviceReviews.isPublic, true)))
      .orderBy(desc(serviceReviews.createdAt));
  }

  async createServiceReview(reviewData: InsertServiceReview): Promise<ServiceReview> {
    const [review] = await db
      .insert(serviceReviews)
      .values(reviewData)
      .returning();
    return review;
  }
}

export const storage = new DatabaseStorage();
