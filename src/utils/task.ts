
import { useHttp } from "./http"
import { useQuery } from "react-query"
import { Kanban } from "types/kanban"
import { Task } from "types/task"

//获取看板列表的hook
export const useTasks = (param? : Partial<Task>) =>{
    const client = useHttp()

    //用数组包裹起来代表里面的值每变化一次都会重新触发
    return useQuery<Task[]>(['tasks',param],() => client('tasks',{data: param}))
}