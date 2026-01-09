import { supabase } from "../src/supabaseClient.js";

export const createUserQuery = async (payload) => {
  const { data, error } = await supabase
    .from("tb_user_details")
    .insert([payload])
    .select(); // <-- this will return the inserted row

  if (error) {
    if (
      error.message?.includes("tb_user_details_email_key") ||
      error.code === "23505" // PostgreSQL unique violation
    ) {
      throw new Error("Email already exists");
    }
    console.error("Supabase Insert Error:", error);
    throw new Error(error.message);
  }

  return data[0]; // return the inserted row
};

// export const updateUserQuery = async (payload) => {
//   const { id, ...updateData } = payload;
//   const { data, error } = await supabase
//     .from("tb_user_details")
//     .update(updateData)
//     .eq("id", id)
//     .select();

//   if (error) {
//     console.error("Supabase Update Error:", error);
//     throw new Error(error.message);
//   }

//   return data[0];
// };

export const checkUserRole = async (userId) => {
  const { data, error } = await supabase
    .from("tb_user_details")
    .select("user_type_id")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    console.error("Check Role Error:", error);
    throw new Error(error.message);
  }
  console.log(data, 'datatata')
  return data;
};

export const createCompanyQuery = async (payload) => {
  const { data, error } = await supabase
    .from("tb_user_details")
    .insert([payload])
    .select();

  if (error) {
    console.error("Company Creation Error:", error);
    throw new Error(error.message);
  }
  return data[0];
};



export const findUserByIdAndCompany = async (id, companyName) => {
  const { data, error } = await supabase
    .from("tb_user_details")
    .select(`
      id,
      company_name,
      user_type_id,
      tb_user_types (
        id,
        user_type
      )
    `)
    .eq("id", id)
    .ilike("company_name", companyName)
    .maybeSingle();

  if (error) {
    console.error("Find User Error:", error);
    throw new Error(error.message);
  }

  return data;
};


export const findUserByEmail = async (email) => {
  const { data, error } = await supabase
    .from("tb_users")
    .select(`
      *,
      tb_user_types (
        user_type
      )
    `)
    .eq("email", email)
    .maybeSingle();

  if (error) {
    console.error("Find User By Email Error:", error);
    throw new Error(error.message);
  }
  return data;
};


export const AdminfindUserByEmail = async (email) => {
  const { data, error } = await supabase
    .from("tb_companies")
    .select(`
      *,
      tb_user_types (
        user_type
      )
    `)
    .eq("email", email)
    .maybeSingle();

  if (error) {
    console.error("Find User By Email Error:", error);
    throw new Error(error.message);
  }
  return data;
};




export const logoutUserQuery = async (userId) => {
  const { data, error } = await supabase
    .from("tb_user_details")
    .select("id")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    console.error("Logout Query Error:", error);
    throw new Error(error.message);
  }
  return data;
};
