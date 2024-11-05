import { useAsync } from "./use-async";
import { Project } from "screens/project-list/list";
import { useEffect } from "react";
import { cleanObject } from "utils";
import { useHttp } from "./http";
// 它的主要功能是使用异步请求来获取项目列表，同时管理加载状态和错误处理。
export const useProjects = (param? : Partial<Project>) =>{
    const client = useHttp()
    // data另外取名list
    const { run, ...result } = useAsync<Project[]>();

    const fetchProjects = () =>client('projects',{data:cleanObject(param || {})})
    useEffect(()=>{
        // 使用useAsync 来获取项目列表异步操作的状态
        run(fetchProjects(),{
            retry:fetchProjects
        })
        // // 当请求开始时,就loding  当请求结束后改为false
        // setIsLoading(true)
        // client('projects',{data:cleanObject(debouncedParam)})
        // .then(setList)
        // .catch(error =>{
        //     //这样子页面加载错误后list就为空了
        //     setList([])
        //     setError(error)
        // })
        // .finally(()=> setIsLoading(false));
    },[param]);
    return result
}

// 编辑项目
export const useEditProject = () =>{
    const {run,...asyncrResult} = useAsync()
    const client = useHttp()
    //给params其他要编辑的信息
    const mutate = (params:Partial<Project>) => {
        return run(client(`projects/${params.id}`,
            {
                data:params,
                method:'PATCH'
            }
        ))
    }
    return {
        mutate,
        ...asyncrResult
    }
}

// 增加项目
export const useAddProject = () =>{
    const {run,...asyncrResult} = useAsync()
    const client = useHttp()
    //给params其他要编辑的信息
    const mutate = (params:Partial<Project>) => {
        console.log(params);
        return run(client(`projects/${params.id}`,
            {
                data:params,
                method:'POST'
            }
        ))
    }
    return {
        mutate,
        ...asyncrResult
    }
}