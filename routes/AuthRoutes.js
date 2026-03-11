import express from "express";
import { loginTeam } from "../controllers/AuthController.js";

const router = express.Router();

router.post("/login", loginTeam);

export default router;