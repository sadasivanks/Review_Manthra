import express from "express";
import { CustomerDetailsCollect,addEmployee, login, shareReviewLink } from "../Controller/auth.controller.js";
import { verifyToken } from "../Middleware/auth.middleware.js";
const router = express.Router();


router.post("/addEmployee", verifyToken, addEmployee);
router.post("/login", login);
router.post("/sharelink", verifyToken, shareReviewLink);
router.post('/CustomerDetailsCollect',verifyToken,CustomerDetailsCollect)

export default router;
