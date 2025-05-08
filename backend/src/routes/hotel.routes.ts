import express from "express";
import { hotelSearch } from "../controllers/hotel.controller";

const router = express.Router();

router.get("/search", hotelSearch);

export default router;
