'use client'

import { useAppDispatch } from "@/hooks/redux"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { familyTrxCreateFormSchema, FamilyTrxCreateFOrmValue } from "@/features/family/schema/trx"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast"
import { onClose } from "@/lib/redux/slice/modal-slice"
import { Textarea } from "@/components/ui/textarea"
import { FamilyTrxName, AssignFamilyReceiveBank, AssignFamilySourceBank, FamilyBankAccount } from "@/drizzle/type"
import { useTrxName } from "@/hooks/use-trx-name"
import { familyTrxCreateAction } from "@/features/family/action/trx"

type TrxTabProps = {
    familyTrxNames: (FamilyTrxName & {
        assignFamilyReceiveBanks: (AssignFamilyReceiveBank & {
            familyReceiveBank: FamilyBankAccount
        })[],
        assignFamilySourceBanks: (AssignFamilySourceBank & {
            familySourceBank: FamilyBankAccount
        })[],
    })[]
}

export const FamilyTrxForm = ({ familyTrxNames }: TrxTabProps) => {


    const [selectedTrxNameId, setSelectedTrxNameId] = useState<string | null>(null)

    const {selectedTrxName,setSelectedTrxName}=useTrxName(familyTrxNames,selectedTrxNameId)
    
    const [pending, startTransition] = useTransition()
    const dispatch = useAppDispatch()
    const router = useRouter()

    const isSelectedTrxName = !!selectedTrxNameId
    const familyTrxForm = useForm<FamilyTrxCreateFOrmValue>(
        {
            resolver: zodResolver(familyTrxCreateFormSchema),
            defaultValues: {
                name: '',
                amount: '0',
                description: "",
                familyReceiveBankId: '',
                familySourceBankId: '',
                familyTrxNameId: ''
            }
        }
    )

    const { control, reset, handleSubmit } = familyTrxForm

    const onSubmit = handleSubmit(value => {
        startTransition(
            async () => {
                const { data,success, message } = await familyTrxCreateAction(value)


                console.log({
                    data,message
                })

                if (!success) {
                    toast.error(message)
                    return
                }
                reset()
                router.refresh()
                dispatch(onClose())
                toast.success(message)

            }
        )
    })


    const isBoth = selectedTrxName?.variant === 'BOTH'
    const isSource = selectedTrxName?.variant === 'SOURCE'
    const isReceive = selectedTrxName?.variant === 'RECEIVE'


    return <Form {...familyTrxForm}>
        <form className='space-y-4' onSubmit={onSubmit}>
            <FormField
                control={control}
                name='name'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input placeholder='e.g. Shopping' {...field} disabled={pending} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name='amount'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                            <Input type='number' placeholder='e.g. 1200' {...field} disabled={pending} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name='description'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                            <Textarea placeholder='e.g. 1 anything!' {...field} disabled={pending} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />


            <FormField
                control={control}
                name='familyTrxNameId'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Transaction Name</FormLabel>
                        <FormControl>
                            <Select onValueChange={(value) => {
                                setSelectedTrxNameId(value)
                                field.onChange(value)
                            }} defaultValue={field.value} disabled={pending} >
                                <FormControl className="w-full">
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a transaction Variant?" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className='w-full'>
                                    {familyTrxNames?.map(
                                        ({ id, name }) => (
                                            <SelectItem value={id} key={id}>{name}</SelectItem>
                                        )
                                    )
                                    }
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />


            {(isSelectedTrxName) && <>
                {
                    (isSource || isBoth) && (
                        <FormField
                            control={control}
                            name='familySourceBankId'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Transaction Source Bank</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={pending} >
                                            <FormControl className="w-full">
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select a transaction Variant?" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className='w-full'>
                                                {selectedTrxName?.assignFamilySourceBanks?.map(
                                                    ({ familySourceBank: { id, name } }) => (
                                                        <SelectItem value={id} key={id}>{name}</SelectItem>
                                                    )
                                                )
                                                }
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )
                }


                {
                    (isReceive || isBoth) && (
                        <FormField
                            control={control}
                            name='familyReceiveBankId'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Transaction Receive Bank</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={pending} >
                                            <FormControl className="w-full">
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select a transaction Variant?" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className='w-full'>
                                                {selectedTrxName?.assignFamilyReceiveBanks?.map(
                                                    ({ familyReceiveBank: { id, name } }) => (
                                                        <SelectItem value={id} key={id}>{name}</SelectItem>
                                                    )
                                                )
                                                }
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )
                }
            </>}




            <Button className='w-full' type='submit' disabled={pending}>
                Continue
            </Button>
        </form>
    </Form>
}