import { boolean, numeric, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { familyTrxNameTable } from "./family-trx-name";
import { familyBankAccountsTable } from "./family-bank-account";
import { createdAt, updatedAt } from "@/drizzle/schema-helpers";
import { familyTable } from "./family";


export const familyTrxTable = pgTable('family_transaction', {
    id: uuid('id').primaryKey().unique().defaultRandom(),
    name: text('trx_name').notNull(),
    amount: numeric('amount', { precision: 7, scale: 2 }).notNull(),
    description: text('description'),
    familyId: uuid('family_id').notNull().references(() => familyTable.id),
    familyTrxNameId: uuid('family_trx_name_id').notNull().references(() => familyTrxNameTable.id),
    familySourceBankId: uuid('family_source_bank_id').references(() => familyBankAccountsTable.id),
    familyReceiveBankId: uuid('family_receive_bank_id').references(() => familyBankAccountsTable.id),
    isCancel: boolean('isCancel').default(false),
    cancelReason: text('cancel_reason'),
    createdAt,
    updatedAt,
})

export const familyTrxRelation = relations(familyTrxTable, ({ one }) => ({
    family: one(familyTable, {
        relationName: 'relationBetweenFamilyAndFamilyTrx',
        fields: [familyTrxTable.familyId],
        references: [familyTable.id]
    }),
    familyTrxName: one(familyTrxNameTable, {
        relationName: 'relationBetweenFamilyTransactionAndFamilyTractionName',
        fields: [familyTrxTable.familyTrxNameId],
        references: [familyTrxNameTable.id]
    }),
    familySourceBank: one(familyBankAccountsTable, {
        relationName: 'relationBetweenFamilyTransactionAndFamilySourceBank',
        fields: [familyTrxTable.familySourceBankId],
        references: [familyBankAccountsTable.id]
    }),
    familyReceiveBank: one(familyBankAccountsTable, {
        relationName: 'relationBetweenFamilyTransactionAndFamilyReceiveBank',
        fields: [familyTrxTable.familyReceiveBankId],
        references: [familyBankAccountsTable.id]
    }),
}))