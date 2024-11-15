import { useLocation } from "react-router"
import { useProject } from "utils/project"

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

export const useTaskSearchParams = () => ({projectId: useProjectIdInUrl()})

export const useTasksQueryKey = () => ['tasks',useTaskSearchParams()]