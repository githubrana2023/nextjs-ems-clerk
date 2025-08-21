'use client'

import { CardWrapper, DataTable, } from "@/components"
import { ActionButton } from "@/components/action-button"

export const ShopkeeperPurchaseDueTabContents = () => {


    return (
        <CardWrapper
            title="Purchase Due"
            description="This feature is under development."
            headerElement={
                <ActionButton modalType="F_SHOPKEEPER_PURCHASE_DUE" />
            }
        >
            <DataTable data={[]} columns={[]} />
        </CardWrapper>
    )
}
