import { error } from "console";
import { useState } from "react";

interface State<D> {
    error: Error | null;
    data : D | null;
    stat : 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialState : State<null> = {
    stat:'idle',
    data: null,
    error:null
}

const defaultConfig = {
    throwOnError:false
}

export const useAsync = <D>(initialState?: State<D>,initalConfig?:typeof defaultConfig) =>{
    const config ={...defaultConfig,initalConfig}
    const [state,setState] = useState<State<D>>({
        ...defaultInitialState,
        ...initialState
    })

    const setData = (data:D) => setState ({
        data,
        stat:'success',
        error:null
    })

    const setError = (error:Error) => setState({
        error,
        stat:'error',
        data:null
    })
    //用来触发异步请求
    const run = (promise : Promise<D>)=> {
        if(!promise || !promise.then) {
            throw new Error('请传入 Promise 类型数据')
        }
        setState({...state,stat:'loading'})
        return promise.then(data =>{
            setData(data)
            return data
        }).catch(error =>{
            //catch会消化异常,如果不主动抛出，外面是接受不到异常的 就不会显示账号密码错误这类异常
            setError(error)
            // 如果你想在调用 Promise 时根据 config.throwOnError 的值决定是否抛出错误，可以在 catch 块中进行判断。
            if(config.throwOnError) return Promise.reject(error)
            return Promise.reject(error)
        })
    }

    return {
        isIdle : state.stat === 'idle',
        isLoading : state.stat === 'loading',
        isError: state.stat === 'error',
        isSuccess : state.stat === 'success',
        run,
        setData,
        setError,
        ...state
    }

}


