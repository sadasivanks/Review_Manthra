import { supabase } from "../src/supabaseClient.js";



export const getBusinessPlansQuery = async () => {
    const { data, error } = await supabase
        .from("tb_business_modals")
        .select("*");

    if (error) {
        throw new Error(error.message);
    }
    return data;
};
