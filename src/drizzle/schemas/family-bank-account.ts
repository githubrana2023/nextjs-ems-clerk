import { boolean, numeric, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "@/drizzle/schema-helpers";
import { relations } from "drizzle-orm";
import { familyTable } from "./family";
import { familyTrxTable } from "./family-trx";
import { assignFamilyReceiveBankTable } from "./assign-family-receive-bank";
import { assignFamilySourceBankTable } from "./assign-family-source-bank";
import { familyLoanProviderBillsTable } from "./family-loan-provider-bill";
import { familyLoanRecipientPaymentTable } from "./family-loan-recipient-payment";
import { familyTakenLoanTable } from "./family-loan";

export const familyBankAccountsTable = pgTable('family_bank_accounts', {
    id: uuid('id').primaryKey().unique().defaultRandom(),
    familyId: uuid('family_id').notNull().references(() => familyTable.id),
    name: text('name').unique().notNull(),
    balance: numeric('balance', { precision: 7, scale: 2 }).notNull(),
    lbn: text('local_bank_number').notNull().unique(),
    description: text('description'),
    isDeleted: boolean("is_deleted").default(false),
    createdAt,
    updatedAt,
})


export const familyBankAccountsRelation = relations(familyBankAccountsTable, ({ one, many }) => ({
    family: one(familyTable, {
        relationName: 'relationBetweenFamilyBankAccountAndFamily',
        fields: [familyBankAccountsTable.familyId],
        references: [familyTable.id]
    }
    ),

    familySourceTransactions: many(familyTrxTable, { relationName: 'relationBetweenFamilyTransactionAndFamilySourceBank', }),

    assignedReceiveTransactionsName: many(assignFamilyReceiveBankTable, {
        relationName: 'relationBetweenAssignFamilyReceiveBankAndFamilyBankAccount',
    }),
    assignedSourceTransactionsName: many(assignFamilySourceBankTable, {
        relationName: 'relationBetweenAssignFamilySourceBankAndFamilyBankAccount',
    }),

    loanPaids: many(familyLoanProviderBillsTable, { relationName: 'relationBetweenFamilyLoanProviderBillAndFamilySourceBank' }),
    givenLoanPayments: many(familyLoanRecipientPaymentTable, { relationName: 'relationBetweenFamilyLoanRecipientPaymentAndFamilyReceiveBank' }),
    takenLoans: many(familyTakenLoanTable, { relationName: 'relationBetweenFamilyTakenLoanAndFamilyReceiveBank' }),

}))
