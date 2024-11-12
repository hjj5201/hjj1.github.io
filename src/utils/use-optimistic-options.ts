
import { QueryKey, useQueryClient } from "react-query";

//这个Hook是用来生成乐观更新，因为其他数据也可能需要这个功能，所以这个是我们的生产器
export const  useConfig = (queryKey:QueryKey,callback:(target: any, old?:any[]) => any[]) => {
    const queryClient = useQueryClient()
    return {
        onSuccess: () => queryClient.invalidateQueries(queryKey),
        // 乐观更新，为了点击收藏，不等服务器返回过来就直接更新，如果服务器出错就回滚
        async onMutate(target:any) {
            
            const previousItems = queryClient.getQueryData(queryKey)
            // old缓存的列表数据
            queryClient.setQueryData(queryKey,(old?:any[]) => {
                return callback(target, old)
            })
            return {previousItems}
        },
        onError(error:any,newItem:any,context : any) {
            //回滚机制  context有previousItem返回过来的  出错之后把原来的数据回滚掉
            queryClient.setQueryData(queryKey,context.previousItems)
        }
    }
}

//细分
export const useDeleteConfig = (queryKey:QueryKey) => useConfig(queryKey,(target,old) => old?.filter(item => item.id !== target.id) || [])
export const useEditConfig = (queryKey:QueryKey) => useConfig(queryKey,(target,old) => old?.map(item => item.id === target.id ? {...item,...target} : item) || [])
export const useAddConfig = (queryKey:QueryKey) => useConfig(queryKey,(target,old) => old ? [...old,target] : [])
