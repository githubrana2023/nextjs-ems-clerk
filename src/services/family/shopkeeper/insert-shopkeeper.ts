'use server'

import { db } from "@/drizzle/db"
import { familyShopkeepersTable } from "@/drizzle/schema"
import { ShopkeeperInsert } from "@/drizzle/type"

export const insertShopkeeper = async (values: ShopkeeperInsert) => {
    const [newShopkeeper] = await db.insert(familyShopkeepersTable).values(values).returning()
    return newShopkeeper
}