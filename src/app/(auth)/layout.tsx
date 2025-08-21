import { ReactNode } from "react"

const AuthLayout = ({children}:{children:ReactNode})=>{

    return (
        <section className="flex items-center justify-center h-screen">
            {children}
        </section>
    )
}

export default AuthLayout