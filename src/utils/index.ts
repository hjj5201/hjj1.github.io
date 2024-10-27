import { useEffect, useState } from "react";

export const isFalsy = (value:unknown) => value === 0 ? false : !value

//在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (object:object) =>{
    const result = {...object}
    Object.keys(result).forEach(key => {
        //排除了value为0的情况，防止浏览器在搜索栏没有的时候返回空而不是全部
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
// 用在在页面加载的时候执行函数即完成初始化，放到这里利于代码复用
export const useMount = (callback:() => void) =>{
    useEffect(() =>{
        callback()
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


