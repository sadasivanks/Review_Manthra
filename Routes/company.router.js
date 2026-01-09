import express from "express";
import { createCompany } from "../Controller/company.controller.js";
import { verifyToken } from "../Middleware/auth.middleware.js";

const router = express.Router();
//superadmin can create company
router.post("/createCompany", verifyToken, createCompany);

export default router;
