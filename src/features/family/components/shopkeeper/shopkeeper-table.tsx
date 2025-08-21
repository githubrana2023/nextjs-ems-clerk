'use client'
import { CardWrapper, DataTable } from "@/components"
import { Button } from "@/components/ui/button"
import { MODAL_TYPE } from "@/constant"
import { useAppDispatch } from "@/hooks/redux"
import { onOpen } from "@/lib/redux/slice/modal-slice"
import { shopkeeperTableColumns } from "./shopkeeper-table-columns"
import { ShopkeeperWithFamilyIdAndName } from "@/interface/shopkeeper"
import { useClient } from "@/hooks/use-client"


type ShopkeeperTableProps = {
    familyShopkeepers: ShopkeeperWithFamilyIdAndName[]
}

export const ShopkeeperTable = ({ familyShopkeepers }: ShopkeeperTableProps) => {
    const isClient = useClient()
    const dispatch = useAppDispatch()

    if (!isClient) return null

    return <CardWrapper
        title="Shopkeepers"
        description="Buy now, Pay later!"
        headerElement={
            <Button
                size='sm'
                onClick={
                    () => dispatch(onOpen(MODAL_TYPE.F_SHOPKEEPER))
                }
            >
                New
            </Button>
        }
    >
        <DataTable data={familyShopkeepers} columns={shopkeeperTableColumns} />
    </CardWrapper>
}