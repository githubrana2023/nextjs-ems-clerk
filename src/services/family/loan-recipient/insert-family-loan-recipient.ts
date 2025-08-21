'use server'

import { db } from "@/drizzle/db"
import { familyLoanRecipientTable } from "@/drizzle/schema"
import { FamilyLoanRecipientInsert } from "@/drizzle/type"

export const insertFamilyLoanRecipient = async (payload:FamilyLoanRecipientInsert) => {
    const [newFamilyLoanRecipient]     = await db.insert(familyLoanRecipientTable).values(payload).returning()
    return newFamilyLoanRecipient
}