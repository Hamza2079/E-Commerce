import ForgotPasswordWizard from "@/src/components/auth/ForgotPasswordWizard";
import React from "react";

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col justify-center">
      <div className="container mx-auto px-4">
        <ForgotPasswordWizard />
      </div>
    </main>
  );
}
