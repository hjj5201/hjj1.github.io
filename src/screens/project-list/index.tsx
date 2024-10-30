import React from "react"
import { List } from "./list"
import { SearchPanel } from "./search-panel"
import { useState,useEffect } from "react"
import { cleanObject, useMount,useDebounce } from "utils"
import *as qs from "qs"
import { useHttp } from "utils/http"
import styled from "@emotion/styled"
import { Typography} from "antd"
import { useAsync } from "utils/use-async"
import { Project } from "./list"
import { useProjects } from "utils/project"
import { useUers } from "utils/user"
// 读取网络地址提取数据的变量通过env来搞，这样子做可以不用操作源代码的基础上进行更改后端接口
const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () =>{
    // const [users,setUsers] = useState([])
    // const [list,setList] = useState([])
    const [param,setParam] = useState({
        name:'',
        personId:''
    })
    //新建一个LODING状态 给用户一个体验 当页面加载时就呈现
    // const [isLoading,setIsLoading] = useState(false)
    //异常处理
    // const [error,setError] = useState<null | Error>(null)
    //用于输入数据时不会过度频繁的进行网络请求
    const debouncedParam = useDebounce(param,200)
    // 引入封装的函数
    // const client = useHttp()
    // data另外取名list
    const { isLoading, error, data: list } = useProjects(debouncedParam);
    // 初始化setusers,只需要在页面渲染的时候触发一次
    // useMount(()=>{
    //     client('users').then(setUsers)
    // })
    //封装后的初始化user
    const {data:users} = useUers()
    return <Container>
        <h1>项目列表</h1>
        {/* 记得默认传空数组 */}
        <SearchPanel param={param} setParam={setParam} users={users || []}/>
        {/* 错误时该怎么办 */}
        {error?<Typography.Text type={"danger"}>{error.message}</Typography.Text> : null}
        {/* ataSource 属性是专门用于传递表格的数据源的。你需要将实际的数据（如你的 list）传递给 dataSource，以便 Table 组件能够正确渲染每一行。 */}
        <List dataSource={list|| []} users={users || []} loading={isLoading}/>
    </Container>
}

const Container = styled.div`
    padding: 3.2rem;
`