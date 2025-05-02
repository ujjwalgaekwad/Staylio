import { HotelType, RegisterFormData, SignInFormData } from "@/types/Types";
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
