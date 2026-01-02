"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function LoginSuccessToast() {
  const searchParams = useSearchParams();
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (searchParams.get("login") === "success" && !hasShownToast.current) {
      hasShownToast.current = true;
      toast.success("Login Success", {
        position: "top-right",
        duration: 2000,
      });

      // Clean up URL by removing the query parameter
      window.history.replaceState({}, "", "/");
    }
  }, [searchParams]);

  return null; // This component doesn't render anything
}
