import { auth, clerkClient, } from '@clerk/nextjs/server'

export const currentMemberOrg = async ({orgId,userId}:{orgId:string,userId:string})=>{
    const client = await clerkClient()

    const userOrg = await client.users.getOrganizationMembershipList({userId})

    const activeOrg = userOrg.data.find(org=>org.organization.id === orgId)

    return activeOrg
}