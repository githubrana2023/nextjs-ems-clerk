'use server'

import { failureResponse } from "@/lib/helpers/send-response"
import { currentFamily } from "@/lib/current-family"
import { getFamilyById } from "@/services/family/get-family"
import { deleteCookie } from "@/lib/helpers"
import { TOKEN_KEY } from "@/constant/token-constant"
import { getOnlyActiveFamilyLoanProviderByIdAndFamilyId } from "@/services/family/loan-provider"
import { getOnlyActiveFamilyBankAccountByIdAndFamilyId } from "@/services/family/bank-account"
import { loanGivenTransaction } from "@/services/family/loan"
import { familyGivenLoanCreateFormSchema } from "@/features/family/schema/loan"

export const familyGivenLoanCreateAction = async (payload: unknown) => {
    try {
        const validation = familyGivenLoanCreateFormSchema.safeParse(payload)
        if (!validation.success) return failureResponse('Invalid Fields!')

        const {
            amount,
            familyLoanRecipientId,
            givenLoanDate,
            description,
            sourceBankId
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

        const existFamilySource = await getOnlyActiveFamilyBankAccountByIdAndFamilyId(sourceBankId, existFamily.id)

        if (!existFamilySource) return failureResponse('Inactive Source Bank!')

        const existFamilyLoanRecipient = await getOnlyActiveFamilyLoanProviderByIdAndFamilyId(familyLoanRecipientId, existFamily.id)

        if (!existFamilyLoanRecipient) return failureResponse('Inactive Loan Provider!')

        const deductedAmount = Number(existFamilySource.balance) - formattedAmount
        const recipientTotalDebt = Number(existFamilyLoanRecipient.totalDebt) + formattedAmount

        return await loanGivenTransaction(
            {
                amount,
                description,
                familyId: existFamily.id,
                familyLoanRecipientId: existFamilyLoanRecipient.id,
                loanStatus: 'DUE',
                loanDate: new Date(givenLoanDate),
                familySourceBankId: existFamilySource.id,
                remaining: amount
            },
            deductedAmount,
            recipientTotalDebt
        )
    } catch (error) {
        return failureResponse('failed to insert loan!', error)
    }
}
