import qs from "qs"
import * as auth from 'auth-provider'
import { useAuth } from "context/auth-context"
import { useCallback } from "react"

const apiUrl = process.env.REACT_APP_API_URL

interface Config extends RequestInit {
    token?:string,
    data?:object,
}
// endpoint就像是${apiUrl}/的projects
export const http = async (endpoint:string,{data,token,headers,...customConfig}:Config ={})=> {

    const config = {
        //默认为GET 但是...customConfig中传入的方法会覆盖这个
        method:'GET',
        headers:{
            Authorization:token ? `Bearer ${token}` : '',
            'Content-Type': data ? 'application/json' : '',
        },
        ...customConfig
    }
    //因为get请求中参数要放在url中，而其他的是放在body里的
    if(config.method.toUpperCase() === 'GET'){
        endpoint+=`?${qs.stringify(data)}`
    }else {
        config.body = JSON.stringify(data || {})
    }
    /*
    options (可选):

    一个可选的配置对象，用于自定义请求。常见的配置选项包括：
    method: 请求方法，如 GET、POST、PUT、DELETE 等，默认是 GET。
    headers: 包含请求头的对象。
    body: 请求体内容，通常用于 POST 或 PUT 请求。
    mode, credentials, cache 等其他选项。
    */
    // axios 与fetch表现不一样
    return window.fetch(`${apiUrl}/${endpoint}`,config)
    .then(async response=>{
        //未登录的情况下或token失效的情况下服务端会返回401
        if(response.status === 401) {
            await auth.logout()
            //刷新一下
            // window.location.reload()
            window.location.reload()
            return Promise.reject({message:'请重新登录'})
        }
        const data = await response.json()
        if(response.ok) {
            return data
        }else {
            return Promise.reject(data)
        }
    })
}

export const useHttp = () =>{
    const {user} = useAuth()
    // 类型限制与http函数类型限制一样 TODO讲解Ts操作符
    return useCallback((...[endpoint,config]:Parameters<typeof http>)=> http(endpoint,{...config,token:user?.token}),[user?.token])
}