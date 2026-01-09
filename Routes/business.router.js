import express from "express";
import { listBusinessModals } from "../Controller/business.controller.js";

const router = express.Router();
//get normal and premium models for company creation
router.get("/listBusinessModals", listBusinessModals);

export default router;
