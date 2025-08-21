'use server'

import { failureResponse } from "@/lib/helpers/send-response"
import { currentFamily } from "@/lib/current-family"
import { getFamilyById } from "@/services/family/get-family"
import { deleteCookie } from "@/lib/helpers"
import { TOKEN_KEY } from "@/constant/token-constant"
import { getOnlyActiveFamilyLoanProviderByIdAndFamilyId } from "@/services/family/loan-provider"
import { getOnlyActiveFamilyBankAccountByIdAndFamilyId } from "@/services/family/bank-account"
import { loanTakeTransaction } from "@/services/family/loan"
import { familyTakenLoanCreateFormSchema } from "@/features/family/schema/loan"

export const familyTakenLoanCreateAction = async (payload: unknown) => {
    try {
        const validation = familyTakenLoanCreateFormSchema.safeParse(payload)
        if (!validation.success) return failureResponse('Invalid Fields!')

        const {
            amount,
            familyLoanProviderId,
            loanTakenDate,
            description,
            receiveBankId
        } = validation.data

        const formattedAmount = Number(amount)

        const loggedFamily = await currentFamily()
        if (!loggedFamily) return failureResponse('Unauthenticated Access!')

        const existFamily = await getFamilyById(loggedFamily.id)

        if (!existFamily) {
            await deleteCookie(TOKEN_KEY.FAMILY_ACCESS_TOKEN)
            await deleteCookie(TOKEN_KEY.MEMBER_ACCESS_TOKEN)
            return failureResponse('Unauthorized Access!')
        }

        const existFamilyReceiveBank = await getOnlyActiveFamilyBankAccountByIdAndFamilyId(receiveBankId, existFamily.id)

        if (!existFamilyReceiveBank) return failureResponse('Inactive Source Bank!')

        const existFamilyLoanProvider = await getOnlyActiveFamilyLoanProviderByIdAndFamilyId(familyLoanProviderId, existFamily.id)

        if (!existFamilyLoanProvider) return failureResponse('Inactive Loan Provider!')

        const addedAmount = Number(existFamilyReceiveBank.balance) + formattedAmount
        const providerTotalDebt = Number(existFamilyLoanProvider.totalDebt) + formattedAmount

        return await loanTakeTransaction(
            {
                amount,
                description,
                familyId: existFamily.id,
                loanProviderId: existFamilyLoanProvider.id,
                loanStatus: 'DUE',
                loanTakenDate: new Date(loanTakenDate),
                receiveBankId: existFamilyReceiveBank.id,
                remaining: amount
            },
            addedAmount,
            providerTotalDebt,
        )
    } catch (error) {
        return failureResponse('failed to insert loan!', error)
    }
}
