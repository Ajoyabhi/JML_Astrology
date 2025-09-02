import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';

export function NavigationProgress() {
  const [location] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Start loading animation when location changes
    setIsLoading(true);
    setProgress(0);

    // Simulate progressive loading
    const timer1 = setTimeout(() => setProgress(30), 100);
    const timer2 = setTimeout(() => setProgress(60), 200);
    const timer3 = setTimeout(() => setProgress(85), 300);
    const timer4 = setTimeout(() => {
      setProgress(100);
      setTimeout(() => setIsLoading(false), 150);
    }, 400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [location]);

  if (!isLoading) return null;

  return (
    <div className="fixed top-16 left-0 right-0 z-50 h-1 bg-gray-800/50">
      <motion.div
        className="h-full bg-gradient-to-r from-primary via-accent to-gold-400"
        initial={{ width: '0%' }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.1, ease: 'easeOut' }}
        style={{
          boxShadow: '0 0 10px rgba(147, 51, 234, 0.5)'
        }}
      />
    </div>
  );
}

export default NavigationProgress;