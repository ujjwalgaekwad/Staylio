import { Request, Response } from "express";
import { Hotel } from "../models/hotels.model";
import Stripe from "stripe";
import { BookingType, HotelType } from "../types/Types";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const paymentIntent = async (req: Request, res: Response) => {
  const { numberOfNights } = req.body;
  const hotelId = req.params.hotelId;

  const hotel = await Hotel.findById(hotelId);
  if (!hotel) {
    throw new Error("Hotel not found");
  }

  const totalCost = hotel.pricePerNight * numberOfNights;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalCost * 100,
    currency: "INR",
    metadata: {
      hotelId,
      userId: req.userId,
    },
  });

  if (!paymentIntent.client_secret) {
    throw new Error("Error creating payment intent");
  }

  const response = {
    paymentIntentId: paymentIntent.id,
    clientSecret: paymentIntent.client_secret.toString(),
    totalCost,
  };

  res.json(response);
};

const Bookings = async (req: Request, res: Response) => {
  const paymentIntentId = req.body.paymentIntentId;
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(
      paymentIntentId as string
    );
    if (!paymentIntent) {
      throw new Error("Payment intent not found.");
    }

    if (
      paymentIntent.metadata.hotelId !== req.params.hotelId ||
      paymentIntent.metadata.userId !== req.userId
    ) {
      throw new Error("Payment intent mismatch");
    }

    if (paymentIntent.status !== "succeeded") {
      throw new Error(
        `Status:${paymentIntent.status}, Payment intent status not succeeded.`
      );
    }

    const newBooking: BookingType = {
      ...req.body,
      userId: req.userId,
    };

    const hotel = await Hotel.findByIdAndUpdate(
      { _id: req.params.hotelId },
      { $push: { bookings: newBooking } }
    );

    if (!hotel) {
      throw new Error("Hotel not found");
    }

    await hotel.save();
    res.status(200).send();
  } catch (error) {
    console.log("booking:", error);
    res.status(400).json({ message: "Payment faild" });
  }
};

const BookingsData = async (req: Request, res: Response) => {
  try {
    const hotel = await Hotel.find({
      bookings: { $elemMatch: { userId: req.userId } },
    });

    const results = hotel.map((hotel) => {
      // If bookings are populated objects, filter by userId; otherwise, return as is
      const bookings = Array.isArray(hotel.bookings)
        ? hotel.bookings.filter(
            (booking: any) =>
              booking &&
              typeof booking === "object" &&
              booking.userId == req.userId
          )
        : [];
      const hotelWithUserBookings: HotelType = {
        ...hotel.toObject(),
        bookings: bookings,
      };

      return hotelWithUserBookings;
    });
    res.status(200).send(results);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

export { Bookings, paymentIntent, BookingsData };
