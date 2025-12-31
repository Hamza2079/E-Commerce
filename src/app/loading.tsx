
import React from "react";
import { Loader2 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Loader() {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-8">
        {/* Animated Logo with Rings */}
        <div className="relative flex items-center justify-center">
          {/* Outer rotating ring */}
          <div className="absolute w-32 h-32 border-4 border-primary/20 border-t-primary rounded-full animate-spin-slow"></div>

          {/* Inner rotating ring (opposite direction) */}
          <div className="absolute w-24 h-24 border-4 border-primary/30 border-b-primary rounded-full animate-spin-reverse"></div>

          {/* Pulsing glow effect */}
          <div className="absolute w-20 h-20 bg-primary/20 rounded-full animate-pulse-glow"></div>

          {/* Logo with Avatar */}
          <div className="relative flex flex-col items-center gap-3 animate-float">
            <Avatar className="w-16 h-16 rounded-lg bg-black animate-scale-pulse shadow-2xl">
              <AvatarFallback className="text-white bg-black text-2xl font-bold">
                S
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Brand Name with fade-in */}
        <h1 className="text-3xl font-bold animate-fade-in-up bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          ShopMart
        </h1>

        {/* Loading Text with animated dots */}
        <div className="flex items-center gap-1 text-sm text-muted-foreground font-medium animate-fade-in-up-delay">
          <span>Loading</span>
          <span className="flex gap-1">
            <span
              className="animate-bounce-dot"
              style={{ animationDelay: "0ms" }}
            >
              .
            </span>
            <span
              className="animate-bounce-dot"
              style={{ animationDelay: "150ms" }}
            >
              .
            </span>
            <span
              className="animate-bounce-dot"
              style={{ animationDelay: "300ms" }}
            >
              .
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
