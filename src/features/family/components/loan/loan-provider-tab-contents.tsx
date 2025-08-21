'use client'

import { CardWrapper, DataTable } from "@/components"
import { ActionButton } from "@/components/action-button"

export const LoanProviderTabContents = () => {
    return (
        <CardWrapper
            title="Loan Provider"
            description="Manage your loan providers. Add or edit loan provider details."
            headerElement={
                <ActionButton modalType="F_LOAN_PROVIDER" />
            }
        >
            <DataTable data={[]} columns={[]} />
        </CardWrapper>
    )
}
