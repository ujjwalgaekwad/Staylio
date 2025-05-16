import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as auth from "@/utils/api";
import { useAppContext } from "@/contexts/AppContext";

function SignOutButton() {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const mutation = useMutation({
    mutationFn: auth.logout,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["validateToken"] });
      showToast({ message: "User log out successfully", type: "Success" });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "Error" });
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <div>
      <Button
        onClick={handleClick}
        size="sm"
        variant="outline"
        className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white cursor-pointer"
      >
        <LogOut />
        Log out
      </Button>
    </div>
  );
}

export default SignOutButton;
