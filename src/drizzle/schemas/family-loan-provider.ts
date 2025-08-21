import { pgTable, uuid, text, numeric, boolean } from "drizzle-orm/pg-core";
import { familyTable } from "./family";
import { relations } from "drizzle-orm";
import { createdAt, updatedAt } from "../schema-helpers";
import { familyLoanProviderBillsTable } from "./family-loan-provider-bill";
import { familyTakenLoanTable } from "./family-loan";


export const familyLoanProviderTable = pgTable('family_loan_provider', {
    id: uuid('id').primaryKey().unique().defaultRandom(),
    familyId: uuid('family_id').notNull().references(() => familyTable.id),
    name: text('name').notNull(),
    phone: text('phone').notNull().unique(),
    totalDebt: numeric('total_debt', { precision: 7, scale: 2 }),
    isDeleted: boolean("is_deleted").default(false),
    createdAt,
    updatedAt
})


export const familyLoanProviderRelation = relations(familyLoanProviderTable, ({ one, many }) => ({
    family: one(familyTable, {
        relationName: 'relationBetweenFamilyLoanProviderAndFamily',
        fields: [familyLoanProviderTable.familyId],
        references: [familyTable.id]
    }),
    loanPayments: many(familyLoanProviderBillsTable, { relationName: 'relationBetweenFamilyLoanProviderBillAndFamilyLoanProvider' }),
    providedLoans: many(familyTakenLoanTable, { relationName: 'relationBetweenFamilyTakenLoanAndFamilyLoanProvider' })
}))