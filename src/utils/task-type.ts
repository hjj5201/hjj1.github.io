//获取tasktype列表
import { useHttp } from "./http"
import { useQuery } from "react-query"
import { Kanban } from "types/kanban"
import { Task } from "types/task"
import { TaskType } from "types/task-type"

//获取看板列表的hook
export const useTaskTypes = () =>{
    const client = useHttp()

    //用数组包裹起来代表里面的值每变化一次都会重新触发
    return useQuery<TaskType[]>(['taskTypes'],() => client('taskTypes'))
}