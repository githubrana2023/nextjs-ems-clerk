'use server'

import { db } from "@/drizzle/db"
import { membersTable } from "@/drizzle/schema"

export const insertMember = async (member: typeof membersTable.$inferInsert) => {
    const [newMember] = await db.insert(membersTable).values(member).returning()
    return newMember
}