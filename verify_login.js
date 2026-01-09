
// import 'dotenv/config';
// import { findUserByIdAndCompany } from './Query/user.query.js';
// import { createClient } from '@supabase/supabase-js';

// // Setup Supabase
// const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// const testLoginLogic = async () => {
//     console.log("--- Testing Login Logic ---");

//     const companyName = "TestLoginCorp";
//     const email = "login_automock@test.com";

//     // Cleanup previous run if exists
//     await supabase.from('tb_user_details').delete().eq('email', email);

//     // 1. Create User (Let DB assign ID)
//     const { data, error } = await supabase.from('tb_user_details').insert([{
//         company_name: companyName,
//         email: email
//     }]).select();

//     if (error) {
//         console.log("Setup failed:", error);
//         return;
//     }

//     const userId = data[0].id; // Get generated ID
//     console.log(`User created: ID=${userId}, Company=${companyName}`);

//     // 2. Test Success Case
//     // Login String = CompanyName + ID
//     const loginId = companyName + userId;
//     console.log("Testing Correct Login ID: " + loginId);

//     // Mimic the Controller Logic regex
//     const match = loginId.match(/^(.*?)(\d+)$/);
//     if (match) {
//         const name = match[1];
//         const id = match[2];
//         console.log(`Parsed -> Name: ${name}, ID: ${id}`);

//         const user = await findUserByIdAndCompany(id, name);
//         console.log("Found User:", user ? "YES (Success)" : "NO (Failure)");
//         if (user) console.log("User Email:", user.email);

//     } else {
//         console.log("Regex failed");
//     }

//     // 3. Test Failure Case
//     console.log("Testing Wrong Company Name: WrongCorp" + userId);
//     const user2 = await findUserByIdAndCompany(userId, "WrongCorp");
//     console.log("Found User (Should be NO):", user2 ? "YES" : "NO");

//     // Cleanup
//     await supabase.from('tb_user_details').delete().eq('email', email);
// };

// testLoginLogic();
