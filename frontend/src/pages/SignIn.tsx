import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SignInFormData } from "@/types/Types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../utils/api";
import { useAppContext } from "@/contexts/AppContext";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import GoogleLoginButton from "@/components/GoogleLoginButton";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState<Boolean>(false);
  const queryClient = useQueryClient();
  const naviagte = useNavigate();
  const location = useLocation();
  const { showToast } = useAppContext();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormData>();

  const mutation = useMutation({
    mutationFn: apiClient.signIn,
    onSuccess: async () => {
      showToast({ message: "SignIn successful!", type: "Success" });
      await queryClient.invalidateQueries({
        queryKey: ["validateToken"],
      });
      naviagte(location.state?.from?.pathname || "/");
    },
    onError: async (error) => {
      showToast({ message: error.message, type: "Error" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <form onSubmit={onSubmit}>
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              <h1>Sign In</h1>
            </CardTitle>
            <CardDescription className="text-center">
              Enter your email and password to sign in
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Email Address"
                {...register("email", {
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email format",
                  },
                })}
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2 mb-4">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your valid password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none cursor-pointer"
                >
                  {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full cursor-pointer">
              Sign In
            </Button>
          </CardFooter>
        </form>
        <CardContent>
          <GoogleLoginButton />
          <p className="text-center">
            Don't have an account?
            <Link to={"/register"} className="ml-1 underline font-semibold">
              Sign Up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
