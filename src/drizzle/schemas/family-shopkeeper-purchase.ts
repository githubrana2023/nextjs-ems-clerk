import { pgTable, uuid, timestamp, numeric, text, boolean } from "drizzle-orm/pg-core";
import { familyTable } from "./family";
import { relations } from "drizzle-orm";
import { createdAt, updatedAt } from "../schema-helpers";
import { familyShopkeepersTable } from "./family-shopkeeper";


export const familyShopkeeperPurchaseTable = pgTable('family_shopkeepers-purchase', {
    id: uuid('id').primaryKey().unique().defaultRandom(),
    familyId: uuid('family_id').notNull().references(() => familyTable.id),
    familyShopkeeperId: uuid('family_shopkeeper_id').notNull().references(() => familyShopkeepersTable.id),
    total: numeric('total', { precision: 7, scale: 2 }).notNull(),
    description: text('description').notNull(),
    purchaseDate: timestamp('purchase_date', { withTimezone: true }).notNull(),
    paid: numeric('paid', { precision: 7, scale: 2 }).notNull(),
    due: numeric('due', { precision: 7, scale: 2 }).notNull(),
    isCancel: boolean('isCancel').default(false),
    cancelReason: text('cancel_reason'),
    createdAt,
    updatedAt
})


export const familyShopkeeperPurchaseRelation = relations(familyShopkeeperPurchaseTable, ({ one }) => ({
    family: one(familyTable, {
        relationName: 'relationBetweenFamilyShopkeeperPurchaseAndFamily',
        fields: [familyShopkeeperPurchaseTable.familyId],
        references: [familyTable.id]
    }
    ),
    familyShopkeeper: one(familyShopkeepersTable, {
        relationName: 'relationBetweenFamilyShopkeeperPurchaseAndFamilyShopkeeper',
        fields: [familyShopkeeperPurchaseTable.familyShopkeeperId],
        references: [familyShopkeepersTable.id]
    }
    ),
}))