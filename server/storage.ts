import {
  users,
  astrologers,
  consultations,
  reviews,
  blogPosts,
  horoscopes,
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
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, like, or, sql } from "drizzle-orm";

export interface IStorage {
  // User operations (mandatory for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
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
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
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
}

export const storage = new DatabaseStorage();
