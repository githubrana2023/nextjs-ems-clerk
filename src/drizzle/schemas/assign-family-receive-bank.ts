import { pgTable, uuid } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "@/drizzle/schema-helpers";
import { relations } from "drizzle-orm";
import { familyTrxNameTable } from "./family-trx-name";
import { familyBankAccountsTable } from "./family-bank-account";

export const assignFamilyReceiveBankTable = pgTable('assign_family_receive_bank', {
  id: uuid('id').primaryKey().unique().defaultRandom(),
  familyTrxNameId: uuid('family_trx_name_id').notNull().references(() => familyTrxNameTable.id),
  familyReceiveBankId: uuid('family_receive_bank_id').notNull().references(() => familyBankAccountsTable.id),
  createdAt,
  updatedAt,
})

export const assignFamilyReceiveBankRelation = relations(assignFamilyReceiveBankTable, ({ one }) => ({
  familyTrxName: one(familyTrxNameTable, {
    relationName: 'relationBetweenAssignFamilyReceiveBankAndFamilyTransactionName',
    fields: [assignFamilyReceiveBankTable.familyTrxNameId],
    references: [familyTrxNameTable.id]
  }),
  familyReceiveBank: one(familyBankAccountsTable, {
    relationName: 'relationBetweenAssignFamilyReceiveBankAndFamilyBankAccount',
    fields: [assignFamilyReceiveBankTable.familyReceiveBankId],
    references: [familyBankAccountsTable.id]
  }),
}))