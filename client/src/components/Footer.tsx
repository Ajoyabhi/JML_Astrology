import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2" data-testid="footer-logo">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <i className="fas fa-moon text-cosmic-900"></i>
              </div>
              <span className="text-xl font-serif font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                AstroMystic
              </span>
            </Link>
            <p className="text-muted-foreground">
              Your trusted companion in exploring the mysteries of the cosmos and unlocking your cosmic potential.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/20 transition-all duration-200"
                data-testid="social-facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/20 transition-all duration-200"
                data-testid="social-twitter"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/20 transition-all duration-200"
                data-testid="social-instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/20 transition-all duration-200"
                data-testid="social-youtube"
              >
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/calculators" 
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  data-testid="footer-link-birth-chart"
                >
                  Birth Chart Reading
                </Link>
              </li>
              <li>
                <Link 
                  href="/calculators" 
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  data-testid="footer-link-love-compatibility"
                >
                  Love Compatibility
                </Link>
              </li>
              <li>
                <Link 
                  href="/astrologers" 
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  data-testid="footer-link-career-guidance"
                >
                  Career Guidance
                </Link>
              </li>
              <li>
                <Link 
                  href="/horoscope" 
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  data-testid="footer-link-daily-horoscope"
                >
                  Daily Horoscope
                </Link>
              </li>
              <li>
                <Link 
                  href="/astrologers" 
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  data-testid="footer-link-tarot-reading"
                >
                  Tarot Reading
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/blog" 
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  data-testid="footer-link-astrology-blog"
                >
                  Astrology Blog
                </Link>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  data-testid="footer-link-learning-center"
                >
                  Learning Center
                </a>
              </li>
              <li>
                <Link 
                  href="/calculators" 
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  data-testid="footer-link-calculators"
                >
                  Calculators
                </Link>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  data-testid="footer-link-zodiac-guide"
                >
                  Zodiac Guide
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  data-testid="footer-link-faq"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  data-testid="footer-link-contact"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  data-testid="footer-link-help"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  data-testid="footer-link-privacy"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  data-testid="footer-link-terms"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  data-testid="footer-link-refund"
                >
                  Refund Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2024 AstroMystic. All rights reserved. Unlocking cosmic wisdom for every soul.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <span className="text-xs text-muted-foreground">Available in:</span>
            <div className="flex space-x-3">
              <button 
                className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200"
                data-testid="language-english"
              >
                English
              </button>
              <button 
                className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200"
                data-testid="language-hindi"
              >
                हिंदी
              </button>
              <button 
                className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200"
                data-testid="language-bengali"
              >
                বাংলা
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
