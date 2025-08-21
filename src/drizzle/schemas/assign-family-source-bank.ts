import { pgTable, uuid } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "@/drizzle/schema-helpers";
import { relations } from "drizzle-orm";
import { familyTrxNameTable } from "./family-trx-name";
import { familyBankAccountsTable } from "./family-bank-account";

export const assignFamilySourceBankTable = pgTable('assign_family_source_bank', {
  id: uuid('id').primaryKey().unique().defaultRandom(),
  familyTrxNameId: uuid('family_trx_name_id').notNull().references(() => familyTrxNameTable.id),
  familySourceBankId: uuid('family_source_bank_id').notNull().references(() => familyBankAccountsTable.id),
  createdAt,
  updatedAt,
})

export const assignFamilySourceBankRelation = relations(assignFamilySourceBankTable, ({ one }) => ({
  familyTrxName: one(familyTrxNameTable, {
    relationName: 'relationBetweenAssignFamilySourceBankAndFamilyTrxName',
    fields: [assignFamilySourceBankTable.familyTrxNameId],
    references: [familyTrxNameTable.id]
  }),
  familySourceBank: one(familyBankAccountsTable, {
    relationName: 'relationBetweenAssignFamilySourceBankAndFamilyBankAccount',
    fields: [assignFamilySourceBankTable.familySourceBankId],
    references: [familyBankAccountsTable.id]
  }),
}))