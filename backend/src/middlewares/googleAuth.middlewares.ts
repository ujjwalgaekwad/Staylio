import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: {};
    }
  }
}

function authMiddlewares(req: Request, res: Response, next: NextFunction) {
  const authHeaders = req.headers.authorization;

  if (!authHeaders?.startsWith("Bearer ")) {
    res.status(401).json({ message: "Token missing" });
  }

  const token = authHeaders?.split(" ")[0];
  try {
    const decoded = jwt.verify(
      token as string,
      process.env.JWT_SECRET_KEY as string
    );
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
}

export default authMiddlewares;