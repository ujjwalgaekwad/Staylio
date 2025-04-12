import { InputForm } from "@/types/Types";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const auth = async (formData: InputForm) => {
  const response = await fetch(`${API_BASE_URL}/api/user/register`, {
    method: "POST",
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
