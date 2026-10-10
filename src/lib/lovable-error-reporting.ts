export function reportLovableError(error: Error, context?: Record<string, any>) {
  // Log to console in development
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    console.error('Lovable Error Report:', {
      message: error.message,
      stack: error.stack,
      context,
      timestamp: new Date().toISOString(),
    });
  }
  
  // Could send to error tracking service in production
  // e.g., Sentry, LogRocket, etc.
}
