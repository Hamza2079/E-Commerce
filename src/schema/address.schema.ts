import { z } from "zod";

export const addressSchema = z.object({
  name: z.string().min(1, "Address name is required"),
  details: z.string().min(1, "Address details are required"),
  phone: z.string().min(11, "Phone must be at least 11 digits").max(11, "Phone must be 11 digits"),
  city: z.string().min(1, "City is required"),
});

export type AddressSchemaType = z.infer<typeof addressSchema>;
