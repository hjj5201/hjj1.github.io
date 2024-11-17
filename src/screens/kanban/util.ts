import { useLocation } from "react-router"
import { useProject } from "utils/project"
import { useUelQueryParam } from "utils/url"
import { useCallback, useMemo } from "react"
import { useTask } from "utils/task"
import { useDebounce } from "utils"
// 获取url里的project的ID
export const useProjectIdInUrl = () => {
    // 获得url路径部分 URL 的路径部分指的是 URL 中位于域名之后，查询字符串 (?) 和哈希 (#) 之前的部分
    const {pathname} = useLocation()
    const id = pathname.match(/projects\/(\d+)/)?.[1]
    return Number(id)
}

// 获取project
export const useProjectInUrl = () => useProject(useProjectIdInUrl()) 


// 筛选看板，不要服务器返回的所有看板个数
export const useKanbanSearchParams = () => ({projectId: useProjectIdInUrl()})

export const useKanbansQueryKey = () => ['kanbans',useKanbanSearchParams()]

export const useTaskSearchParams = () => {
    const [param,setParam] = useUelQueryParam([
        'name',
        'typeId',
        'processorId',
        'tagId'
    ])
    const projectId = useProjectIdInUrl()
    // 防抖
    const debounceName = useDebounce(param.name,200)
    return useMemo(() =>({
        projectId,
        typeId:Number(param.typeId)||undefined,
        processorId:Number(param.processorId) || undefined,
        tagId:Number(param.tagId)||undefined,
        name:param.name
    }),[projectId,param])
}

export const useTasksQueryKey = () => ['tasks',useTaskSearchParams()]

// 编辑task
export const useTasksModal = () => {
    const [{editingTaskId},setEditingTaskId] = useUelQueryParam(['editingTaskId'])
    const {data:editingTask,isLoading} = useTask(Number(editingTaskId))  
    // 开始编辑  查useCallback
    const startEdit = useCallback((id:number) => {
        setEditingTaskId({editingTaskId:id})
    },[setEditingTaskId]) 
    // 关闭编辑框
    const close = useCallback(() =>{
        setEditingTaskId({editingTaskId:''})
    },[setEditingTaskId])
    return {
        editingTaskId,
        editingTask,
        startEdit,
        close,
        isLoading
    }
}