import React from "react";
import { getToken } from "@/lib/auth";
import { jwtDecode } from "jwt-decode";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Home, User, Package, Heart, LogOut } from "lucide-react";
import ProfileActions from "@/src/components/profile/ProfileActions";

interface DecodedToken {
  id: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
}

export default async function ProfilePage() {
  const token = await getToken();
  let userInfo: DecodedToken | null = null;

  if (token) {
    try {
      userInfo = jwtDecode(token as string);
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Breadcrumb Navigation */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/" className="flex items-center gap-1.5">
                    <Home className="h-4 w-4" />
                    Home
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="flex items-center gap-1.5">
                  <User className="h-4 w-4" />
                  Profile
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Profile Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* User Info Card */}
          <div className="bg-card rounded-xl border shadow-sm p-8 mb-8 text-center">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl font-bold text-primary">
                {userInfo?.name?.charAt(0).toUpperCase() || "U"}
              </span>
            </div>
            <h1 className="text-2xl font-bold mb-1 capitalize">
              {userInfo?.name || "User"}
            </h1>
            <p className="text-muted-foreground capitalize">
              {userInfo?.role || "Customer"}
            </p>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Link
              href="/allorders"
              className="flex items-center gap-4 p-6 bg-card hover:bg-muted/50 rounded-xl border transition-colors group"
            >
              <div className="p-3 bg-blue-100 text-blue-600 rounded-lg group-hover:scale-110 transition-transform">
                <Package className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">My Orders</h3>
                <p className="text-sm text-muted-foreground">
                  View order history
                </p>
              </div>
            </Link>

            <Link
              href="/wishlist"
              className="flex items-center gap-4 p-6 bg-card hover:bg-muted/50 rounded-xl border transition-colors group"
            >
              <div className="p-3 bg-red-100 text-red-600 rounded-lg group-hover:scale-110 transition-transform">
                <Heart className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Wishlist</h3>
                <p className="text-sm text-muted-foreground">
                  Your saved items
                </p>
              </div>
            </Link>
          </div>

          {/* Actions (Logout) */}
          <ProfileActions />
        </div>
      </div>
    </main>
  );
}
