import Toast from "@/components/Toast";
import { AppContext, ToastMessage } from "@/types/Types";
import { createContext, ReactNode, useContext, useState } from "react";

export const AppContenxt = createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);
  return (
    <AppContenxt.Provider
      value={{
        showToast: (toastMessage) => {
          setToast(toastMessage);
        },
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
