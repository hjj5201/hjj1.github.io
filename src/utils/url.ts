// import { useSearchParams } from "react-router-dom"
// // 
// /**
//  * 返回页面url中，指定键参数值  比如name=骑手&prosonId=18在url上  
//  */
// export const useUelQueryParam =<K extends string> (keys:K[]) =>{
//     // searchParams保存着url中后面所带的所有参数信息 但是想要读里面的参数 searchParams.get('name')
//     const [searchParams,setSearchParam] = useSearchParams()
//     return [
//             keys.reduce((Record<K, string>,key:K)=>{
//             // 加中括号表示key是一个变量不是字符串
//             return {...prev,[key]:searchParams.get(key) || ''}
//         },{} as Record<K, string>),
//         setSearchParam
//     ] as const
// }
// // 返回最原始的一个类型
// // const a = ['jack',12,{gender:'male'}] as const 
import { useSearchParams } from "react-router-dom";

/**
 * 返回页面url中，指定键参数值  比如name=骑手&prosonId=18在url上  
 */
export const useUelQueryParam = <K extends string>(keys: K[]) => {
    const [searchParams, setSearchParam] = useSearchParams();

    return [
        keys.reduce((prev: Record<K, string>, key: K) => {
            return { ...prev, [key]: searchParams.get(key) || '' };
        }, {} as Record<K, string>), // 明确初始值的类型
        setSearchParam
    ] as const;
}
