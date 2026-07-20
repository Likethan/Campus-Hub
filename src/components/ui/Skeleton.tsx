import React from 'react';
import { motion } from 'framer-motion';

export interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => (
  <div className={`animate-pulse bg-slate-200 dark:bg-slate-800 rounded ${className}`} />
);

export const DashboardSkeleton: React.FC = () => (
  <div className="space-y-6">
    {/* Header Skeleton */}
    <Skeleton className="h-36 rounded-ch-lg w-full" />
    {/* KPI Grid */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="p-5 bg-white dark:bg-slate-900 rounded-ch border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex justify-between">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-8 w-8 rounded-lg" />
          </div>
          <Skeleton className="h-7 w-16" />
          <Skeleton className="h-2 w-full rounded-full" />
        </div>
      ))}
    </div>
    {/* Content Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white dark:bg-slate-900 rounded-ch border border-slate-200 dark:border-slate-800 p-6 space-y-4">
          <Skeleton className="h-4 w-40" />
          {[1, 2].map(i => <Skeleton key={i} className="h-20 rounded-ch w-full" />)}
        </div>
      </div>
      <div className="space-y-6">
        <Skeleton className="h-48 rounded-ch w-full" />
        <Skeleton className="h-48 rounded-ch w-full" />
      </div>
    </div>
  </div>
);
