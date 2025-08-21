import { pgTable, uuid } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "@/drizzle/schema-helpers";
import { relations } from "drizzle-orm";
import { memberTrxNameTable } from "./member-trx-name";
import { memberBankAccountsTable } from "./member-bank-account";

export const assignMemberReceiveBankTable = pgTable('assign_member_receive_bank', {
  id: uuid('id').primaryKey().unique().defaultRandom(),
  memberTrxNameId: uuid('member_trx_name_id').notNull().references(() => memberTrxNameTable.id),
  memberReceiveBankId: uuid('member_receive_bank_id').notNull().references(() => memberBankAccountsTable.id),
  createdAt,
  updatedAt,
})

export const assignMemberReceiveBankRelation = relations(assignMemberReceiveBankTable, ({ one }) => ({
  memberTrxName: one(memberTrxNameTable, {
    relationName: 'relationBetweenAssignMemberReceiveBankAndMemberTrxName',
    fields: [assignMemberReceiveBankTable.memberTrxNameId],
    references: [memberTrxNameTable.id]
  }),
  memberReceiveBank: one(memberBankAccountsTable, {
    relationName: 'relationBetweenAssignMemberReceiveBankAndMemberBank',
    fields: [assignMemberReceiveBankTable.memberReceiveBankId],
    references: [memberBankAccountsTable.id]
  }),
}))