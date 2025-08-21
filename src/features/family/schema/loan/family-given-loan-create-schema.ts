import { z } from "zod"

export const familyGivenLoanCreateFormSchema = z.object(
    {
        amount: z.string(),
        familyLoanRecipientId: z.string().uuid(),
        sourceBankId: z.string().uuid(),
        givenLoanDate: z.string().date(),
        description: z.string().optional(),
    }
)

export type FamilyGivenLoanCreateFormValue = z.infer<typeof familyGivenLoanCreateFormSchema>