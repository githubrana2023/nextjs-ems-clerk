import { z } from "zod";

export const familyTrxCreateFormSchema = z.object({
    name:z.string().nonempty({message:'Name is required'}).min(3,{message:'Name must be at least 3 characters long'}),
    amount:z.string().nonempty(),
    description:z.string().optional(),
    familyTrxNameId:z.string().nonempty().uuid(),
    familyReceiveBankId:z.string().optional(),
    familySourceBankId:z.string().optional(),
})

export type FamilyTrxCreateFOrmValue = z.infer<typeof familyTrxCreateFormSchema>