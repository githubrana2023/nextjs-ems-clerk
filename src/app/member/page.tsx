import { auth, clerkClient, currentUser } from '@clerk/nextjs/server'
import React from 'react'

const page = async () => {

    const user = await currentUser()
    const {orgId,userId} = await auth()

    const client = await clerkClient()

    const userOrg = await client.users.getOrganizationMembershipList({userId:userId as string})

    const activeOrg = userOrg.data.find(org=>org.organization.id === orgId)

    console.log(
        {
            
            activeOrg
        }
    )


  return (
    <div>page</div>
  )
}

export default page