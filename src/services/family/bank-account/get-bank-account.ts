'use server'

import { db } from "@/drizzle/db"
import { familyBankAccountsTable } from "@/drizzle/schema"
import { DbFindMany } from "@/drizzle/type"
import { and, eq } from "drizzle-orm"

export const getAllFamilyBankAccountsByFamilyId = async (familyId: string, options?: DbFindMany<'familyBankAccountsTable'>) => (
    await db.query.familyBankAccountsTable.findMany({
        where: eq(familyBankAccountsTable.familyId, familyId),
        ...options
    })
)

export const getAllFamilyBankAccountByIdAndFamilyId = async (bankAccountId: string, familyId: string) => (
    await db.query.familyBankAccountsTable.findFirst({
        where: and(
            eq(familyBankAccountsTable.id, bankAccountId),
            eq(familyBankAccountsTable.familyId, familyId),
        ),
        with: {
            family: true
        }
    })
)


export const getFamilyBankAccountByLbnAndFamilyId = async (lbn: string, familyId: string) => (await db.query.familyBankAccountsTable.findFirst({
    where: and(
        eq(familyBankAccountsTable.lbn, lbn),
        eq(familyBankAccountsTable.familyId, familyId),
    )
}))







// only Active


export const getOnlyActiveFamilyBankAccountsByFamilyId = async (familyId: string, options?: DbFindMany<'familyBankAccountsTable'>) => (
    await db.query.familyBankAccountsTable.findMany({
        where: and(
            eq(familyBankAccountsTable.isDeleted, false),
            eq(familyBankAccountsTable.familyId, familyId),
            eq(familyBankAccountsTable.isDeleted, false),
        ),
        ...options
    })
)


export const getOnlyActiveFamilyBankAccountByIdAndFamilyId = async (bankAccountId: string, familyId: string) => (
    await db.query.familyBankAccountsTable.findFirst({
        where: and(
            eq(familyBankAccountsTable.id, bankAccountId),
            eq(familyBankAccountsTable.isDeleted, false),
            eq(familyBankAccountsTable.familyId, familyId),
        ),
        with: {
            family: true
        }
    })
)

export const getOnlyActiveFamilyBankAccountByLbnAndFamilyId = async (lbn: string, familyId: string) => (await db.query.familyBankAccountsTable.findFirst({
    where: and(
        eq(familyBankAccountsTable.lbn, lbn),
        eq(familyBankAccountsTable.isDeleted, false),
        eq(familyBankAccountsTable.familyId, familyId),
    )
}))


export const getOnlyActiveExistFamilySourceAndReceiveBankByIdAndFamilyId = async (
    sourceBankId: string | undefined,
    receiveBankId: string | undefined,
    familyId: string
) => {
    const [existFamilySourceBank, existFamilyReceiveBank] = await Promise.all([
        sourceBankId
            ? getOnlyActiveFamilyBankAccountByIdAndFamilyId(
                sourceBankId,
                familyId
            )
            : undefined,
        receiveBankId
            ? getOnlyActiveFamilyBankAccountByIdAndFamilyId(
                receiveBankId,
                familyId
            )
            : undefined
    ])
    return { existFamilySourceBank, existFamilyReceiveBank }
}