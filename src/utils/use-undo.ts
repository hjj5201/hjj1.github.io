import { useCallback, useState } from "react"

export const useUndo = <T>(initialPresent: T) => {
    // 记录历史操作的合集
    // const [past,setPast] = useState<T[]>([])
    // const [present,setPresent] = useState(initialPresent)
    // const [future,setFuture] = useState<T[]>([])


    //合并状态。防止useCallBack依赖项过多重复 把互相关联，互相影响的状态结合在一起 这样子做久useCallBack不需要再增加依赖
    const [state,setState] = useState({
        past:[] as T[],
        present:initialPresent as T,
        future:[] as T[],
    })

    // 有历史记录
    const canUndo = state.past.length !==0
    const canRedo = state.future.length ! == 0

    const Undo = useCallback(() => {
        setState(currentState => {
            const {past,present,future} = currentState

            if(past.length === 0 ) return currentState

            const previous = past[past.length -1]
            // 复制从0下标到...下标
            const newPast = past.slice(0,past.length-1)
    
            return {
                past:newPast,
                present:previous,
                future:[present,...future]
            }
        })
    },[])

    const redo = useCallback(() => {
        setState(currentState =>{
            const {past,present,future} = currentState
            if(future.length === 0) return currentState

            const next = future[0]
            const newFuture =future.slice(1)

            return {
                past:[...past,present],
                present:next,
                future:newFuture,
            }
        })
    }
,[])
    const set =useCallback((newPresent : T) => {
        setState(currentState => {
            const {past,present,future} = currentState
            if(newPresent === present) {
                return currentState
            }
            return {
                past:[...past,present],
                present:newPresent,
                future:[],
            }
        })
    },[])


    const reset =useCallback( (newPresent:T) => {
        setState(currentState => {
            return {
                past:[],
                present:newPresent,
                future:[]
            }
        })
    },[])

    return [
        state,
        {set,reset,Undo,redo,canUndo,canRedo}
    ]
}