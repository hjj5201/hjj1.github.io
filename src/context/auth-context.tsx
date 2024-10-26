import React, { ReactNode, useState } from "react"
import *as auth from 'auth-provider'
import { User } from "screens/project-list/search-panel"
import {http} from "utils/http"
import { useMount } from "utils"

interface AuthFrom{
    username:string,
    password:string,
}

const bootstrapUser = async()=>{
    let user = null
    const token = auth.getToken()
    if(token){
        const data = await http('me',{token})
        user = data.user
    }
    return user
}

const AuthContext = React.createContext<{
    user:User|null,
    register: (from:AuthFrom) => Promise<void>,
    login: (from:AuthFrom) => Promise<void>,
    logout: () => Promise<void>,
} |  undefined >(undefined)
AuthContext.displayName = 'AuthContext'


export const AuthProvider = ({children}:{children:ReactNode}) => {
    // 由于初始值为null导致登录状态下已刷新也成user变null导致登出
    const [user,setUser] = useState<User |null>(null)

    const login = (form:AuthFrom) => auth.login(form).then(user =>setUser(user))
    const register = (form:AuthFrom) => auth.register(form).then(user =>setUser(user))
    const logout = () => auth.logout().then(user => setUser(null))
    //在页面加载时调用
    useMount(() => {
        bootstrapUser().then(setUser)
    })
    return <AuthContext.Provider value={{user,login,register,logout}} children={children}/>
}

export const useAuth = () =>{
    const context = React.useContext(AuthContext)
    if(!context){
        throw new Error('useAuth必须在AuthProvider中使用')
    }
    return context
}