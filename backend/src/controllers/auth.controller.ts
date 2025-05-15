import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const auth = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ message: errors.array() });
    return;
  }

  const { email, password } = req.body;

  if ([email, password].some((field) => field?.trim() === "")) {
    throw new Error("All fields are required.");
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Invalid User" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid Password" });
      return;
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    res.status(200).json({ userId: user._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Invalid Credentials" });
  }
};

const register = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ message: errors.array() });
    return;
  }
  try {
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      res.status(400).json({ message: "User already exists." });
      return;
    }

    user = new User(req.body);
    await user.save();

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "1d" }
    );

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000,
    });

    res.status(200).json({ message: "User registered successfully." });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const fetchCurrentUser = async (req: Request, res: Response) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.log("User not found", error);
    res.status(500).json({ message: "User not found" });
  }
};

export { auth, register, fetchCurrentUser };
