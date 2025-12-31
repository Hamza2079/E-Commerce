"use client";

import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Product {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
  category: {
    name: string;
  };
}

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Fetch all products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://ecommerce.routemisr.com/api/v1/products"
        );
        const data = await response.json();
        if (data.data) {
          setAllProducts(data.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Filter products locally when search query changes
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      setIsLoading(true);

      // Simulate slight delay for better UX
      const timer = setTimeout(() => {
        const filtered = allProducts
          .filter(
            (product) =>
              product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              product.category.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
          )
          .slice(0, 5); // Show max 5 results

        setSearchResults(filtered);
        setShowResults(true);
        setIsLoading(false);
      }, 200);

      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
      setShowResults(false);
      setIsLoading(false);
    }
  }, [searchQuery, allProducts]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClear = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowResults(false);
  };

  const handleResultClick = () => {
    setShowResults(false);
    setSearchQuery("");
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-10"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClear}
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {showResults && (
        <div className="absolute top-full mt-2 w-full bg-background border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-muted-foreground">
              Searching...
            </div>
          ) : searchResults.length > 0 ? (
            <div className="py-2">
              {searchResults.map((product) => (
                <Link
                  key={product._id}
                  href={`/products/${product._id}`}
                  onClick={handleResultClick}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors"
                >
                  <div className="relative w-12 h-12 shrink-0 rounded-md overflow-hidden bg-muted">
                    <Image
                      src={product.imageCover}
                      alt={product.title}
                      fill
                      className="object-cover"
                      sizes="48px"
                      unoptimized
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm line-clamp-1">
                      {product.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {product.category.name}
                    </p>
                  </div>
                  <div className="text-sm font-bold text-primary">
                    ${product.price}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-muted-foreground">
              No products found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
