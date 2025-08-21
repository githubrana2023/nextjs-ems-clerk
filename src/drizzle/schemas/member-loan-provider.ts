import { pgTable, uuid, text, numeric, boolean } from "drizzle-orm/pg-core";
import { familyTable } from "./family";
import { relations } from "drizzle-orm";
import { createdAt, updatedAt } from "../schema-helpers";
import { membersTable } from "./members";
import { memberLoanProviderBillsTable } from "./member-loan-provider-bill";
import { memberTakenLoanTable } from "./member-loan";


export const memberLoanProviderTable = pgTable('member_loan_provider', {
    id: uuid('id').primaryKey().unique().defaultRandom(),
    familyId: uuid('family_id').notNull().references(() => familyTable.id),
    memberId: uuid('member_id').notNull().references(() => membersTable.id),
    name: text('name').notNull(),
    phone: text('phone').notNull().unique(),
    totalDebt: numeric('total_debt', { precision: 7, scale: 2 }),
    isDeleted: boolean("is_deleted").default(false),
    createdAt,
    updatedAt
})


export const memberLoanProviderRelation = relations(memberLoanProviderTable, ({ one, many }) => ({
    family: one(familyTable, {
        relationName: 'relationBetweenMemberLoanProviderAndFamily',
        fields: [memberLoanProviderTable.familyId],
        references: [familyTable.id]
    }),
    member: one(membersTable, {
        relationName: 'relationBetweenMemberLoanProviderAndMember',
        fields: [memberLoanProviderTable.memberId],
        references: [membersTable.id]
    }),
    loanPayments: many(memberLoanProviderBillsTable, {
        relationName: 'relationBetweenMemberLoanProviderBillAndMemberLoanProvider',
    }),
    providedLoans: many(memberTakenLoanTable, {
        relationName: 'relationBetweenMemberTakenLoanAndMemberLoanProvider',
    })
}))