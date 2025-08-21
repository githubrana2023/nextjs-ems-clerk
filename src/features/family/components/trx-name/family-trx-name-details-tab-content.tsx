'use client'

import { AssignFamilyReceiveBank, AssignFamilySourceBank, FamilyBankAccount, FamilyTrxName } from "@/drizzle/type"

type FamilyTrxNameDetailsTabContentProp = {
  trxName: (FamilyTrxName & {
    assignFamilyReceiveBanks: (AssignFamilyReceiveBank & {
      familyReceiveBank: FamilyBankAccount
    })[],
    assignFamilySourceBanks: (AssignFamilySourceBank & {
      familySourceBank: FamilyBankAccount
    })[]
  })
}

export const FamilyTrxNameDetailsTabContent = ({ trxName }: FamilyTrxNameDetailsTabContentProp) => {

  const { assignFamilyReceiveBanks, assignFamilySourceBanks } = trxName


  return (
    <div className="flex items-start justify-between">
      <div className="flex flex-col gap-1">
        {
          assignFamilyReceiveBanks?.map(bank => (
            <div key={bank.id}>{bank?.familyReceiveBank?.name}</div>
          ))
        }
      </div>
      <div className="flex flex-col gap-1">
        {
          assignFamilySourceBanks?.map(bank => (
            <div key={bank.id}>{bank?.familySourceBank?.name}</div>
          ))
        }
      </div>
    </div>
  )
}
