'use client'

import { CardWrapper, DataTable } from "@/components"
import { ActionButton } from "@/components/action-button"

export const ShopkeeperBillContents = () => {
    return (
        <CardWrapper
            title="Shopkeeper Bill"
            description="This feature is under development."
            headerElement={
                <ActionButton modalType="F_SHOPKEEPER_BILL" />
            }
        >
            <DataTable data={[]} columns={[]} />
        </CardWrapper>
    )
}
