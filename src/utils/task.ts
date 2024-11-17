
import { useHttp } from "./http"
import { Kanban } from "types/kanban"
import { Task } from "types/task"
import { useProjectsSearchParams } from "screens/project-list/util";
import { useAddConfig, useDeleteConfig, useEditConfig, useReorderConfig } from "./use-optimistic-options";
import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query";
import { SortProps } from "./kanban";


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

//获取看板详情
export const useTask = (id?:number) => {
    const client = useHttp()
    return useQuery<Task>(
        ['task',{id}],
        () => client(`tasks/${id}`),
        // 配置参数
        {
            // 当id有值时采取触发获取详情
            enabled:Boolean(id)
        }
    )
}

// 编辑task
export const useEditTask = (queryKey:QueryKey) =>{
    const client = useHttp()
    // const queryClient = useQueryClient()
    // const [searchParams] = useProjectsSearchParams()
    // console.log(searchParams);
    return useMutation((param:Partial<Task>) => client(`tasks/${param.id}`,{
        data:param,
        method:"PATCH",
    }),
    useEditConfig(queryKey)
 ) 
  
}

// 删除task
export const useDeleteTask = (queryKey:QueryKey) =>{
    const client = useHttp()
    return useMutation(
        //给params其他要编辑的信息
        ({id}:{id:number}) => client(`tasks/${id}`,{
            method:"DELETE"
        }),
        useDeleteConfig(queryKey)
    )
}

// 实现持久化,存储在数据库里
export const useReorderTask = (queryKey:QueryKey) => {
    const client = useHttp()
    return useMutation(
        (params:SortProps ) => {
            return client('tasks/reorder',{
                data:params,
                method:'POST'
            })
        },
        useReorderConfig(queryKey)
    )
}

