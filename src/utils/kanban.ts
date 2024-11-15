import { Project } from "types/project"
import { useHttp } from "./http"
import { useQuery } from "react-query"
import { Kanban } from "types/kanban"

//获取看板列表的hook
export const useKanbans = (param? : Partial<Kanban>) =>{
    const client = useHttp()

    //用数组包裹起来代表里面的值每变化一次都会重新触发
    return useQuery<Kanban[]>(['kanbans',param],() => client('kanbans',{data: param}))
}
