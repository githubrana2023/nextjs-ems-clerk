'use server'

import { db } from "@/drizzle/db"
import { membersTable } from "@/drizzle/schema"
import { and, eq, or } from "drizzle-orm"

export const getMemberByFamilyId = async (familyId: string) => (
    await db.query.membersTable.findFirst({
        where: eq(membersTable.familyId, familyId)
    }))

export const getMemberByIdAndFamilyId = async (id: string, familyId: string) => (
    await db.query.membersTable.findFirst({
        where: and(
            eq(membersTable.id, id),
            eq(membersTable.familyId, familyId)
        )
    }))

export const getMemberByPhoneOrEmail = async (phone: string, email: string) => (
    await db.query.membersTable.findFirst({
        where: or(
            eq(membersTable.phone, phone),
            eq(membersTable.email, email)
        )
    }))