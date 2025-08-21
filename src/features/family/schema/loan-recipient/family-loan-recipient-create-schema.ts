import { z } from "zod";

export const familyLoanRecipientCreateFormSchema = z.object({
    name: z.string().nonempty(),
    phone: z.string().nonempty(),
    totalDebt: z.string().optional() ,
})

export type FamilyLoanRecipientCreateFormValue = z.infer<typeof familyLoanRecipientCreateFormSchema>