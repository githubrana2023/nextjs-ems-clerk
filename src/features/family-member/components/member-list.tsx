import { CardWrapper } from "@/components/card-wrapper"
import { DataTable } from "@/components/data-table"
import { db } from "@/drizzle/db"
import { membersTable } from "@/drizzle/schema"
import { pluralize } from "@/lib/helpers/plural"
import { eq } from "drizzle-orm"
import { memberTableColumns } from "./member-table-columns"
import { ActionButton } from "@/components/action-button"

export const MemberList = async ({ currentFamilyId }: { currentFamilyId: string }) => {
    const members = await db.query.membersTable.findMany({
        where: eq(membersTable.familyId, currentFamilyId),
        with: {
            family: true
        }
    })
    const formattedMembers = members.map(member => ({
        ...member,
        familyName: member.family.name
    }))

    const totalMembers = members.length
    return (
        <CardWrapper
            title={pluralize(totalMembers, "Member")}
            description={totalMembers > 0 ? "Your family Members" : "Register Your First Family Member"}
            headerElement={
                <ActionButton modalType="F_MEMBER" />
            }
        >
            <DataTable data={formattedMembers} columns={memberTableColumns} />
        </CardWrapper>
    )

}