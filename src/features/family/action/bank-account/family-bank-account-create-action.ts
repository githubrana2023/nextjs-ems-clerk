'use server'

import { SendResponse } from "@/interface"
import { currentFamily } from "@/lib/current-family"
import { getFamilyById } from "@/services/family/get-family"
import { deleteCookie } from "@/lib/helpers"
import { TOKEN_KEY } from "@/constant/token-constant"
import { familyBankAccountCreateFormSchema } from "@/features/family/schema/bank-account"
import { getFamilyBankAccountByLbnAndFamilyId } from "@/services/family/bank-account"
import { insertFamilyBankAccount } from "@/services/family/bank-account"
import { revalidatePath } from "next/cache"
import { failureResponse, successResponse } from "@/lib/helpers/send-response"

export const familyBankAccountCreateAction = async <E extends Error>(input: unknown) => {
    try {
        const validation = familyBankAccountCreateFormSchema.safeParse(input)
        if (!validation.success) return failureResponse('Invalid Fields!')

        const { balance, lbn, name } = validation.data

        const loggedFamily = await currentFamily()
        if (!loggedFamily) return failureResponse('Unauthenticated Access!')

        const existFamily = await getFamilyById(loggedFamily.id)

        if (!existFamily) {
            await deleteCookie(TOKEN_KEY.FAMILY_ACCESS_TOKEN)
            await deleteCookie(TOKEN_KEY.MEMBER_ACCESS_TOKEN)
            return failureResponse('Unauthorized Access!')
        }

        const existFamilyBankAccountByLbn = await getFamilyBankAccountByLbnAndFamilyId(lbn, existFamily.id)

        if (existFamilyBankAccountByLbn) return failureResponse('Local Bank Number already taken!')

        const newFamilyBankAccount = await insertFamilyBankAccount({ name, lbn, balance, familyId: existFamily.id })

        revalidatePath(`/${existFamily.id}/bank-account`)

        return successResponse('Family Bank Account Created!',newFamilyBankAccount)
    } catch (error) {
        return {
            success: false,
            message: 'Failed to create family bank account!',
            data: null,
            error
        }
    }

}