import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import { connectDB } from "./db";
import registerRouter from "./routes/user.routes";
import authRouter from "./routes/auth.routes";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import myhotels from "./routes/myHotels.routes";
import searchRoutes from "./routes/hotel.routes";
import oauthRoute from "./routes/oauth.routes";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SCRET_KEY,
});

const BASE_URL = process.env.ORIGIN as string;
connectDB();

const app = express();

app.use(
  cors({
    origin: BASE_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.static(path.join(__dirname, "../../frontend/dist")));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRouter);
app.use("/api/user", registerRouter);
app.use("/api/hotels", myhotels);
app.use("/api", oauthRoute);
app.use("/api/hotelSearch", searchRoutes);

app.listen(process.env.PORT, () => {
  console.log(`server is running at:${process.env.PORT}`);
});
