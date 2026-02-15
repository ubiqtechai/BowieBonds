"use client";

import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse bg-sand",
        className
      )}
      {...props}
    />
  );
}

/** Full-width skeleton card mimicking a DropCard */
function DropCardSkeleton() {
  return (
    <div className="border-2 border-sand mb-4 bg-white">
      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-20 bg-sand flex flex-row sm:flex-col items-center justify-center p-3 sm:py-5 gap-2 sm:gap-1">
          <Skeleton className="h-3 w-12 bg-ink-light/20" />
          <Skeleton className="h-8 w-10 bg-ink-light/20" />
        </div>
        <div className="flex-1 px-4 lg:px-5 py-3 lg:py-4">
          <div className="flex justify-between items-start">
            <div>
              <Skeleton className="h-6 w-40 mb-2" />
              <Skeleton className="h-4 w-56" />
            </div>
            <Skeleton className="h-5 w-16" />
          </div>
          <div className="flex gap-5 mt-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i}>
                <Skeleton className="h-2.5 w-8 mb-1" />
                <Skeleton className="h-4 w-14" />
              </div>
            ))}
          </div>
          <Skeleton className="h-2 w-full mt-4" />
        </div>
      </div>
    </div>
  );
}

/** Stats strip skeleton */
function StatsStripSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="flex flex-wrap border-2 border-sand">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`flex-1 min-w-[120px] p-4 ${
            i < count - 1 ? "border-r border-sand" : ""
          }`}
        >
          <Skeleton className="h-2.5 w-12 mb-2" />
          <Skeleton className="h-7 w-20 mb-1" />
          <Skeleton className="h-2.5 w-16" />
        </div>
      ))}
    </div>
  );
}

/** Table skeleton */
function TableSkeleton({ rows = 4, cols = 5 }: { rows?: number; cols?: number }) {
  return (
    <div className="border-2 border-sand bg-white overflow-hidden">
      {/* Header */}
      <div className="flex bg-sand/50 px-4 py-3 gap-4">
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} className="h-3 flex-1 bg-ink-light/15" />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex px-4 py-3 gap-4 border-t border-sand">
          {Array.from({ length: cols }).map((_, c) => (
            <Skeleton key={c} className="h-4 flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}

/** Generic page skeleton */
function PageSkeleton() {
  return (
    <div className="px-4 lg:px-12 py-8 lg:py-10">
      <Skeleton className="h-9 w-48 mb-2" />
      <Skeleton className="h-4 w-72 mb-8" />
      <StatsStripSkeleton />
      <div className="mt-8 space-y-4">
        <DropCardSkeleton />
        <DropCardSkeleton />
      </div>
    </div>
  );
}

export { Skeleton, DropCardSkeleton, StatsStripSkeleton, TableSkeleton, PageSkeleton };
