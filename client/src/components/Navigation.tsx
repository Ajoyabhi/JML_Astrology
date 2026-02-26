import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, User, ChevronDown, Home, LogOut } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { User as UserType } from "@shared/schema";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, isLoading } = useAuth();
  const [location] = useLocation();

  const { t } = useLanguage();
  
  const navigationItems = [
    { href: "/calculators", label: t('nav.calculators') },
    { href: "/horoscope", label: t('nav.horoscope') },
    { href: "/astrologers", label: t('nav.astrologers') },
    { href: "/services", label: t('nav.services') },
    { href: "/blog", label: t('nav.blog') },
  ];

  return (
    <nav className="relative z-50 bg-card/90 backdrop-blur-md border-b border-border sticky top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2" data-testid="link-home">
            <img 
              src="/attached_assets/jml_wbg.png" 
              alt="JMLAstro Logo" 
              className="w-16 h-16 rounded-full object-cover p-1"
            />
            <span className="text-xl font-serif font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              JMLAstro
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary data-[state=open]:text-primary"
                    data-testid="dropdown-user-trigger"
                  >
                    <User className="h-4 w-4 shrink-0" />
                    <span className="font-medium">
                      {(user as UserType)?.firstName ? `${t('nav.hiUser')} ${(user as UserType).firstName}` : t('nav.myAccount')}
                    </span>
                    <ChevronDown className="h-4 w-4 shrink-0" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-[11rem]">
                  <DropdownMenuItem asChild>
                    <Link href="/" className="flex items-center gap-2 cursor-pointer" data-testid="dropdown-home">
                      <Home className="h-4 w-4" />
                      {t('nav.home')}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account" className="flex items-center gap-2 cursor-pointer" data-testid="dropdown-my-account">
                      <User className="h-4 w-4" />
                      {t('nav.myAccount')}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-primary focus:text-primary cursor-pointer"
                    onClick={() => window.location.href = "/api/logout"}
                    data-testid="dropdown-logout"
                  >
                    <LogOut className="h-4 w-4" />
                    {t('nav.logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant="ghost"
                    className="text-muted-foreground hover:text-primary"
                    data-testid="button-login"
                  >
                    {t('nav.login')}
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button
                    className="bg-gradient-to-r from-primary to-gold-400 text-cosmic-900 hover:shadow-lg"
                    data-testid="button-signup"
                  >
                    {t('nav.signup')}
                  </Button>
                </Link>
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
                <>
                  <Link
                    href="/"
                    className="flex items-center gap-2 w-full px-3 py-2 rounded-md text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                    data-testid="mobile-link-home"
                  >
                    <Home className="h-4 w-4 shrink-0" />
                    <span className="font-medium">{t('nav.home')}</span>
                  </Link>
                  <Link
                    href="/account"
                    className="flex items-center gap-2 w-full px-3 py-2 rounded-md text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                    data-testid="mobile-link-my-account"
                  >
                    <User className="h-4 w-4 shrink-0" />
                    <span className="font-medium">
                      {(user as UserType)?.firstName ? `${t('nav.hiUser')} ${(user as UserType).firstName}` : t('nav.myAccount')}
                    </span>
                  </Link>
                  <Button
                    onClick={() => window.location.href = "/api/logout"}
                    variant="outline"
                    className="w-full border-primary/30 text-primary hover:bg-primary/10"
                    data-testid="mobile-button-logout"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    {t('nav.logout')}
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <Button
                      variant="ghost"
                      className="w-full text-muted-foreground hover:text-primary"
                      data-testid="mobile-button-login"
                    >
                      {t('nav.login')}
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button
                      className="w-full bg-gradient-to-r from-primary to-gold-400 text-cosmic-900"
                      data-testid="mobile-button-signup"
                    >
                      {t('nav.signup')}
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
