'use server'

import { db } from "@/drizzle/db"
import { familyTakenLoanTable } from "@/drizzle/schema"
import { DbFindFirst } from "@/drizzle/type"
import { and, eq } from "drizzle-orm"


export const getDueFamilyTokenLoanByIdAndFamilyIdAndProviderId = async (
    id: string,
    familyId: string,
    loanProviderId: string,
    options?: DbFindFirst<'familyTakenLoanTable'>
) => {
    return await db.query.familyTakenLoanTable.findFirst({
        where: and(
            eq(familyTakenLoanTable.id, id),
            eq(familyTakenLoanTable.familyId, familyId),
            eq(familyTakenLoanTable.loanProviderId, loanProviderId),
            eq(familyTakenLoanTable.loanStatus, 'DUE'),
        ),
        ...options
    })
}