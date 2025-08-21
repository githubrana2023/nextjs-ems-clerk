import {
    FamilyTrxName,
    AssignFamilyReceiveBank,
    AssignFamilySourceBank,
    FamilyBankAccount
} from '@/drizzle/type'
import { useEffect, useState } from 'react'
type TrxName = (FamilyTrxName & {
    assignFamilyReceiveBanks: (AssignFamilyReceiveBank & {
        familyReceiveBank: FamilyBankAccount
    })[],
    assignFamilySourceBanks: (AssignFamilySourceBank & {
        familySourceBank: FamilyBankAccount
    })[],
})

export const useTrxName = (arr: TrxName[], selectedTrxNameId: string | null) => {

    const [txNames, setTxName] = useState(arr)
    const [selectedTrxName,setSelectedTrxName] = useState<TrxName|undefined>(undefined)

    useEffect(()=>{

       const item= arr.find(item=>item.id===selectedTrxNameId)
       setSelectedTrxName(item)

    },[selectedTrxNameId])


    return {
        selectedTrxName,setSelectedTrxName
    }


}