'use client'

import { CardWrapper, DataTable } from "@/components"
import { ActionButton } from "@/components/action-button"

export const GiveLoanTabContents = () => {
    return (
        <CardWrapper
            title="Give Loan"
            description="Provide a loan to your friends. Specify the amount."
            headerElement={
                <ActionButton modalType="F_GIVE_LOAN" />
            }
        >
            <DataTable data={[]} columns={[]} />

        </CardWrapper>
    )
}
