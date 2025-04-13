import { ToastProps } from "@/types/Types";
import { useEffect } from "react";

function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  const style =
    type === "SUCCESS"
      ? "fixed bottom-4 right-4 z-1 p-4 px-8 rounded-md bg-green-600 text-white max-w-md"
      : "fixed bottom-4 right-4 z-1 p-4 px-8 rounded-md bg-red-600 text-white max-w-md";

  return (
    <div className={style}>
      <div className="flex justify-center items-center">
        <span className="text-sm font-semibold">{message}</span>
      </div>
    </div>
  );
}

export default Toast;
