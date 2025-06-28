import { Button } from "@/components/ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import { apiRoutes } from "@/utils/apiRoutes";
import { toast } from "sonner";
import axios from "axios";

function GoogleLoginButton() {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const { access_token } = tokenResponse;
        const res = await axios.post(
          apiRoutes.google,
          { token: access_token },
          { withCredentials: true }
        );
        window.location.href = "/";
        toast.success(`Welcome ${res.data.user.name}`);
      } catch (err) {
        toast.error("Login failed");
        alert("Login failed. Please try again.");
      }
    },
    onError: () => {},
    flow: "implicit",
  });

  return (
    <Button
      onClick={() => login()}
      variant="outline"
      className="w-full flex items-center justify-center space-x-2 cursor-pointer"
    >
      <img src="/google-icon.png" alt="Google" className="h-5 w-5" />
      <span>Continue with Google</span>
    </Button>
  );
}

export default GoogleLoginButton;
