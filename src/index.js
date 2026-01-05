import express from "express";
import dotenv from "dotenv";
import userRouter from "../Routes/user.router.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/users", userRouter);

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
