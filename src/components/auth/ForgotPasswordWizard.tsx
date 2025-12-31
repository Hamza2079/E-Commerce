"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgotPasswordSchema,
  verifyCodeSchema,
  resetPasswordSchema,
  ForgotPasswordValues,
  VerifyCodeValues,
  ResetPasswordValues,
} from "@/src/schema/forgotPassword.schema";
import {
  forgotPassword,
  verifyResetCode,
  resetPassword,
} from "@/src/app/Actions/auth.actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Loader2,
  ArrowLeft,
  Mail,
  KeyRound,
  Lock,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ForgotPasswordWizard() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Form 1: Email
  const emailForm = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  // Form 2: OTP
  const otpForm = useForm<VerifyCodeValues>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: { resetCode: "" },
  });

  // Form 3: New Password
  const passwordForm = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
      newPassword: "",
      rePassword: "",
    },
  });

  const onEmailSubmit = async (data: ForgotPasswordValues) => {
    setIsLoading(true);
    try {
      const response = await forgotPassword(data.email);
      if (response.statusMsg === "success" || response.message === "success") {
        setUserEmail(data.email);
        passwordForm.setValue("email", data.email); // Set email for step 3
        toast.success("Verification code sent to your email");
        setStep(2);
      } else {
        toast.error(response.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Failed to send code");
    } finally {
      setIsLoading(false);
    }
  };

  const onOtpSubmit = async (data: VerifyCodeValues) => {
    setIsLoading(true);
    try {
      const code = data.resetCode.trim();
      const response = await verifyResetCode(code);
      if (
        response.status === "Success" ||
        response.status === "success" ||
        response.statusMsg === "success"
      ) {
        toast.success("Code verified successfully");
        setStep(3);
      } else {
        toast.error(response.message || "Invalid code");
      }
    } catch (error) {
      toast.error("Verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  const onPasswordSubmit = async (data: ResetPasswordValues) => {
    setIsLoading(true);
    try {
      // Ensure we use the email from state if form reset cleared it, though we set it earlier
      const emailToUse = data.email || userEmail;

      const response = await resetPassword(emailToUse, data.newPassword);
      if (response.token || response.message === "success") {
        toast.success("Password reset successfully! Please login.");
        // Redirect to login
        router.push("/login");
      } else {
        toast.error(response.message || "Failed to reset password");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md shadow-lg border-0 bg-card/50 backdrop-blur-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {step === 1 && "Forgot Password"}
            {step === 2 && "Verify Code"}
            {step === 3 && "Reset Password"}
          </CardTitle>
          <CardDescription className="text-center">
            {step === 1 && "Enter your email to receive a reset code"}
            {step === 2 && `Enter the code sent to ${userEmail}`}
            {step === 3 && "Create a new secure password"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Step 1: Email Form */}
          {step === 1 && (
            <Form {...emailForm}>
              <form
                onSubmit={emailForm.handleSubmit(onEmailSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={emailForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input
                            placeholder="name@example.com"
                            className="pl-10 h-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Reset Code"
                  )}
                </Button>

                <div className="text-center">
                  <Link
                    href="/login"
                    className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                  >
                    <ArrowLeft className="h-3 w-3" /> Back to Login
                  </Link>
                </div>
              </form>
            </Form>
          )}

          {/* Step 2: OTP Form */}
          {step === 2 && (
            <Form {...otpForm}>
              <form
                onSubmit={otpForm.handleSubmit(onOtpSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={otpForm.control}
                  name="resetCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Verification Code</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <KeyRound className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input
                            placeholder="Enter code"
                            className="pl-10 h-10 tracking-widest"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    "Verify Code"
                  )}
                </Button>

                <div className="flex justify-between items-center text-sm mt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Change Email
                  </button>
                  <button
                    type="button"
                    onClick={() => onEmailSubmit({ email: userEmail })}
                    className="text-primary hover:underline"
                    disabled={isLoading}
                  >
                    Resend Code
                  </button>
                </div>
              </form>
            </Form>
          )}

          {/* Step 3: New Password Form */}
          {step === 3 && (
            <Form {...passwordForm}>
              <form
                onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={passwordForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input
                            type="password"
                            placeholder="New password"
                            className="pl-10 h-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={passwordForm.control}
                  name="rePassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <CheckCircle2 className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input
                            type="password"
                            placeholder="Confirm password"
                            className="pl-10 h-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Resetting...
                    </>
                  ) : (
                    "Reset Password"
                  )}
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
