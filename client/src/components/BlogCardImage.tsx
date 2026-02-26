import { useState } from "react";
import type { BlogPost } from "@shared/schema";

/** Cosmic and astrology-themed placeholder images: astrology (tarot, crystal, moon) + stars, galaxy */
const COSMIC_IMAGES = [
  // Astrology-specific (tarot, crystal ball, moon, mystical)
  "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=600&h=300&fit=crop",             // tarot cards
  "https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f5?w=600&h=300&fit=crop",             // moon
  "https://images.unsplash.com/photo-1518709268805-4e9042af2ac0?w=600&h=300&fit=crop",             // crystal / mystical ball
  "https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=600&h=300&fit=crop",             // night sky (horoscope vibe)
  "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=600&h=300&fit=crop",             // stars (zodiac / cosmic)
  "https://images.unsplash.com/photo-1444927714506-8492d94b5ba0?w=600&h=300&fit=crop",             // night sky cosmos
  // Cosmic & galaxy
  "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=600&h=300&fit=crop",             // galaxy
  "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=600&h=300&fit=crop",             // nebula space
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&h=300&fit=crop",             // milky way
  "https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=600&h=300&fit=crop",               // space stars
  "https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=600&h=300&fit=crop",             // galaxy spiral
  "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600&h=300&fit=crop",             // cosmic gradient
];

/** Inline SVG fallback when all URLs fail (e.g. offline) – astrology/cosmic style */
const FALLBACK_DATA_URI =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="300" viewBox="0 0 600 300"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%238B5CF6"/><stop offset="50%" style="stop-color:%236D28D9"/><stop offset="100%" style="stop-color:%234C1D95"/></linearGradient></defs><rect width="600" height="300" fill="url(#g)"/><circle cx="300" cy="120" r="40" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="2"/><text x="300" y="118" text-anchor="middle" fill="rgba(255,255,255,0.9)" font-size="48">☽</text><text x="300" y="200" dominant-baseline="middle" text-anchor="middle" fill="rgba(255,255,255,0.95)" font-family="serif" font-size="22">Astrology &amp; Cosmic wisdom</text></svg>'
  );

/**
 * Returns a cosmic/astrology placeholder image URL for a blog post.
 * Pass imageIndex when rendering in a list so each card gets a different image.
 */
export function getBlogPlaceholderUrl(post: { id: string }, imageIndex?: number): string {
  const index =
    imageIndex !== undefined
      ? imageIndex % COSMIC_IMAGES.length
      : Array.from(String(post.id)).reduce((acc, c) => acc + c.charCodeAt(0), 0) % COSMIC_IMAGES.length;
  return COSMIC_IMAGES[index];
}

interface BlogCardImageProps {
  post: BlogPost;
  /** When in a list, pass the card index so each card gets a different image */
  imageIndex?: number;
  className?: string;
  "data-testid"?: string;
}

/**
 * Renders the blog card featured image with fallback: uses post.featuredImageUrl
 * when valid, otherwise a deterministic placeholder. On load error, switches to
 * placeholder, then to an inline SVG if that also fails.
 */
export default function BlogCardImage({ post, imageIndex, className, "data-testid": dataTestId }: BlogCardImageProps) {
  const placeholder = getBlogPlaceholderUrl(post, imageIndex);
  const [src, setSrc] = useState<string>(() => {
    const url = post.featuredImageUrl?.trim();
    if (url && (url.startsWith("http") || url.startsWith("/"))) return url;
    return placeholder;
  });
  const [errorCount, setErrorCount] = useState(0);

  const handleError = () => {
    if (errorCount === 0) {
      setErrorCount(1);
      setSrc(placeholder);
    } else if (errorCount === 1) {
      setErrorCount(2);
      setSrc(FALLBACK_DATA_URI);
    }
  };

  return (
    <img
      src={src}
      alt={post.title}
      className={className}
      onError={handleError}
      loading="lazy"
      decoding="async"
      data-testid={dataTestId}
    />
  );
}
