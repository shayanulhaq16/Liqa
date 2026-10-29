const PROJECT_URL = "https://amhspuwbdtlfdkdbzxvd.supabase.co";
const ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtaHNwdXdiZHRsZmRrZGJ6eHZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMyNDE5MjMsImV4cCI6MjEwODgxNzkyM30.bsb2vTMH0uxYSWUL1NeRTxute8IUJCbLxz36b_h05WQ";



const supabase = window.supabase.createClient(PROJECT_URL, ANON_KEY);

export default supabase;