import express from "express";
import { createUserDetails, updateUserDetails, login_info, loginWithEmailPassword, logoutUser,addReviewUsers } from "../Controller/user.controller.js";
import { getEmployeeDashboard } from "../Controller/employee.controller.js";
import { verifyToken, isEmployee } from "../Middleware/auth.middleware.js";

const router = express.Router();
//api for logion based on email and password
router.post("/login", loginWithEmailPassword);
//api for logout
router.post("/logoutUser", logoutUser);
//api for add user reviews
router.post("/addReviewUsers",addReviewUsers);


router.post("/createUserDetails", createUserDetails);
router.post("/updateUserDetails", updateUserDetails);
router.post("/login_info", login_info);
router.get("/employeedashboard", verifyToken, isEmployee, getEmployeeDashboard);

export default router;
