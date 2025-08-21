import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createdAt, memberRelation, role, updatedAt } from "@/drizzle/schema-helpers";
import { relations } from "drizzle-orm";
import { familyTable } from "./family";
import { memberBankAccountsTable } from "./member-bank-account";
import { memberLoanProviderBillsTable } from "./member-loan-provider-bill";
import { memberLoanProviderTable } from "./member-loan-provider";
import { memberLoanRecipientPaymentTable } from "./member-loan-recipient-payment";
import { memberLoanRecipientTable } from "./member-loan-recipient";
import { memberGivenLoanTable, memberTakenLoanTable } from "./member-loan";
import { memberTrxNameTable } from "./member-trx-name";
import { memberTrxTable } from "./member-trx";

export const membersTable = pgTable('members', {
    id: uuid('id').primaryKey().unique().defaultRandom(),
    familyId: uuid('family_id').notNull().references(() => familyTable.id),
    name: text('name').notNull(),
    email: text('email').unique().notNull(),
    phone: text('phone').unique().notNull(),
    password: text('password').notNull(),
    relation: text('relation', { enum: memberRelation }).notNull(),
    role: text('role', { enum: role }).default('MEMBER').notNull(),
    emailVerifiedAt: timestamp('email_verified_at', { withTimezone: true }),
    isDeleted: boolean("is_deleted").default(false),
    createdAt,
    updatedAt,

})

export const membersRelation = relations(membersTable, ({ one, many }) => ({
    family: one(familyTable, {
        relationName: 'relationBetweenFamilyAndMembers',
        fields: [membersTable.familyId],
        references: [familyTable.id]
    }),
    memberBankAccounts: many(memberBankAccountsTable, {
        relationName: 'relationBetweenMemberBankAccountAndMember',
    }),
    loanProviderPaidBills: many(memberLoanProviderBillsTable, {
        relationName: 'relationBetweenMemberLoanProviderBillAndMember',
    }),
    loanProviders: many(memberLoanProviderTable, {
        relationName: 'relationBetweenMemberLoanProviderAndMember',
    }),
    loanRecipientPayments: many(memberLoanRecipientPaymentTable, {
        relationName: 'relationBetweenMemberLoanRecipientPaymentAndMember',
    }),
    loanRecipients: many(memberLoanRecipientTable, {
        relationName: 'relationBetweenMemberLoanRecipientAndMember',
    }),
    givenLoans: many(memberGivenLoanTable, {
        relationName: 'relationBetweenMemberGivenLoanAndMember',
    }),
    takenLoans: many(memberTakenLoanTable, {
        relationName: 'relationBetweenMemberTakenLoanAndMember',
    }),
    transactionsName: many(memberTrxNameTable, {
        relationName: 'relationBetweenMemberTrxNameAndMember',
    }),
    transactions: many(memberTrxTable, {
        relationName: 'relationBetweenMemberTrxAndMember',
    })
}))