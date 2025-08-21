'use client'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { appRoute, appRouteIcon, AppRouteKey } from "@/constant";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Id = typeof appRoute[keyof typeof appRoute]

type MobileNavProps = {
    routes: {
        href: string;
        label: string;
        id: Id
    }[]
}

export const MobileNav = ({ routes }: MobileNavProps) => {
    const pathname = usePathname()


    return (
        <div className="flex items-center justify-between w-full py-3">
            <Sheet>
                <SheetTrigger className="md:hidden">
                    <Menu />
                </SheetTrigger>
                <SheetContent side="left">
                    <SheetHeader>
                        <SheetTitle>
                            Expense Management
                        </SheetTitle>
                    </SheetHeader>
                <div className="flex flex-col gap-3">
                        {
                            routes.map(route => {
                                const isActive = pathname === route.href
                                return (
                                    <SheetClose asChild>

                                    <Link href={route.href} key={route.id} className="px-4">
                                        <div className={cn("flex items-center gap-2 bg-secondary py-2 px-2 rounded-md",isActive&&'bg-primary text-white font-semibold')}>
                                            {
                                                appRouteIcon[(route.label.toUpperCase() as AppRouteKey)]
                                            }
                                            <p>
                                                {
                                                    route.label
                                                }
                                            </p>
                                        </div>
                                    </Link>
                                    </SheetClose>
                                )
                            })
                        }
                    </div>
                </SheetContent>
            </Sheet>

            <div>
                <Image
                    src={'/accounting.png'}
                    width={30}
                    height={30}
                    alt="Logo"
                />
            </div>
        </div>
    )
}