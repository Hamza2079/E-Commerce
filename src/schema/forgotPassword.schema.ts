import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export const verifyCodeSchema = z.object({
  resetCode: z.string().min(1, "Reset code is required"),
});

export const resetPasswordSchema = z
  .object({
    email: z.string().email(),
    newPassword: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
        "Password must contain at least one letter and one number"
      ),
    rePassword: z.string(),
  })
  .refine((data) => data.newPassword === data.rePassword, {
    message: "Passwords don't match",
    path: ["rePassword"],
  });

export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;
export type VerifyCodeValues = z.infer<typeof verifyCodeSchema>;
export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;
