// 这个文件可以帮助操控JWT中的token
// 在真实环境中，如果使用firebase这种第三方auth服务的话。本文件不需要开发
import {User} from "screens/project-list/search-panel"

// localStorageKey：定义一个常量，用于存储用户的 JWT 令牌在浏览器的本地存储中。
const localStorageKey = '__auth_provider_token__'

const apiUrl = process.env.REACT_APP_API_URL

// 这个函数从浏览器的本地存储中获取并返回 JWT 令牌。
// localStorage 是 Web Storage API 的一部分，用于在用户的浏览器中以键值对的形式存储数据。数据会在浏览器关闭后仍然存在，直到被明确删除。
// setItem(key, value):setItem 是 localStorage 的方法，用于将一个键（key）和对应的值（value）存储在 localStorage 中。
// 总体来说就是将用户的token信息存储到浏览器中直至被删除，这样子浏览器就可以区分是谁在登录
export const getToken = () => window.localStorage.getItem(localStorageKey)

/*
    参数：接收一个包含用户信息的对象。
    存储令牌：将用户的 JWT 令牌存储到本地存储中。
    返回用户对象：返回用户信息，通常在登录或注册成功后调用
*/
export const handleUserResponse = ({user}:{user:User}) =>{
    window.localStorage.setItem(localStorageKey,user.token||'')
    return user
}

/*
    参数：接收一个对象，包含用户名和密码。
    fetch 请求：向 ${apiUrl}/login 发送 POST 请求。
    请求头：指定请求体的格式为 JSON。
    请求体：将传入的 data 对象转换为 JSON 字符串。
    处理响应：如果响应状态正常（response.ok），解析 JSON 数据并调用 handleUserResponse 处理用户信息。
*/
export const login = (data:{username:string,password:string}) =>{
     /*
            ${apiUrl}/login：使用模板字符串拼接出请求的完整 URL。apiUrl 是一个变量，包含 API 的基本地址。

            method: 'post'：指定 HTTP 请求的方法为 POST。POST 方法通常用于提交数据。

            headers：请求头部分。这里设置了 Content-Type 为 application/json，这表明请求体中将包含 JSON 格式的数据。

            body: JSON.stringify(param)：将 param 对象转换为 JSON 字符串并作为请求体发送。param 通常是一个包含用户输入或其他数据的对象。
        */
    return fetch(`${apiUrl}/login`,{
        method:'POST',
        headers:{
            // 要传进去json数据就要这样配置
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    }).then(async response=>{
        if(response.ok){
             // await 是 JavaScript 中用于处理异步操作的关键字，通常与 async 函数一起使用。它的主要作用是暂停函数的执行，直到一个 Promise 对象解决（即完成）并返回结果。
            // 这个方法会解析响应体并将其转换为 JavaScript 对象。这个解析也是一个异步操作。
          return handleUserResponse(await response.json())
        }else{
            return Promise.reject(await response.json())
        }
    })
}

export const register = (data:{username:string,password:string}) =>{
     /*
            ${apiUrl}/login：使用模板字符串拼接出请求的完整 URL。apiUrl 是一个变量，包含 API 的基本地址。

            method: 'post'：指定 HTTP 请求的方法为 POST。POST 方法通常用于提交数据。

            headers：请求头部分。这里设置了 Content-Type 为 application/json，这表明请求体中将包含 JSON 格式的数据。

            body: JSON.stringify(param)：将 param 对象转换为 JSON 字符串并作为请求体发送。param 通常是一个包含用户输入或其他数据的对象。
        */
    return fetch(`${apiUrl}/register`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    }).then(async response=>{
        if(response.ok){
          return handleUserResponse(await response.json())
        }else{
            return Promise.reject(await response.json())
        }
    })
}
// 这个函数简单地从本地存储中移除 JWT 令牌，表示用户已注销。
export const  logout = async() =>window.localStorage.removeItem(localStorageKey)