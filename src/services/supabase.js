
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://oxtwjclmiyuglsviklnv.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94dHdqY2xtaXl1Z2xzdmlrbG52Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk5NTI3NTEsImV4cCI6MjAwNTUyODc1MX0.HCJlB94SgkaYjHeXkK0K2fmBPn9gYCiOPjrA0THaOzY";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

