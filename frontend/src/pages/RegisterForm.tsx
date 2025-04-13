import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { InputForm } from "@/types/Types";
import * as apiClient from "../utils/auth";
import { useMutation } from "@tanstack/react-query";
import { useAppContext } from "@/contexts/AppContext";

export default function RegisterForm() {
  const { showToast } = useAppContext();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<InputForm>();

  const mutation = useMutation<void, Error, InputForm>({
    //fixed
    mutationFn: apiClient.auth,
    onSuccess: () => {
      showToast({ message: "Registration Successful!", type: "Success" });
    },
    onError: (error) => {
      showToast({ message: error.message, type: "Error" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <form onSubmit={onSubmit}>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Create an account
            </CardTitle>
            <CardDescription className="text-center">
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstname">First name</Label>
                <Input
                  id="firstname"
                  placeholder="firstname"
                  {...register("firstName", {
                    required: "First name is required.",
                  })}
                />
                {errors.firstName?.type === "required" && (
                  <span className="text-red-600 text-sm">
                    {errors.firstName.message}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastname">Last name</Label>
                <Input
                  id="lastname"
                  placeholder="lastname"
                  {...register("lastName", {
                    required: "Last name is required.",
                  })}
                />
                {errors.lastName && (
                  <span className="text-red-600 text-sm">
                    {errors.lastName.message}
                  </span>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Email address"
                {...register("email", {
                  required: "Please enter a valid email.",
                })}
              />
              {errors.email && (
                <span className="text-red-600 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register("password", {
                  required: "Please enter the strong password.",
                  // minLength: 4,
                  minLength: {
                    value: 4,
                    message: "Password must be at least 4 characters.",
                  },
                  maxLength: {
                    value: 60,
                    message:
                      "Your password must contain between 4 and 60 characters.",
                  },
                })}
              />
              {errors.password && (
                <span className="text-red-600 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className="space-y-2 mb-4">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword", {
                  validate: (val: string) => {
                    if (!val) {
                      return "This field is required.";
                    } else if (watch("password") !== val) {
                      return "Your password do not match";
                    }
                  },
                })}
              />
              {errors.confirmPassword && (
                <span className="text-red-600 text-sm">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit">
              Create an account
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
