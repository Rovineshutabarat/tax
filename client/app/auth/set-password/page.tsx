"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { SetPasswordRequest } from "@/types/payload/request/set.password.request";
import { useMutation } from "@tanstack/react-query";
import { UserService } from "@/services/user.service";
import { toast } from "sonner";

const Page = () => {
  const [isShowPassword, setIsShowPassword] = React.useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] =
    React.useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SetPasswordRequest>({
    resolver: zodResolver(SetPasswordRequest),
    mode: "onSubmit",
  });

  React.useEffect(() => {
    if (!token) {
      router.replace("/login");
    }
  }, [token, router, setValue]);

  const setPasswordMutation = useMutation({
    mutationKey: ["set_password"],
    mutationFn: (data: SetPasswordRequest) =>
      UserService.setPassword(token!, data),
    onSuccess: () => {
      toast.success(
        "Your password has been set successfully. Please log in to continue.",
      );
      router.push("/auth/login");
    },
    onError: () => toast.error("Failed to set your password"),
  });

  const onSubmit: SubmitHandler<SetPasswordRequest> = async (data) => {
    setPasswordMutation.mutate(data);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center px-5 md:px-0">
      <div className="flex w-full items-center justify-center px-4 py-12 md:w-1/2 lg:px-8">
        <div className="mx-auto w-full max-w-sm space-y-8">
          <div className="space-y-3 text-center">
            <h1 className="text-3xl font-bold">Set Your Password</h1>
            <p className="text-sm text-muted-foreground">
              Please create a new password to activate your account.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={isShowPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password")}
                />
                <Button
                  type="button"
                  variant="ghost"
                  className="absolute top-0 right-0"
                  onClick={() => setIsShowPassword(!isShowPassword)}
                >
                  {isShowPassword ? <EyeOff /> : <Eye />}
                </Button>
              </div>
              {errors.password && (
                <p className="mt-1 text-destructive text-sm">
                  *{errors.password.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={isShowConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  {...register("confirmPassword")}
                />
                <Button
                  type="button"
                  variant="ghost"
                  className="absolute top-0 right-0 cursor-pointer"
                  onClick={() =>
                    setIsShowConfirmPassword(!isShowConfirmPassword)
                  }
                >
                  {isShowConfirmPassword ? <EyeOff /> : <Eye />}
                </Button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-destructive text-sm">
                  *{errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button
              className="w-full cursor-pointer"
              type="submit"
              disabled={setPasswordMutation.isPending}
            >
              {setPasswordMutation.isPending ? (
                <div className="flex items-center space-x-2">
                  <div
                    className="inline-block h-4 w-4 animate-spin rounded-full border-3 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_0.4s_linear_infinite] dark:text-slate-700"
                    role="status"
                  ></div>
                  <p>Please Wait..</p>
                </div>
              ) : (
                "Set Password"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
