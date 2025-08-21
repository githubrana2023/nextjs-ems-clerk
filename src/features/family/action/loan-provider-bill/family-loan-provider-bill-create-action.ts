'use server'

import { TOKEN_KEY } from "@/constant/token-constant"
import { db } from "@/drizzle/db"
import { familyBankAccountsTable, familyLoanProviderBillsTable, familyLoanProviderTable, familyTakenLoanTable } from "@/drizzle/schema"
import { familyLoanProviderBillCreateSchema } from "@/features/family/schema/loan-provider-bill"
import { currentFamily } from "@/lib/current-family"
import { deleteCookie } from "@/lib/helpers"
import { failureResponse, successResponse } from "@/lib/helpers/send-response"
import { getOnlyActiveFamilyBankAccountByIdAndFamilyId } from "@/services/family/bank-account"
import { getFamilyById } from "@/services/family/get-family"
import { getDueFamilyTokenLoanByIdAndFamilyIdAndProviderId } from "@/services/family/loan"
import { getOnlyActiveFamilyLoanProviderByIdAndFamilyId } from "@/services/family/loan-provider"
import { and, eq } from "drizzle-orm"

export const familyLoanProviderBillCreateAction = async (payload: unknown) => {
    try {
        const validation = familyLoanProviderBillCreateSchema.safeParse(payload)
        if (!validation.success) return failureResponse('Invalid Fields!')

        const {
            amount,
            familyLoanProviderId,
            familyTakenLoanId,
            paymentDate,
            sourceBankId,
            description,
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

        const existFamilySourceBank = await getOnlyActiveFamilyBankAccountByIdAndFamilyId(sourceBankId, existFamily.id)

        if (!existFamilySourceBank) return failureResponse('Inactive Bank Account!')

        const existFamilyLoanProvider = await getOnlyActiveFamilyLoanProviderByIdAndFamilyId(familyLoanProviderId, existFamily.id)

        if (!existFamilyLoanProvider) return failureResponse('Inactive Loan Provider!')

        const existFamilyTakenLoan = await getDueFamilyTokenLoanByIdAndFamilyIdAndProviderId(
            familyTakenLoanId,
            existFamily.id,
            existFamilyLoanProvider.id
        )

        if (!existFamilyTakenLoan) return failureResponse('Family taken loan not found!')

        if (
            existFamilyTakenLoan.loanStatus === 'FULLY-PAID'
            && Number(existFamilyTakenLoan.remaining) === 0
        ) return failureResponse('This loan is already paid!')

        const balance = Number(existFamilySourceBank.balance)
        const providerTotalDebt = Number(existFamilyLoanProvider.totalDebt)
        const remaining = Number(existFamilyTakenLoan.remaining)

        const isBalanceLessThanAmount = balance < formattedAmount
        const isProviderTotalDebtLessThanAmount = providerTotalDebt < formattedAmount
        const isRemainingLessThanAmount = remaining < formattedAmount


        if (isBalanceLessThanAmount
            || isProviderTotalDebtLessThanAmount
            || isRemainingLessThanAmount
        ) return failureResponse(
            isBalanceLessThanAmount
                ? "Insufficient Balance!"
                : isProviderTotalDebtLessThanAmount
                    ? 'Due loan is less than you are paying!'
                    : 'Remaining loan is less than your are paying!'
        )

        const deductedBalance = balance - formattedAmount
        const deductedProviderTotalDebt = providerTotalDebt - formattedAmount
        const deductedRemaining = remaining - formattedAmount

        return await db.transaction(
            async (tx) => {
                const [newFamilyLoanProviderBill] = await tx.insert(familyLoanProviderBillsTable).values(
                    {
                        amount,
                        description,
                        familyId: existFamily.id,
                        familyLoanProviderId: existFamilyLoanProvider.id,
                        sourceBankId: existFamilySourceBank.id,
                        familyTakenLoanId: existFamilyTakenLoan.id,
                        paymentDate: new Date(paymentDate),
                        remaining: deductedRemaining.toString(),
                    }
                ).returning()

                const [updatedLoan] = await tx.update(familyTakenLoanTable).set({
                    remaining: deductedRemaining.toString(),
                    loanStatus: deductedRemaining === 0 ? 'FULLY-PAID' : 'DUE',
                }).where(
                    and(
                        eq(familyTakenLoanTable.id, existFamilyTakenLoan.id),
                        eq(familyTakenLoanTable.familyId, existFamily.id),
                        eq(familyTakenLoanTable.loanProviderId, existFamilyLoanProvider.id)
                    )
                ).returning()

                const [updatedLoanProvider] = await tx.update(familyLoanProviderTable).set({
                    totalDebt: deductedProviderTotalDebt.toString(),
                }).where(
                    and(
                        eq(familyLoanProviderTable.id, existFamilyLoanProvider.id),
                        eq(familyLoanProviderTable.familyId, existFamily.id),
                        eq(familyLoanProviderTable.isDeleted, false)
                    )
                ).returning()

                const [updatedSourceBank] = await tx.update(familyBankAccountsTable).set({
                    balance: deductedBalance.toString(),
                }).where(
                    and(
                        eq(familyBankAccountsTable.id, existFamilySourceBank.id),
                        eq(familyBankAccountsTable.familyId, existFamily.id),
                        eq(familyBankAccountsTable.isDeleted, false)
                    )
                ).returning()

                if (!newFamilyLoanProviderBill || !updatedLoan || !updatedLoanProvider || !updatedSourceBank) {
                    return failureResponse('Failed to paid the loan!')
                }

                return successResponse(
                    'Loan paid successfully!',
                    {
                        newFamilyLoanProviderBill,
                        updatedLoan,
                        updatedLoanProvider,
                        updatedSourceBank
                    }
                )
            }
        )
    } catch (error) {
        return failureResponse('Failed to create loan provider bill!', error)
    }
}