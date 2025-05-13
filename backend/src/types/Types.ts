export type UserType = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type HotelType = {
  _id: string;
  userId: string;
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imageUrls: string[];
  lastUpdated: Date;
  bookings: string[];
};

export type BookingType = {
  fistName: string;
  lastName: string;
  email: string;
  checkIn: Date;
  checkOut: Date;
  adultCount: Number;
  childCount: Number;
  userId: string;
  totalCost: Number;
};

export interface HotelSearchResponse {
  data: HotelType[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
}

export interface PaymentIntentResponse {
  paymentIntent: string;
  clientSecret: string;
  totalCost: number;
}
