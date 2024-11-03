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
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { cleanObject } from "utils";
import { URLSearchParamsInit } from "react-router-dom"; 

/**
 * 返回页面url中，指定键参数值  比如name=骑手&prosonId=18在url上  
 * 这样写每次渲染都会创建一次新的对象导致循环渲染
 * 由于searchParams是有useSearchParams创建的，当useMemo的依赖改变后，不会重新渲染一次还
 * 傻傻的以为是新的searchParams到时有进行一次useMemo这种循环
 */
export const useUelQueryParam = <K extends string>(keys: K[]) => {
    const [searchParams, setSearchParam] = useSearchParams();

    // 调试使用
    // useEffect(() => {
    //     console.log("Current searchParams:", Array.from(searchParams.entries()));
    // }, [searchParams]);

    // const param = useMemo(() => 
    //     keys.reduce((prev: Record<K, string>, key: K) => {
    //         return { ...prev, [key]: searchParams.get(key) || '' };
    //     }, {} as Record<K, string>), 
    // [searchParams,keys]);

    // // 打印 param 的内容
    // useEffect(() => {
    //     console.log("param is:", param);
    // }, [param]);
    return [
        // 只有searchParams改变时再去运算
        useMemo(
            ()=> keys.reduce((prev: Record<K, string>, key: K) => {
                // searchParams.get(key) 从 URL 中获取对应的参数值。如果未找到该参数，使用空字符串 '' 作为默认值。
                    return { ...prev, [key]: searchParams.get(key) || '' };
                }, {} as Record<K, string>), 
            [searchParams]// 明确初始值的类型
    ),//对象的键值一定是限制在K里面取 值的类型unknow
        (params:Partial<{[key in K]:unknown}>) =>{
            // iterator 可以掌握遍历规则
            // Object.fromEntries() 是一个 JavaScript 方法，它将一个键值对的可迭代对象（如数组或 Map）转换为一个对象。这个方法非常方便，特别是在你需要从数组或其他可迭代数据结构构建对象时。
            // 读取现在的参数把变成对象，再把新传入的对象覆盖住
            const o = cleanObject({...Object.fromEntries(searchParams),...params}) as URLSearchParamsInit
            return setSearchParam(o)
        }
    ] as const;
}
