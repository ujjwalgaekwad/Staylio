import { ToastProps } from "@/types/Types";
import { X } from "lucide-react";
import { useEffect } from "react";

function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const style =
    type === "SUCCESS"
      ? "toast-container bg-green-600"
      : "toast-container bg-red-600";

  return (
    <div className={`${style} animate-slide-in`}>
      <div className="flex justify-between items-center w-full">
        <span className="text-sm font-semibold">{message}</span>
        <button onClick={onClose} className="ml-4">
          <X  className="text-white hover:text-gray-200 cursor-pointer" />
        </button>
      </div>
    </div>
  );
}

export default Toast;
