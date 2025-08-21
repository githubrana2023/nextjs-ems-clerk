'use client'
import { useState, useEffect } from "react"
import { BankAccountModal } from "../modals/bank-account-modal"
import { FamilyBankAccountModal } from "../modals/family-bank-account-modal"
import { FamilyShopkeeperModal } from "../modals/family-shopkeeper-modal"
import { FamilyTrxNameModal } from "../modals/family-trx-name-modal"
import { MemberLoginModal } from "../modals/member-login-modal"
import { MemberRegisterModal } from "../modals/member-register-modal"

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null

    return <>
        <BankAccountModal />
        {/* <MemberLoginModal />
        <FamilyBankAccountModal />
        <MemberRegisterModal />
        <FamilyTrxNameModal />
        <FamilyShopkeeperModal /> */}
    </>
}