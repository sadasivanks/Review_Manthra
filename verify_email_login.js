
// import 'dotenv/config';
// import bcrypt from 'bcrypt';
// import { createClient } from '@supabase/supabase-js';
// import fetch from 'node-fetch'; // if needed, or stick to native

// const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
// const BASE_URL = 'http://localhost:7001/api/users';

// const verifyEmailLogin = async () => {
//     console.log("--- Testing Email/Password Login ---");

//     const email = "test_bcrypt@example.com";
//     const password = "Password123!"; // Plain text

//     // 1. Hash Password
//     const hashedPassword = await bcrypt.hash(password, 10);
//     console.log(`Hashing password... ${hashedPassword.substring(0, 10)}...`);

//     // 2. Setup User in DB (Manually inserting for test)
//     // Cleanup first
//     await supabase.from('tb_user_details').delete().eq('email', email);

//     const { data: user, error } = await supabase.from('tb_user_details').insert([{
//         email: email,
//         password: hashedPassword, // Storing HASH
//         user_type_id: 3 // Employee
//     }]).select().single();

//     if (error) {
//         console.error("Setup Failed:", error);
//         return;
//     }
//     console.log(`User created: ID=${user.id}`);


//     // 3. Test Successful Login
//     console.log("\n1. Testing Correct Password:");
//     try {
//         const res = await fetch(`${BASE_URL}/login-with-password`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ email, password })
//         });
//         const json = await res.json();
//         console.log(`Status: ${res.status}`);
//         if (res.status === 200 && json.success) console.log("SUCCESS: Login successful.");
//         else console.log("FAILURE: Login failed", json);

//     } catch (e) { console.error("Req Error:", e); }


//     // 4. Test Incorrect Password
//     console.log("\n2. Testing Incorrect Password:");
//     try {
//         const res = await fetch(`${BASE_URL}/login-with-password`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ email, password: "WrongPassword" })
//         });
//         const json = await res.json();
//         console.log(`Status: ${res.status}`);
//         if (res.status === 401) console.log("SUCCESS: Blocked invalid password.");
//         else console.log("FAILURE: Should have been 401", json);

//     } catch (e) { console.error("Req Error:", e); }

//     // Cleanup
//     await supabase.from('tb_user_details').delete().eq('email', email);
// };

// verifyEmailLogin();
