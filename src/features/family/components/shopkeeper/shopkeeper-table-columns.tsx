'use client'

import { Badge } from "@/components/ui/badge"
import { CardDescription, CardTitle } from "@/components/ui/card"
import { ShopkeeperWithFamilyIdAndName } from "@/interface/shopkeeper"
import { amountFormatter } from "@/lib/amount-formatter"
import { dateFormatter } from "@/lib/date-formatter"
import { ColumnDef } from "@tanstack/react-table"
import { Ban, Check, Clock3, CopyCheck, Users } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"
import { FamilyShopkeeperActionCell } from "./family-shopkeeper-action-cell"


const PhoneBadge = ({ phone }: { phone: string }) => {
    const [copied, setCopied] = useState(false)
    const handleOnCopy = async () => {
        await navigator.clipboard.writeText(phone)
        toast.success('Copied')
        setCopied(true)
        setTimeout(() => {
            setCopied(false)
        }, 3000);
    }

    return (
        <Badge onClick={handleOnCopy} variant={copied ? 'success' : 'secondary'} className="cursor-pointer">
            {copied ? (
                <p className='flex items-center gap-1'>
                    <span>Copied</span>
                    <CopyCheck size="16" />
                </p>
            )
                : phone
            }
        </Badge>
    )
}



export const shopkeeperTableColumns: ColumnDef<ShopkeeperWithFamilyIdAndName>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row: { original } }) => {
            const formattedDate = dateFormatter(original?.createdAt)
            const isDeleted = original?.isDeleted
            return (
                <>
                    <CardTitle className='flex items-center gap-1.5'>
                        <span>{original?.name}</span>
                        {isDeleted
                            ? <Ban size={16} fontWeight={400} className='text-destructive' />
                            : <Check size={16} fontWeight={400} className='text-success' />
                        }
                    </CardTitle>
                    <CardDescription className='flex items-center gap-1 text-xs'>
                        <Clock3 size={12} />
                        <span>{formattedDate}</span>
                    </CardDescription>
                </>
            )
        }
    },
    {
        accessorKey: 'totalDebt',
        header: 'Total Debt',
        cell: ({ row: { original } }) => {
            const formattedMoney = amountFormatter(Number(original.totalDebt))
            return (
                <Badge className='flex items-center justify-between' variant='secondary'>
                    <span className='font-bold'>{formattedMoney}</span>
                </Badge>
            )
        }
    },
    {
        accessorKey: 'phone',
        header: 'Phone',
        cell: ({ row: { original } }) => <PhoneBadge phone={original.phone} />
    },
    {
        accessorKey: 'family',
        header: 'Family',
        cell: ({ row: { original } }) => {

            return (
                <Badge className='flex items-center justify-between'>
                    <span>{original?.family?.name}</span>
                    <Users />
                </Badge>
            )
        }
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row: { original } }) => {
            console.log('original', original)
            return (
                <FamilyShopkeeperActionCell shopkeeper={original} />
            )
        },
    },
]

