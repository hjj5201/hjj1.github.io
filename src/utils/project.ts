import { useAsync } from "./use-async";
import { Project } from "screens/project-list/list";
import { useEffect } from "react";
import { cleanObject } from "utils";
import { useHttp } from "./http";
export const useProjects = (param? : Partial<Project>) =>{
    const client = useHttp()
    // data另外取名list
    const { run, ...result } = useAsync<Project[]>();
    useEffect(()=>{
        // 使用useAsync 来获取项目列表异步操作的状态
        run(client('projects',{data:cleanObject(param || {})}))
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