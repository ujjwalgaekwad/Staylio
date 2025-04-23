import express from "express";
import { check } from "express-validator";
import { auth } from "../controllers/auth.controller";

const router = express.Router();

router.post(
  "/login",
  [
    check("email", "Please enter a valid email.").isEmail(),
    check(
      "password",
      "Your password must contain between 4 and 60 characters."
    ).isLength({ min: 4, max: 60 }),
  ],
  auth
);

export default router;
