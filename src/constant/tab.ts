import { DefaultActiveTab } from "@/interface/tab";

export const defaultActiveTab: DefaultActiveTab = {
    family: {
        familyTrxName: {
            defaultActive: {
                assign: 'assign',
                details: 'details',
                update: 'update'
            },
            queryString: {
                assignTab: '?tab=assign',
                detailsTab: "?tab=details",
                updateTab: "?tab=update"
            }
        },
        familyTrx: {
            defaultActive: {
                transaction: 'transaction',
                trxName: 'trx-name'
            },
            queryString: {
                transactionTab: '?tab=transaction',
                trxNameTab: '?tab=trx-name'
            }
        },
        familyDynamicBank: {
            defaultActive: {
                details: "details",
                update: 'update'
            },
            queryString: {
                detailsTab: '?tab=details',
                updateTab: '?tab=update',
            }
        },
        familyLoan: {
            defaultActive: {
                give: 'give',
                take: 'take',
                loanProvider: 'loan-provider',
                loanRecipient: 'loan-recipient'
            },
            queryString: {
                giveTab: '?tab=give',
                takeTab: '?tab=take',
                loanProviderTab: '?tab=loan-provider',
                loanRecipientTab: '?tab=loan-recipient'
            }
        },
        familyDynamicShopkeeper: {
            defaultActive: {
                details: 'details',
                update: 'update',
                shopkeeperBill: 'shopkeeper-bill',
                purchaseDue: 'purchase-due'
            },
            queryString: {
                detailsTab: '?tab=details',
                updateTab: '?tab=update',
                purchaseDueTab: '?tab=purchase-due',
                shopkeeperBillTab: "?tab=shopkeeper-bill",
            }
        }
    },
    // member: {
    //     memberTrx: {
    //         defaultActive: {
    //             transaction: 'transaction',
    //             trxName: 'trx-name'
    //         },
    //         queryString: {
    //             transactionTab: '?tab=transaction',
    //             trxNameTab: '?tab=trx-name'
    //         }
    //     },
    //     memberTrxName: {
    //         defaultActive: {
    //             assign: "assign",
    //             details: 'details',
    //             update: "update"
    //         },
    //         queryString: {
    //             assignTab: "?tab=assign",
    //             detailsTab: "?tab=details",
    //             updateTab: '?tab=update'
    //         }
    //     },
    //     memberBank: {
    //         defaultActive: {
    //             details: "details",
    //             update: 'update'
    //         },
    //         queryString: {
    //             detailsTab: '?tab=details',
    //             updateTab: '?tab=update',
    //         }
    //     },
    //     memberLoan: {
    //         defaultActive: {
    //             details: "details",
    //             update: 'update'
    //         },
    //         queryString: {
    //             detailsTab: '?tab=details',
    //             updateTab: '?tab=update'
    //         }
    //     },
    //     memberShopkeeper: {
    //         defaultActive: {
    //             shopkeeper: 'shopkeeper',
    //             shopkeeperBill: 'shopkeeper-bill',
    //             purchaseDue: 'purchase-due'
    //         },
    //         queryString: {
    //             shopkeeperBillTab: '?tab=shopkeeper-bill',
    //             shopkeeperTab: "?tab=shopkeeper",
    //             purchaseDueTab: '?tab=purchase-due'
    //         }
    //     }
    // }
}

export const {
    family: familyTab,
    //  member: memberTab 
} = defaultActiveTab