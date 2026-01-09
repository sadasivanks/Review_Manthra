import { supabase } from "../src/supabaseClient.js";

export const createReviewRecordQuery = async (params) => {
    const { company_id, cust_name, email, phone, employee_id } = params;

    // We insert a record into tb_review to track that a link has been shared.
    // The review_text remains null/empty until the customer actually provides a review.
    // 'employee_id' tracks who shared the link.
    const { data, error } = await supabase
        .from("tb_review")
        .insert([{
            company_id,
            cust_name,
            email,
            phone,
            emp_id: employee_id, // Tracking who shared
            review_text: null // Placeholder for customer input
        }])
        .select()
        .single();

    if (error) {
        throw new Error(error.message);
    }
    return data;
};
