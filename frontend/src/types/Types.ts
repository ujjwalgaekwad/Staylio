export type InputForm = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    register?: object
}

export type ToastMessage = {
    message: string;
    type: "Success" | "Error"
}

export type AppContext = {
    showToast: (toastMessage: ToastMessage) => void;
    // isLoggedIn: boolean;
}


export type ToastProps = {
    message: string;
    type: "SUCCESS" | "ERROR";
    onClose: () => void;
}