'use client'
import { CardWrapper, DataTable, Modal } from "@/components"
import { Button } from "@/components/ui/button"
import { MODAL_TYPE } from "@/constant"
import { useAppDispatch } from "@/hooks/redux"
import { pluralize } from "@/lib/helpers/plural"
import { onClose, onOpen } from "@/lib/redux/slice/modal-slice"
import { FamilyTrxForm } from "./trx/family-trx-form"
import { useModal } from "@/hooks/redux/use-modal"
import { FamilyTrxName, AssignFamilyReceiveBank, AssignFamilySourceBank, FamilyBankAccount } from "@/drizzle/type"


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

export const TrxTab = ({ familyTrxNames}: TrxTabProps) => {

    
    const familyTransactions = []
    const numberOfTrx = familyTransactions.length
    const dispatch = useAppDispatch()
    const { isOpen, type } = useModal()

    const open = isOpen && type === MODAL_TYPE.F_TRX

    return (
        <>
            <Modal
                open={open}
                onClose={() => dispatch(onClose())}
                title="Family Transaction Form"
                description='Nothing to say!'
            >
                <CardWrapper
                    title='Create Your Family Trx'
                    description='Provide meaningful'
                >

                    <FamilyTrxForm familyTrxNames={familyTrxNames}/>
                </CardWrapper>
            </Modal>
            <CardWrapper
                title={`${pluralize(numberOfTrx, "Transaction")} (${numberOfTrx})`}
                description="Your transactions"
                headerElement={
                    <Button
                        size='sm'
                        onClick={
                            () => dispatch(onOpen(MODAL_TYPE.F_TRX))
                        }
                    >
                        New
                    </Button>
                }
            >
                <DataTable
                    data={[]}
                    columns={[]}
                />
            </CardWrapper>
        </>
    )
}