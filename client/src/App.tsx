import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import { LanguageProvider } from "@/contexts/LanguageContext";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import Home from "@/pages/home";
import Calculators from "@/pages/calculators";
import Horoscope from "@/pages/horoscope";
import Astrologers from "@/pages/astrologers";
import Blog from "@/pages/blog";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <Switch>
      {isLoading || !isAuthenticated ? (
        <>
          <Route path="/" component={Landing} />
          <Route path="/calculators" component={Calculators} />
          <Route path="/horoscope" component={Horoscope} />
          <Route path="/astrologers" component={Astrologers} />
          <Route path="/blog" component={Blog} />
        </>
      ) : (
        <>
          <Route path="/" component={Home} />
          <Route path="/calculators" component={Calculators} />
          <Route path="/horoscope" component={Horoscope} />
          <Route path="/astrologers" component={Astrologers} />
          <Route path="/blog" component={Blog} />
        </>
      )}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <div className="min-h-screen cosmic-bg">
            <Toaster />
            <Router />
          </div>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
