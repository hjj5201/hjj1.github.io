import React from "react"
import { List } from "./list"
import { SearchPanel } from "./search-panel"
import { useState,useEffect } from "react"
import { cleanObject, useMount,useDebounce } from "utils"
import *as qs from "qs"
import { useHttp } from "utils/http"
// 读取网络地址提取数据的变量通过env来搞，这样子做可以不用操作源代码的基础上进行更改后端接口
const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () =>{
    const [users,setUsers] = useState([])
    const [list,setList] = useState([])
    const [param,setParam] = useState({
        name:'',
        personId:''
    })
    //用于输入数据时不会过度频繁的进行网络请求
    const debouncedParam = useDebounce(param,200)
    // 引入封装的函数
    const client = useHttp()
    // 检测当用户输入字是Param变化并调用该函数,去异步请求列表，获取List  qs.st...会将返回的param转换成浏览器的格式  unknow不能赋值给任何类型的值
    useEffect(()=>{
        client('projects',{data:cleanObject(debouncedParam)}).then(setList)
    },[debouncedParam])
    // 初始化setusers,只需要在页面渲染的时候触发一次
    useMount(()=>{
        client('users').then(setUsers)
    })
    return <div>
        <SearchPanel param={param} setParam={setParam} users={users}/>
        <List list={list} users={users}/>
    </div>
}