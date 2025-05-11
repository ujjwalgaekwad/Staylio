import { Router } from "express";
import verifyToken from "../middlewares/auth.middlewares";
import { body } from "express-validator";
import {
  addHotels,
  fetchHotelById,
  fetchHotels,
  findAndUpdateHotel,
} from "../controllers/hotel.controller";
import { upload } from "../middlewares/multer.middlewares";

const router = Router();

router.post(
  "/my-hotels",
  verifyToken,
  [
    body("name").notEmpty().withMessage("Name is required."),
    body("city").notEmpty().withMessage("city is required."),
    body("country").notEmpty().withMessage("Country is required."),
    body("description").notEmpty().withMessage("Description is required."),
    body("type").notEmpty().withMessage("Hotel type is required."),
    body("pricePerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("Price per night is required and must be a number"),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("Facilities are required."),
  ],
  upload.array("imageFiles", 6),
  addHotels
);

router.get("/my-hotels", verifyToken, fetchHotels);

router.get("/my-hotels/:id", verifyToken, fetchHotelById);

router.put(
  "/my-hotels/:hotelId",
  verifyToken,
  upload.array("imageFiles"),
  findAndUpdateHotel
);

export default router;
