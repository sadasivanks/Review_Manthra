import express from "express";
import {  AdminloginWithEmailPassword,login_info, loginWithEmailPassword, logoutUser,addReviewUsers } from "../Controller/user.controller.js";
import { verifyToken, isEmployee } from "../Middleware/auth.middleware.js";

const router = express.Router();
//api for login based on email and password , and pass token and usertyoe also
router.post("/login", loginWithEmailPassword);
router.post("/admin-login",AdminloginWithEmailPassword);
//api for logout
router.post("/logoutUser", logoutUser);
//api for add user reviews
router.post("/addReviewUsers",addReviewUsers);



router.post("/login_info", login_info); //uid base login api


export default router;
