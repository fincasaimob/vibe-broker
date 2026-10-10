import { createMiddleware } from "@tanstack/react-start";

export const attachSupabaseAuth = createMiddleware().server(async ({ next }) => {
  // Middleware stub for Supabase auth attachment
  // This will be populated with actual Supabase auth logic
  return await next();
});
