import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import { HotelType } from "../types/Types";
import { Hotel } from "../models/hotels.model";

const addHotels = async (req: Request, res: Response) => {
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
    newHotel.imageFiles = imageUrls;
    newHotel.userId = req.userId;
    newHotel.lastUpdated = new Date();

    const hotel = new Hotel(newHotel);
    await hotel.save();

    res.status(201).send(hotel);
  } catch (error) {
    console.log("Error creating hotels:", error);
    res.status(500).json({ message: "Do not create new hotels" });
  }
};

const fetchHotels = async (req: Request, res: Response) => {
  try {
    const hotel = await Hotel.find({ userId: req.userId });
    res.json(hotel);
  } catch (error) {
    res.status(500).json({ message: "Faild to fetch hotel data" });
  }
};

const fetchHotelById = async (req: Request, res: Response) => {
  const id = req.params.id.toString();
  try {
    const hotel = await Hotel.findOne({ _id: id, userId: req.userId });
    res.json(hotel);
  } catch (error) {
    res.status(500).json({ message: "Error fetching hotels" });
  }
};
export { addHotels, fetchHotels, fetchHotelById };
