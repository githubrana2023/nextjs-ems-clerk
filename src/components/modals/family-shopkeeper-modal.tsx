'use client'
import { Modal } from '../modal'
import { useAppDispatch } from '@/hooks/redux'
import { onClose } from '@/lib/redux/slice/modal-slice'
import { MODAL_TYPE } from '@/constant'
import { CardWrapper } from '../card-wrapper'
import { useModal } from '@/hooks/redux/use-modal'
import { FamilyShopkeeperForm } from '@/features/family/components/shopkeeper'

export const FamilyShopkeeperModal = () => {
    const dispatch = useAppDispatch()
    const { isOpen, type } = useModal()

    const open = isOpen && type === MODAL_TYPE.F_SHOPKEEPER

    return (
        <Modal
            open={open}
            onClose={() => dispatch(onClose())}
            title="Family Shopkeeper Form"
            description='Nothing to say!'
        >
            <CardWrapper
                title='Create Your Family Shopkeeper'
                description='Provide meaningful name'
            >
                <FamilyShopkeeperForm />
            </CardWrapper>
        </Modal>
    )
}
