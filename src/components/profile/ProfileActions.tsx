"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { resetCart } from "@/src/store/slices/cartSlice";
import ChangePasswordDialog from "./ChangePasswordDialog";

export default function ProfileActions() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      dispatch(resetCart());
      toast.success("Logged out successfully");
      router.push("/login");
      router.refresh(); // Refresh to update auth state
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out");
    }
  };

 
  return (
    <div className="bg-card rounded-xl border shadow-sm p-2 space-y-1">
      <ChangePasswordDialog />
      
      <Button
        variant="ghost"
        className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 h-12 gap-3"
        onClick={handleLogout}
      >
        <LogOut className="h-5 w-5" />
        <span className="font-medium">Sign Out</span>
      </Button>
    </div>
  );
}
