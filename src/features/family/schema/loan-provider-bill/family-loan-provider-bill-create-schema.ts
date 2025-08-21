import { z } from "zod";

export const familyLoanProviderBillCreateSchema = z.object({
    familyLoanProviderId: z.string().uuid().nonempty(),
    amount: z.string().nonempty(),
    familyTakenLoanId: z.string().uuid().nonempty(),
    sourceBankId: z.string().uuid().nonempty(),
    paymentDate: z.string().nonempty(),
    description: z.string().optional(),
})


export type FamilyLoanProviderBillCreateValue = z.infer<typeof familyLoanProviderBillCreateSchema>