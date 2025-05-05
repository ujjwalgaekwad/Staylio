import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import { HotelSearchResponse, HotelType } from "../types/Types";
import { Hotel } from "../models/hotels.model";

const addHotels = async (req: Request, res: Response) => {
  try {
    const imageFiles = req.files as Express.Multer.File[];
    const newHotel: HotelType = req.body;

    const imageUrls = await uploadImages(imageFiles);
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

const findAndUpdateHotel = async (req: Request, res: Response) => {
  const updateHotel = req.body;
  updateHotel.lastUpdated = new Date();

  try {
    const hotel = await Hotel.findOneAndUpdate(
      { _id: req.params.hotelId, userId: req.userId },
      updateHotel,
      { new: true }
    );

    if (!hotel) {
      throw new Error("Error fetch and update hotel data");
    }

    const files = req.files as Express.Multer.File[];
    const updatedImagesUrls = await uploadImages(files);

    hotel.imageUrls = [...updatedImagesUrls, ...(updateHotel.imageUrls || [])];

    await hotel.save();
    res.status(201).json(hotel);
  } catch (error) {
    res.status(500).json({ message: "Error fetch and update hotel data" });
  }
};

async function uploadImages(imageFiles: Express.Multer.File[]) {
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString("base64");
    let dataURI = "data:" + image.mimetype + ";base64," + b64;
    const res = await cloudinary.uploader.upload(dataURI);
    return res.url;
  });

  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
}

const hotelSearch = async (req: Request, res: Response) => {
  let pageSize = 5;
  let pageNumber = parseInt(req.query.page ? req.query.page.toString() : "1");
  let skip = (pageNumber - 1) * pageSize;

  try {
    const hotel = await Hotel.find().skip(skip).limit(pageSize);

    const total = await Hotel.countDocuments();

    const response: HotelSearchResponse = {
      data: hotel,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
      },
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ message: "Hotel search error" });
  }
};

export {
  addHotels,
  fetchHotels,
  fetchHotelById,
  findAndUpdateHotel,
  hotelSearch,
};
