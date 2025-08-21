import { pgTable, uuid, timestamp, numeric, text, boolean } from "drizzle-orm/pg-core";
import { familyTable } from "./family";
import { relations } from "drizzle-orm";
import { createdAt, updatedAt } from "../schema-helpers";
import { membersTable } from "./members";
import { memberLoanProviderTable } from "./member-loan-provider";
import { memberTakenLoanTable } from "./member-loan";
import { memberBankAccountsTable } from "./member-bank-account";


export const memberLoanProviderBillsTable = pgTable('member_loan_provider_bill', {
    id: uuid('id').primaryKey().unique().defaultRandom(),
    familyId: uuid('family_id').notNull().references(() => familyTable.id),
    memberId: uuid('member_id').notNull().references(() => membersTable.id),
    memberLoanProviderId: uuid('member_loan_provider_id').notNull().references(() => memberLoanProviderTable.id),
    memberTakenLoanId: uuid('member_loan_id').notNull().references(() => memberTakenLoanTable.id),
    memberSourceBankId: uuid('member_source_bank_id').notNull().references(() => memberBankAccountsTable.id),

    amount: numeric('amount', { precision: 7, scale: 2 }).notNull(),
    description: text('description'),
    paymentDate: timestamp('payment_date', { withTimezone: true }).notNull(),
    totalDebt: numeric('total_debt', { precision: 7, scale: 2 }).notNull(),
    isCancel: boolean('isCancel').default(false),
    cancelReason: text('cancel_reason'),
    createdAt,
    updatedAt
})


export const memberLoanProviderBillsRelation = relations(memberLoanProviderBillsTable, ({ one }) => ({
    family: one(familyTable, {
        relationName: 'relationBetweenMemberLoanProviderBillAndFamily',
        fields: [memberLoanProviderBillsTable.familyId],
        references: [familyTable.id]
    }),
    member: one(membersTable, {
        relationName: 'relationBetweenMemberLoanProviderBillAndMember',
        fields: [memberLoanProviderBillsTable.memberId],
        references: [membersTable.id]
    }),
    memberLoanProvider: one(memberLoanProviderTable, {
        relationName: 'relationBetweenMemberLoanProviderBillAndMemberLoanProvider',
        fields: [memberLoanProviderBillsTable.memberLoanProviderId],
        references: [memberLoanProviderTable.id]
    }),
    memberTakenLoan: one(memberTakenLoanTable, {
        relationName: 'relationBetweenMemberLoanProviderBillAndMemberTakenLoan',
        fields: [memberLoanProviderBillsTable.memberTakenLoanId],
        references: [memberTakenLoanTable.id]
    }),
    memberSourceBank: one(memberBankAccountsTable, {
        relationName: 'relationBetweenMemberLoanProviderBillAndMemberSourceBank',
        fields: [memberLoanProviderBillsTable.memberSourceBankId],
        references: [memberBankAccountsTable.id]
    }),
}))