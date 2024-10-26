import { ReactNode } from "react"
import { AuthProvider } from "./auth-context"
// children是包在AppProviders的子组件即整个App
export const AppProviders = ({children}:{children:ReactNode}) =>{
   return <AuthProvider>
    {children}
   </AuthProvider>
}