import { supabase } from "../src/supabaseClient.js";


export const createUserQuery = async (params) => {
    const { name, email, password, phone_number, user_type_id, company_id } = params;
    console.log(params,'paramsparams')
    const { data, error } = await supabase
        .from("tb_users")
        .insert([{ name, email, password, phone_number, user_type_id, company_id }])
        .select()
        .single();

    if (error) {
        if (error.code === "23505" || error.message?.includes("tb_users_email_key")) {
            throw new Error("Email already exists");
        }
            if (error.message?.includes("tb_companies_review_link_key")) {
           throw new Error("Review link already exists");
    }

        throw new Error(error.message);
    }
    return data;
};
export const createCompanyEmployeeQuery = async (company_id, user_id) => {
    const { data, error } = await supabase
        .from("tb_company_employees")
        .insert([{ company_id, user_id }])
        .select();

    if (error) {
        throw new Error(error.message);
    }
    return data[0];
};

export const findUserByEmailQuery = async (email) => {
    const { data, error } = await supabase
        .from("tb_users")
        .select(`
      *,
      tb_user_types (type),
      tb_companies (name)
    `)
        .eq("email", email)
        .single(); // Use single() if we expect one, but maybe check if null?

    if (error) { // PGRST116 is acceptable for "not found" if using single() sometimes, but maybe() is safer
        // data is null if not found with maybeSingle()
        // actually supabase-js v2: .maybeSingle() returns data=null if no rows.
        // .single() throws error if no rows.
        // I'll use maybeSingle to be safe
        throw new Error(error.message);
    }
    return data;
};

// Safer version of findUserByEmail
export const findUserByEmailSafe = async (email) => {
    const { data, error } = await supabase
        .from("tb_users")
        .select(`
        *,
        tb_user_types (type),
        tb_companies (name)
      `)
        .eq("email", email)
        .maybeSingle();

    if (error) {
        throw new Error(error.message);
    }
    return data;
};

export const getUserTypeByNameQuery = async (typeName) => {
  console.log(typeName, 'typeNametypeName');

  const { data, error } = await supabase
    .from("tb_user_types")
    .select("id")
    .eq("user_type", typeName)   // ✅ correct column
    .maybeSingle();              // safer than single()

  if (error || !data) {
    throw new Error("User type not found");
  }

  console.log(data, 'user type data');
  return data;
};




export const addReviewUsersQuery = async (params) => {
    const { name, email, phone_number, user_type_id } = params;
    console.log(params,'paramsparams')
    const { data, error } = await supabase
        .from("tb_users")
        .insert([{ name, email, phone_number, user_type_id }])
        .select()
        .single();

    if (error) {
        if (error.code === "23505" || error.message?.includes("tb_users_email_key")) {
            throw new Error("Email already exists");
        }
  

        throw new Error(error.message);
    }
    return data;
};
