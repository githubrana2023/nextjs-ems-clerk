import { pgTable, uuid, timestamp, numeric, text, boolean } from "drizzle-orm/pg-core";
import { familyTable } from "./family";
import { relations } from "drizzle-orm";
import { createdAt, updatedAt } from "../schema-helpers";
import { familyShopkeepersTable } from "./family-shopkeeper";


export const familyShopkeeperBillsTable = pgTable('family_shopkeepers-bill', {
    id: uuid('id').primaryKey().unique().defaultRandom(),
    familyId: uuid('family_id').notNull().references(() => familyTable.id),
    familyShopkeeperId: uuid('family_shopkeeper_id').notNull().references(() => familyShopkeepersTable.id),
    amount: numeric('amount', { precision: 7, scale: 2 }).notNull(),
    description: text('description'),
    paymentDate: timestamp('payment_date', { withTimezone: true }).notNull(),
    isCancel: boolean('isCancel').default(false),
    cancelReason: text('cancel_reason'),
    createdAt,
    updatedAt
})


export const familyShopkeeperBillsRelation = relations(familyShopkeeperBillsTable, ({ one }) => ({
    family: one(familyTable, {
        relationName: 'relationBetweenFamilyShopkeeperBillAndFamily',
        fields: [familyShopkeeperBillsTable.familyId],
        references: [familyTable.id]
    }
    ),
    familyShopkeeper: one(familyShopkeepersTable, {
        relationName: 'relationBetweenFamilyShopkeeperBillAndFamilyShopkeeper',
        fields: [familyShopkeeperBillsTable.familyShopkeeperId],
        references: [familyShopkeepersTable.id]
    }
    ),
}))