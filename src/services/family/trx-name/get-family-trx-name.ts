'use server'

import { db } from "@/drizzle/db"
import { familyTrxNameTable } from "@/drizzle/schema"
import { DbFindFirst, DbFindMany } from "@/drizzle/type"
import { and, eq } from "drizzle-orm"

export const getFamilyTrxNameByNameAndFamilyId = async (name: string, familyId: string, options?: DbFindFirst<'familyTrxNameTable'>) => await db.query.familyTrxNameTable.findFirst({
    where: and(
        eq(familyTrxNameTable.name, name),
        eq(familyTrxNameTable.familyId, familyId)
    ),
    ...options
})

export const getFamilyTrxNameByIdAndFamilyId = async (id: string, familyId: string, options?: DbFindFirst<'familyTrxNameTable'>) => await db.query.familyTrxNameTable.findFirst({
    where: and(
        eq(familyTrxNameTable.id, id),
        eq(familyTrxNameTable.familyId, familyId),
    ),
    ...options
})


export const getAllFamilyTrxNameByFamilyId = async (familyId: string, options?: DbFindMany<'familyTrxNameTable'>) => await db.query.familyTrxNameTable.findMany({
    where: and(
        eq(familyTrxNameTable.familyId, familyId),
    ),
    ...options
})




//Only Active
export const getOnlyActiveFamilyTrxNameByIdAndFamilyId = async (id: string, familyId: string, options?: DbFindFirst<'familyTrxNameTable'>) => await db.query.familyTrxNameTable.findFirst({
    where: and(
        eq(familyTrxNameTable.id, id),
        eq(familyTrxNameTable.familyId, familyId),
        eq(familyTrxNameTable.isDeleted, false),
    ),
    ...options
})


export const getOnlyActiveFamilyTrxNameByFamilyId = async (familyId: string, options?: DbFindMany<'familyTrxNameTable'>) => await db.query.familyTrxNameTable.findMany({
    where: and(
        eq(familyTrxNameTable.familyId, familyId),
        eq(familyTrxNameTable.isDeleted, false),
    ),
    ...options
})