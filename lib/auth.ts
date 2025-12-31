import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getToken(): Promise<string | undefined> {
    const myCookies = await cookies()
    const encryptedToken=myCookies.get('next-auth.session-token')?.value || myCookies.get('__Secure-next-auth.session-token')?.value
    const decodedToken = await decode({token:encryptedToken,secret:process.env.AUTH_SECRET!})
    return (decodedToken?.token as string | undefined)
}