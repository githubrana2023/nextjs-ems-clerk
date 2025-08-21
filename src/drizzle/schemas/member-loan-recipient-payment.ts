import { pgTable, uuid, timestamp, numeric, text, boolean } from "drizzle-orm/pg-core";
import { familyTable } from "./family";
import { relations } from "drizzle-orm";
import { createdAt, updatedAt } from "../schema-helpers";
import { memberLoanRecipientTable } from "./member-loan-recipient";
import { membersTable } from "./members";
import { memberGivenLoanTable } from "./member-loan";


export const memberLoanRecipientPaymentTable = pgTable('member_loan_recipient_payment', {
    id: uuid('id').primaryKey().unique().defaultRandom(),
    familyId: uuid('family_id').notNull().references(() => familyTable.id),
    memberId: uuid('member_id').notNull().references(() => membersTable.id),
    memberLoanRecipientId: uuid('member_loan_recipient_id').notNull().references(() => memberLoanRecipientTable.id),
    memberGivenLoanId: uuid('member_loan_give_id').notNull().references(() => memberGivenLoanTable.id),

    amount: numeric('amount', { precision: 7, scale: 2 }).notNull(),
    description: text('description'),
    paymentDate: timestamp('payment_date', { withTimezone: true }).notNull(),
    isCancel: boolean('isCancel').default(false),
    cancelReason: text('cancel_reason'),
    createdAt,
    updatedAt
})


export const memberLoanRecipientPaymentRelation = relations(memberLoanRecipientPaymentTable, ({ one }) => ({
    family: one(familyTable, {
        relationName: 'relationBetweenMemberLoanRecipientPaymentAndFamily',
        fields: [memberLoanRecipientPaymentTable.familyId],
        references: [familyTable.id]
    }),
    member: one(membersTable, {
        relationName: 'relationBetweenMemberLoanRecipientPaymentAndMember',
        fields: [memberLoanRecipientPaymentTable.memberId],
        references: [membersTable.id]
    }),
    memberLoanRecipient: one(memberLoanRecipientTable, {
        relationName: 'relationBetweenMemberLoanRecipientPaymentAndMemberLoanRecipient',
        fields: [memberLoanRecipientPaymentTable.memberLoanRecipientId],
        references: [memberLoanRecipientTable.id]
    }),
    memberGivenLoan: one(memberGivenLoanTable, {
        relationName: 'relationBetweenMemberLoanRecipientPaymentAndMemberGivenLoan',
        fields: [memberLoanRecipientPaymentTable.memberGivenLoanId],
        references: [memberGivenLoanTable.id]
    }),
}))