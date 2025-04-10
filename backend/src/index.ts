import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import registerRouter from "./routes/user.routes";
import cookieParser from "cookie-parser";
import { connectDB } from "./db";

connectDB();

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(cookieParser());
app.use("/api/user", registerRouter);

app.get("/", (req, res) => {
  console.log("Response", res.status(200));
});

app.listen(process.env.PORT, () => {
  console.log(`server is running at:${process.env.PORT}`);
});
