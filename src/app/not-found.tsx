'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6 py-20">
      <div className="max-w-2xl w-full text-center">
        
        {/* 404 Number */}
        <h1 className="text-[150px] sm:text-[100px] font-bold leading-none mb-8">
          404
        </h1>

        {/* Error Message */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-2xl font-bold mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <Button asChild size="lg">
            <Link href="/">
              Back to Home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/products">
              Continue Shopping
            </Link>
          </Button>
        </div>

        {/* Helpful Links */}
        <div className="pt-8 border-t">
          <p className="text-sm text-muted-foreground mb-4 font-medium">
            Popular Pages
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {[
              { name: 'Products', href: '/products' },
              { name: 'Categories', href: '/categories' },
              { name: 'Brands', href: '/brands' },
              { name: 'About', href: '/about' },
              { name: 'Contact', href: '/contact' }
            ].map((link) => (
              <Link 
                key={link.name}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
