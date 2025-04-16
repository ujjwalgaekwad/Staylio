import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import { connectDB } from "./db";
import registerRouter from "./routes/user.routes";
import authRouter from "./routes/auth.routes";

connectDB();

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true}));
app.use("/api/auth", authRouter);
app.use("/api/user", registerRouter);



app.listen(process.env.PORT, () => {
  console.log(`server is running at:${process.env.PORT}`);
});
