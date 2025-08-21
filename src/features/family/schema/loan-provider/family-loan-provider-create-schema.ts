import { z } from "zod";


export const familyLoanProviderCreateSchema = z.object({
    name: z.string().nonempty(),
    phone: z.string().nonempty()
        .min(11, { message: "Phone number must be at least 11 characters long" })
        .max(11, { message: "Phone number must not exceed 11 characters" }),
    totalDebt: z.string().optional(),
})
export type FamilyLoanProviderCreateValue = z.infer<typeof familyLoanProviderCreateSchema>