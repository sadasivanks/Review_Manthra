import { supabase } from "../src/supabaseClient.js";

export const createCompanyQuery = async (params) => {
    const { name, email, phone_number, review_link, business_plan,password,user_type_id,whatsapp_api_key,business_account_id,phone_number_bot } = params;
    const { data, error } = await supabase
        .from("tb_companies")
        .insert([{ name, email, phone_number, review_link, business_plan,password ,user_type_id,whatsapp_api_key,business_account_id,phone_number_bot}])
        .select();

    if (error) {
        if (error.message?.includes("tb_companies_email_key")) {
            throw new Error("Email already exists");
        }
        if (error.message?.includes("tb_companies_review_link_key")) {
            throw new Error("Review link already exists");
        }
        throw new Error(error.message);
    }
    return data[0];
};

export const getCompanyByIdQuery = async (id) => {
    const { data, error } = await supabase
        .from("tb_companies")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        throw new Error(error.message);
    }
    return data;
};
