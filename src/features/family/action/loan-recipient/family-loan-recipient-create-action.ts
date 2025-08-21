'use server'

import { TOKEN_KEY } from "@/constant/token-constant"
import { currentFamily } from "@/lib/current-family"
import { deleteCookie } from "@/lib/helpers"
import { failureResponse, successResponse } from "@/lib/helpers/send-response"
import { getFamilyById } from "@/services/family/get-family"
import { familyLoanRecipientCreateFormSchema } from "@/features/family/schema/loan-recipient"
import { getFamilyLoanRecipientByPhoneAndFamilyId ,insertFamilyLoanRecipient} from "@/services/family/loan-recipient"

export const familyLoanRecipientCreateAction = async (payload: unknown) => {
    try {
        const validation = familyLoanRecipientCreateFormSchema.safeParse(payload)
        if (!validation.success) return failureResponse('Invalid Fields!')

        const { name, phone, totalDebt } = validation.data

        const loggedFamily = await currentFamily()
        if (!loggedFamily) return failureResponse('Unauthenticated Access!')

        const existFamily = await getFamilyById(loggedFamily.id)

        if (!existFamily) {
            await deleteCookie(TOKEN_KEY.FAMILY_ACCESS_TOKEN)
            await deleteCookie(TOKEN_KEY.MEMBER_ACCESS_TOKEN)
            return failureResponse('Unauthorized Access!')
        }

        const existFamilyLoanRecipient = await getFamilyLoanRecipientByPhoneAndFamilyId(phone, existFamily.id)

        if (existFamilyLoanRecipient) return failureResponse('Family Loan Recipient already exist!')

        const newFamilyLoanRecipient = await insertFamilyLoanRecipient({
            name,
            phone,
            totalDebt,
            familyId: existFamily.id,
        })


        return successResponse('Family Loan Recipient inserted!',newFamilyLoanRecipient)

    } catch (error) {

    }
}