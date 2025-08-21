'use client'

import React from 'react'
import { Button } from './ui/button'
import { onOpen } from '@/lib/redux/slice/modal-slice'
import { ModalType } from '@/interface/modal-slice'
import { useAppDispatch } from '@/hooks/redux'

export const ActionButton = ({ modalType }: { modalType: ModalType }) => {
    const dispatch = useAppDispatch()


    return (
        <Button onClick={() => {
            console.log('ActionButton clicked', modalType)
            dispatch(onOpen(modalType))
        }}>
            Add
        </Button>
    )
}
