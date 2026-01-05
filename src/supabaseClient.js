import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
console.log(supabaseKey,'supabaseKey')
console.log(supabaseUrl,'supabaseKey')

export const supabase = createClient(supabaseUrl, supabaseKey);






// import { createClient } from "@supabase/supabase-js";
// import 'dotenv'
// const SUPABASE_URL = "https://rzjpfgsvyrhfyeizfeni.supabase.co";
// const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6anBmZ3N2eXJoZnllaXpmZW5pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcyMzc2NTAsImV4cCI6MjA4MjgxMzY1MH0.xXmz3P6vlaYX_Bkwwgi2mQkw2LaVDNX0f2tlnI16O5g";

// // For backend (secure), use SERVICE_ROLE_KEY instead of ANON_KEY
// // const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

// export const supabase = createClient(
//   SUPABASE_URL,
//   SUPABASE_ANON_KEY
// );



