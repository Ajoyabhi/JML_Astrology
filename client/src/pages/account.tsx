import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import Navigation from "@/components/Navigation";
import DonationBanner from "@/components/DonationBanner";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  Mail,
  Calendar,
  Sparkles,
  ArrowRight,
  Moon,
  Calculator,
  MessageCircle,
  HelpCircle,
  Star,
} from "lucide-react";
import { motion } from "framer-motion";
import type { User as UserType } from "@shared/schema";

export default function Account() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [, setLocation] = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      setLocation("/login");
    }
  }, [isLoading, isAuthenticated, setLocation]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading || !isAuthenticated) {
    return null;
  }

  const u = user as UserType | undefined;
  const fullName = [u?.firstName, u?.lastName].filter(Boolean).join(" ") || t("account.guest");
  const initials = fullName
    .split(" ")
    .map((s) => s[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  const memberSince = u?.createdAt
    ? new Date(u.createdAt).toLocaleDateString(undefined, { month: "long", year: "numeric" })
    : null;

  const quickLinks = [
    { href: "/horoscope", icon: Moon, label: t("account.horoscope") },
    { href: "/calculators", icon: Calculator, label: t("account.calculators") },
    { href: "/astrologers", icon: MessageCircle, label: t("account.bookConsultation") },
    { href: "/help-center", icon: HelpCircle, label: t("account.helpCenter") },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <DonationBanner />

      <main className="pt-20 pb-16 cosmic-bg">
        <motion.div
          className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="text-center mb-10" variants={itemVariants}>
            <Sparkles className="h-8 w-8 text-gold-400 mx-auto mb-3" />
            <h1 className="text-3xl md:text-4xl font-serif font-bold bg-gradient-to-r from-primary via-accent to-gold-400 bg-clip-text text-transparent">
              {t("account.title")}
            </h1>
            <p className="text-muted-foreground mt-2">{t("account.subtitle")}</p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="border-border/80 bg-card/95 backdrop-blur shadow-lg overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                  <Avatar className="h-20 w-20 border-2 border-primary/30">
                    <AvatarImage src={u?.profileImageUrl ?? undefined} alt={fullName} />
                    <AvatarFallback className="bg-primary/10 text-primary text-xl font-serif">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-center sm:text-left">
                    <CardTitle className="text-2xl font-serif">{fullName}</CardTitle>
                    <CardDescription className="mt-1">{t("account.profileSubtitle")}</CardDescription>
                    {u?.email && (
                      <div className="flex items-center gap-2 mt-3 text-muted-foreground">
                        <Mail className="h-4 w-4 shrink-0" />
                        <span className="text-sm">{u.email}</span>
                      </div>
                    )}
                    {memberSince && (
                      <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                        <Calendar className="h-4 w-4 shrink-0" />
                        <span className="text-sm">{t("account.memberSince")} {memberSince}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <Link href="/">
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto border-primary/30 text-primary hover:bg-primary/10"
                  >
                    <Star className="h-4 w-4 mr-2" />
                    {t("account.goToDashboard")}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div className="mt-8" variants={itemVariants}>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              {t("account.quickLinks")}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {quickLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <Card className="border-border/80 bg-card/80 hover:bg-card hover:border-primary/40 transition-colors cursor-pointer group">
                    <CardContent className="flex items-center gap-4 p-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20">
                        <link.icon className="h-5 w-5" />
                      </div>
                      <span className="font-medium flex-1">{link.label}</span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
