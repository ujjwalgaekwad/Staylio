import { Router } from "express";
import { authWithGoogle } from "../controllers/auth.controller";
import verifyToken from "../middlewares/auth.middlewares";

const router = Router();

router.post("/auth/google", verifyToken, authWithGoogle);

export default router;