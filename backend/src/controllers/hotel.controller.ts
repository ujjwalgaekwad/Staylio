import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import { HotelSearchResponse, HotelType } from "../types/Types";
import { Hotel } from "../models/hotels.model";
import { validationResult } from "express-validator";

const addHotels = async (req: Request, res: Response) => {
  try {
    const imageFiles = req.files as Express.Multer.File[];
    const newHotel: HotelType = req.body;
    console.log("Whole body log:", newHotel);
    const imageUrls = await uploadImages(imageFiles);

    newHotel.imageUrls = imageUrls;
    newHotel.lastUpdated = new Date();
    newHotel.userId = req.userId;

    const hotel = new Hotel(newHotel);
    await hotel.save();

    res.status(201).send(hotel);
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "Error add hotel data",
    });
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
  const query = SearchQuery(req.query);
  let sortOptions = {};

  switch (req.query.sortOption) {
    case "starRating":
      sortOptions = { starRating: -1 };
      break;
    case "pricePerNightAsc":
      sortOptions = { pricePerNight: 1 };
      break;
    case "pricePerNightDesc":
      sortOptions = { pricePerNight: -1 };
      break;
  }

  let pageSize = 5;
  let pageNumber = parseInt(req.query.page ? req.query.page.toString() : "1");
  let skip = (pageNumber - 1) * pageSize;
  try {
    const hotel = await Hotel.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(pageSize);

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

//TODO
const SearchQuery = (queryParams: any) => {
  let constructedQuery: any = {};

  if (queryParams.destination) {
    constructedQuery.$or = [
      { city: new RegExp(queryParams.destination, "i") },
      { country: new RegExp(queryParams.destination, "i") },
    ];
  }

  if (queryParams.adultCount) {
    constructedQuery.adultCount = {
      $gte: parseInt(queryParams.adultCount),
    };
  }

  if (queryParams.childCount) {
    constructedQuery.childCount = {
      $gte: parseInt(queryParams.childCount),
    };
  }

  if (queryParams.facilities) {
    constructedQuery.facilities = {
      $all: Array.isArray(queryParams.facilities)
        ? queryParams.facilities
        : [queryParams.facilities],
    };
  }

  if (queryParams.types) {
    constructedQuery.type = {
      $in: Array.isArray(queryParams.types)
        ? queryParams.types
        : [queryParams.types],
    };
  }

  if (queryParams.stars) {
    const starRatings = Array.isArray(queryParams.stars)
      ? queryParams.stars.map((star: string) => parseInt(star))
      : parseInt(queryParams.stars);

    constructedQuery.starRating = { $in: starRatings };
  }

  if (queryParams.maxPrice) {
    constructedQuery.pricePerNight = {
      $lte: parseInt(queryParams.maxPrice).toString(),
    };
  }
  return constructedQuery;
};

const fetchHotelDetailById = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }

  const id = req.params.id.toString();

  try {
    const hotel = await Hotel.findById(id);
    res.json(hotel);
  } catch (error) {
    console.log("Details hotel by id", error);
    res.status(500).json({ error: "hotel details" });
  }
};

export {
  addHotels,
  fetchHotels,
  fetchHotelById,
  findAndUpdateHotel,
  hotelSearch,
  fetchHotelDetailById,
};
