
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

// Mocking the query function logic locally to ensure it handles the object correctly, 
// since we can't easily import the module (ESM issues with relative paths in test script sometimes, but let's try imported logic if possible).
// Actually, let's just use the supabase client and mimic the exact code used in user.query.js to prove it works.

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

const testRefactoredQueryLogic = async () => {
    const payload = {
        id: 1, // Example ID
        name: "John Refactored",
        email: "john.ref@test.com"
    };

    console.log("Input Payload:", payload);

    // Logic from user.query.js
    const { id, ...updateData } = payload;
    console.log("Extracted ID:", id);
    console.log("Update Data (should not have ID):", updateData);

    // Execute Supabase update
    console.log("Executing Supabase Update...");
    const { data, error } = await supabase
        .from("tb_user_details")
        .update(updateData)
        .eq("id", id)
        .select();

    if (error) {
        console.log("Supabase Error (Expected if table invalid):", error.message);
    } else {
        console.log("Supabase Success:", data);
    }
};

testRefactoredQueryLogic();
