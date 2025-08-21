import { pgTable, uuid, timestamp, numeric, text, boolean } from "drizzle-orm/pg-core";
import { familyTable } from "./family";
import { relations } from "drizzle-orm";
import { createdAt, updatedAt } from "../schema-helpers";
import { familyLoanProviderTable } from "./family-loan-provider";
import { familyBankAccountsTable } from "./family-bank-account";
import { familyTakenLoanTable } from "./family-loan";


export const familyLoanProviderBillsTable = pgTable('family_loan_provider_bill', {
    id: uuid('id').primaryKey().unique().defaultRandom(),
    familyId: uuid('family_id').notNull().references(() => familyTable.id),
    familyLoanProviderId: uuid('family_loan_provider_id').notNull().references(() => familyLoanProviderTable.id),
    familyTakenLoanId: uuid('family_taken_loan_id').notNull().references(() => familyTakenLoanTable.id),
    sourceBankId: uuid('source_bank_id').notNull().references(() => familyBankAccountsTable.id),

    amount: numeric('amount', { precision: 7, scale: 2 }).notNull(),
    description: text('description'),
    paymentDate: timestamp('payment_date', { withTimezone: true }).notNull(),
    remaining: numeric('total_remaining', { precision: 7, scale: 2 }).notNull(),
    isCancel: boolean('isCancel').default(false),
    cancelReason: text('cancel_reason'),
    createdAt,
    updatedAt
})


export const familyLoanProviderBillsRelation = relations(familyLoanProviderBillsTable, ({ one }) => ({
    family: one(familyTable, {
        relationName: 'relationBetweenFamilyLoanProviderBillAndFamily',
        fields: [familyLoanProviderBillsTable.familyId],
        references: [familyTable.id]
    }),
    familyLoanProvider: one(familyLoanProviderTable, {
        relationName: 'relationBetweenFamilyLoanProviderBillAndFamilyLoanProvider',
        fields: [familyLoanProviderBillsTable.familyLoanProviderId],
        references: [familyLoanProviderTable.id]
    }),
    familyTakenLoan: one(familyTakenLoanTable, {
        relationName: 'relationBetweenFamilyLoanProviderBillAndFamilyTakenLoan',
        fields: [familyLoanProviderBillsTable.familyTakenLoanId],
        references: [familyTakenLoanTable.id]
    }),
    sourceBank: one(familyBankAccountsTable, {
        relationName: 'relationBetweenFamilyLoanProviderBillAndFamilySourceBank',
        fields: [familyLoanProviderBillsTable.sourceBankId],
        references: [familyBankAccountsTable.id]
    })
}))