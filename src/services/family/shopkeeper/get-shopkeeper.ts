'use server'
import { db } from "@/drizzle/db"
import { familyShopkeepersTable } from "@/drizzle/schema"
import { DbFindFirst, DbFindMany, DbFindManyReturnType } from "@/drizzle/type"
import { and, eq } from "drizzle-orm"

export const getShopkeeperByPhoneAndFamilyId = async (phone: string, familyId: string, options?: DbFindFirst<'familyShopkeepersTable'>) => (
    await db.query.familyShopkeepersTable.findFirst({
        where: and(
            eq(familyShopkeepersTable.phone, phone),
            eq(familyShopkeepersTable.familyId, familyId),
        ),
        ...options
    })
)



export const getAllShopkeepersByFamilyId = async (familyId: string, options?: DbFindMany<'familyShopkeepersTable'>): Promise<Awaited<DbFindManyReturnType<'familyShopkeepersTable'>>> => (
    await db.query.familyShopkeepersTable.findMany({
        where: eq(familyShopkeepersTable.familyId, familyId),
        ...options
    })
)






// only active

export const getOnlyActiveShopkeeperByPhoneAndFamilyId = async (phone: string, familyId: string, options?: DbFindFirst<'familyShopkeepersTable'>) => (
    await db.query.familyShopkeepersTable.findFirst({
        where: and(
            eq(familyShopkeepersTable.phone, phone),
            eq(familyShopkeepersTable.familyId, familyId),
            eq(familyShopkeepersTable.isDeleted, false),
        ),
        ...options
    })
)


