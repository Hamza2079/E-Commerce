"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000);
    }, 1000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
    >
      <div className="flex-1 relative">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          disabled={status === "loading" || status === "success"}
        />
      </div>
      <Button
        type="submit"
        size="lg"
        disabled={status === "loading" || status === "success"}
        className="transition-all duration-300 hover:scale-105"
      >
        {status === "loading"
          ? "Subscribing..."
          : status === "success"
          ? "Subscribed!"
          : "Subscribe"}
      </Button>
    </form>
  );
}
