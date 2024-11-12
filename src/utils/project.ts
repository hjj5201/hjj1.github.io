import { useAsync } from "./use-async";
import { Project } from "screens/project-list/list";
import { useCallback, useEffect } from "react";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useMutation, useQuery, useQueryClient } from "react-query";
// 它的主要功能是使用异步请求来获取项目列表，同时管理加载状态和错误处理。
export const useProjects = (param? : Partial<Project>) =>{
    const client = useHttp()

    //用数组包裹起来代表里面的值每变化一次都会重新触发
    return useQuery<Project[]>(['projects',param],() => client('projects',{data: param}))
}

// 编辑项目
export const useEditProject = () =>{
    const client = useHttp()
    const queryClient = useQueryClient()
    return useMutation((param:Partial<Project>) => client(`projects/${param.id}`,{
        data:param,
        method:"PATCH",
    }),{
        onSuccess: () => queryClient.invalidateQueries('projects') 
    }) 
  
}

// 增加项目
export const useAddProject = () =>{
    const client = useHttp()
    const queryClient = useQueryClient()
    return useMutation(
        //给params其他要编辑的信息
        (param:Partial<Project>) => client(`projects`,{
            data:param,
            method:"POST"
        }),{
            onSuccess: () => queryClient.invalidateQueries('projects') 
        }
        
    )
}

//获取project详情
export const useProject = (id?:number) => {
    const client = useHttp()
    return useQuery<Project>(
        ['project',{id}],
        () => client(`projects/${id}`),
        // 配置参数
        {
            // 当id有值时采取触发获取详情
            enabled:Boolean(id)
        }
    )
}