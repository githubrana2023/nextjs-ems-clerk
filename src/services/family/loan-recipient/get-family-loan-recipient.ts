'use server'

import { db } from "@/drizzle/db"
import { familyLoanRecipientTable } from "@/drizzle/schema"
import { DbFindFirst } from "@/drizzle/type"
import { and, eq } from "drizzle-orm"


export const getFamilyLoanRecipientByPhoneAndFamilyId = async (phone:string,familyId:string,options?:DbFindFirst<'familyLoanRecipientTable'>) => {
    return await db.query.familyLoanRecipientTable.findFirst({
        where:and(
            eq(familyLoanRecipientTable.phone,phone),
            eq(familyLoanRecipientTable.familyId,familyId),
        ),
        ...options
    })
    
}




// only active

export const getOnlyActiveFamilyLoanRecipientByPhoneAndFamilyId = async (phone:string,familyId:string,options?:DbFindFirst<'familyLoanRecipientTable'>) => {
    return await db.query.familyLoanRecipientTable.findFirst({
        where:and(
            eq(familyLoanRecipientTable.phone,phone),
            eq(familyLoanRecipientTable.familyId,familyId),
            eq(familyLoanRecipientTable.isDeleted,false),
        ),
        ...options
    })
    
}