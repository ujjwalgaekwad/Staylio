import mongoose from "mongoose";
import { HotelType } from "../types/Types";

const hotelSchema = new mongoose.Schema<HotelType>(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    adultCount: {
      type: Number,
      required: true,
    },
    childCount: {
      type: Number,
      required: true,
    },
    facilities: [
      {
        type: String,
        required: true,
      },
    ],
    pricePerNight: {
      type: Number,
      required: true,
    },
    starRating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    imageFiles: [
      {
        type: String,
        requred: true,
      },
    ],
    lastUpdated: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export const Hotel = mongoose.model<HotelType>("Hotel", hotelSchema);
