export function LoadingFallback({
  type = 'grid',
  count = 4
}: {
  type?: 'grid' | 'list' | 'skeleton' | 'product-card';
  count?: number;
}) {
  if (type === 'grid') {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="glass-card rounded-2xl border border-white/5 overflow-hidden">
            <Shimmer className="h-48 w-full" />
            <div className="p-4 space-y-3">
              <Shimmer className="h-4 w-3/4 rounded-lg" />
              <Shimmer className="h-3 w-1/2 rounded-lg" />
              <div className="flex justify-between">
                <Shimmer className="h-6 w-1/3 rounded-lg" />
                <Shimmer className="h-6 w-1/4 rounded-lg" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'list') {
    return (
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="flex items-center space-x-4 glass-card px-4 py-3 rounded-xl border border-white/5">
            <Shimmer className="w-12 h-12 rounded-full flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <Shimmer className="h-3 w-3/4 rounded-lg" />
              <Shimmer className="h-2.5 w-1/2 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'product-card') {
    return (
      <div className="glass-card rounded-2xl border border-white/5 p-6">
        <Shimmer className="h-64 w-full rounded-xl mb-6" />
        <div className="space-y-3">
          <Shimmer className="h-5 w-3/4 rounded-lg" />
          <Shimmer className="h-4 w-full rounded-lg" />
          <Shimmer className="h-4 w-2/3 rounded-lg" />
          <div className="flex items-center gap-3 mt-2">
            <Shimmer className="h-8 w-1/3 rounded-lg" />
            <Shimmer className="h-8 w-1/4 rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i}>
          <Shimmer className="h-4 w-3/4 rounded-lg" />
        </div>
      ))}
    </div>
  );
}

function Shimmer({ className = '' }: { className?: string } = {}) {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-white/3 via-white/7 to-white/3 bg-[length:200%_100%] ${className}`}
    />
  );
}
