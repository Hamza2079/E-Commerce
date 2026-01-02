"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  User,
  Heart,
  ShoppingCart,
  Menu,
  LogOut,
  Settings,
  UserCircle,
  LogIn,
  ShoppingBag,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { getCartCount } from "@/src/app/Actions/getCartCount";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { setCartCount } from "@/src/store/slices/cartSlice";
import SearchBar from "@/src/components/SearchBar";

export default function Nav() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();
  const cartCount = useAppSelector((state) => state.cart.cartCount);
  // Navigation links array
  const navLinks = [
    { name: "Products", href: "/products" },
    { name: "Categories", href: "/categories" },
    { name: "Brands", href: "/brands" },
  ];

  // Add scroll effect for nav
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch cart count when session changes and update Redux
  useEffect(() => {
    const fetchCartCount = async () => {
      if (session) {
        const count = await getCartCount();
        dispatch(setCartCount(count));
      } else {
        dispatch(setCartCount(0));
      }
    };
    fetchCartCount();
  }, [session, dispatch]);

  const logout = async () => {
    setIsLoggingOut(true);
    await signOut({
      callbackUrl: "/login",
      redirect: true,
    });
  };

  return (
    <>
      {/* Top Banner */}
      <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-medium overflow-hidden">
        <div className="animate-fade-in">Welcome to ShopMart</div>
      </div>

      {/* Main Navigation */}
      <nav
        className={`border-b bg-background sticky top-0 z-40 transition-all duration-300 ${
          isScrolled ? "shadow-md" : ""
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-8 md:px-4 py-4 flex items-center justify-between gap-8">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold hover:opacity-70 transition-all duration-300 flex items-center gap-2 group"
          >
            <Avatar className="rounded-lg bg-black transition-transform duration-300 group-hover:scale-110">
              <AvatarFallback className="text-white bg-black">S</AvatarFallback>
            </Avatar>
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              ShopMart
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium hover:text-white p-3 rounded-lg hover:bg-black transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Search Bar - Desktop */}
            <div className="hidden md:block">
              <SearchBar />
            </div>

            {/* User Account Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Account"
                  className="transition-all duration-300 hover:scale-110 hover:bg-primary/10"
                >
                  {session ? (
                    <p>{session.user?.name?.charAt(0)?.toUpperCase()}</p>
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  {session ? "My Account" : "Please Sign In"}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {session ? (
                  <DropdownMenuItem asChild>
                    <Link
                      href="/profile"
                      className="cursor-pointer flex items-center"
                    >
                      <UserCircle className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                ) : null}
                {session ? (
                  <DropdownMenuItem asChild>
                    <Link
                      href="/allorders"
                      className="cursor-pointer flex items-center"
                    >
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      <span>Orders</span>
                    </Link>
                  </DropdownMenuItem>
                ) : null}
                {!session ? (
                  <>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/login"
                        className="cursor-pointer flex items-center"
                      >
                        <span className="font-bold">Login</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/register"
                        className="cursor-pointer flex items-center"
                      >
                        <span className="font-bold">Register</span>
                      </Link>
                    </DropdownMenuItem>
                  </>
                ) : null}
                <DropdownMenuSeparator />
                {session ? (
                  <DropdownMenuItem asChild>
                    <button
                      onClick={logout}
                      className="cursor-pointer flex items-center text-destructive focus:text-destructive"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </button>
                  </DropdownMenuItem>
                ) : null}
              </DropdownMenuContent>
            </DropdownMenu>

            {session ? (
              <>
                {/* Wishlist */}
                <Link
                  href="/wishlist"
                  aria-label="Wishlist"
                  className="transition-all duration-300 hover:scale-110 hover:text-red-500"
                >
                  <Heart className="h-5 w-5 hover:fill-current" />
                </Link>

                {/* Shopping Cart */}
                <Link
                  href="/cart"
                  aria-label="Shopping Cart"
                  className="relative transition-all duration-300 hover:scale-110"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-3 -right-2 bg-primary text-primary-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse-scale">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </>
            ) : null}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Menu"
                  className="transition-all duration-300 hover:scale-110 hover:rotate-90"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="animate-slide-in-right">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 mt-8">
                  {/* Search Bar - Mobile */}
                  <div className="px-4">
                    <SearchBar />
                  </div>

                  {/* Navigation Links */}
                  <div className="flex flex-col px-4 gap-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className="text-lg font-medium hover:text-primary transition-all duration-300 hover:translate-x-2 hover:font-bold"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-32 animate-fade-in backdrop-blur-sm"
          onClick={() => setIsSearchOpen(false)}
        >
          <div
            className="bg-card rounded-lg shadow-2xl w-full max-w-2xl mx-4 p-6 animate-slide-down-fade"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-4">
              <Search className="h-5 w-5 text-muted-foreground animate-pulse" />
              <Input
                type="text"
                placeholder="Search for products..."
                className="flex-1 border-none focus-visible:ring-0 text-lg transition-all duration-300"
                autoFocus
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(false)}
                className="transition-all duration-300 hover:scale-110 hover:rotate-90 hover:bg-destructive/10"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Loading Overlay */}
      {isLoggingOut && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
          <div className="flex flex-col items-center gap-8">
            {/* Animated Logo with Rings */}
            <div className="relative flex items-center justify-center">
              {/* Outer rotating ring */}
              <div className="absolute w-32 h-32 border-4 border-primary/20 border-t-primary rounded-full animate-spin-slow"></div>

              {/* Inner rotating ring (opposite direction) */}
              <div className="absolute w-24 h-24 border-4 border-primary/30 border-b-primary rounded-full animate-spin-reverse"></div>

              {/* Pulsing glow effect */}
              <div className="absolute w-20 h-20 bg-primary/20 rounded-full animate-pulse-glow"></div>

              {/* Logo */}
              <div className="relative flex flex-col items-center gap-3 animate-float">
                <div className="w-16 h-16 rounded-lg bg-black flex items-center justify-center animate-scale-pulse shadow-2xl">
                  <span className="text-white text-2xl font-bold">S</span>
                </div>
              </div>
            </div>

            {/* Brand Name with fade-in */}
            <h1 className="text-3xl font-bold animate-fade-in-up bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              ShopMart
            </h1>

            {/* Loading Text with animated dots */}
            <div className="flex items-center gap-1 text-sm text-muted-foreground font-medium animate-fade-in-up-delay">
              <span>Logging out</span>
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
      )}
    </>
  );
}
