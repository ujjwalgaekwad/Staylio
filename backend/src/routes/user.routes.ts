import express, { Request, Response } from "express";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";


const router = express.Router();

router.post("/register",
  [
    check("firstName", "First name is required.").isString(),
    check("lastName", "Last name is required.").isString(),
    check("email", "Please enter a valid email.").isEmail(),
    check("password", "Your password must contain between 4 and 60 characters.").isLength({min: 4, max: 60})
  ],
   async (req: Request, res: Response): Promise<any> => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({message: errors.array()});
    }
  try {
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.status(400).json({ message: "User already exists." });
    }

    user = new User(req.body);
    await user.save();

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "1d" }
    );

    res.cookie("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000,
    });

    return res.status(200).json({ message: "User registered successfully." });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
});

export default router;
