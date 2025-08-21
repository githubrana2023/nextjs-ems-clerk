'use server'

import { SendResponse } from "@/interface"
import { currentFamily } from "@/lib/current-family"
import { getFamilyById } from "@/services/family/get-family"
import { deleteCookie } from "@/lib/helpers"
import { TOKEN_KEY } from "@/constant/token-constant"
import { familyTrxNameCreateFormSchema, FamilyTrxNameFormValue } from "@/features/family/schema/trx-name"
import { getFamilyTrxNameByNameAndFamilyId,insertFamilyTrxName } from "@/services/family/trx-name"
import { revalidatePath } from "next/cache"


export const familyTrxNameCreateAction = async (payload: FamilyTrxNameFormValue): Promise<SendResponse<unknown, Error>> => {
    try {
        const loggedFamily = await currentFamily()
        if (!loggedFamily) return {
            success: false,
            message: 'Unauthenticated Access!',
            data: null,
            error: null
        }

        const validation = familyTrxNameCreateFormSchema.safeParse(payload)
        if (!validation.success) return {
            success: false,
            message: 'Invalid Fields!',
            data: null,
            error: null
        }
        const { name, variant } = validation.data

        const existFamily = await getFamilyById(loggedFamily.id)

        if (!existFamily) {
            await deleteCookie(TOKEN_KEY.FAMILY_ACCESS_TOKEN)
            return {
                success: false,
                message: 'Unauthenticated Access!',
                data: null,
                error: null
            }
        }

        const existFamilyTrxName = await getFamilyTrxNameByNameAndFamilyId(name, existFamily.id)

        if (existFamilyTrxName) return {
            success: false,
            message: 'Trx Name already exist!',
            data: null,
            error: null
        }

        const newFamilyTrxName = await insertFamilyTrxName({
            name,
            variant,
            familyId:existFamily.id
        })

        revalidatePath(`/${existFamily.id}/trx`)

        return {
            success: true,
            message: 'Transaction Name created!',
            data: newFamilyTrxName,
            error: null
        }
    } catch (error) {
        return {
            success: false,
            message: '',
            data: null,
            error
        }
    }
}