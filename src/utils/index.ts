import { useEffect, useState } from "react";

export const isFalsy = (value:any) => value === 0 ? false : !value
export const cleanObject = (object:object) =>{
    const result = {...object}
    Object.keys(result).forEach(key => {
        //@ts-ignore
        const value = result[key]
        if(isFalsy(value)){
            //@ts-ignore
            delete result[key]
        }
    });
    return result
}
// 写自定义HOOK时，一定要加use，不然就是普通函数而用不了其他hook比如生命钩子
export const useMount = (callback:() => void) =>{
    useEffect(() =>{
        callback()
    },[])
}

export const useDebounce = (value:any,delay?:number) =>{
    const [debounceValue,setDebounceValue] = useState(value)

    useEffect(()=>{
        const timeout = setTimeout(() => setDebounceValue(value),delay)
        return ()=>clearTimeout(timeout)
    },[value,delay])
    return debounceValue
}


