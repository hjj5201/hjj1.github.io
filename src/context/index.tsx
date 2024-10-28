import { ReactNode } from "react"
import { AuthProvider } from "./auth-context"
import {QueryClient, QueryClientProvider} from 'react-query'
// children是包在AppProviders的子组件即整个App
export const AppProviders = ({children}:{children:ReactNode}) =>{
   return (
   <QueryClientProvider client={new QueryClient()}>
         <AuthProvider>
            {children}
         </AuthProvider>
   </QueryClientProvider>
   )
}