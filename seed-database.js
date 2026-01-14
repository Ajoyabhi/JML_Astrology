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
  },
  {
    name: 'Pandit Ramesh Joshi',
    email: 'ramesh.joshi@jmlastrology.com',
    profileImageUrl: '/attached_assets/generated_images/male2.png',
    specialization: ['Vedic Astrology', 'Kundli Making', 'Planetary Remedies'],
    languages: ['Hindi', 'English', 'Marathi'],
    experience: 20,
    rating: '4.8',
    reviewCount: 312,
    pricePerMinute: '40.00', // ₹40 per minute
    isOnline: true,
    status: 'available',
    bio: 'Expert Vedic astrologer with 20 years of experience in Kundli making and planetary remedy solutions. Consultation: ₹40/min'
  },
  {
    name: 'Acharya Kavita Reddy',
    email: 'kavita.reddy@jmlastrology.com',
    profileImageUrl: '/attached_assets/generated_images/female3.png',
    specialization: ['Marriage Matching', 'Guna Milan', 'Mangal Dosha Remedies'],
    languages: ['Hindi', 'English', 'Telugu'],
    experience: 16,
    rating: '4.9',
    reviewCount: 267,
    pricePerMinute: '32.00', // ₹32 per minute
    isOnline: true,
    status: 'available',
    bio: 'Specialized in marriage compatibility analysis and Mangal Dosha remedies. Expert in Guna Milan and relationship counseling. Consultation: ₹32/min'
  },
  {
    name: 'Swami Narayan Das',
    email: 'narayan.das@jmlastrology.com',
    profileImageUrl: '/attached_assets/generated_images/male3.png',
    specialization: ['Spiritual Astrology', 'Remedial Astrology', 'Mantra & Yantra'],
    languages: ['Hindi', 'Sanskrit', 'Bengali'],
    experience: 22,
    rating: '4.7',
    reviewCount: 389,
    pricePerMinute: '38.00', // ₹38 per minute
    isOnline: false,
    status: 'available',
    bio: 'Spiritual astrologer with expertise in remedial astrology, mantra chanting, and yantra recommendations. Consultation: ₹38/min'
  },
  {
    name: 'Dr. Sneha Patel',
    email: 'sneha.patel@jmlastrology.com',
    profileImageUrl: '/attached_assets/generated_images/female4.png',
    specialization: ['Career Astrology', 'Education Guidance', 'Job Prospects'],
    languages: ['English', 'Hindi', 'Gujarati'],
    experience: 11,
    rating: '4.6',
    reviewCount: 198,
    pricePerMinute: '26.00', // ₹26 per minute
    isOnline: true,
    status: 'available',
    bio: 'Career and education astrology specialist helping students and professionals make informed career decisions. Consultation: ₹26/min'
  },
  {
    name: 'Pandit Suresh Tiwari',
    email: 'suresh.tiwari@jmlastrology.com',
    profileImageUrl: '/attached_assets/generated_images/male4.png',
    specialization: ['Financial Astrology', 'Wealth Remedies', 'Property Astrology'],
    languages: ['Hindi', 'English'],
    experience: 19,
    rating: '4.8',
    reviewCount: 345,
    pricePerMinute: '36.00', // ₹36 per minute
    isOnline: true,
    status: 'available',
    bio: 'Financial astrology expert providing guidance on wealth, investments, and property matters. Consultation: ₹36/min'
  },
  {
    name: 'Acharya Radha Krishnan',
    email: 'radha.krishnan@jmlastrology.com',
    profileImageUrl: '/attached_assets/generated_images/female5.png',
    specialization: ['Child Astrology', 'Education Muhurat', 'Name Selection'],
    languages: ['Hindi', 'English', 'Tamil', 'Malayalam'],
    experience: 13,
    rating: '4.7',
    reviewCount: 223,
    pricePerMinute: '29.00', // ₹29 per minute
    isOnline: true,
    status: 'available',
    bio: 'Specialized in child astrology, education guidance, and name selection for newborns. Consultation: ₹29/min'
  },
  {
    name: 'Pandit Arjun Malhotra',
    email: 'arjun.malhotra@jmlastrology.com',
    profileImageUrl: '/attached_assets/generated_images/Young_Indian_astrologer_portrait_ebf342cd.png',
    specialization: ['Modern Astrology', 'Western Astrology', 'Relationship Counseling'],
    languages: ['English', 'Hindi', 'Punjabi'],
    experience: 8,
    rating: '4.5',
    reviewCount: 145,
    pricePerMinute: '22.00', // ₹22 per minute
    isOnline: true,
    status: 'available',
    bio: 'Modern astrologer combining Vedic and Western astrology techniques. Specializes in relationship counseling and modern life challenges. Consultation: ₹22/min'
  },
  {
    name: 'Acharya Sunita Verma',
    email: 'sunita.verma@jmlastrology.com',
    profileImageUrl: '/attached_assets/generated_images/female7.jpg',
    specialization: ['Vastu Shastra', 'Feng Shui', 'Home Remedies'],
    languages: ['Hindi', 'English'],
    experience: 17,
    rating: '4.8',
    reviewCount: 278,
    pricePerMinute: '33.00', // ₹33 per minute
    isOnline: false,
    status: 'available',
    bio: 'Vastu and Feng Shui expert helping create harmonious living and working spaces. Consultation: ₹33/min'
  },
  {
    name: 'Pandit Deepak Sharma',
    email: 'deepak.sharma@jmlastrology.com',
    profileImageUrl: '/attached_assets/generated_images/male8.jpg',
    specialization: ['Remedial Astrology', 'Puja Services', 'Gemstone Consultation'],
    languages: ['Hindi', 'English', 'Rajasthani'],
    experience: 21,
    rating: '4.9',
    reviewCount: 401,
    pricePerMinute: '42.00', // ₹42 per minute
    isOnline: true,
    status: 'available',
    bio: 'Senior remedial astrologer with expertise in puja services, gemstone recommendations, and effective astrological remedies. Consultation: ₹42/min'
  },
  {
    name: 'Dr. Priyanka Nair',
    email: 'priyanka.nair@jmlastrology.com',
    profileImageUrl: '/attached_assets/generated_images/female8.png',
    specialization: ['Medical Astrology', 'Health Remedies', 'Wellness Guidance'],
    languages: ['English', 'Hindi', 'Malayalam', 'Tamil'],
    experience: 12,
    rating: '4.7',
    reviewCount: 189,
    pricePerMinute: '27.00', // ₹27 per minute
    isOnline: true,
    status: 'available',
    bio: 'Medical astrology specialist providing health insights and wellness guidance through astrological analysis. Consultation: ₹27/min'
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

const serviceCategoriesData = [
  {
    name: 'Kundli & Birth Chart',
    description: 'Comprehensive birth chart analysis and Kundli reading services',
    icon: 'star',
    displayOrder: 1,
    isActive: true
  },
  {
    name: 'Marriage & Compatibility',
    description: 'Marriage compatibility, matchmaking, and relationship analysis',
    icon: 'heart',
    displayOrder: 2,
    isActive: true
  },
  {
    name: 'Career & Business',
    description: 'Career guidance, business astrology, and professional success',
    icon: 'briefcase',
    displayOrder: 3,
    isActive: true
  },
  {
    name: 'Remedies & Solutions',
    description: 'Astrological remedies, gemstones, and solutions for life problems',
    icon: 'sparkles',
    displayOrder: 4,
    isActive: true
  },
  {
    name: 'Health & Medical',
    description: 'Health astrology, medical astrology, and wellness guidance',
    icon: 'heart-pulse',
    displayOrder: 5,
    isActive: true
  },
  {
    name: 'Muhurat & Timing',
    description: 'Auspicious timing selection for important events and ceremonies',
    icon: 'clock',
    displayOrder: 6,
    isActive: true
  },
  {
    name: 'Predictions & Forecasts',
    description: 'Future predictions, dasha analysis, and life forecasts',
    icon: 'crystal-ball',
    displayOrder: 7,
    isActive: true
  },
  {
    name: 'Numerology & Palmistry',
    description: 'Numerology readings, palmistry, and alternative divination methods',
    icon: 'hand',
    displayOrder: 8,
    isActive: true
  }
];

const servicesData = [
  // Kundli & Birth Chart Services
  {
    name: 'Complete Birth Chart Analysis',
    description: 'Comprehensive analysis of your complete birth chart including all planets, houses, and aspects. Get detailed insights into your personality, strengths, weaknesses, and life path.',
    shortDescription: 'Complete birth chart analysis with detailed planetary positions',
    price: '1000.00', // ₹1000
    currency: 'INR',
    duration: '1 report',
    deliveryTime: '24-48 hours',
    serviceType: 'report',
    isDigital: true,
    features: [
      'Complete planetary position analysis',
      'House-wise interpretation',
      'Planetary aspects and conjunctions',
      'Dasha periods overview',
      'PDF report with charts',
      'Lifetime access to report'
    ],
    requirements: [
      'Date of birth',
      'Time of birth (exact)',
      'Place of birth (city, state, country)'
    ],
    tags: ['kundli', 'birth-chart', 'natal-chart', 'vedic-astrology'],
    isFeatured: true,
    thumbnailUrl: '/attached_assets/generated_images/jml.png'
  },
  {
    name: 'Basic Kundli Report',
    description: 'Essential Kundli report with basic planetary positions, sun sign, moon sign, and ascendant details.',
    shortDescription: 'Basic Kundli with essential planetary information',
    price: '300.00', // ₹300
    currency: 'INR',
    duration: '1 report',
    deliveryTime: '12-24 hours',
    serviceType: 'report',
    isDigital: true,
    features: [
      'Sun, Moon, and Ascendant signs',
      'Basic planetary positions',
      'Simple chart visualization',
      'PDF report'
    ],
    requirements: [
      'Date of birth',
      'Time of birth',
      'Place of birth'
    ],
    tags: ['kundli', 'basic', 'birth-chart'],
    isFeatured: false,
    thumbnailUrl: '/attached_assets/generated_images/jml.png'
  },
  {
    name: 'Dasha & Antardasha Analysis',
    description: 'Detailed analysis of your current and upcoming dasha periods. Understand the planetary influences affecting different phases of your life.',
    shortDescription: 'Complete dasha period analysis and predictions',
    price: '800.00', // ₹800
    currency: 'INR',
    duration: '1 report',
    deliveryTime: '24-48 hours',
    serviceType: 'report',
    isDigital: true,
    features: [
      'Current dasha analysis',
      'Upcoming dasha predictions',
      'Planetary period effects',
      'Remedial suggestions',
      'Detailed PDF report'
    ],
    requirements: [
      'Complete birth details',
      'Current concerns or questions'
    ],
    tags: ['dasha', 'predictions', 'vedic-astrology'],
    isFeatured: true,
    thumbnailUrl: '/attached_assets/generated_images/jml.png'
  },
  
  // Marriage & Compatibility Services
  {
    name: 'Marriage Compatibility Report (Guna Milan)',
    description: 'Complete marriage compatibility analysis using Vedic astrology. Get detailed Guna Milan score and compatibility analysis for you and your partner.',
    shortDescription: 'Complete marriage compatibility with Guna Milan',
    price: '1300.00', // ₹1300
    currency: 'INR',
    duration: '1 report',
    deliveryTime: '24-48 hours',
    serviceType: 'report',
    isDigital: true,
    features: [
      'Complete Guna Milan (36 points)',
      'Ashtakoot matching',
      'Mangal Dosha analysis',
      'Planetary compatibility',
      'Remedial suggestions',
      'Detailed PDF report'
    ],
    requirements: [
      'Both partners birth details',
      'Date, time, place for both'
    ],
    tags: ['marriage', 'compatibility', 'guna-milan', 'matchmaking'],
    isFeatured: true,
    thumbnailUrl: '/attached_assets/generated_images/jml.png'
  },
  {
    name: 'Love Compatibility Analysis',
    description: 'Understand your romantic compatibility with your partner. Get insights into emotional connection, communication, and relationship dynamics.',
    shortDescription: 'Romantic relationship compatibility analysis',
    price: '600.00', // ₹600
    currency: 'INR',
    duration: '1 report',
    deliveryTime: '24 hours',
    serviceType: 'report',
    isDigital: true,
    features: [
      'Emotional compatibility',
      'Communication analysis',
      'Love and romance insights',
      'Relationship challenges and solutions',
      'PDF report'
    ],
    requirements: [
      'Both partners birth details'
    ],
    tags: ['love', 'relationship', 'compatibility'],
    isFeatured: false,
    thumbnailUrl: '/attached_assets/generated_images/jml.png'
  },
  {
    name: 'Mangal Dosha Analysis & Remedies',
    description: 'Detailed Mangal Dosha analysis and effective remedies. Understand if you or your partner have Mangal Dosha and how to neutralize its effects.',
    shortDescription: 'Mangal Dosha analysis with remedies',
    price: '900.00', // ₹900
    currency: 'INR',
    duration: '1 report',
    deliveryTime: '24-48 hours',
    serviceType: 'report',
    isDigital: true,
    features: [
      'Mangal Dosha identification',
      'Severity analysis',
      'Remedial measures',
      'Gemstone recommendations',
      'Puja and rituals',
      'Detailed PDF report'
    ],
    requirements: [
      'Complete birth details'
    ],
    tags: ['mangal-dosha', 'remedies', 'marriage'],
    isFeatured: false,
    thumbnailUrl: '/attached_assets/generated_images/jml.png'
  },
  
  // Career & Business Services
  {
    name: 'Career Guidance Report',
    description: 'Comprehensive career guidance based on your birth chart. Discover your ideal career path, suitable professions, and timing for career changes.',
    shortDescription: 'Complete career guidance and profession analysis',
    price: '1200.00', // ₹1200
    currency: 'INR',
    duration: '1 report',
    deliveryTime: '24-48 hours',
    serviceType: 'report',
    isDigital: true,
    features: [
      'Ideal career paths',
      'Suitable professions',
      'Career timing analysis',
      'Obstacles and solutions',
      'Remedial measures',
      'Detailed PDF report'
    ],
    requirements: [
      'Complete birth details',
      'Current career status'
    ],
    tags: ['career', 'profession', 'guidance'],
    isFeatured: true,
    thumbnailUrl: '/attached_assets/generated_images/jml.png'
  },
  {
    name: 'Business Astrology Consultation',
    description: 'Get astrological guidance for your business decisions. Understand favorable times for starting business, partnerships, and important business moves.',
    shortDescription: 'Business decisions and timing guidance',
    price: '1500.00', // ₹1500
    currency: 'INR',
    duration: '1 consultation + report',
    deliveryTime: '48-72 hours',
    serviceType: 'consultation',
    isDigital: true,
    features: [
      'Business timing analysis',
      'Partnership compatibility',
      'Financial prospects',
      'Remedial measures',
      'Detailed consultation report'
    ],
    requirements: [
      'Complete birth details',
      'Business details and questions'
    ],
    tags: ['business', 'entrepreneurship', 'finance'],
    isFeatured: true,
    thumbnailUrl: '/attached_assets/generated_images/jml.png'
  },
  {
    name: 'Job Change Timing Analysis',
    description: 'Know the best time to change your job or switch careers. Get astrological insights into favorable periods for job changes and career growth.',
    shortDescription: 'Best timing for job change and career switch',
    price: '700.00', // ₹700
    currency: 'INR',
    duration: '1 report',
    deliveryTime: '24 hours',
    serviceType: 'report',
    isDigital: true,
    features: [
      'Favorable periods for job change',
      'Career transition timing',
      'Obstacles and solutions',
      'Remedial suggestions',
      'PDF report'
    ],
    requirements: [
      'Complete birth details',
      'Current job situation'
    ],
    tags: ['career', 'job-change', 'timing'],
    isFeatured: false,
    thumbnailUrl: '/attached_assets/generated_images/jml.png'
  },
  
  // Remedies & Solutions Services
  {
    name: 'Gemstone Recommendation Report',
    description: 'Personalized gemstone recommendations based on your birth chart. Get detailed analysis of which gemstones will benefit you and how to wear them.',
    shortDescription: 'Personalized gemstone recommendations',
    price: '1000.00', // ₹1000
    currency: 'INR',
    duration: '1 report',
    deliveryTime: '24-48 hours',
    serviceType: 'report',
    isDigital: true,
    features: [
      'Planetary gemstone analysis',
      'Suitable gemstones list',
      'Wearing instructions',
      'Quality and size recommendations',
      'Activation rituals',
      'Detailed PDF report'
    ],
    requirements: [
      'Complete birth details',
      'Current concerns'
    ],
    tags: ['gemstones', 'remedies', 'ratna'],
    isFeatured: true,
    thumbnailUrl: '/attached_assets/generated_images/jml.png'
  },
  {
    name: 'Rudraksha & Yantra Consultation',
    description: 'Get recommendations for Rudraksha beads and Yantras based on your birth chart. Understand which Rudraksha and Yantra will help balance your planetary energies.',
    shortDescription: 'Rudraksha and Yantra recommendations',
    price: '800.00', // ₹800
    currency: 'INR',
    duration: '1 consultation',
    deliveryTime: '24-48 hours',
    serviceType: 'consultation',
    isDigital: true,
    features: [
      'Rudraksha recommendations',
      'Yantra selection',
      'Wearing and placement instructions',
      'Activation procedures',
      'Detailed PDF guide'
    ],
    requirements: [
      'Complete birth details'
    ],
    tags: ['rudraksha', 'yantra', 'remedies'],
    isFeatured: false,
    thumbnailUrl: '/attached_assets/generated_images/jml.png'
  },
  {
    name: 'Puja & Ritual Recommendations',
    description: 'Get personalized puja and ritual recommendations to balance planetary energies and remove obstacles from your life.',
    shortDescription: 'Personalized puja and ritual suggestions',
    price: '600.00', // ₹600
    currency: 'INR',
    duration: '1 report',
    deliveryTime: '24 hours',
    serviceType: 'report',
    isDigital: true,
    features: [
      'Recommended pujas',
      'Ritual procedures',
      'Auspicious dates',
      'Mantra suggestions',
      'Detailed PDF guide'
    ],
    requirements: [
      'Complete birth details',
      'Specific concerns'
    ],
    tags: ['puja', 'rituals', 'remedies'],
    isFeatured: false,
    thumbnailUrl: '/attached_assets/generated_images/jml.png'
  },
  
  // Health & Medical Services
  {
    name: 'Health Astrology Report',
    description: 'Understand your health prospects through astrology. Get insights into potential health issues, preventive measures, and timing for medical procedures.',
    shortDescription: 'Health analysis and medical astrology',
    price: '900.00', // ₹900
    currency: 'INR',
    duration: '1 report',
    deliveryTime: '24-48 hours',
    serviceType: 'report',
    isDigital: true,
    features: [
      'Health prospects analysis',
      'Vulnerable body parts',
      'Preventive measures',
      'Medical procedure timing',
      'Remedial suggestions',
      'Detailed PDF report'
    ],
    requirements: [
      'Complete birth details',
      'Current health concerns (optional)'
    ],
    tags: ['health', 'medical-astrology', 'wellness'],
    isFeatured: false,
    thumbnailUrl: '/attached_assets/generated_images/jml.png'
  },
  {
    name: 'Medical Procedure Muhurat',
    description: 'Get the best auspicious time for medical procedures, surgeries, and treatments based on your birth chart.',
    shortDescription: 'Auspicious timing for medical procedures',
    price: '500.00', // ₹500
    currency: 'INR',
    duration: '1 report',
    deliveryTime: '12-24 hours',
    serviceType: 'report',
    isDigital: true,
    features: [
      'Auspicious dates and times',
      'Avoid dates',
      'Planetary influences',
      'Remedial measures',
      'PDF report'
    ],
    requirements: [
      'Complete birth details',
      'Procedure type and urgency'
    ],
    tags: ['health', 'muhurat', 'medical'],
    isFeatured: false,
    thumbnailUrl: '/attached_assets/generated_images/jml.png'
  },
  
  // Muhurat & Timing Services
  {
    name: 'Marriage Muhurat Selection',
    description: 'Get the most auspicious date and time for your wedding ceremony. Detailed muhurat analysis for a successful and harmonious married life.',
    shortDescription: 'Auspicious wedding date and time selection',
    price: '1500.00', // ₹1500
    currency: 'INR',
    duration: '1 report',
    deliveryTime: '48-72 hours',
    serviceType: 'report',
    isDigital: true,
    features: [
      'Multiple auspicious dates',
      'Best time slots',
      'Avoid dates',
      'Planetary influences',
      'Remedial suggestions',
      'Detailed PDF report'
    ],
    requirements: [
      'Both partners birth details',
      'Preferred month/year',
      'Venue location'
    ],
    tags: ['marriage', 'muhurat', 'wedding'],
    isFeatured: true,
    thumbnailUrl: '/attached_assets/generated_images/jml.png'
  },
  {
    name: 'House Warming Muhurat',
    description: 'Get the best auspicious time for house warming, moving into a new home, or Griha Pravesh ceremony.',
    shortDescription: 'Auspicious timing for house warming',
    price: '700.00', // ₹700
    currency: 'INR',
    duration: '1 report',
    deliveryTime: '24-48 hours',
    serviceType: 'report',
    isDigital: true,
    features: [
      'Auspicious dates and times',
      'Avoid dates',
      'Ritual procedures',
      'Remedial measures',
      'PDF report'
    ],
    requirements: [
      'Complete birth details',
      'New address',
      'Preferred month'
    ],
    tags: ['house-warming', 'griha-pravesh', 'muhurat'],
    isFeatured: false,
    thumbnailUrl: '/attached_assets/generated_images/jml.png'
  },
  {
    name: 'Business Inauguration Muhurat',
    description: 'Select the most auspicious time for starting a new business, opening a shop, or launching a venture.',
    shortDescription: 'Auspicious timing for business inauguration',
    price: '1000.00', // ₹1000
    currency: 'INR',
    duration: '1 report',
    deliveryTime: '24-48 hours',
    serviceType: 'report',
    isDigital: true,
    features: [
      'Auspicious dates and times',
      'Avoid dates',
      'Business type analysis',
      'Remedial measures',
      'PDF report'
    ],
    requirements: [
      'Complete birth details',
      'Business type',
      'Preferred month'
    ],
    tags: ['business', 'muhurat', 'inauguration'],
    isFeatured: false,
    thumbnailUrl: '/attached_assets/generated_images/jml.png'
  },
  
  // Predictions & Forecasts Services
  {
    name: 'Yearly Horoscope & Predictions',
    description: 'Complete yearly predictions for all aspects of your life including career, finance, health, relationships, and more.',
    shortDescription: 'Complete yearly predictions and forecast',
    price: '1300.00', // ₹1300
    currency: 'INR',
    duration: '1 report',
    deliveryTime: '48-72 hours',
    serviceType: 'report',
    isDigital: true,
    features: [
      'Yearly predictions',
      'Month-wise forecasts',
      'Career and finance',
      'Health and relationships',
      'Remedial measures',
      'Detailed PDF report'
    ],
    requirements: [
      'Complete birth details'
    ],
    tags: ['predictions', 'yearly', 'forecast'],
    isFeatured: true,
    thumbnailUrl: '/attached_assets/generated_images/jml.png'
  },
  {
    name: 'Monthly Predictions Report',
    description: 'Get detailed monthly predictions for the upcoming month. Understand what the stars have in store for you.',
    shortDescription: 'Detailed monthly predictions',
    price: '400.00', // ₹400
    currency: 'INR',
    duration: '1 report',
    deliveryTime: '24 hours',
    serviceType: 'report',
    isDigital: true,
    features: [
      'Monthly predictions',
      'Week-wise forecasts',
      'Important dates',
      'Remedial suggestions',
      'PDF report'
    ],
    requirements: [
      'Complete birth details',
      'Month of interest'
    ],
    tags: ['predictions', 'monthly', 'forecast'],
    isFeatured: false,
    thumbnailUrl: '/attached_assets/generated_images/jml.png'
  },
  
  // Numerology & Palmistry Services
  {
    name: 'Complete Numerology Report',
    description: 'Comprehensive numerology analysis including life path number, destiny number, name analysis, and lucky numbers.',
    shortDescription: 'Complete numerology analysis and readings',
    price: '800.00', // ₹800
    currency: 'INR',
    duration: '1 report',
    deliveryTime: '24-48 hours',
    serviceType: 'report',
    isDigital: true,
    features: [
      'Life path number',
      'Destiny number',
      'Name analysis',
      'Lucky numbers and dates',
      'Career and relationship insights',
      'Detailed PDF report'
    ],
    requirements: [
      'Date of birth',
      'Full name (as per birth certificate)'
    ],
    tags: ['numerology', 'numbers', 'name-analysis'],
    isFeatured: false,
    thumbnailUrl: '/attached_assets/generated_images/jml.png'
  },
  {
    name: 'Palmistry Reading',
    description: 'Get detailed palmistry analysis through photos. Understand your life line, heart line, career prospects, and more.',
    shortDescription: 'Complete palmistry reading and analysis',
    price: '600.00', // ₹600
    currency: 'INR',
    duration: '1 consultation',
    deliveryTime: '24-48 hours',
    serviceType: 'consultation',
    isDigital: true,
    features: [
      'Life line analysis',
      'Heart line reading',
      'Career and finance lines',
      'Health indicators',
      'Relationship insights',
      'Detailed PDF report'
    ],
    requirements: [
      'Clear photos of both palms',
      'Date of birth'
    ],
    tags: ['palmistry', 'hand-reading', 'hast-rekha'],
    isFeatured: false,
    thumbnailUrl: '/attached_assets/generated_images/jml.png'
  },
  {
    name: 'Name Correction & Suggestions',
    description: 'Get numerology-based name correction suggestions. Find the perfect name that aligns with your birth chart and numerology.',
    shortDescription: 'Name correction based on numerology',
    price: '1000.00', // ₹1000
    currency: 'INR',
    duration: '1 report',
    deliveryTime: '24-48 hours',
    serviceType: 'report',
    isDigital: true,
    features: [
      'Current name analysis',
      'Name correction suggestions',
      'Multiple name options',
      'Numerology compatibility',
      'Astrological alignment',
      'Detailed PDF report'
    ],
    requirements: [
      'Date of birth',
      'Current name',
      'Purpose (child/new name)'
    ],
    tags: ['numerology', 'name-correction', 'naming'],
    isFeatured: false,
    thumbnailUrl: '/attached_assets/generated_images/jml.png'
  }
];

async function seedDatabase() {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    console.log('Starting database seeding...\n');
    
    // Seed astrologers - check by email to avoid duplicates
    console.log('Seeding astrologers...');
    let addedCount = 0;
    let skippedCount = 0;
    
    for (const astrologer of astrologersData) {
      // Check if astrologer with this email already exists
      const existingCheck = await client.query('SELECT id FROM astrologers WHERE email = $1', [astrologer.email]);
      
      if (existingCheck.rows.length > 0) {
        console.log(`  ⊘ Skipped (exists): ${astrologer.name}`);
        skippedCount++;
        continue;
      }
      
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
      addedCount++;
    }
    
    if (addedCount > 0) {
      console.log(`\n  Summary: Added ${addedCount} new astrologer(s), skipped ${skippedCount} existing.`);
    } else {
      console.log(`\n  All astrologers already exist. Skipped ${skippedCount}.`);
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
    
    // Seed Service Categories
    const categoryCheck = await client.query('SELECT COUNT(*) FROM service_categories');
    const categoryCount = parseInt(categoryCheck.rows[0].count);
    
    let categoryIds = [];
    
    if (categoryCount > 0) {
      console.log(`\nFound ${categoryCount} existing service categories. Skipping category seeding.`);
      const existingCategories = await client.query('SELECT id, name FROM service_categories ORDER BY display_order');
      categoryIds = existingCategories.rows;
    } else {
      console.log('\nSeeding service categories...');
      for (const category of serviceCategoriesData) {
        const insertQuery = `
          INSERT INTO service_categories (
            name, description, icon, display_order, is_active, created_at
          ) VALUES ($1, $2, $3, $4, $5, NOW())
          RETURNING id, name
        `;
        
        const result = await client.query(insertQuery, [
          category.name,
          category.description,
          category.icon,
          category.displayOrder,
          category.isActive
        ]);
        
        categoryIds.push({ id: result.rows[0].id, name: result.rows[0].name });
        console.log(`  ✓ Added category: ${category.name} (ID: ${result.rows[0].id})`);
      }
    }
    
    // Create a map of category names to IDs for easy lookup
    const categoryMap = {};
    if (categoryIds.length === 0) {
      const allCategories = await client.query('SELECT id, name FROM service_categories');
      categoryIds = allCategories.rows;
    }
    categoryIds.forEach(cat => {
      categoryMap[cat.name] = cat.id;
    });
    
    // Map services to categories
    const categoryMapping = {
      'Kundli & Birth Chart': ['Complete Birth Chart Analysis', 'Basic Kundli Report', 'Dasha & Antardasha Analysis'],
      'Marriage & Compatibility': ['Marriage Compatibility Report (Guna Milan)', 'Love Compatibility Analysis', 'Mangal Dosha Analysis & Remedies'],
      'Career & Business': ['Career Guidance Report', 'Business Astrology Consultation', 'Job Change Timing Analysis'],
      'Remedies & Solutions': ['Gemstone Recommendation Report', 'Rudraksha & Yantra Consultation', 'Puja & Ritual Recommendations'],
      'Health & Medical': ['Health Astrology Report', 'Medical Procedure Muhurat'],
      'Muhurat & Timing': ['Marriage Muhurat Selection', 'House Warming Muhurat', 'Business Inauguration Muhurat'],
      'Predictions & Forecasts': ['Yearly Horoscope & Predictions', 'Monthly Predictions Report'],
      'Numerology & Palmistry': ['Complete Numerology Report', 'Palmistry Reading', 'Name Correction & Suggestions']
    };
    
    // Seed Services
    const serviceCheck = await client.query('SELECT COUNT(*) FROM services');
    const serviceCount = parseInt(serviceCheck.rows[0].count);
    
    if (serviceCount > 0) {
      console.log(`\nFound ${serviceCount} existing services. Skipping service seeding.`);
    } else {
      console.log('\nSeeding services...');
      for (const service of servicesData) {
        // Find the category for this service
        let categoryId = null;
        for (const [categoryName, serviceNames] of Object.entries(categoryMapping)) {
          if (serviceNames.includes(service.name)) {
            categoryId = categoryMap[categoryName];
            break;
          }
        }
        
        // Fallback to first category if not found
        if (!categoryId && categoryIds.length > 0) {
          categoryId = categoryIds[0].id;
        }
        
        if (!categoryId) {
          console.log(`  ⚠ Skipping service ${service.name} - no category found`);
          continue;
        }
        
        const insertQuery = `
          INSERT INTO services (
            category_id, name, description, short_description, price, currency,
            duration, delivery_time, service_type, is_digital, features, requirements,
            tags, is_active, is_featured, thumbnail_url, created_at, updated_at
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, NOW(), NOW())
        `;
        
        await client.query(insertQuery, [
          categoryId,
          service.name,
          service.description,
          service.shortDescription,
          service.price,
          service.currency,
          service.duration,
          service.deliveryTime,
          service.serviceType,
          service.isDigital,
          service.features,
          service.requirements,
          service.tags,
          true, // is_active
          service.isFeatured,
          service.thumbnailUrl
        ]);
        
        console.log(`  ✓ Added service: ${service.name} (₹${service.price})`);
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

