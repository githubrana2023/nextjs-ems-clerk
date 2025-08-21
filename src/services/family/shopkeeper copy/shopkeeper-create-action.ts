'use server'

import { failureResponse, successResponse } from "@/lib/helpers/send-response"
import { familyShopkeeperCreateFormSchema } from "../../schema/shopkeeper"
import { currentFamily } from "@/lib/current-family"
import { getFamilyById } from "../../../../services/family/get-family"
import { deleteCookie } from "@/lib/helpers"
import { TOKEN_KEY } from "@/constant/token-constant"
import { getShopkeeperByPhoneAndFamilyId } from "../../../../services/family/shopkeeper"
import { insertShopkeeper } from "../../../../services/family/shopkeeper/insert-shopkeeper"
import { revalidatePath } from "next/cache"

export const familyShopkeeperCreateAction = async (payload: unknown) => {
    try {
        const validation = familyShopkeeperCreateFormSchema.safeParse(payload)
        if (!validation.success) return failureResponse('Invalid Fields!')

        const { phone, totalDebt, name } = validation.data

        const loggedFamily = await currentFamily()
        if (!loggedFamily) return failureResponse('Unauthenticated Access!')

        const existFamily = await getFamilyById(loggedFamily.id)

        if (!existFamily) {
            await deleteCookie(TOKEN_KEY.FAMILY_ACCESS_TOKEN)
            await deleteCookie(TOKEN_KEY.MEMBER_ACCESS_TOKEN)
            return failureResponse('Unauthorized Access!')
        }

        const existShopkeeper = await getShopkeeperByPhoneAndFamilyId(phone, existFamily.id)

        if (existShopkeeper) return failureResponse('Shopkeeper already exist with same number!')


        const newShopkeeper = await insertShopkeeper({
            name,
            phone,
            totalDebt,
            familyId: existFamily.id
        })

        if (!newShopkeeper) return failureResponse('Failed to insert Shopkeeper!')

        revalidatePath(`/${existFamily.id}/shopkeeper`)
        return successResponse('Shopkeeper Created!', newShopkeeper)


    } catch (error) {
        return failureResponse('Failed to Shopkeeper Create action!', error)
    }
}