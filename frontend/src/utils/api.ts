import {
  HotelSearchResponse,
  HotelType,
  RegisterFormData,
  SearchHotels,
  SignInFormData,
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
