import 'dotenv/config';
import { getDb } from './server/db.ts';
import { horoscopes } from './shared/schema.ts';
import { eq } from 'drizzle-orm';

// Current date
const today = new Date();
today.setHours(0, 0, 0, 0);

// Horoscope data for all zodiac signs
const horoscopeData = [
  {
    zodiacSign: 'Aries',
    type: 'daily',
    content: 'Today brings fresh energy and new beginnings. Your natural leadership qualities shine, and others look to you for guidance. Take initiative on projects that have been waiting. Lucky color: Red. Lucky number: 7.',
    date: today
  },
  {
    zodiacSign: 'Taurus',
    type: 'daily',
    content: 'Stability and comfort are your focus today. Financial matters look promising, and your practical approach pays off. Take time to enjoy the finer things in life. Lucky color: Green. Lucky number: 2.',
    date: today
  },
  {
    zodiacSign: 'Gemini',
    type: 'daily',
    content: 'Your communication skills are at their peak today. Networking and social interactions bring unexpected opportunities. Stay curious and open to new ideas. Lucky color: Yellow. Lucky number: 5.',
    date: today
  },
  {
    zodiacSign: 'Cancer',
    type: 'daily',
    content: 'Emotional intelligence guides your decisions today. Family and home matters require attention, but bring satisfaction. Trust your intuition in personal relationships. Lucky color: Blue. Lucky number: 4.',
    date: today
  },
  {
    zodiacSign: 'Leo',
    type: 'daily',
    content: 'Your creative energy is flowing strongly today. Leadership opportunities present themselves naturally. Confidence attracts positive attention and recognition. Lucky color: Gold. Lucky number: 1.',
    date: today
  },
  {
    zodiacSign: 'Virgo',
    type: 'daily',
    content: 'Attention to detail serves you well today. Health and wellness routines bring positive results. Your analytical mind helps solve complex problems efficiently. Lucky color: Navy. Lucky number: 6.',
    date: today
  },
  {
    zodiacSign: 'Libra',
    type: 'daily',
    content: 'Balance and harmony are your themes today. Relationships flourish with open communication. Aesthetic pursuits and beauty bring joy and inspiration. Lucky color: Pink. Lucky number: 3.',
    date: today
  },
  {
    zodiacSign: 'Scorpio',
    type: 'daily',
    content: 'Transformation and deep insights characterize your day. Trust your instincts in important decisions. Intense focus on goals brings breakthrough moments. Lucky color: Maroon. Lucky number: 8.',
    date: today
  },
  {
    zodiacSign: 'Sagittarius',
    type: 'daily',
    content: 'Adventure and learning call to you today. Travel or educational pursuits expand your horizons. Optimism and enthusiasm attract like-minded people. Lucky color: Purple. Lucky number: 9.',
    date: today
  },
  {
    zodiacSign: 'Capricorn',
    type: 'daily',
    content: 'Steady progress in career matters is evident today. Your disciplined approach yields long-term benefits. Authority figures recognize your reliability and dedication. Lucky color: Brown. Lucky number: 10.',
    date: today
  },
  {
    zodiacSign: 'Aquarius',
    type: 'daily',
    content: 'Innovation and originality are your strengths today. Group activities and humanitarian causes bring fulfillment. Unexpected insights lead to creative solutions. Lucky color: Turquoise. Lucky number: 11.',
    date: today
  },
  {
    zodiacSign: 'Pisces',
    type: 'daily',
    content: 'Intuitive powers are heightened today. Creative and spiritual pursuits bring deep satisfaction. Compassion and empathy guide your interactions with others. Lucky color: Sea Green. Lucky number: 12.',
    date: today
  }
];

async function addHoroscopeData() {
  try {
    console.log('Adding horoscope data for today...');
    const db = await getDb();
    
    // First, let's check if data already exists
    const existingData = await db.select().from(horoscopes).where(eq(horoscopes.type, 'daily')).limit(1);
    
    if (existingData.length > 0) {
      console.log('Horoscope data already exists. Skipping...');
      return;
    }
    
    for (const horoscope of horoscopeData) {
      await db.insert(horoscopes).values(horoscope);
      console.log(`Added horoscope for ${horoscope.zodiacSign}`);
    }
    
    console.log('Successfully added all horoscope data!');
  } catch (error) {
    console.error('Error adding horoscope data:', error);
  }
}

addHoroscopeData();
