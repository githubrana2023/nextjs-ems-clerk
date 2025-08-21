import { pgTable, uuid, text, boolean } from "drizzle-orm/pg-core";
import { createdAt, trxNameVariant, updatedAt } from "@/drizzle/schema-helpers";
import { familyTable } from "./family";
import { relations } from "drizzle-orm";
import { assignFamilyReceiveBankTable } from "./assign-family-receive-bank";
import { familyTrxTable } from "./family-trx";
import { assignFamilySourceBankTable } from "./assign-family-source-bank";

export const familyTrxNameTable = pgTable('family_trx_name', {
    id: uuid('id').primaryKey().unique().defaultRandom(),
    familyId: uuid('family_id').notNull().references(() => familyTable.id),
    name: text('name').notNull(),
    variant: text('variant', { enum: trxNameVariant }).notNull(),
    isDeleted: boolean("is_deleted").default(false),
    createdAt,
    updatedAt
})

export const familyTrxNameRelations = relations(familyTrxNameTable, ({ one,many }) => ({
    family: one(familyTable, {
        relationName: 'relationBetweenFamilyTransactionNameAndFamily',
        fields: [familyTrxNameTable.familyId],
        references: [familyTable.id]
    }),
    familyTransactions: many(familyTrxTable, {
        relationName: 'relationBetweenFamilyTransactionAndFamilyTractionName',
    }),
    assignedReceiveBanks: many(assignFamilyReceiveBankTable, {
        relationName: 'relationBetweenAssignFamilyReceiveBankAndFamilyTransactionName',
    }),
    assignedSourceBanks: many(assignFamilySourceBankTable, {
        relationName: 'relationBetweenAssignFamilySourceBankAndFamilyTrxName',
    })
}))

