import { createClient } from '@supabase/supabase-js';

// Use environment variables for production, fallback to hardcoded values for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://rgzwavtriyrxqrbivuyq.supabase.co';
const publicAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJnendhdnRyaXlyeHFyYml2dXlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4ODE1NjEsImV4cCI6MjA4NTQ1NzU2MX0.YhTWK3ldJeQK0RhRxkIsw_twxPmSSg7L4HuBfB3Sk1Y';

export const supabase = createClient(supabaseUrl, publicAnonKey);

export const serverUrl = `${supabaseUrl}/functions/v1/make-server-3b879dec`;
