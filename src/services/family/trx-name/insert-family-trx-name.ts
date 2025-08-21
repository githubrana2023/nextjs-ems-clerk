'use server'

import { db } from "@/drizzle/db"
import { familyTrxNameTable } from "@/drizzle/schema"
import { FamilyTrxNameInsert } from "@/drizzle/type"

export const insertFamilyTrxName = async (input: FamilyTrxNameInsert) => {
    const [newFamilyTrxName] = await db.insert(familyTrxNameTable).values(input).returning()
    return newFamilyTrxName
}