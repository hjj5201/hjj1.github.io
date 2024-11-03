// 抽象出一个方法
// 项目列表搜索的参数
import { useEffect, useMemo } from "react"
import { useUelQueryParam } from "utils/url"
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