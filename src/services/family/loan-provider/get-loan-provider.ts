import { db } from "@/drizzle/db";
import { familyLoanProviderTable } from "@/drizzle/schema";
import { DbFindFirst } from "@/drizzle/type";
import { and, eq } from "drizzle-orm";

export const getFamilyLoanProviderByIdAndFamilyId = async (id: string, familyId: string, options?: DbFindFirst<'familyLoanProviderTable'>) => (
    await db.query.familyLoanProviderTable.findFirst({
        where: and(
            eq(familyLoanProviderTable.id, id),
            eq(familyLoanProviderTable.familyId, familyId),
        ),
        ...options
    })
)

export const getFamilyLoanProviderByPhoneAndFamilyId = async (phone: string, familyId: string, options?: DbFindFirst<'familyLoanProviderTable'>) => (
    await db.query.familyLoanProviderTable.findFirst({
        where: and(
            eq(familyLoanProviderTable.id, phone),
            eq(familyLoanProviderTable.familyId, familyId),
        ),
        ...options
    })
)







//! only active
export const getOnlyActiveFamilyLoanProviderByIdAndFamilyId = async (id: string, familyId: string, options?: DbFindFirst<'familyLoanProviderTable'>) => (
    await db.query.familyLoanProviderTable.findFirst({
        where: and(
            eq(familyLoanProviderTable.id, id),
            eq(familyLoanProviderTable.familyId, familyId),
            eq(familyLoanProviderTable.isDeleted, false),
        ),
        ...options
    })
)


export const getOnlyActiveFamilyLoanProviderByPhoneAndFamilyId = async (phone: string, familyId: string, options?: DbFindFirst<'familyLoanProviderTable'>) => (
    await db.query.familyLoanProviderTable.findFirst({
        where: and(
            eq(familyLoanProviderTable.id, phone),
            eq(familyLoanProviderTable.familyId, familyId),
            eq(familyLoanProviderTable.isDeleted, false),
        ),
        ...options
    })
)
