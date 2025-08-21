'use server'

import { currentFamily } from "@/lib/current-family"
import { familyTrxCreateFormSchema } from "../../schema/trx"
import { failureResponse, successResponse } from "@/lib/helpers/send-response"
import { getFamilyById } from "@/services/family/get-family"
import { deleteCookie } from "@/lib/helpers"
import { TOKEN_KEY } from "@/constant/token-constant"
import { getOnlyActiveFamilyTrxNameByIdAndFamilyId } from "@/services/family/trx-name"
import { revalidatePath } from "next/cache"
import { getOnlyActiveFamilyBankAccountByIdAndFamilyId } from "@/services/family/bank-account"
import { db } from "@/drizzle/db"
import { familyBankAccountsTable, familyTrxTable } from "@/drizzle/schema"
import { and, eq } from "drizzle-orm"

export const familyTrxCreateAction = async (payload: unknown) => {
    try {
        const validation = familyTrxCreateFormSchema.safeParse(payload)
        if (!validation.success) return failureResponse('Invalid Fields!')

        const loggedFamily = await currentFamily()
        if (!loggedFamily) return failureResponse('Unauthenticated Access!')

        const {
            name,
            description,
            amount,
            familyTrxNameId,
            familyReceiveBankId,
            familySourceBankId
        } = validation.data

        const formattedAmount = Number(amount)

        if(formattedAmount <= 0) return failureResponse('Amount should be grater than 0')

        if (!familySourceBankId && !familyReceiveBankId) return failureResponse('Please select a Bank!')

        const existFamily = await getFamilyById(loggedFamily.id)

        if (!existFamily) {
            await deleteCookie(TOKEN_KEY.FAMILY_ACCESS_TOKEN)
            await deleteCookie(TOKEN_KEY.MEMBER_ACCESS_TOKEN)
            return failureResponse('Unauthenticated Access!')
        }

        const existFamilyTrxName = await getOnlyActiveFamilyTrxNameByIdAndFamilyId(
            familyTrxNameId,
            existFamily.id
        )

        if (!existFamilyTrxName) return failureResponse('Transaction Name not found!')

        const [existFamilySourceBank, existFamilyReceiveBank] = await Promise.all([
            familySourceBankId
                ? getOnlyActiveFamilyBankAccountByIdAndFamilyId(familySourceBankId, existFamily.id)
                : undefined,

            familyReceiveBankId
                ? getOnlyActiveFamilyBankAccountByIdAndFamilyId(familyReceiveBankId, existFamily.id)
                : undefined,

        ])

        if (existFamilyTrxName.variant === 'BOTH') {
            if (!existFamilySourceBank || !existFamilyReceiveBank) return failureResponse('Make sure both account is active!')

            if (Number(existFamilySourceBank.balance) < formattedAmount) return failureResponse('Insufficient Balance!')

            const deductedAmount = (Number(existFamilySourceBank.balance) - formattedAmount).toString()
            const additionAmount = (Number(existFamilyReceiveBank.balance) + formattedAmount).toString()

            return await db.transaction(
                async (tx) => {

                    const [updatedFamilySourceBank] = await tx.update(familyBankAccountsTable).set({ balance: deductedAmount }).where(
                        and(
                            eq(familyBankAccountsTable.id, existFamilySourceBank.id),
                            eq(familyBankAccountsTable.familyId, existFamily.id),
                        )
                    ).returning()

                    const [updatedFamilyReceiveBank] = await tx.update(familyBankAccountsTable).set({ balance: additionAmount }).where(
                        and(
                            eq(familyBankAccountsTable.id, existFamilyReceiveBank.id),
                            eq(familyBankAccountsTable.familyId, existFamily.id),
                        )
                    ).returning()

                    if (!updatedFamilySourceBank || !updatedFamilyReceiveBank) {
                        tx.rollback()
                        return failureResponse('Rollback! Failed to Update balance!')
                    }

                    const [newFamilyTrx] = await tx.insert(familyTrxTable).values({
                        name,
                        description,
                        amount,
                        familyTrxNameId: existFamilyTrxName.id,
                        familyReceiveBankId: updatedFamilyReceiveBank.id,
                        familySourceBankId: updatedFamilySourceBank.id
                    }).returning()

                    if (!newFamilyTrx) {
                        tx.rollback()
                        return failureResponse('Rollback! Failed to insert Transaction!')
                    }
                    revalidatePath(`/${existFamily.id}/trx`)

                    return successResponse('Transaction Completed!', {
                        newFamilyTrx,
                        updatedFamilyReceiveBank,
                        updatedFamilySourceBank
                    })

                }
            )

        }

        if (existFamilyTrxName.variant === 'SOURCE') {

            return await db.transaction(
                async (tx) => {

                    if (!existFamilySourceBank) return failureResponse('Make sure source account is active!')

                    if (Number(existFamilySourceBank.balance) < formattedAmount) return failureResponse('Insufficient Balance!')

                    const deductedAmount = (Number(existFamilySourceBank.balance) - formattedAmount).toString()

                    const [updatedFamilySourceBank] = await tx.update(familyBankAccountsTable).set({ balance: deductedAmount }).where(
                        and(
                            eq(familyBankAccountsTable.id, existFamilySourceBank.id),
                            eq(familyBankAccountsTable.familyId, existFamily.id),
                        )
                    ).returning()

                    if (!updatedFamilySourceBank) return failureResponse('Transaction Rollback! Failed to Update balance!')

                    const [newFamilyTrx] = await tx.insert(familyTrxTable).values({
                        name,
                        description,
                        amount,
                        familyTrxNameId: existFamilyTrxName.id,
                        familySourceBankId: updatedFamilySourceBank.id
                    }).returning()

                    if (!newFamilyTrx) {
                        tx.rollback()
                        return failureResponse('Rollback! Failed to insert Transaction!')
                    }

                    revalidatePath(`/${existFamily.id}/trx`)

                    return successResponse('Transaction Completed!', {
                        newFamilyTrx,
                        updatedFamilySourceBank
                    })
                }
            )
        }


        if (!existFamilyReceiveBank) return failureResponse('Make sure receive account is active!')

        const additionAmount = (Number(existFamilyReceiveBank.balance) + formattedAmount).toString()

        return await db.transaction(
            async (tx) => {
                const [updatedFamilyReceiveBank] = await tx.update(familyBankAccountsTable).set({ balance: additionAmount }).where(
                    and(
                        eq(familyBankAccountsTable.id, existFamilyReceiveBank.id),
                        eq(familyBankAccountsTable.familyId, existFamily.id),
                    )
                ).returning()

                if (!updatedFamilyReceiveBank) return failureResponse('Failed to Update receive balance!')

                const [newFamilyTrx] = await tx.insert(familyTrxTable).values({
                    name,
                    description,
                    amount,
                    familyTrxNameId: existFamilyTrxName.id,
                    familyReceiveBankId: updatedFamilyReceiveBank.id,
                }).returning()

                if (!newFamilyTrx) {
                    tx.rollback()
                    return failureResponse('Rollback! Failed to insert Transaction!')
                }

                revalidatePath(`/${existFamily.id}/trx`)

                return successResponse('Transaction Completed!', {
                    updatedFamilyReceiveBank,
                })
            }
        )

    } catch (error) {
        console.log({ error, from: 'family trx create action' })
        return failureResponse('Transaction failed!')
    }
}