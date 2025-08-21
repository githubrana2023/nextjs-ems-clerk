import { pgTable, uuid, text, numeric, boolean } from "drizzle-orm/pg-core";
import { familyTable } from "./family";
import { relations } from "drizzle-orm";
import { createdAt, updatedAt } from "../schema-helpers";
import { membersTable } from "./members";
import { memberLoanRecipientPaymentTable } from "./member-loan-recipient-payment";
import { memberGivenLoanTable } from "./member-loan";


export const memberLoanRecipientTable = pgTable('member_loan_recipient', {
    id: uuid('id').primaryKey().unique().defaultRandom(),
    familyId: uuid('family_id').notNull().references(() => familyTable.id),
    memberId: uuid('member_id').notNull().references(() => membersTable.id),
    name: text('name').notNull(),
    phone: text('phone').notNull().unique(),
    totalCredit: numeric('total_credit', { precision: 7, scale: 2 }),
    isDeleted: boolean("is_deleted").default(false),
    createdAt,
    updatedAt
})


export const memberLoanRecipientRelation = relations(memberLoanRecipientTable, ({ one, many }) => ({
    family: one(familyTable, {
        relationName: 'relationBetweenMemberLoanRecipientAndFamily',
        fields: [memberLoanRecipientTable.familyId],
        references: [familyTable.id]
    }),
    member: one(membersTable, {
        relationName: 'relationBetweenMemberLoanRecipientAndMember',
        fields: [memberLoanRecipientTable.memberId],
        references: [membersTable.id]
    }),
    loanPaids: many(memberLoanRecipientPaymentTable, {
        relationName: 'relationBetweenMemberLoanRecipientPaymentAndMemberLoanRecipient',
    }),
    loans: many(memberGivenLoanTable, {
        relationName: 'relationBetweenMemberGivenLoanAndMemberLoanRecipient',
    })
}))