import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet"
import {  OrganizationSwitcher, UserButton, } from "@clerk/nextjs"
import {auth, currentUser, } from "@clerk/nextjs/server"
import { Home, Menu } from "lucide-react"
import { NavItem } from "./nav-item"
import { currentMemberOrg } from "@/lib/clerk/current-org"
import { redirect } from "next/navigation"

export const MobileNavbar = async () => {
  
  return (
    <nav className="flex items-center justify-between py-4">
      <Sheet>
        <SheetTrigger>
          <Menu />
        </SheetTrigger>
        <SheetContent side="left" className="gap-3">
          <SheetHeader>
            <SheetTitle>Welcome, User</SheetTitle>
          </SheetHeader>

          {
            [
              {
                href: '/',
                label: "Home",
                Icon: <Home size={18} />
              },
              {
                href: '/deshboard',
                label: "Deshboard",
                Icon: <Home size={18} />
              },

            ].map(
              item => (
                <SheetClose key={item.label}>
                  <NavItem nav={item} />
                </SheetClose>
              )
            )
          }

        </SheetContent>
      </Sheet>
      <div>
        <UserButton />
        <OrganizationSwitcher afterSelectOrganizationUrl={`/12564/564515`} />
      </div>
    </nav>
  )
}
