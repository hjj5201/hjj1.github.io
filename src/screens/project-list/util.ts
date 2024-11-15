// 抽象出一个方法
// 项目列表搜索的参数
import { useEffect, useMemo } from "react"
import { useProject } from "utils/project"
import { useSetUrlSearchParam, useUelQueryParam } from "utils/url"
import { useSearchParams } from "react-router-dom"
export const useProjectsSearchParams = () =>{
    const [param,setParam] = useUelQueryParam(["name","personId"])
    // useEffect(()=>{
    //     console.log("param is",param);
    // },[param])
    return [
        useMemo(() => ({...param,personId:Number(param.personId)||undefined}),[param]),
        setParam
    ] as const
}

export const useProjectsQueryKey = () =>  {
    const [params] = useProjectsSearchParams()
     return ['projects',params]
}

//新建hook  全局状态管理抽屉关闭还是开启
export const useProjectModal = () => {
    // 用这个url参数来判断现在是不是创建
    const [{projectCreate},setProjectCreate] = useUelQueryParam([
        'projectCreate'
    ])

    //用这个参数来判断是不是编辑  当我们编辑某个项目时，它的url就是这个
    const [{editingProjectId},setEditingProjectId] = useUelQueryParam([
        'editingProjectId'
    ])

    // 获取projects详情
    const {data:editingProject,isLoading} = useProject(Number(editingProjectId))

    const setUrlParams = useSetUrlSearchParam();

    const open = () => setProjectCreate({projectCreate:true})
    const close = () => setUrlParams({
        projectCreate:"",
        editingProjectId:""
        // setProjectCreate({projectCreate:undefined})
        // setEditingProjectId({editingProjectId:undefined})
    })
    const startEdit = (id:number) => setEditingProjectId({editingProjectId:id})

    return {
        // 他们俩个任意有值的时候都要打开模态框
        projectModalOpen:projectCreate === "true" || Boolean(editingProject),
        //  projectCreate === 'true' || Boolean(editingProject)
        open,
        close,
        startEdit,
        editingProject,
        isLoading,
    }
}