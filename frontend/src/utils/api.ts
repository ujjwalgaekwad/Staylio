import axios from "axios";
import {
  BookingFormData,
  HotelSearchResponse,
  HotelType,
  PaymentIntentResponse,
  RegisterFormData,
  SearchHotels,
  SignInFormData,
  UserType,
} from "@/types/Types";
import { apiRoutes } from "./apiRoutes";

export const auth = async (formData: RegisterFormData) => {
  const response = await fetch(`${apiRoutes.register}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const signIn = async (formData: SignInFormData) => {
  const response = await fetch(`${apiRoutes.signIn}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }
  return body;
};

export const validateToken = async () => {
  const response = await fetch(`${apiRoutes.validateToken}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Invalid token");
  }

  return response.json();
};

export const logout = async () => {
  const response = await fetch(`${apiRoutes.logout}`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error during logout");
  }
};

export const fetchCurrentUser = async (): Promise<UserType> => {
  const response = await fetch(`${apiRoutes.getCurrentUser}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("User not found");
  }

  return response.json();
};

export const addHotelData = async (HotelFormData: FormData) => {
  const response = await fetch(`${apiRoutes.Hotels}`, {
    method: "POST",
    credentials: "include",
    body: HotelFormData,
  });

  if (!response.ok) {
    throw new Error("Add hotel data faild.");
  }

  return await response.json();
};

export const fetchHotels = async (): Promise<HotelType[]> => {
  const response = await fetch(`${apiRoutes.Hotels}`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching data");
  }

  return response.json();
};

export const fetchHotelById = async (hotelId: String): Promise<HotelType> => {
  const response = await fetch(`${apiRoutes.Hotels}/${hotelId}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching data by id");
  }

  return response.json();
};

export const UpdatHotelById = async (hotelFormData: FormData) => {
  const response = await fetch(
    `${apiRoutes.Hotels}/${hotelFormData.get("hotelId")}`,
    {
      method: "PUT",
      credentials: "include",
      body: hotelFormData,
    }
  );

  if (!response.ok) {
    throw new Error("Error update data by id");
  }

  return response.json();
};

export const searchHotels = async (
  searchParam: SearchHotels
): Promise<HotelSearchResponse> => {
  const queryParams = new URLSearchParams();
  queryParams.append("destination", searchParam.destination || "");
  queryParams.append("checkIn", searchParam.checkIn || "");
  queryParams.append("checkOut", searchParam.checkOut || "");
  queryParams.append("adultCount", searchParam.adultCount || "");
  queryParams.append("childCount", searchParam.childCount || "");
  queryParams.append("page", searchParam.page || "");
  queryParams.append("maxPrice", searchParam.maxPrice || "");
  queryParams.append("sortOption", searchParam.sortOption || "");

  searchParam.facilities?.forEach((facility) =>
    queryParams.append("facilities", facility)
  );

  searchParam.types?.forEach((type) => queryParams.append("types", type));

  searchParam.stars?.forEach((star) => queryParams.append("stars", star));

  const response = await fetch(
    `${apiRoutes.searchHotels}/search?${queryParams}`
  );

  if (!response.ok) {
    throw new Error("Search hotel data not found");
  }

  return response.json();
};

export const hotelDetailById = async (hotelId: string): Promise<HotelType> => {
  const response = await fetch(`${apiRoutes.searchHotels}/detail/${hotelId}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("fetch hotel data by id faild");
  }

  return response.json();
};

export const createPaymentIntent = async (
  hotelId: string,
  numberOfNights: string
): Promise<PaymentIntentResponse> => {
  const response = await fetch(
    `${apiRoutes.searchHotels}/payment/${hotelId}/bookings/payment-intent`,
    {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ numberOfNights }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Error in create payment intent");
  }

  return response.json();
};

export const createBooking = async (
  formData: BookingFormData
): Promise<PaymentIntentResponse> => {
  const response = await fetch(
    `${apiRoutes.searchHotels}/${formData.hotelId}/bookings`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );

  if (!response.ok) {
    throw new Error("Booking faild");
  }

  return response.json();
};

export const myBookingData = async () => {
  const response = await fetch(`${apiRoutes.searchHotels}/mybookings`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Booking data not found");
  }

  return response.json();
};

export const SignInWithGoogle = async (credentialReponse: any) => {
  try {
    const response = await axios.post(
      `${apiRoutes.google}`,
      JSON.stringify({ token: credentialReponse.credentials }),
      {
        headers: {
          "Content-Type": "application/json"
        },
      }
    );

    if(!response.data){
      throw new Error("Data not found");
    }

    return response.data;
  } catch (error) {
    console.log("Google signin error:", error);
  }
};
