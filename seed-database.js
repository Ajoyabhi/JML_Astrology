// Seed script to populate initial data for astrologers and blog posts
// Run with: node seed-database.js

import pg from 'pg';
import { config } from 'dotenv';

const { Pool } = pg;

// Load environment variables
config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const astrologersData = [
  {
    name: 'Pandit Rajesh Kumar',
    email: 'rajesh.kumar@jmlastrology.com',
    profileImageUrl: '/attached_assets/generated_images/Indian_male_astrologer_portrait_b6e4ad40.png',
    specialization: ['Vedic Astrology', 'Career Guidance', 'Marriage Compatibility'],
    languages: ['Hindi', 'English'],
    experience: 15,
    rating: '4.8',
    reviewCount: 234,
    pricePerMinute: '25.00', // ₹25 per minute
    isOnline: true,
    status: 'available',
    bio: 'Expert in Vedic astrology with 15+ years of experience. Specializes in career guidance and marriage compatibility analysis. Consultation: ₹25/min'
  },
  {
    name: 'Acharya Priya Sharma',
    email: 'priya.sharma@jmlastrology.com',
    profileImageUrl: '/attached_assets/generated_images/Indian_female_astrologer_portrait_3eec457b.png',
    specialization: ['Numerology', 'Palmistry', 'Gemstone Consultation'],
    languages: ['Hindi', 'English', 'Punjabi'],
    experience: 12,
    rating: '4.9',
    reviewCount: 189,
    pricePerMinute: '30.00', // ₹30 per minute
    isOnline: true,
    status: 'available',
    bio: 'Renowned numerologist and palmist with expertise in gemstone recommendations for better life outcomes. Consultation: ₹30/min'
  },
  {
    name: 'Swami Devanand',
    email: 'devanand@jmlastrology.com',
    profileImageUrl: '/attached_assets/generated_images/Elder_Indian_astrologer_portrait_b6960649.png',
    specialization: ['Kundli Analysis', 'Remedies', 'Vastu Shastra'],
    languages: ['Hindi', 'Sanskrit'],
    experience: 25,
    rating: '4.7',
    reviewCount: 456,
    pricePerMinute: '45.00', // ₹45 per minute (senior astrologer)
    isOnline: false,
    status: 'available',
    bio: 'Senior astrologer with 25 years of experience in Kundli analysis and Vastu consultation. Expert in providing effective remedies. Consultation: ₹45/min'
  },
  {
    name: 'Dr. Anjali Mehta',
    email: 'anjali.mehta@jmlastrology.com',
    profileImageUrl: '/attached_assets/generated_images/female1.jpg',
    specialization: ['Love & Relationship', 'Tarot Reading', 'Crystal Healing'],
    languages: ['English', 'Hindi', 'Gujarati'],
    experience: 10,
    rating: '4.6',
    reviewCount: 167,
    pricePerMinute: '20.00', // ₹20 per minute
    isOnline: true,
    status: 'available',
    bio: 'Specialized in love and relationship counseling using tarot cards and crystal healing techniques. Consultation: ₹20/min'
  },
  {
    name: 'Pandit Vikram Singh',
    email: 'vikram.singh@jmlastrology.com',
    profileImageUrl: '/attached_assets/generated_images/male1.jpg',
    specialization: ['Business Astrology', 'Muhurat Selection', 'Remedial Measures'],
    languages: ['Hindi', 'English'],
    experience: 18,
    rating: '4.8',
    reviewCount: 298,
    pricePerMinute: '35.00', // ₹35 per minute
    isOnline: true,
    status: 'available',
    bio: 'Business astrology expert helping entrepreneurs make informed decisions. Specializes in muhurat selection for important events. Consultation: ₹35/min'
  },
  {
    name: 'Acharya Meera Devi',
    email: 'meera.devi@jmlastrology.com',
    profileImageUrl: '/attached_assets/generated_images/female2.png',
    specialization: ['Health Astrology', 'Medical Astrology', 'Dasha Analysis'],
    languages: ['Hindi', 'English', 'Tamil'],
    experience: 14,
    rating: '4.7',
    reviewCount: 201,
    pricePerMinute: '28.00', // ₹28 per minute
    isOnline: false,
    status: 'available',
    bio: 'Expert in health and medical astrology. Provides insights into health issues through dasha analysis and planetary positions. Consultation: ₹28/min'
  }
];

const blogPostsData = [
  {
    title: 'Understanding Your Birth Chart: A Complete Guide',
    slug: 'understanding-your-birth-chart-complete-guide',
    excerpt: 'Learn how to read and interpret your birth chart to unlock the secrets of your personality and life path.',
    content: `# Understanding Your Birth Chart: A Complete Guide

Your birth chart, also known as a natal chart or horoscope, is a snapshot of the sky at the exact moment you were born. It reveals the positions of the planets, sun, moon, and other celestial bodies in relation to the 12 zodiac signs and 12 houses.

## What is a Birth Chart?

A birth chart is a circular diagram that represents the positions of celestial bodies at your time of birth. It's divided into 12 sections called houses, each representing different areas of your life.

## Key Components

### The Planets
Each planet in your chart represents different aspects of your personality:
- **Sun**: Your core identity and ego
- **Moon**: Your emotions and inner self
- **Mercury**: Communication and thinking
- **Venus**: Love and relationships
- **Mars**: Energy and drive
- **Jupiter**: Growth and expansion
- **Saturn**: Structure and discipline

### The Houses
The 12 houses represent different life areas:
1. Self and identity
2. Money and possessions
3. Communication and siblings
4. Home and family
5. Creativity and children
6. Health and daily routines
7. Partnerships and marriage
8. Transformation and shared resources
9. Higher learning and philosophy
10. Career and public image
11. Friendships and hopes
12. Subconscious and spirituality

## How to Read Your Chart

Understanding your birth chart takes time and practice. Start by identifying which signs your planets are in, then look at which houses they occupy. The aspects (angles) between planets also reveal important information about how different parts of your personality interact.

## Getting Started

To create your birth chart, you'll need:
- Your exact birth date
- Your exact birth time
- Your birth location (city and country)

Once you have this information, you can use online tools or consult with a professional astrologer to generate and interpret your chart.

Remember, astrology is a tool for self-discovery and personal growth. Your birth chart doesn't determine your fate, but it can provide valuable insights into your strengths, challenges, and potential.`,
    category: 'Astrology Basics',
    featuredImageUrl: '/attached_assets/generated_images/jml.png',
    isPublished: true
  },
  {
    title: 'The Power of Gemstones in Vedic Astrology',
    slug: 'power-of-gemstones-vedic-astrology',
    excerpt: 'Discover how wearing the right gemstone can help balance planetary energies and improve your life.',
    content: `# The Power of Gemstones in Vedic Astrology

In Vedic astrology, gemstones are believed to have the power to influence planetary energies and bring positive changes to your life. Each planet is associated with specific gemstones that can enhance or balance its energy.

## Planetary Gemstones

### Sun - Ruby
Ruby is associated with the Sun and can boost confidence, leadership qualities, and vitality. It's recommended for those with weak Sun in their chart.

### Moon - Pearl
Pearl is linked to the Moon and helps with emotional balance, intuition, and mental peace. It's beneficial for those with Moon-related issues.

### Mars - Red Coral
Red coral is connected to Mars and can enhance courage, energy, and physical strength. It helps overcome obstacles and boosts determination.

### Mercury - Emerald
Emerald is associated with Mercury and improves communication, intelligence, and business acumen. It's excellent for students and professionals.

### Jupiter - Yellow Sapphire
Yellow sapphire is linked to Jupiter and brings wisdom, prosperity, and spiritual growth. It's one of the most powerful gemstones in Vedic astrology.

### Venus - Diamond
Diamond is connected to Venus and enhances love, beauty, and artistic abilities. It also brings material comforts and luxury.

### Saturn - Blue Sapphire
Blue sapphire is associated with Saturn and can bring discipline, focus, and career success. However, it should be worn only after proper consultation.

## How to Choose the Right Gemstone

1. **Consult an Astrologer**: Always consult a qualified astrologer before wearing any gemstone
2. **Check Your Chart**: The gemstone should be suitable for your birth chart
3. **Quality Matters**: Invest in genuine, high-quality gemstones
4. **Proper Rituals**: Gemstones should be energized through proper rituals before wearing

## Important Considerations

- Not all gemstones are suitable for everyone
- Some gemstones can have negative effects if worn incorrectly
- Always consult with an expert before making a decision
- Gemstones work best when combined with other remedial measures

Remember, gemstones are tools that can support your journey, but they work best when combined with positive actions and intentions.`,
    category: 'Remedies',
    featuredImageUrl: '/attached_assets/generated_images/jml.png',
    isPublished: true
  },
  {
    title: 'Muhurat: Choosing the Right Time for Important Events',
    slug: 'muhurat-choosing-right-time-important-events',
    excerpt: 'Learn about muhurat selection and how choosing the right time can ensure success in your important endeavors.',
    content: `# Muhurat: Choosing the Right Time for Important Events

Muhurat, in Vedic astrology, refers to an auspicious time chosen for performing important activities. Selecting the right muhurat is believed to ensure success and positive outcomes.

## What is Muhurat?

Muhurat is a specific time period that is considered favorable for starting new ventures, performing rituals, or making important decisions. It's calculated based on planetary positions, lunar phases, and other astrological factors.

## Types of Muhurat

### Marriage Muhurat
The most auspicious time for wedding ceremonies, calculated based on the couple's birth charts and planetary positions.

### Business Muhurat
Favorable times for starting new businesses, signing contracts, or making important business decisions.

### House Warming Muhurat
Auspicious times for moving into a new home or performing house warming ceremonies.

### Travel Muhurat
Good times to begin journeys, especially for important trips or relocations.

## Factors Considered

1. **Tithi**: Lunar day
2. **Nakshatra**: Star constellation
3. **Yoga**: Combination of planets
4. **Karana**: Half of a tithi
5. **Planetary Positions**: Current positions of planets
6. **Panchang**: Five elements of time

## How to Find Your Muhurat

1. **Consult an Astrologer**: Professional astrologers can calculate the perfect muhurat for your specific needs
2. **Use Panchang**: Traditional Hindu calendar that shows daily muhurats
3. **Online Tools**: Various online calculators can help, but professional consultation is recommended

## Benefits of Choosing Right Muhurat

- Ensures smooth execution of plans
- Reduces obstacles and challenges
- Brings positive energy to new beginnings
- Aligns your actions with cosmic energies

## Important Notes

- Muhurat should be calculated based on your birth chart
- Different activities require different muhurats
- Regional variations may exist in muhurat calculations
- Always consult a qualified astrologer for important events

Remember, while muhurat can enhance the success of your endeavors, your efforts and positive intentions are equally important.`,
    category: 'Vedic Astrology',
    featuredImageUrl: '/attached_assets/generated_images/jml.png',
    isPublished: true
  },
  {
    title: 'Understanding Dasha Periods in Vedic Astrology',
    slug: 'understanding-dasha-periods-vedic-astrology',
    excerpt: 'Learn about dasha systems and how planetary periods influence different phases of your life.',
    content: `# Understanding Dasha Periods in Vedic Astrology

Dasha periods are one of the most important concepts in Vedic astrology. They represent the time periods when specific planets have a dominant influence on your life.

## What are Dasha Periods?

Dasha means "period" in Sanskrit. In Vedic astrology, your life is divided into various planetary periods, each ruled by a specific planet. These periods can last from a few months to several years.

## Major Dasha Systems

### Vimshottari Dasha
The most commonly used dasha system, spanning 120 years and divided among nine planets:
- Sun: 6 years
- Moon: 10 years
- Mars: 7 years
- Rahu: 18 years
- Jupiter: 16 years
- Saturn: 19 years
- Mercury: 17 years
- Ketu: 7 years
- Venus: 20 years

### Other Dasha Systems
- Ashtottari Dasha (108 years)
- Yogini Dasha (36 years)
- Chara Dasha (movable signs)

## How Dasha Works

1. **Main Dasha**: The major planetary period you're currently in
2. **Antar Dasha**: Sub-periods within the main dasha
3. **Pratyantar Dasha**: Sub-sub-periods for more detailed predictions

## Interpreting Dasha Periods

The effects of a dasha depend on:
- The planet's position in your birth chart
- The house it rules
- The aspects it receives
- Whether it's benefic or malefic for your chart

## Benefits of Understanding Dasha

- Predict favorable and challenging periods
- Plan important life events accordingly
- Understand why certain periods are difficult
- Make the most of positive planetary influences

## Practical Applications

- **Career Planning**: Know when to make career moves
- **Financial Decisions**: Understand favorable periods for investments
- **Health Awareness**: Be prepared for health-related challenges
- **Relationship Timing**: Understand relationship dynamics

## Getting Your Dasha Report

To know your current dasha:
1. Consult a professional astrologer
2. Provide your accurate birth details
3. Get a detailed dasha analysis
4. Understand the implications for your life

Remember, dasha periods show trends and influences, but your free will and actions always play a crucial role in shaping your destiny.`,
    category: 'Vedic Astrology',
    featuredImageUrl: '/attached_assets/generated_images/jml.png',
    isPublished: true
  },
  {
    title: 'Love Compatibility: Understanding Relationship Astrology',
    slug: 'love-compatibility-understanding-relationship-astrology',
    excerpt: 'Discover how astrology can help you understand relationship compatibility and find your perfect match.',
    content: `# Love Compatibility: Understanding Relationship Astrology

Relationship compatibility in astrology involves analyzing how two people's birth charts interact with each other. This can reveal the strengths and challenges in a relationship.

## Types of Compatibility Analysis

### Synastry
Comparing two birth charts to see how planets interact between partners. This shows:
- Emotional connection
- Communication styles
- Shared values
- Potential conflicts

### Composite Chart
Creating a single chart from the midpoint of both partners' planets. This represents the relationship itself.

### Davamsha Chart
A divisional chart in Vedic astrology specifically for marriage and partnership analysis.

## Key Factors in Compatibility

### Sun Sign Compatibility
While not the only factor, sun signs can indicate basic compatibility:
- Fire signs (Aries, Leo, Sagittarius) are energetic and passionate
- Earth signs (Taurus, Virgo, Capricorn) are practical and stable
- Air signs (Gemini, Libra, Aquarius) are intellectual and communicative
- Water signs (Cancer, Scorpio, Pisces) are emotional and intuitive

### Moon Sign Compatibility
Moon signs reveal emotional compatibility:
- How you express feelings
- What makes you feel secure
- Your emotional needs
- How you handle stress

### Venus and Mars
- **Venus**: Shows how you love and what you value
- **Mars**: Reveals your passion, drive, and how you handle conflict

## Vedic Compatibility (Guna Milan)

In Vedic astrology, compatibility is measured through:
1. **Varna**: Spiritual compatibility
2. **Vashya**: Mutual attraction
3. **Tara**: Health and longevity
4. **Yoni**: Physical compatibility
5. **Graha Maitri**: Mental compatibility
6. **Gana**: Temperament match
7. **Bhakoot**: Emotional and financial harmony
8. **Nadi**: Health and progeny

## Understanding Your Compatibility Score

- **36 points**: Excellent match
- **18-35 points**: Good compatibility
- **Below 18**: May face challenges

## Important Considerations

- Compatibility scores are guidelines, not absolutes
- Strong love and commitment can overcome astrological challenges
- Understanding differences can help improve relationships
- Professional consultation provides the most accurate analysis

## Tips for Better Relationships

1. Understand your partner's astrological profile
2. Work on areas of potential conflict
3. Appreciate your differences
4. Use favorable planetary periods for important relationship decisions
5. Practice patience and understanding

Remember, astrology can provide insights, but successful relationships require effort, communication, and mutual respect from both partners.`,
    category: 'Relationships',
    featuredImageUrl: '/attached_assets/generated_images/jml.png',
    isPublished: true
  }
];

async function seedDatabase() {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    console.log('Starting database seeding...\n');
    
    // Check if astrologers already exist
    const astrologerCheck = await client.query('SELECT COUNT(*) FROM astrologers');
    const astrologerCount = parseInt(astrologerCheck.rows[0].count);
    
    if (astrologerCount > 0) {
      console.log(`Found ${astrologerCount} existing astrologers. Skipping astrologer seeding.`);
    } else {
      console.log('Seeding astrologers...');
      for (const astrologer of astrologersData) {
        const insertQuery = `
          INSERT INTO astrologers (
            name, email, profile_image_url, specialization, languages,
            experience, rating, review_count, price_per_minute,
            is_online, status, bio, created_at, updated_at
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW(), NOW())
          RETURNING id
        `;
        
        const result = await client.query(insertQuery, [
          astrologer.name,
          astrologer.email,
          astrologer.profileImageUrl,
          astrologer.specialization,
          astrologer.languages,
          astrologer.experience,
          astrologer.rating,
          astrologer.reviewCount,
          astrologer.pricePerMinute,
          astrologer.isOnline,
          astrologer.status,
          astrologer.bio
        ]);
        
        console.log(`  ✓ Added astrologer: ${astrologer.name} (ID: ${result.rows[0].id})`);
      }
    }
    
    // Get astrologer IDs for blog posts
    const astrologerResult = await client.query('SELECT id FROM astrologers ORDER BY created_at LIMIT 6');
    const astrologerIds = astrologerResult.rows.map(row => row.id);
    
    // Check if blog posts already exist
    const blogCheck = await client.query('SELECT COUNT(*) FROM blog_posts');
    const blogCount = parseInt(blogCheck.rows[0].count);
    
    if (blogCount > 0) {
      console.log(`\nFound ${blogCount} existing blog posts. Skipping blog post seeding.`);
    } else {
      console.log('\nSeeding blog posts...');
      for (let i = 0; i < blogPostsData.length; i++) {
        const post = blogPostsData[i];
        const authorId = astrologerIds[i % astrologerIds.length]; // Distribute posts among astrologers
        
        const insertQuery = `
          INSERT INTO blog_posts (
            title, slug, excerpt, content, category,
            author_id, featured_image_url, is_published, created_at, updated_at
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())
        `;
        
        await client.query(insertQuery, [
          post.title,
          post.slug,
          post.excerpt,
          post.content,
          post.category,
          authorId,
          post.featuredImageUrl,
          post.isPublished
        ]);
        
        console.log(`  ✓ Added blog post: ${post.title}`);
      }
    }
    
    await client.query('COMMIT');
    console.log('\n✅ Database seeding completed successfully!');
    
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

seedDatabase().catch(console.error);

