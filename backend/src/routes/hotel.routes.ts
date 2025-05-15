import express from "express";
import {
  fetchHotelDetailById,
  hotelSearch,
} from "../controllers/hotel.controller";
import verifyToken from "../middlewares/auth.middlewares";
import { Bookings, BookingsData, paymentIntent } from "../controllers/booking.controller";

const router = express.Router();

router.get("/search", hotelSearch);

router.get("/detail/:id", fetchHotelDetailById);

router.post("/payment/:hotelId/bookings/payment-intent", verifyToken, paymentIntent);

router.post("/:hotelId/bookings", verifyToken, Bookings);

router.get("/mybookings", verifyToken, BookingsData);

export default router;
 