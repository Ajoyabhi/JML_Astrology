import { motion } from 'framer-motion';

interface SkeletonLoaderProps {
  className?: string;
  animate?: boolean;
}

export function SkeletonLoader({ className = '', animate = true }: SkeletonLoaderProps) {
  const baseClasses = 'bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 rounded';
  
  if (!animate) {
    return <div className={`${baseClasses} ${className}`} />;
  }

  return (
    <motion.div
      className={`${baseClasses} ${className}`}
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'linear'
      }}
      style={{
        backgroundSize: '200% 100%'
      }}
    />
  );
}

// Predefined skeleton components for common use cases
export function CardSkeleton() {
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 space-y-4">
      <div className="flex items-center space-x-4">
        <SkeletonLoader className="w-12 h-12 rounded-full" />
        <div className="space-y-2 flex-1">
          <SkeletonLoader className="h-4 w-3/4" />
          <SkeletonLoader className="h-3 w-1/2" />
        </div>
      </div>
      <div className="space-y-2">
        <SkeletonLoader className="h-3 w-full" />
        <SkeletonLoader className="h-3 w-5/6" />
        <SkeletonLoader className="h-3 w-4/6" />
      </div>
      <div className="flex justify-between items-center pt-4">
        <SkeletonLoader className="h-8 w-20 rounded-full" />
        <SkeletonLoader className="h-8 w-24 rounded-full" />
      </div>
    </div>
  );
}

export function BlogPostSkeleton() {
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden">
      <SkeletonLoader className="h-48 w-full rounded-none" />
      <div className="p-6 space-y-4">
        <SkeletonLoader className="h-6 w-4/5" />
        <div className="space-y-2">
          <SkeletonLoader className="h-4 w-full" />
          <SkeletonLoader className="h-4 w-5/6" />
          <SkeletonLoader className="h-4 w-3/4" />
        </div>
        <div className="flex items-center space-x-4 pt-4">
          <SkeletonLoader className="h-3 w-16" />
          <SkeletonLoader className="h-3 w-20" />
        </div>
      </div>
    </div>
  );
}

export function HoroscopeSkeleton() {
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 space-y-4">
      <div className="flex items-center space-x-3 mb-4">
        <SkeletonLoader className="w-8 h-8 rounded-full" />
        <SkeletonLoader className="h-5 w-24" />
      </div>
      <div className="space-y-3">
        <SkeletonLoader className="h-4 w-full" />
        <SkeletonLoader className="h-4 w-5/6" />
        <SkeletonLoader className="h-4 w-4/5" />
        <SkeletonLoader className="h-4 w-3/4" />
      </div>
    </div>
  );
}

export default SkeletonLoader;