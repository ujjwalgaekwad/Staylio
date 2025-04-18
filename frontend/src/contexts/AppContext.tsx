import { createContext, ReactNode, useContext, useState } from "react";
import Toast from "@/components/Toast";
import { AppContext, ToastMessage } from "@/types/Types";
import { useQuery } from "@tanstack/react-query";
import * as auth from "../utils/auth";

export const AppContenxt = createContext<AppContext | undefined>(undefined);

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
        isLoggedIn: !isError
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
