import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, isLoading } = useAuth();
  const [location] = useLocation();

  const navigationItems = [
    { href: "/calculators", label: "Calculators" },
    { href: "/horoscope", label: "Horoscope" },
    { href: "/astrologers", label: "Best Astrologers" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <nav className="relative z-50 bg-card/90 backdrop-blur-md border-b border-border sticky top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2" data-testid="link-home">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center floating-element">
              <i className="fas fa-moon text-cosmic-900"></i>
            </div>
            <span className="text-xl font-serif font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              AstroMystic
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors duration-200 ${
                  location === item.href
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
                data-testid={`link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoading ? (
              <div className="w-20 h-8 bg-muted animate-pulse rounded"></div>
            ) : isAuthenticated ? (
              <Button
                onClick={() => window.location.href = "/api/logout"}
                variant="outline"
                className="border-primary/30 text-primary hover:bg-primary/10"
                data-testid="button-logout"
              >
                Logout
              </Button>
            ) : (
              <>
                <Button
                  onClick={() => window.location.href = "/api/login"}
                  variant="ghost"
                  className="text-muted-foreground hover:text-primary"
                  data-testid="button-login"
                >
                  Login
                </Button>
                <Button
                  onClick={() => window.location.href = "/api/login"}
                  className="bg-gradient-to-r from-primary to-gold-400 text-cosmic-900 hover:shadow-lg"
                  data-testid="button-signup"
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-border">
          <div className="px-4 py-4 space-y-3">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block transition-colors duration-200 ${
                  location === item.href
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid={`mobile-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-border space-y-2">
              {isAuthenticated ? (
                <Button
                  onClick={() => window.location.href = "/api/logout"}
                  variant="outline"
                  className="w-full border-primary/30 text-primary hover:bg-primary/10"
                  data-testid="mobile-button-logout"
                >
                  Logout
                </Button>
              ) : (
                <>
                  <Button
                    onClick={() => window.location.href = "/api/login"}
                    variant="ghost"
                    className="w-full text-muted-foreground hover:text-primary"
                    data-testid="mobile-button-login"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => window.location.href = "/api/login"}
                    className="w-full bg-gradient-to-r from-primary to-gold-400 text-cosmic-900"
                    data-testid="mobile-button-signup"
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
