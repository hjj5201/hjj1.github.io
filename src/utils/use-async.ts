import { error } from "console";
import { useCallback, useState } from "react";
import { useMemo } from "react";
import { useMountedRef } from "utils";

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
// defaultConfig: 包含一个配置选项 throwOnError，指示在发生错误时是否抛出异常
const defaultConfig = {
    throwOnError:false
}

export const useAsync = <D>(initialState?: State<D>,initalConfig?:typeof defaultConfig) =>{
    const config ={...defaultConfig,...initalConfig}
    const memoizedInitialState = useMemo(() => ({
        ...defaultInitialState,
        ...initialState
    }), [initialState]);
    const [state,setState] = useState<State<D>>(
        //     {
        //     ...defaultInitialState,
        //     ...initialState,
        // }
        memoizedInitialState
)
    const mountedRef = useMountedRef()
    // useState直接传入函数的含义是：惰性初始化；所以，要用useState保存函数，不能直接传入函数
    // https://codesandbox.io/s/blissful-water-230u4?file=/src/App.js
    // 套俩层为了存储函数
    const [retry,setRetry] = useState(() => () => {

    })

    const setData = useCallback( (data:D) => setState ({
        data,
        stat:'success',
        error:null
    }),[])

    const setError = useCallback((error:Error) => setState({
        error,
        stat:'error',
        data:null
    }),[])
    //用来触发异步请求  useCallBack 是用于函数的特殊的useMemo 也是用来控制循环依赖的
    const run =  useCallback((promise : Promise<D>,runConfig?:{retry: ()=>Promise<D>})=> {
        if(!promise || !promise.then) {
            throw new Error('请传入 Promise 类型数据')
        } 
          // 使用上一次第promise跑一次
        setRetry(() => () => {
            if(runConfig?.retry){
                run(runConfig?.retry(),runConfig)
            }
        })
        // setState函数式用法
        setState(prevState => ({...prevState,stat:'loading'}))
        return promise.then(data =>{
            //增加判断,当页面挂载成功后,才设置data
            // 不这样的话，当promise在加载的时候页面被挂载，但是异步任务还在进行就会导致data依旧设置导致报错
            if(mountedRef.current){
                setData(data)
            }
            return data
        }).catch(error =>{
            //catch会消化异常,如果不主动抛出，外面是接受不到异常的 就不会显示账号密码错误这类异常
            setError(error)
            // 如果你想在调用 Promise 时根据 config.throwOnError 的值决定是否抛出错误，可以在 catch 块中进行判断。
            if(config.throwOnError) return Promise.reject(error)
            return Promise.reject(error)
        })
    },[config.throwOnError,mountedRef,setData,setError])
    return {
        isIdle : state.stat === 'idle',
        isLoading : state.stat === 'loading',
        isError: state.stat === 'error',
        isSuccess : state.stat === 'success',
        run,
        setData,
        setError,
        // 当retry被调用，就重新跑一遍run 导致编辑之后可以自动刷新 让state刷新一遍
        retry,
        ...state,
    }

}


