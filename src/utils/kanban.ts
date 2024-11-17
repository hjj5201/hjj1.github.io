import { Project } from "types/project"
import { useHttp } from "./http"
import { Kanban } from "types/kanban"
import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query";
import { useProjectsSearchParams } from "screens/project-list/util";
import { useAddConfig, useDeleteConfig, useEditConfig, useReorderConfig } from "./use-optimistic-options";

//获取看板列表的hook
export const useKanbans = (param? : Partial<Kanban>) =>{
    const client = useHttp()

    //用数组包裹起来代表里面的值每变化一次都会重新触发
    return useQuery<Kanban[]>(['kanbans',param],() => client('kanbans',{data: param}))
}


//增加看板
export const useAddKanban = (queryKey:QueryKey) =>{
    const client = useHttp()
    return useMutation(
        //给params其他要编辑的信息
        (param:Partial<Kanban>) => client(`kanbans`,{
            data:param,
            method:"POST"
        }),
        useAddConfig(queryKey)
    )
}

// 删除看板
export const useDeleteKanban = (queryKey:QueryKey) =>{
    const client = useHttp()
    return useMutation(
        //给params其他要编辑的信息
        ({id}:{id:number}) => client(`kanbans/${id}`,{
            method:"DELETE"
        }),
        useDeleteConfig(queryKey)
    )
}

export interface SortProps {
    // 要重新排序的item
    fromId:number;
    // 目标item
    referenceId:number;
    // 放在目标item的前还是后
    type:'before' | 'after';
    fromKanbanId?:number,
    toKanbanId?:number,
}

// 实现持久化,存储在数据库里
export const useReorderKanban = (queryKey:QueryKey) => {
    const client = useHttp()
    return useMutation(
        (params:SortProps ) => {
            return client('kanbans/reorder',{
                data:params,
                method:'POST'
            })
        },
        useReorderConfig(queryKey)
    )
}