export function LoadingFallback({ 
  type = 'grid', 
  count = 4 
}: { 
  type?: 'grid' | 'list' | 'skeleton' | 'product-card';
  count?: number; 
}) {
  if (type === 'grid') {
    return (
      <div className="grid gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="bg-muted/50 rounded-xl h-64">
            <Shimmer />
          </div>
        ))}
      </div>
    );
  }

  if (type === 'list') {
    return (
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="flex items-center space-x-4 bg-muted/50 px-4 py-3 rounded-lg">
            <Shimmer className="w-12 h-12 rounded-full" />
            <div className="flex-1 space-y-1">
              <Shimmer className="h-3 w-3/4 rounded" />
              <Shimmer className="h-2.5 w-1/2 rounded" />
              <Shimmer className="h-2 w-1/3 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'product-card') {
    return (
      <div className="bg-muted/50 rounded-xl p-6">
        <div className="space-y-4">
          <div className="h-20">
            <Shimmer className="h-full w-full rounded-xl" />
          </div>
          <h3 className="text-lg font-medium">
            <Shimmer className="h-4 w-3/4 rounded" />
          </h3>
          <p className="text-muted-foreground">
            <Shimmer className="h-3 w-1/2 rounded" />
          </p>
          <div className="flex items-baseline space-x-3 mt-2">
            <Shimmer className="h-3 w-1/3 rounded" />
            <Shimmer className="h-3 w-1/4 rounded" />
          </div>
        </div>
      </div>
    );
  }

  // Default skeleton
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="h-4 w-3/4 rounded bg-muted/50">
          <Shimmer />
        </div>
      ))}
    </div>
  );
}

function Shimmer({ className = '' }: { className?: string } = {}) {
  return (
    <div 
      className={`animate-pulse bg-gradient-to-r from-muted/30 via-muted/50 to-muted/30 bg-[length:200%_100%] ${className}`} 
    />
  );
}