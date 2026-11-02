import { createClient } from "@supabase/supabase-js";

// Polyfill WebSocket in Node.js 20 server environments for Supabase Realtime support
if (typeof window === "undefined" && typeof globalThis.WebSocket === "undefined") {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const WebSocket = require("ws");
    globalThis.WebSocket = WebSocket;
  } catch {
    // Graceful fallback if ws is not present
  }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-project.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

export const isSupabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && 
  process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://placeholder-project.supabase.co"
);

// Client-side & server-side safe Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: typeof window !== "undefined",
    autoRefreshToken: typeof window !== "undefined",
  },
});

