"use server";

import { getToken } from "@/lib/auth";

import { ChangePasswordData, ChangePasswordResponse } from "@/src/types/user.types";

export async function changePassword(
  data: ChangePasswordData
): Promise<ChangePasswordResponse> {
  const token = await getToken();

  if (!token) {
    return { statusMsg: "fail", message: "User not authenticated" };
  }

  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: token as string,
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error changing password:", error);
    return { statusMsg: "fail", message: "Failed to change password" };
  }
}
