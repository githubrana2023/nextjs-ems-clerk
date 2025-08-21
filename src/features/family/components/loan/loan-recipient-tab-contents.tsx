'use client'

import { CardWrapper, DataTable } from "@/components"
import { ActionButton } from "@/components/action-button"

export const LoanRecipientTabContents = () => {
    return (
        <CardWrapper
            title="Loan Recipient"
            description="Manage your loan recipients. Add or edit recipient details."
            headerElement={
                <ActionButton modalType="F_LOAN_RECIPIENT" />
            } // No action button for loan recipients
        >
            <DataTable data={[]} columns={[]} />

        </CardWrapper>
    )
}
