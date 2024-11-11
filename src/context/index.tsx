import { ReactNode } from "react"
import { AuthProvider } from "./auth-context"
import {QueryClient, QueryClientProvider} from 'react-query'
// children是包在AppProviders的子组件即整个App

export const AppProviders = ({children}:{children:ReactNode}) =>{
   const queryClient = new QueryClient()
   return (
   <QueryClientProvider client={queryClient}>
         <AuthProvider>
            {children}
         </AuthProvider>
   </QueryClientProvider>
   )
}