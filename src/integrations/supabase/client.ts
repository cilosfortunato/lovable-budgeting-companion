import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://nzpgaodkcxygnedwgwso.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im56cGdhb2RrY3h5Z25lZHdnd3NvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQxNjY4NjcsImV4cCI6MjA0OTc0Mjg2N30.ycpRTfo3HF2ZSaH5zs3Y7vjSO7lnL4j386H8KYQPfIE";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);