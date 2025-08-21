'use server'

import { TOKEN_KEY } from "@/constant/token-constant"
import { getCookie } from "./helpers"
import { verifyToken } from "./jose/sign"

export const currentMember = async () => {
    const token = await getCookie(TOKEN_KEY.MEMBER_ACCESS_TOKEN)
    if (!token) return
    const payload = await verifyToken(token)
    if (!payload) return
    return payload
}