import React from 'react'

const page = async ({ params }: { params: Promise<{ orgId: string, memberId: string }> }) => {

    const param = await params



    return (
        <div>
            <div>orgId: {param.orgId}</div>
            <div>orgMemberId: {param.memberId}</div>
        </div>
    )
}

export default page