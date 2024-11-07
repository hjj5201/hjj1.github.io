import { useCallback, useReducer, useState } from "react"

const UNDO =  'UNDO'
const REDO = 'REDO'
const SET = 'SET'
const RESET = 'RESET'

type State<T> = {
    past:T[],
    present:T,
    future:T[]
}

type Action<T> = {newPresent?: T,type:typeof UNDO | typeof REDO | typeof SET | typeof RESET} 

const  undoReducer = <T>(state:State<T>,action:Action<T>) => {
    const {past,present,future} = state 
    const {type,newPresent} = action

    switch(action.type) {
        case UNDO : {
                const {past,present,future} = state
    
                if(past.length === 0 ) return state
    
                const previous = past[past.length -1]
                // 复制从0下标到...下标
                const newPast = past.slice(0,past.length-1)
        
                return {
                    past:newPast,
                    present:previous,
                    future:[present,...future]
                }
        }
        case REDO: {
            const {past,present,future} = state
            if(future.length === 0) return state

            const next = future[0]
            const newFuture =future.slice(1)

            return {
                past:[...past,present],
                present:next,
                future:newFuture,
            }
        }

        case SET: {
            const {past,present,future} = state
            if(newPresent === present) {
                return state
            }
            return {
                past:[...past,present],
                present:newPresent,
                future:[],
            }
        }

        case RESET: {
            return {
                past:[],
                present:newPresent,
                future:[]
            }
        }
    }
    return state
}

export const useUndo = <T>(initialPresent: T) => {
    // 记录历史操作的合集
    // const [past,setPast] = useState<T[]>([])
    // const [present,setPresent] = useState(initialPresent)
    // const [future,setFuture] = useState<T[]>([])

    const [state,dispath] = useReducer(undoReducer,{
        past:[] ,
        present:initialPresent,
        future:[] ,
    }as State<T>)


    // 有历史记录
    const canUndo = state.past.length !==0
    const canRedo = state.future.length ! == 0

    const Undo = useCallback(() => dispath({type:UNDO}),[])

    const redo = useCallback(() => dispath({type:REDO}) ,[])
    const set =useCallback((newPresent : T) => dispath({type:SET,newPresent}),[])


    const reset =useCallback( (newPresent:T) => dispath({type:RESET,newPresent}),[])

    return [
        state,
        {set,reset,Undo,redo,canUndo,canRedo}
    ]
}