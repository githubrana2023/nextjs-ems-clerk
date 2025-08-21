'use server'

import {
    assignFamilyBankFormSchema,
    AssignFamilyBankFormValue
} from "@/features/family/schema/trx-name"
import { SendResponse } from "@/interface"
import { currentFamily } from "@/lib/current-family"
import { getFamilyById } from "@/services/family/get-family"
import { deleteCookie } from "@/lib/helpers"
import { TOKEN_KEY } from "@/constant/token-constant"
import {
    getOnlyActiveFamilyTrxNameByIdAndFamilyId,
    getExistAssignedSourceAndReceiveBank
} from "@/services/family/trx-name"
import {
    getOnlyActiveExistFamilySourceAndReceiveBankByIdAndFamilyId
} from "@/services/family/bank-account"
import { db } from "@/drizzle/db"
import { assignFamilyReceiveBankTable, assignFamilySourceBankTable } from "@/drizzle/schema"
import { trxsNameReceiveByCash, trxsNameSourceByCash } from "@/constant/trx-name"
import { isInclude } from "@/lib/utils"
import { failureResponse, successResponse } from "@/lib/helpers/send-response"
import { revalidatePath } from "next/cache"

export interface AssignFamilyTrxNameResponse {
    source?: typeof assignFamilySourceBankTable.$inferSelect;
    receive?: typeof assignFamilyReceiveBankTable.$inferSelect;
}



export const assignFamilyTrxNameActions = async <
    E extends Error
>(
    input: AssignFamilyBankFormValue,
    familyTrxNameId: string
): Promise<SendResponse<AssignFamilyTrxNameResponse | null, E>> => {
    try {
        const validation = assignFamilyBankFormSchema.safeParse(input)
        if (!validation.success) return failureResponse('Invalid Fields!')

        const { receiveBankId, sourceBankId } = validation.data
        // if both bank id not provided
        if (!receiveBankId && !sourceBankId) return failureResponse('Please select a bank account!')

        // if family not logged in
        const loggedFamily = await currentFamily()
        if (!loggedFamily) return failureResponse('Unauthenticated Access!')

        // if logged family not register in db
        const existFamily = await getFamilyById(loggedFamily.id)
        if (!existFamily) {
            await deleteCookie(TOKEN_KEY.FAMILY_ACCESS_TOKEN)
            await deleteCookie(TOKEN_KEY.MEMBER_ACCESS_TOKEN)
            return failureResponse('Unauthorized Access!')
        }

        // if trx name not exist
        const existFamilyTrxName = await getOnlyActiveFamilyTrxNameByIdAndFamilyId(
            familyTrxNameId,
            existFamily.id
        )
        if (!existFamilyTrxName) return failureResponse('Invalid Transaction Name!')

        // getting exist source & receive bank
        const { existFamilySourceBank, existFamilyReceiveBank } = await getOnlyActiveExistFamilySourceAndReceiveBankByIdAndFamilyId(
            sourceBankId,
            receiveBankId,
            existFamily.id
        )

        if (sourceBankId && !existFamilySourceBank) return failureResponse('Invalid source bank account!')
        if (receiveBankId && !existFamilyReceiveBank) return failureResponse('Invalid receive bank account!')

        // getting exist assigned source & receive bank with trx name
        const { existAssignedFamilyReceiveBank, existAssignedFamilySourceBank } = await getExistAssignedSourceAndReceiveBank(
            existFamilySourceBank?.id,
            existFamilyReceiveBank?.id,
            existFamilyTrxName.id
        )

        //check if both bank already assigned under trx name
        if (existAssignedFamilyReceiveBank && existAssignedFamilySourceBank) return failureResponse('Selected Banks Already Assigned!')

        // Assign both
        if (existFamilyTrxName.variant === 'BOTH') {

            //check family have both bank to assign
            if (!existFamilyReceiveBank || !existFamilySourceBank) return failureResponse('Invalid Bank!')

            if (existFamilySourceBank.id === existFamilyReceiveBank.id) return failureResponse(
                'Source and Receive Bank should not be same!'
            )

            if (
                isInclude(trxsNameReceiveByCash, existFamilyTrxName.name)
                && existFamilyReceiveBank.name.toLocaleLowerCase() !== 'cash'
            ) return failureResponse("Receive Bank must be Cash")

            if (
                isInclude(trxsNameSourceByCash, existFamilyTrxName.name)
                && existFamilySourceBank.name.toLocaleLowerCase() !== 'cash'
            ) return failureResponse("Source Bank must be Cash")

            if (!existAssignedFamilyReceiveBank && !existAssignedFamilySourceBank) {
                return await db.transaction(
                    async (tx) => {
                        const [newAssignedSource] = await tx
                            .insert(assignFamilySourceBankTable)
                            .values({
                                familySourceBankId: existFamilySourceBank.id,
                                familyTrxNameId: existFamilyTrxName.id
                            })
                            .returning()

                        const [newAssignedReceive] = await tx
                            .insert(assignFamilyReceiveBankTable)
                            .values({
                                familyReceiveBankId: existFamilyReceiveBank.id,
                                familyTrxNameId: existFamilyTrxName.id
                            })
                            .returning()

                        if (!newAssignedSource || !newAssignedReceive) {
                            tx.rollback()
                            return failureResponse('Failed to assign both bank!')
                        }

                        revalidatePath(`/${existFamily.id}/trx/trx-name/${existFamilyTrxName.id}`)
                        
                        return successResponse('Assigned both source and receive banks.', {
                            source: newAssignedSource,
                            receive: newAssignedReceive
                        })
                    })
            }



            if (!existAssignedFamilyReceiveBank) {
                const [newAssignedReceive] = await db
                    .insert(assignFamilyReceiveBankTable)
                    .values({
                        familyReceiveBankId: existFamilyReceiveBank.id,
                        familyTrxNameId: existFamilyTrxName.id
                    })
                    .returning()

                if (!newAssignedReceive) return failureResponse('Failed to assign receive bank!')

                revalidatePath(`/${existFamily.id}/trx/trx-name/${existFamilyTrxName.id}`)

                return successResponse('Assigned receive bank!', {
                    receive: newAssignedReceive
                })
            }

            const [newAssignedSource] = await db
                .insert(assignFamilySourceBankTable)
                .values({
                    familySourceBankId: existFamilySourceBank.id,
                    familyTrxNameId: existFamilyTrxName.id
                })
                .returning()

            if (!newAssignedSource) return failureResponse('Failed to assign source bank!')

            revalidatePath(`/${existFamily.id}/trx/trx-name/${existFamilyTrxName.id}`)

            return successResponse('Assigned source bank!', {
                source: newAssignedSource
            })

        }

        // Assign only source
        if (existFamilyTrxName.variant === 'SOURCE') {

            if (!existFamilySourceBank) return failureResponse('Source bank not found!')
            if (existAssignedFamilySourceBank) return failureResponse('Source bank already assigned!')

            const [newAssignedSource] = await db
                .insert(assignFamilySourceBankTable)
                .values({
                    familySourceBankId: existFamilySourceBank.id,
                    familyTrxNameId: existFamilyTrxName.id
                })
                .returning()

            if (!newAssignedSource) return failureResponse('Failed to assign source bank!')

            revalidatePath(`/${existFamily.id}/trx/trx-name/${existFamilyTrxName.id}`)
            return successResponse('Assigned source bank.', { source: newAssignedSource })
        }

        // Assign only receive

        if (!existFamilyReceiveBank) return failureResponse('Receive bank not found!')
        if (existAssignedFamilyReceiveBank) return failureResponse('Receive bank already assigned!')

        const [newAssignedReceive] = await db
            .insert(assignFamilyReceiveBankTable)
            .values({
                familyReceiveBankId: existFamilyReceiveBank.id,
                familyTrxNameId: existFamilyTrxName.id
            })
            .returning()

        if (!newAssignedReceive) return failureResponse('Failed to assign receive bank!')

        revalidatePath(`/${existFamily.id}/trx/trx-name/${existFamilyTrxName.id}`)

        return successResponse('Assigned receive bank.', { receive: newAssignedReceive })
    } catch (error) {
        return failureResponse('Something went wrong!')
    }
}
