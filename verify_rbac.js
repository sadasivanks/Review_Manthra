
// import 'dotenv/config';
// import { createClient } from '@supabase/supabase-js';
// import { checkUserRole, createCompanyQuery } from './Query/user.query.js';

// // Setup Supabase
// const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// const verifyRBAC = async () => {
//     console.log("--- Starting RBAC Verification ---");

//     // 1. Setup Test Users
//     const superAdminId = 999;
//     const normalUserId = 888;

//     // Cleanup first to avoid duplicates
//     await supabase.from('tb_user_details').delete().in('id', [superAdminId, normalUserId]);

//     console.log("Creating Test Users...");
//     // Insert SuperAdmin
//     const { error: err1 } = await supabase.from('tb_user_details').insert([{
//         id: superAdminId,
//         first_name: "Super",
//         user_type_id: 1 // SuperAdmin
//     }]);

//     // Insert Normal User
//     const { error: err2 } = await supabase.from('tb_user_details').insert([{
//         id: normalUserId,
//         first_name: "Normal",
//         user_type_id: 4 // User
//     }]);

//     if (err1 || err2) {
//         console.error("Setup Failed - Check if tb_user_details exists and has user_type_id column");
//         console.error("Error 1:", err1);
//         console.error("Error 2:", err2);
//         // If insert fails, we can't fully test checkUserRole against real DB unless we find existing users.
//         return;
//     }

//     // 2. Test checkUserRole
//     console.log("Testing checkUserRole...");
//     try {
//         const role1 = await checkUserRole(superAdminId);
//         console.log(`SuperAdmin (ID ${superAdminId}) Role:`, role1); // Expect { user_type_id: 1 }

//         const role2 = await checkUserRole(normalUserId);
//         console.log(`Normal User (ID ${normalUserId}) Role:`, role2); // Expect { user_type_id: 4 }
//     } catch (e) {
//         console.error("checkUserRole failed:", e);
//     }

//     // 3. Test createCompanyQuery (Only if SuperAdmin)
//     console.log("Testing createCompanyQuery...");
//     const companyPayload = {
//         company_name: "Test Corp",
//         address: "123 Cloud St"
//     };

//     try {
//         // Logic check: Controller would prevent this for normal user
//         // We will just test that the query works for valid inputs
//         const company = await createCompanyQuery(companyPayload);
//         console.log("Company Created:", company);
//     } catch (e) {
//         console.error("createCompanyQuery failed:", e);
//         console.log("NOTE: This might fail if tb_company_details does not exist.");
//     }

//     // Cleanup
//     await supabase.from('tb_user_details').delete().in('id', [superAdminId, normalUserId]);
// };

// verifyRBAC();
