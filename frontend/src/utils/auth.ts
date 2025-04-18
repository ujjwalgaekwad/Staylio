import { InputForm } from "@/types/Types";
import { apiRoutes } from "./apiRoutes";

export const auth = async (formData: InputForm) => {
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

export const validateToken = async () => {
  const response = await fetch(`${apiRoutes.validateToken}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Invalid token");
  }

  return response.json();
};
