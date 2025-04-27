import { Router, Request, Response } from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { HotelType } from "../types/Types";
import { Hotel } from "../models/hotels.model";
import verifyToken from "../middlewares/auth.middlewares";
import { body } from "express-validator";

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.post(
  "/my-hotes",
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
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      const newHotel: HotelType = req.body;

      const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        const res = await cloudinary.uploader.upload(dataURI);
        return res.url;
      });

      const imageUrls = await Promise.all(uploadPromises);
      newHotel.imageUrls = imageUrls;
      newHotel.userId = req.userId;
      newHotel.lastUpdated = new Date();

      const hotel = new Hotel(newHotel);
      await hotel.save();

      res.status(201).send(hotel);
    } catch (error) {
      console.log("Error creating hotels:", error);
      res.status(500).json({ message: "Do not create new hotels" });
    }
  }
);

export default router;
