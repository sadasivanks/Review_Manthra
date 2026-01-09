
// import 'dotenv/config';
// import { createClient } from '@supabase/supabase-js';
// import { checkUserRole } from './Query/user.query.js';

// const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// const verifyFix = async () => {
//     console.log("-- Testing checkUserRole with non-existent ID --");
//     // ID 99999 likely doesn't exist
//     try {
//         const result = await checkUserRole(99999);
//         console.log("Result (Should be null or empty, NOT error):", result);

//         if (result === null) {
//             console.log("SUCCESS: Gracefully handled missing user.");
//         } else {
//             console.log("Received result:", result);
//         }
//     } catch (e) {
//         console.error("FAILURE: Still threw error:", e);
//     }
// };

// verifyFix();
