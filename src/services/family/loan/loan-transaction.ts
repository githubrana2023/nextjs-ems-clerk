'use server'

import { db } from "@/drizzle/db"
import { familyBankAccountsTable, familyLoanProviderTable, familyGivenLoanTable, familyTakenLoanTable, familyLoanRecipientTable } from "@/drizzle/schema"
import { FamilyGivenLoanInsert, FamilyTakenLoanInsert } from "@/drizzle/type"
import { failureResponse, successResponse } from "@/lib/helpers/send-response"
import { and, eq } from "drizzle-orm"

export const loanGivenTransaction = async (
    loanValues: FamilyGivenLoanInsert,
    deductedAmount: number,
    recipientTotalDebt:number
) => {
    return await db.transaction(
        async (tx) => {

            const [newLoan] = await tx.insert(familyGivenLoanTable).values(loanValues).returning()

            const [updatedBank] = await tx.update(familyBankAccountsTable)
                .set({
                    balance: deductedAmount.toString()
                })
                .where(
                    and(
                        eq(familyBankAccountsTable.id, loanValues.familySourceBankId),
                        eq(familyBankAccountsTable.familyId, loanValues.familyId),
                        eq(familyBankAccountsTable.isDeleted, false),
                    )
                )
                .returning()

                const [updatedFamilyLoanRecipient] = await tx.update(familyLoanRecipientTable).set({
                    totalDebt:recipientTotalDebt.toString()
                })
                .where(
                    and(
                        eq(familyLoanRecipientTable.id,loanValues.familyLoanRecipientId),
                        eq(familyLoanRecipientTable.familyId,loanValues.familyId),
                        eq(familyLoanRecipientTable.isDeleted,false)
                    )
                ).returning()

            if (!newLoan || !updatedBank||!updatedFamilyLoanRecipient) {
                tx.rollback()
                return failureResponse('Failed to give loan!')
            }

            return successResponse('Loan successfully given!', { newLoan, updatedBank })
        }
    )
}



export const loanTakeTransaction = async (
    loanValues: FamilyTakenLoanInsert,
    addedAmount: number,
    providerTotalDebt: number,
) => {


    return await db.transaction(
        async (tx) => {

            const [newLoan] = await tx.insert(familyTakenLoanTable).values(loanValues).returning()

            const [updatedBank] = await tx.update(familyBankAccountsTable)
                .set({
                    balance: addedAmount.toString()
                })
                .where(
                    and(
                        eq(familyBankAccountsTable.id, loanValues.receiveBankId),
                        eq(familyBankAccountsTable.familyId, loanValues.familyId),
                        eq(familyBankAccountsTable.isDeleted, false),
                    )
                )
                .returning()

            const [updatedLoanProvider] = await tx.update(familyLoanProviderTable)
                .set({
                    totalDebt: providerTotalDebt.toString()
                })
                .where(
                    and(
                        eq(familyLoanProviderTable.id, loanValues.loanProviderId),
                        eq(familyLoanProviderTable.familyId, loanValues.familyId),
                        eq(familyLoanProviderTable.isDeleted, false),
                    )
                )
                .returning()

            if (!newLoan || !updatedBank || !updatedLoanProvider) {
                tx.rollback()
                return failureResponse('Failed to take loan!')
            }

            return successResponse('Loan successfully taken!', { newLoan, updatedBank })
        }
    )
}