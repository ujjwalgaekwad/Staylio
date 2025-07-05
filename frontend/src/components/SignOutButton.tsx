import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import * as auth from "@/utils/api";
import { useAppContext } from "@/contexts/AppContext";

const SignOutButton = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();

  const mutation = useMutation({
    mutationFn: auth.logout,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["validateToken"] });
      showToast({ message: "User logged out successfully", type: "Success" });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "Error" });
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center cursor-pointer gap-2 px-3 py-2 text-sm text-black hover:rounded-b-md hover:bg-gray-100 text-left disabled:opacity-50"
    >
      <LogOut size={16} />
      Log out
    </button>
  );
};

export default SignOutButton;
