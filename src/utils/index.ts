import { useEffect, useRef, useState } from "react";

export const isFalsy = (value:unknown) => value === 0 ? false : !value

export const isVoid = (value:unknown) => value ===undefined ||value ===null || value === ''

// Ts中的object很广泛  一下全都不报错
// let a:object
// a = {name:'jack'}
// a= ()=>{   
// }  如果结构一个函数是没有意义的所以返回空对象
// a = new RegExp('')

// let b :{[key:string]:unknown}
// b = {name : 'jack'}
// b = () =>{
// }这个函数就报错

//在一个函数里，改变传入的对象本身是不好的   限制类型全都要键值对 用object太广泛了
export const cleanObject = (object:{[key: string]:unknown}) =>{
    const result = {...object}
    Object.keys(result).forEach(key => {
        //排除了value为0的情况，防止浏览器在搜索栏没有的时候返回空而不是全部
        const value = result[key]
        if(isVoid(value)){
            delete result[key]
        }
    });
    return result
}
// 写自定义HOOK时，一定要加use，不然就是普通函数而用不了其他hook比如生命钩子
// 用在在页面加载的时候执行函数即完成初始化，放到这里利于代码复用
export const useMount = (callback:() => void) =>{
    useEffect(() =>{
        callback()
        //TODO 依赖项里加上cllback会造成无限循环，这个和userCallback以及useMemo有关系
        //eslint-disabel-next-line 
    },[])
}
// const debounce = (func, delay) => {
//   let timeout;
//   return (...param) => {
//     if (timeout) {
//       clearTimeout(timeout);
//     }
//     timeout = setTimeout(function() {
//       func(...param);
//     }, delay);
//   }
// }
// const log = debounce(() => console.log('call'), 5000)
// log()
// log()
// log()
//   ...5s
// 执行！

// debounce 原理讲解：
// 0s ---------> 1s ---------> 2s --------> ...
//     一定要理解：这三个函数都是同步操作，所以它们都是在 0~1s 这个时间段内瞬间完成的；
//     log()#1 // timeout#1
//     log()#2 // 发现 timeout#1！取消之，然后设置timeout#2
//     log()#3 // 发现 timeout#2! 取消之，然后设置timeout#3
//             // 所以，log()#3 结束后，就只剩timeout#3在独自等待了
//主要看在value变化的时候执行 箭头函数泛型占位符在这V  传入给value的实行就是V  传入一个value V 再返回一个Value V
export const useDebounce = <V>(value:V,delay?:number) =>{
    const [debounceValue,setDebounceValue] = useState(value)
    //每次在value变化以后，设置一个定时器
    useEffect(()=>{
        const timeout = setTimeout(() => setDebounceValue(value),delay)
        //每次在上一个useEffect处理完再运行
        return ()=>clearTimeout(timeout)
    },[value,delay])
      // 由于ts的自动推断，可能会推断出他是unknow，导致不能赋值给别的类型，所以返回值限定为any 后面用泛型来规范类型
    return debounceValue
}


// 用来加载页签呈现什么  当页面卸载时，将title退回之前的title
export const useDocumentTitle = (title:string,keepOnUnmount:boolean = true ) =>{
    //记录旧的title  利用useRef将旧title保存起来 不会随着声明周期改变而改变
    const oldTitle =useRef(document.title).current
    //页面加载时,oldTitle === 旧'React APP'
    //加载后:oldTitle === 新title

    useEffect(()=>{
        document.title = title
    },[title])

    useEffect(()=>{
        return ()=>{
            if(!keepOnUnmount){
                //页面卸载如果不指定依赖，读到的就是旧title
                document.title = oldTitle
            }
        }
    },[keepOnUnmount,oldTitle])
}

//重置路由的方法
// window.location.href这个属性返回当前页面的完整 URL，包括协议、主机、端口（如果有的话）以及路径和查询字符串
// window.location.origin: 这个属性返回当前页面的来源，包含协议、主机和端口（如果有的话），但不包括路径和查询字符串。
// 这意味着浏览器将重定向到该页面的根目录
export const resetRoute = () => window.location.href = window.location.origin

