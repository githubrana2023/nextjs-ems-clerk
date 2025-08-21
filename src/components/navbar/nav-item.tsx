'use client'
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { JSX } from 'react'

export const NavItem = ({ nav }: {
    nav: {
        href: string;
        label: string;
        Icon: JSX.Element;
    }
}) => {
    const pathname = usePathname()

    const isActive = pathname === nav.href

    return (
        <div className="px-4">
            <div className={cn("flex items-center gap-1 px-2 py-1.5 rounded-md", isActive ? 'bg-indigo-300 text-white font-semibold' : "")}>
                {nav.Icon}
                <span>{nav.label}</span>
            </div>
        </div>
    )
}
