import { Globe, GlobeLock, House, LayoutDashboard, User } from "lucide-react"
import { JSX } from "react"

export const AUTH_ROUTES= ['/auth/login','/auth/register','/auth/reset-password']
export const PUBLIC_ROUTES = ['/','/public-route',]
export const REDIRECT_TO = {
    HOME:'/',
    DASHBOARD:"/dashboard",
    LOGIN_PAGE:'/auth/login',
    REGISTER_PAGE:'/auth/register',
} as const


export const appRoute = {
    HOME:'/',
    DASHBOARD:"/dashboard",
    PUBLIC:'/public-route',
    NOT_PUBLIC:"/not-public-route",
    FAMILY:'/family-dynamic-page-1',
    MEMBER:'/family-dynamic-page-1/member/member-dynamic-page-1',
    LOGIN_PAGE:'/auth/login',
    REGISTER_PAGE:'/auth/register',
} as const

export const appRouteIcon : Partial<Record<AppRouteKey,JSX.Element>> = {
    HOME:<House size={20}/>,
    DASHBOARD:<LayoutDashboard size={20}/>,
    FAMILY:<User size={20}/>,
    MEMBER:<User size={20}/>,
    PUBLIC:<Globe size={20}/>,
    NOT_PUBLIC:<GlobeLock size={20}/>

}

type AppRoute = typeof appRoute[keyof typeof appRoute]
export type AppRouteKey = keyof typeof appRoute
