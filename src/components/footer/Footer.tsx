'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background pt-16 pb-8">
      <div className="max-w-[1400px] mx-auto px-8 md:px-6 sm:px-4">
        
        {/* Top Section: Newsletter & Brand */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <Link href="/" className="flex items-center gap-2 group text-2xl font-bold hover:opacity-70 transition-opacity mb-4">
              <Avatar className="rounded-lg bg-black transition-transform duration-300 group-hover:scale-110">
              <AvatarFallback className="text-white bg-black">S</AvatarFallback>
            </Avatar>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
              ShopMart
            </span>
            </Link>
            <p className="text-muted-foreground text-base max-w-md">
              Discover the latest trends and shop your favorite products with fast shipping and excellent customer service.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Subscribe to our newsletter</h3>
            <p className="text-muted-foreground mb-4">Get exclusive offers and updates.</p>
            <form className="flex gap-2 sm:flex-col" onSubmit={(e) => e.preventDefault()}>
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1"
              />
              <Button className="sm:w-full">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Middle Section: Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div>
            <h4 className="font-bold mb-4">Shop</h4>
            <div className="flex flex-col gap-3">
              {['New Arrivals', 'Best Sellers', 'Sale', 'All Products'].map((item) => (
                <Link key={item} href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {item}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <div className="flex flex-col gap-3">
              {['Help Center', 'Shipping Info', 'Returns', 'Track Order', 'Contact Us'].map((item) => (
                <Link key={item} href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {item}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <div className="flex flex-col gap-3">
              {['About Us', 'Careers', 'Blog', 'Press'].map((item) => (
                <Link key={item} href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {item}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <div className="flex flex-col gap-3">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <Link key={item} href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright & Social */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t">
          <p className="text-muted-foreground text-sm">
            © {currentYear} ShopMart. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" aria-label="Facebook">
              <Facebook className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
