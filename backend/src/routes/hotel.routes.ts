import express from "express";
import { fetchHotelDetailById, hotelSearch } from "../controllers/hotel.controller";

const router = express.Router();

router.get("/search", hotelSearch);

router.get(
  "/detail/:id",
  fetchHotelDetailById
);

export default router;
