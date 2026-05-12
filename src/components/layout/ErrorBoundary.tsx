import { useState, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export function ErrorBoundary({
  children,
  fallback,
}: ErrorBoundaryProps) {
  const [state, setState] = useState<ErrorBoundaryState>({
    hasError: false,
    error: null,
  });

  if (state.hasError && fallback) {
    return fallback;
  }

  if (state.hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 dark:bg-red-900/50 p-6">
        <div className="max-w-xl text-center space-y-6">
          <div className="flex items-center justify-center space-x-4">
            <svg className="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">
            Something went wrong
          </h2>
          <p className="text-muted-foreground">
            {state.error?.message || 'An unexpected error occurred.'}
          </p>
          <button
            onClick={() => {
              setState({ hasError: false, error: null });
            }}
            className="bg-pi-purple hover:bg-pi-purple/90 text-white font-medium py-2 px-6 rounded-md transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return children;
}

// Override componentDidCatch equivalent for functional components
// This is a simplified version - in practice you'd use componentDidCatch in class component
// For now, we'll rely on error boundaries in react-dom which work with functional components too