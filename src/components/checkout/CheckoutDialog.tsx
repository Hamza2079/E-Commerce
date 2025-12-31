"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AddressForm from "./AddressForm";
import { getUserAddresses } from "@/src/app/Actions/address.actions";
import {
  createCashOrder,
  createCardPaymentSession,
} from "@/src/app/Actions/order.actions";
import { AddressI } from "@/src/types/address.types";
import { Spinner } from "@/components/ui/spinner";
import { MapPin, Plus, CreditCard, Banknote } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/src/store/hooks";
import { resetCart } from "@/src/store/slices/cartSlice";

interface CheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cartId: string;
}

export default function CheckoutDialog({
  open,
  onOpenChange,
  cartId,
}: CheckoutDialogProps) {
  const [addresses, setAddresses] = useState<AddressI[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<AddressI | null>(null);
  const [showPaymentSelection, setShowPaymentSelection] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (open) {
      fetchAddresses();
      setShowPaymentSelection(false);
      setSelectedAddress(null);
    }
  }, [open]);

  async function fetchAddresses() {
    setIsLoading(true);
    const response = await getUserAddresses();
    if (response.status === "success" && response.data) {
      setAddresses(response.data);
      if (response.data.length === 0) {
        setShowAddressForm(true);
      }
    }
    setIsLoading(false);
  }

  function handleAddressSuccess() {
    setShowAddressForm(false);
    fetchAddresses();
  }

  function handleProceedToPayment() {
    if (selectedAddress) {
      setShowPaymentSelection(true);
    }
  }

  async function handleCashPayment() {
    if (!selectedAddress) return;

    setIsProcessing(true);
    try {
      const response = await createCashOrder(cartId, {
        details: selectedAddress.details,
        phone: selectedAddress.phone,
        city: selectedAddress.city,
      });

      if (response.status === "success") {
        toast.success("Order placed successfully!", {
          position: "top-right",
          duration: 2000,
        });
        // Reset cart count in Redux
        dispatch(resetCart());
        onOpenChange(false);
        router.push("/allorders");
      } else {
        toast.error(response.message || "Failed to create order", {
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
      setIsProcessing(false);
    }
  }

  async function handleCardPayment() {
    if (!selectedAddress) return;

    setIsProcessing(true);
    try {
      const response = await createCardPaymentSession(
        cartId,
        {
          details: selectedAddress.details,
          phone: selectedAddress.phone,
          city: selectedAddress.city,
        },
        `${window.location.origin}/allorders`
      );

      if (response.status === "success" && response.session?.url) {
        // Redirect to payment gateway
        window.location.href = response.session.url;
      } else {
        toast.error(response.message || "Failed to create payment session", {
          position: "top-right",
          duration: 3000,
        });
        setIsProcessing(false);
      }
    } catch (error) {
      toast.error("An error occurred", {
        position: "top-right",
        duration: 3000,
      });
      setIsProcessing(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {showPaymentSelection
              ? "Select Payment Method"
              : showAddressForm
              ? "Add Delivery Address"
              : "Select Delivery Address"}
          </DialogTitle>
          <DialogDescription>
            {showPaymentSelection
              ? "Choose how you want to pay for your order"
              : showAddressForm
              ? "Please add your delivery address to continue"
              : "Choose where you want your order delivered"}
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Spinner />
          </div>
        ) : showPaymentSelection ? (
          <div className="space-y-4">
            {/* Payment Method Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Cash Payment */}
              <button
                onClick={handleCashPayment}
                disabled={isProcessing}
                className="p-6 border-2 rounded-lg hover:border-primary hover:bg-primary/5 transition-all duration-200 text-left group"
              >
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="p-4 rounded-full bg-green-100 group-hover:bg-green-200 transition-colors">
                    <Banknote className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">
                      Cash on Delivery
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Pay when you receive your order
                    </p>
                  </div>
                </div>
              </button>

              {/* Card Payment */}
              <button
                onClick={handleCardPayment}
                disabled={isProcessing}
                className="p-6 border-2 rounded-lg hover:border-primary hover:bg-primary/5 transition-all duration-200 text-left group"
              >
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="p-4 rounded-full bg-blue-100 group-hover:bg-blue-200 transition-colors">
                    <CreditCard className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">
                      Pay with Card
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Secure online payment
                    </p>
                  </div>
                </div>
              </button>
            </div>

            <Button
              variant="outline"
              onClick={() => setShowPaymentSelection(false)}
              className="w-full"
              disabled={isProcessing}
            >
              Back to Address
            </Button>
          </div>
        ) : showAddressForm ? (
          <div className="space-y-4">
            <AddressForm onSuccess={handleAddressSuccess} />
            {addresses.length > 0 && (
              <Button
                variant="outline"
                onClick={() => setShowAddressForm(false)}
                className="w-full"
              >
                Cancel
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {/* Address List */}
            <div className="space-y-3">
              {addresses.map((address) => (
                <div
                  key={address._id}
                  onClick={() => setSelectedAddress(address)}
                  className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedAddress?._id === address._id
                      ? "border-primary bg-primary/5 ring-2 ring-primary"
                      : "hover:border-primary/50 hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-base mb-1">
                        {address.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-1">
                        {address.details}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {address.city} • {address.phone}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add New Address Button */}
            <Button
              variant="outline"
              onClick={() => setShowAddressForm(true)}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Address
            </Button>

            {/* Proceed Button */}
            <Button
              onClick={handleProceedToPayment}
              disabled={!selectedAddress}
              className="w-full h-11 text-base font-medium"
            >
              Proceed to Payment
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
