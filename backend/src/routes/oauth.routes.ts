import { Router } from "express";
import { authWithGoogle } from "../controllers/auth.controller";

const router = Router();

router.post("/auth/google", authWithGoogle);

export default router;