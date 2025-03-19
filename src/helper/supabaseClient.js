import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://tnyghnfcfznjprvhzeag.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRueWdobmZjZnpuanBydmh6ZWFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyMTA1MDgsImV4cCI6MjA1Nzc4NjUwOH0.fhTMtK2y_C0tn_YugWAjn10aamwdALNCQA5gEanJsAc";

const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;
