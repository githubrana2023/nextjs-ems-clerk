'use client'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Cable, Info, MoreHorizontal, RotateCcw, ScrollText, ShoppingBasket, SquarePen, Trash } from 'lucide-react'
import { useAppDispatch } from '@/hooks/redux'
import toast from 'react-hot-toast'
import { useState, useTransition } from 'react'
import { AlertModal } from '@/components'
import { useAlertModal } from '@/hooks/redux/use-modal'
import { onAlertClose, onAlertOpen } from '@/lib/redux/slice/alert-modal-slice'
import DDMenuItem from '@/components/drop-down-menu-item'
import Link from 'next/link'
import { familyTab } from '@/constant/tab'
import { ShopkeeperWithFamilyIdAndName } from '@/interface/shopkeeper'
import { formatLabel } from '@/lib/word-formatter'


export const FamilyShopkeeperActionCell = ({ shopkeeper }: { shopkeeper: ShopkeeperWithFamilyIdAndName }) => {
    const { familyId, id, name } = shopkeeper
    const { defaultActive, queryString } = familyTab.familyDynamicShopkeeper
    const [isOpenDropdownMenu, setIsOpenDropDownMenu] = useState(false)
    const [pending, startTransition] = useTransition()
    const { isAlertOpen, payload } = useAlertModal()

    const dispatch = useAppDispatch()

    const handleDeleteClick = () => {
        setIsOpenDropDownMenu(false)
        dispatch(onAlertOpen({ familyId, id, name }))
    }

    // const onDelete = () => {
    //     startTransition(
    //         async () => {
    //             const { data, success, message } = await familyShopkeeperDeleteAction((payload as DeleteActionInfo)?.id)

    //             if (!success) {
    //                 toast.error(message)
    //                 return
    //             }
    //             dispatch(onAlertClose())
    //             toast.success(message)
    //         }
    //     )
    // }

    // const onRestore = async () => {
    //     const { data, success, message } = await familyShopkeeperUpdateAction(shopkeeper?.id, { isDeleted: false })

    //     if (!success) {
    //         toast.error(message)
    //         return
    //     }
    //     toast.success(message)
    // }

    return (
        <>
            <AlertModal
                open={isAlertOpen}
                title={`Are you sure you want to delete?`}
                description='This action can not be reverse!'
                onCancel={() => dispatch(onAlertClose())}
                disabled={pending}
                onConfirm={() => { }}
                confirmBtnLabel='Delete'
            />
            <DropdownMenu open={isOpenDropdownMenu} onOpenChange={setIsOpenDropDownMenu} >
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    {
                        !shopkeeper.isDeleted && (
                            <>
                                <Link href={
                                    `/${shopkeeper.familyId}/shopkeeper/${shopkeeper.id}${queryString.detailsTab}`
                                }>
                                    <DDMenuItem
                                        label={formatLabel(defaultActive.details)}
                                        Icon={<Info />}
                                    />
                                </Link>
                                <Link href={`/${shopkeeper.familyId}/shopkeeper/${shopkeeper.id}${queryString.updateTab}`}>
                                    <DDMenuItem
                                        label={formatLabel(defaultActive.update)}
                                        Icon={<SquarePen />}
                                    />
                                </Link>
                                <Link href={`/${shopkeeper.familyId}/shopkeeper/${shopkeeper.id}${queryString.purchaseDueTab}`}>
                                    <DDMenuItem
                                        label={formatLabel(defaultActive.purchaseDue)}
                                        Icon={<ShoppingBasket />}
                                    />
                                </Link>

                                <Link href={`/${shopkeeper.familyId}/shopkeeper/${shopkeeper.id}${queryString.shopkeeperBillTab}`}>
                                    <DDMenuItem
                                        label={formatLabel(defaultActive.shopkeeperBill)}
                                        Icon={<ScrollText />}
                                    />
                                </Link>
                            </>
                        )
                    }
                    <DropdownMenuSeparator />
                    {

                        shopkeeper.isDeleted
                            ? <DDMenuItem
                                label='Restore'
                                Icon={<RotateCcw />}
                                variant='success'
                                onClick={() => { }}
                                className='flex items-center justify-between'
                            />
                            : <DDMenuItem
                                label='Delete'
                                variant='destructive'
                                onClick={handleDeleteClick}
                                Icon={<Trash />}
                                className='flex items-center justify-between'
                            />
                    }
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}