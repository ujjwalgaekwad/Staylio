import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as auth from "@/utils/auth";
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
      <Button onClick={handleClick} className="cursor-pointer">
        <LogOut />
        Log out
      </Button>
    </div>
  );
}

export default SignOutButton;
