import express from "express";
import dotenv from "dotenv";
import userRouter from "../Routes/user.router.js";
import businessRouter from "../Routes/business.router.js";
import companyRouter from "../Routes/company.router.js";
import authRouter from "../Routes/auth.router.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/auth", userRouter); // Old users route, keeping for reference if needed
app.use("/api/auth", authRouter);
app.use("/api/auth", businessRouter);
app.use("/api/auth", companyRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});







// console.log('hellooo')

// import { supabase } from "./supabaseClient.js";

// async function getUsers() {
//   const { data1,error1 } = await supabase
//   .from('users')
//   .insert([{ id: 1, name: 'Mordor' }]);
//   if (error1) console.error(error1);
// else console.log(data1);
//   const { data, error } = await supabase
//     .from("users")
//     .select("*");

//   if (error) {
//     console.error("Error:", error.message);
//     return;
//   }

//   console.log("Users:", data);
// }

// getUsers();
