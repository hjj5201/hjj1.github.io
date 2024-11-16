
import { useHttp } from "./http"
import { Kanban } from "types/kanban"
import { Task } from "types/task"
import { useProjectsSearchParams } from "screens/project-list/util";
import { useAddConfig, useDeleteConfig, useEditConfig } from "./use-optimistic-options";
import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query";



//获取看板列表的hook
export const useTasks = (param? : Partial<Task>) =>{
    const client = useHttp()

    //用数组包裹起来代表里面的值每变化一次都会重新触发
    return useQuery<Task[]>(['tasks',param],() => client('tasks',{data: param}))
}

//增加看板列表
export const useAddTask = (queryKey:QueryKey) =>{
    const client = useHttp()
    return useMutation(
        //给params其他要编辑的信息
        (param:Partial<Task>) => client(`tasks`,{
            data:param,
            method:"POST"
        }),
        useAddConfig(queryKey)
    )
}