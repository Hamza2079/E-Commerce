import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request:NextRequest){
 const token = await getToken({req:request});   
    const{pathname}=request.nextUrl;
    const authPages=pathname.includes('/login')||pathname.includes('/register')||pathname.includes('/forgot-password');

    // If user is logged in and trying to access auth pages, redirect to home
    if(token && authPages){
        return NextResponse.redirect(new URL('/', request.url));
    }

    // If user is not logged in and trying to access auth pages, allow access
    if(!token && authPages){
        return NextResponse.next();
    }

    // If user is logged in and accessing protected pages, allow access
    if(token){
        return NextResponse.next();
    }

    // If user is not logged in and trying to access protected pages, redirect to login
    return NextResponse.redirect(new URL('/login', request.url));
}

export const config = {
  matcher: ['/profile','/allorders','/wishlist','/cart','/login','/register','/forgot-password']
}