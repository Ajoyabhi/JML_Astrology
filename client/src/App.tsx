import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import LoadingSpinner from "@/components/LoadingSpinner";
import NavigationProgress from "@/components/NavigationProgress";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import Home from "@/pages/home";
import Calculators from "@/pages/calculators";
import Horoscope from "@/pages/horoscope";
import Astrologers from "@/pages/astrologers";
import Blog from "@/pages/blog";
import Services from "@/pages/services";
import Payment from "@/pages/payment";
import PaymentSuccess from "@/pages/payment-success";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();
  const [location] = useLocation();

  // Show loading screen during auth check
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner 
          size="lg" 
          text="Loading your cosmic journey..." 
          className="text-center"
        />
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Switch key={location}>
        {!isAuthenticated ? (
          <>
            <Route path="/">
              {() => (
                <PageTransition>
                  <Landing />
                </PageTransition>
              )}
            </Route>
            <Route path="/calculators">
              {() => (
                <PageTransition>
                  <Calculators />
                </PageTransition>
              )}
            </Route>
            <Route path="/horoscope">
              {() => (
                <PageTransition>
                  <Horoscope />
                </PageTransition>
              )}
            </Route>
            <Route path="/astrologers">
              {() => (
                <PageTransition>
                  <Astrologers />
                </PageTransition>
              )}
            </Route>
            <Route path="/blog">
              {() => (
                <PageTransition>
                  <Blog />
                </PageTransition>
              )}
            </Route>
            <Route path="/services">
              {() => (
                <PageTransition>
                  <Services />
                </PageTransition>
              )}
            </Route>
            <Route path="/payment">
              {() => (
                <PageTransition>
                  <Payment />
                </PageTransition>
              )}
            </Route>
            <Route path="/payment/success">
              {() => (
                <PageTransition>
                  <PaymentSuccess />
                </PageTransition>
              )}
            </Route>
          </>
        ) : (
          <>
            <Route path="/">
              {() => (
                <PageTransition>
                  <Home />
                </PageTransition>
              )}
            </Route>
            <Route path="/calculators">
              {() => (
                <PageTransition>
                  <Calculators />
                </PageTransition>
              )}
            </Route>
            <Route path="/horoscope">
              {() => (
                <PageTransition>
                  <Horoscope />
                </PageTransition>
              )}
            </Route>
            <Route path="/astrologers">
              {() => (
                <PageTransition>
                  <Astrologers />
                </PageTransition>
              )}
            </Route>
            <Route path="/blog">
              {() => (
                <PageTransition>
                  <Blog />
                </PageTransition>
              )}
            </Route>
            <Route path="/services">
              {() => (
                <PageTransition>
                  <Services />
                </PageTransition>
              )}
            </Route>
            <Route path="/payment">
              {() => (
                <PageTransition>
                  <Payment />
                </PageTransition>
              )}
            </Route>
            <Route path="/payment/success">
              {() => (
                <PageTransition>
                  <PaymentSuccess />
                </PageTransition>
              )}
            </Route>
          </>
        )}
        <Route>
          {() => (
            <PageTransition>
              <NotFound />
            </PageTransition>
          )}
        </Route>
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <div className="min-h-screen cosmic-bg">
            <NavigationProgress />
            <Toaster />
            <Router />
          </div>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
