import React, { ReactNode, useState } from "react"
// 这行代码使用 ES6 的模块导入语法，从 auth-provider 模块中导入所有导出的内容，并将其命名为 auth
import *as auth from 'auth-provider'
import { User } from "screens/project-list/search-panel"
import {http} from "utils/http"
import { useMount } from "utils"

interface AuthFrom{
    username:string,
    password:string,
}
//初始化user，使的登录状态下刷新不会登出 去locastoge中找到token并通过token找到用户信息完成初始化避免刷新后登出
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
    // 这是函数的返回类型，表示该函数返回一个 Promise 对象，且这个 Promise 在解决时不会返回任何值（void）。
    register: (from:AuthFrom) => Promise<void>,
    login: (from:AuthFrom) => Promise<void>,
    logout: () => Promise<void>,
} |  undefined >(undefined)//给他一个undifind导致默认推断AuthContext.Provider返回值也为undifind所以要用泛型
// 这是一个 React 特性，用于为组件或上下文提供一个可读的名称。这个名称主要用于调试目的。
AuthContext.displayName = 'AuthContext'

//给children指定类型，防止在index中报错
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
    // useContext 是 React 的一个 Hook，用于在函数组件中访问上下文的值。它允许你在任何子组件中获取由父组件提供的上下文数据。
    const context = React.useContext(AuthContext)
    if(!context){
        throw new Error('useAuth必须在AuthProvider中使用')
    }
    return context
}