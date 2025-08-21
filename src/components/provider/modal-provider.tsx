'use client'
import { FamilyBankAccountModal } from "../modals/family-bank-account-modal"
import { FamilyShopkeeperModal } from "../modals/family-shopkeeper-modal"
import { FamilyTrxNameModal } from "../modals/family-trx-name-modal"
import { MemberLoginModal } from "../modals/member-login-modal"
import { MemberRegisterModal } from "../modals/member-register-modal"

export const ModalProvider = () => {

    return <>
        <MemberLoginModal />
        <FamilyBankAccountModal />
        <MemberRegisterModal />
        <FamilyTrxNameModal />
        <FamilyShopkeeperModal />
    </>
}