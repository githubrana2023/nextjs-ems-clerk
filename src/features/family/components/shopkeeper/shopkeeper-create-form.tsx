'use client'

import { useForm } from "react-hook-form"
import {
    FamilyShopkeeperCreateFormValue,
    familyShopkeeperCreateFormSchema
} from "../../schema/shopkeeper"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { useTransition } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { familyShopkeeperCreateAction } from "../../action/shopkeeper/shopkeeper-create-action"
import toast from "react-hot-toast"

export const FamilyShopkeeperForm = () => {
    const [pending, startTransition] = useTransition()
    const familyShopkeeperForm = useForm<FamilyShopkeeperCreateFormValue>({
        resolver: zodResolver(familyShopkeeperCreateFormSchema),
        defaultValues: {
            name: '',
            phone: '',
            totalDebt: ''
        }
    })

    const { handleSubmit, reset, control } = familyShopkeeperForm

    const onSubmit = handleSubmit((formValue) => {
        startTransition(
            async () => {
                console.log(formValue)
                const { success, message } = await familyShopkeeperCreateAction(formValue)
                if (!success) {
                    toast.error(message)
                    return
                }

                toast.success(message)
                reset()
            }
        )
    })

    return <Form {...familyShopkeeperForm}>
        <form onSubmit={onSubmit} className="space-y-4">
            <FormField
                control={control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Shopkeeper Name</FormLabel>
                        <FormControl>
                            <Input
                                type="text"
                                placeholder="e.g Ibrahim Miah"
                                disabled={pending}
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name="phone"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Shopkeeper Phone</FormLabel>
                        <FormControl>
                            <Input
                                type="number"
                                placeholder="e.g 01xxxxxxxxx"
                                disabled={pending}
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name="totalDebt"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Shopkeeper Debt (Optional)</FormLabel>
                        <FormControl>
                            <Input
                                type="number"
                                placeholder="e.g 1850 (optional)"
                                disabled={pending}
                                {...field}
                            />
                        </FormControl>
                        <FormDescription>
                            If storekeeper has previous due. then fill total due amount.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <Button type='submit' className="w-full" disabled={pending}>
                Save
            </Button>
        </form>
    </Form>
}

