import React from "react"
import { List } from "./list"
import { SearchPanel } from "./search-panel"
import { useState,useEffect } from "react"
import { cleanObject, useMount,useDebounce } from "utils"
import *as qs from "qs"
import { useHttp } from "utils/http"

const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () =>{
    const [users,setUsers] = useState([])
    const [list,setList] = useState([])
    const [param,setParam] = useState({
        name:'',
        personId:''
    })
    const debouncedParam = useDebounce(param,200)
    const client = useHttp()
    useEffect(()=>{
        client('projects',{data:cleanObject(debouncedParam)}).then(setList)
    },[debouncedParam])

    useMount(()=>{
        client('users').then(setUsers)
    })
    return <div>
        <SearchPanel param={param} setParam={setParam} users={users}/>
        <List list={list} users={users}/>
    </div>
}