import express from "express";
import { hotelSearch } from "../controllers/hotel.controller";

const router = express.Router();

router.get("/", hotelSearch);

export default router;
