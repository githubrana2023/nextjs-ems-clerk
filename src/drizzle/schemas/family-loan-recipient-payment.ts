import { pgTable, uuid, timestamp, numeric, text, boolean } from "drizzle-orm/pg-core";
import { familyTable } from "./family";
import { relations } from "drizzle-orm";
import { createdAt, updatedAt } from "../schema-helpers";
import { familyBankAccountsTable } from "./family-bank-account";
import { familyGivenLoanTable } from "./family-loan";
import { familyLoanRecipientTable } from "./family-loan-recipient";


export const familyLoanRecipientPaymentTable = pgTable('family_loan_recipient_payment', {
    id: uuid('id').primaryKey().unique().defaultRandom(),
    familyId: uuid('family_id').notNull().references(() => familyTable.id),
    familyLoanRecipientId: uuid('family_loan_recipient_id').notNull().references(() => familyLoanRecipientTable.id),
    familyGivenLoanId: uuid('family_loan_give_id').notNull().references(() => familyGivenLoanTable.id),
    familyReceiveBankId: uuid('family_receive_bank_id').notNull().references(() => familyBankAccountsTable.id),

    amount: numeric('amount', { precision: 7, scale: 2 }).notNull(),
    description: text('description'),
    paymentDate: timestamp('payment_date', { withTimezone: true }).notNull(),
    remaining: numeric('total_remaining', { precision: 7, scale: 2 }).notNull(),
    isCancel: boolean('isCancel').default(false),
    cancelReason: text('cancel_reason'),
    createdAt,
    updatedAt
})


export const familyLoanRecipientPaymentRelation = relations(familyLoanRecipientPaymentTable, ({ one, many }) => ({
    family: one(familyTable,{
        relationName:'relationBetweenFamilyLoanRecipientPaymentAndFamily',
        fields:[familyLoanRecipientPaymentTable.familyId],
        references:[familyTable.id]

    }),
    familyLoanRecipient: one(familyLoanRecipientTable,{
        relationName:'relationBetweenFamilyLoanRecipientPaymentAndFamilyLoanRecipient',
         fields:[familyLoanRecipientPaymentTable.familyLoanRecipientId],
        references:[familyLoanRecipientTable.id]
    }),
    familyGivenLoan: one(familyGivenLoanTable,{
        relationName:'relationBetweenFamilyLoanRecipientPaymentAndFamilyLoanGiven',
         fields:[familyLoanRecipientPaymentTable.familyGivenLoanId],
        references:[familyGivenLoanTable.id]
    }),
    familyReceiveBank: one(familyBankAccountsTable,{
        relationName:'relationBetweenFamilyLoanRecipientPaymentAndFamilyReceiveBank',
         fields:[familyLoanRecipientPaymentTable.familyGivenLoanId],
        references:[familyBankAccountsTable.id]
    }),
}))