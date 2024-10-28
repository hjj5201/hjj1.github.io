import React from "react"
import { List } from "./list"
import { SearchPanel } from "./search-panel"
import { useState,useEffect } from "react"
import { cleanObject, useMount,useDebounce } from "utils"
import *as qs from "qs"
import { useHttp } from "utils/http"
import styled from "@emotion/styled"
import { Typography} from "antd"
// 读取网络地址提取数据的变量通过env来搞，这样子做可以不用操作源代码的基础上进行更改后端接口
const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () =>{
    const [users,setUsers] = useState([])
    const [list,setList] = useState([])
    const [param,setParam] = useState({
        name:'',
        personId:''
    })
    //新建一个LODING状态 给用户一个体验 当页面加载时就呈现
    const [isLoading,setIsLoading] = useState(false)
    //异常处理
    const [error,setError] = useState<null | Error>(null)
    //用于输入数据时不会过度频繁的进行网络请求
    const debouncedParam = useDebounce(param,200)
    // 引入封装的函数
    const client = useHttp()
    // 检测当用户输入字是Param变化并调用该函数,去异步请求列表，获取List  qs.st...会将返回的param转换成浏览器的格式  unknow不能赋值给任何类型的值
    useEffect(()=>{
        // 当请求开始时,就loding  当请求结束后改为false
        setIsLoading(true)
        client('projects',{data:cleanObject(debouncedParam)}).then(setList)
        .catch(error =>{
            //这样子页面加载错误后list就为空了
            setList([])
            setError(error)
        })
        .finally(()=> setIsLoading(false));
    },[debouncedParam])
    // 初始化setusers,只需要在页面渲染的时候触发一次
    useMount(()=>{
        client('users').then(setUsers)
    })
    return <Container>
        <h1>项目列表</h1>
        <SearchPanel param={param} setParam={setParam} users={users}/>
        {/* 错误时该怎么办 */}
        {error?<Typography.Text type={"danger"}>{error.message}</Typography.Text> : null}
        <List dataSource={list} users={users} loading={isLoading}/>
    </Container>
}

const Container = styled.div`
    padding: 3.2rem;
`