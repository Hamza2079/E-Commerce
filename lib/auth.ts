import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getToken(): Promise<string | undefined> {
    const encryptedToken = (await cookies()).get('next-auth.session-token')?.value
    const decodedToken = await decode({token:encryptedToken,secret:process.env.AUTH_SECRET!})
    return (decodedToken?.token as string | undefined)
}