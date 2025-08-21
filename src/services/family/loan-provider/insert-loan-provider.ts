'use server'
import { db } from "@/drizzle/db";
import { familyLoanProviderTable } from "@/drizzle/schema";
import { FamilyLoanProviderInsert } from "@/drizzle/type";

export const insertFamilyLoanProvider = async (payload: FamilyLoanProviderInsert) => {
    const [newFamilyLoanProvider] = await db.insert(familyLoanProviderTable).values(payload).returning()
    return newFamilyLoanProvider;
}