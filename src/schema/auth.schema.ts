import * as z from "zod";

export const registerSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.email("Invalid email address"),
    password: z.string().nonempty("Password is required").min(6, "Password must be at least 6 characters long"),
    rePassword: z.string().nonempty("Re-password is required"),
    phone: z.string().nonempty("Phone is required").regex(/^01[0125][0-9]{8}$/,"Phone Number Must Be Egyptian")
}).refine((data) => data.password === data.rePassword, {error: "Passwords do not match", path: ["rePassword"]})

export type registerSchematype = z.infer<typeof registerSchema>
export const loginSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().nonempty("Password is required").min(6, "Password must be at least 6 characters long"),
})
export type loginSchematype = z.infer<typeof loginSchema>