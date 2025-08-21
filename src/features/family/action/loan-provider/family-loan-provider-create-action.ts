'use server'

import { failureResponse, successResponse } from "@/lib/helpers/send-response"
import { familyLoanProviderCreateSchema } from "@/features/family/schema/loan-provider"
import { currentFamily } from "@/lib/current-family"
import { getFamilyById } from "@/services/family/get-family"
import { deleteCookie } from "@/lib/helpers"
import { TOKEN_KEY } from "@/constant/token-constant"
import { getFamilyLoanProviderByPhoneAndFamilyId, insertFamilyLoanProvider } from "@/services/family/loan-provider"

export const familyLoanProviderCreateAction = async (payload: unknown) => {
    try {
        const validation = familyLoanProviderCreateSchema.safeParse(payload)
        if (!validation.success) return failureResponse('Invalid Fields!')

        const {
            name,
            phone,
            totalDebt
        } = validation.data

        const loggedFamily = await currentFamily()
        if (!loggedFamily) return failureResponse('Unauthenticated Access!')

        const existFamily = await getFamilyById(loggedFamily.id)

        if (!existFamily) {
            await deleteCookie(TOKEN_KEY.FAMILY_ACCESS_TOKEN)
            await deleteCookie(TOKEN_KEY.MEMBER_ACCESS_TOKEN)
            return failureResponse('Unauthorized Access!')
        }

        const existFamilyLoanProvider = await getFamilyLoanProviderByPhoneAndFamilyId(phone, existFamily.id)
        if (existFamilyLoanProvider) return failureResponse('Loan provider already exists with this phone number!')

        const newFamilyLoanProvider = await insertFamilyLoanProvider({
            name,
            phone,
            totalDebt: totalDebt ?? "0",
            familyId: existFamily.id,
        })

        return successResponse('Family loan provider created successfully!', newFamilyLoanProvider)

    } catch (error) {
        return failureResponse('Failed to create family loan provider', error)
    }

}