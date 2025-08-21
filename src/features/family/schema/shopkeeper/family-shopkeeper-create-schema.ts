import { z } from "zod";

export const familyShopkeeperCreateFormSchema = z.object({
    name: z.string()
        .nonempty({ message: "Name is required" }),
    phone: z.string()
        .nonempty({ message: "Phone is required" })
        .min(11, { message: "Phone must be at least 11 characters" })
        .max(11, { message: "Phone must be at most 11 characters" }),
    totalDebt: z.string()
        .optional()
})


export type FamilyShopkeeperCreateFormValue = z.infer<typeof familyShopkeeperCreateFormSchema>