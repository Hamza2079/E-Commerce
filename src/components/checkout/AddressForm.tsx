"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addressSchema, AddressSchemaType } from "@/src/schema/address.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Home, Building2 } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { addAddress } from "@/src/app/Actions/address.actions";
import { toast } from "sonner";

interface AddressFormProps {
  onSuccess?: () => void;
}

export default function AddressForm({ onSuccess }: AddressFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<AddressSchemaType>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      name: "",
      details: "",
      phone: "",
      city: "",
    },
  });

  async function handleSubmit(values: AddressSchemaType) {
    setIsLoading(true);
    try {
      const response = await addAddress(values);
      if (response.status === "success") {
        toast.success("Address added successfully", {
          position: "top-right",
          duration: 2000,
        });
        form.reset();
        onSuccess?.();
      } else {
        toast.error(response.message || "Failed to add address", {
          position: "top-right",
          duration: 3000,
        });
      }
    } catch (error) {
      toast.error("An error occurred", {
        position: "top-right",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
        {/* Address Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">
                Address Name
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Home className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    {...field}
                    placeholder="Home, Work, etc."
                    className="pl-10 h-11 transition-all focus:ring-2 focus:ring-primary"
                  />
                </div>
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {/* Phone */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">
                Phone Number
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    {...field}
                    type="tel"
                    placeholder="01010700700"
                    maxLength={11}
                    className="pl-10 h-11 transition-all focus:ring-2 focus:ring-primary"
                  />
                </div>
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {/* City */}
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">City</FormLabel>
              <FormControl>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    {...field}
                    placeholder="Cairo, Giza, etc."
                    className="pl-10 h-11 transition-all focus:ring-2 focus:ring-primary"
                  />
                </div>
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {/* Address Details */}
        <FormField
          control={form.control}
          name="details"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">
                Address Details
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Textarea
                    {...field}
                    placeholder="Street, building number, floor, apartment..."
                    className="pl-10 min-h-[100px] transition-all focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-11 text-base font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
        >
          {isLoading ? <Spinner /> : "Save Address"}
        </Button>
      </form>
    </Form>
  );
}
