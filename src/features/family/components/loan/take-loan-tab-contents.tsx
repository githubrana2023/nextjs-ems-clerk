'use client'

import { CardWrapper, DataTable } from "@/components"
import { ActionButton } from "@/components/action-button"

export const TakeLoanTabContents = () => {
    return (
        <CardWrapper
            title="Take Loan"
            description="Request a loan from your friends. Specify the amount and terms."
            headerElement={
                <ActionButton modalType="F_TAKE_LOAN" />
            } // No action button for taking loans
        >
            <DataTable data={[]} columns={[]} />

        </CardWrapper>
    )
}
