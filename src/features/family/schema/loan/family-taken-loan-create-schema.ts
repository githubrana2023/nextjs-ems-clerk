import { FamilyTakenLoanInsert } from "@/drizzle/type"
import { z } from "zod"

export const familyTakenLoanCreateFormSchema = z.object(
    {
        amount: z.string(),
        familyLoanProviderId: z.string().uuid(),
        receiveBankId: z.string().uuid(),
        loanTakenDate: z.string().date(),
        description: z.string().optional(),
    }
)

export type FamilyTakenLoanCreateFormValue = z.infer<typeof familyTakenLoanCreateFormSchema>
