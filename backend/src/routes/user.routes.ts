import express, { Request, Response } from "express";
import { check } from "express-validator";
import verifyToken from "../middlewares/auth.middlewares";
import { register } from "../controllers/auth.controller";

const router = express.Router();

router.post(
  "/register",
  [
    check("firstName", "First name is required.").isString(),
    check("lastName", "Last name is required.").isString(),
    check("email", "Please enter a valid email.").isEmail(),
    check(
      "password",
      "Your password must contain between 4 and 60 characters."
    ).isLength({ min: 4, max: 60 }),
  ],
  register
);

router.get("/validate-token", verifyToken, (req: Request, res: Response) => {
  res.status(200).send({ userId: req.userId });
});

router.post("/logout", (req: Request, res: Response) => {
  res.cookie("authToken", "", {
    expires: new Date(0),
  });
  res.send();
});

export default router;
