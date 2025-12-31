"use server";

import { AuthResponse } from "@/src/types/auth.types";

export async function forgotPassword(email: string): Promise<AuthResponse> {
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Forgot password error:", error);
    return { statusMsg: "fail", message: "Network error occurred" };
  }
}

export async function verifyResetCode(resetCode: string): Promise<AuthResponse> {
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ resetCode }),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Verify code error:", error);
    return { statusMsg: "fail", message: "Network error occurred" };
  }
}

export async function resetPassword(
  email: string,
  newPassword: string
): Promise<AuthResponse> {
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newPassword }),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Reset password error:", error);
    return { statusMsg: "fail", message: "Network error occurred" };
  }
}
