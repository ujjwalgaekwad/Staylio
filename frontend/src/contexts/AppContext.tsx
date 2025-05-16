import { createContext, ReactNode, useContext, useState } from "react";
import Toast from "@/components/Toast";
import { AppContext, ToastMessage } from "@/types/Types";
import { useQuery } from "@tanstack/react-query";
import * as auth from "../utils/api";
import { loadStripe } from "@stripe/stripe-js";

export const AppContenxt = createContext<AppContext | undefined>(undefined);
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_SCRET_KEY || "");

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);

  const { isError } = useQuery({
    queryKey: ["validateToken"],
    queryFn: auth.validateToken,
    retry: false,
  });

  // const showToast = (toastMessage: ToastMessage) => {
  //   setToast(toastMessage);
  // }
  return (
    <AppContenxt.Provider
      value={{
        showToast: (toastMessage) => {
          setToast(toastMessage);
        },
        isLoggedIn: !isError,
        stripePromise
      }}
    >
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type === "Success" ? "SUCCESS" : "ERROR"}
          onClose={() => setToast(undefined)}
        />
      )}
      {children}
    </AppContenxt.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContenxt);
  return context as AppContext;
};
