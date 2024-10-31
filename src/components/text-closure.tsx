import React, { useEffect, useState } from "react";
import { useMount } from "utils";

//想test组件抽象成一个纯函数
const test  = () =>{
    let num = 0

    const effect = () => {
        num +=1
        const message = `现在的num值:${num}`
        return function unmount() {
            console.log(message);
        }
    }
    return effect
}
//执行test 返回effect
const add = test()
// 执行effect函数，返回引用了message1的unmount函数
const unmount = add()
// 再一次执行effect函数，返回引用了返回引用了message2的unmount函数
add()
// 再一次执行effect函数，返回引用了返回引用了message3的unmount函数
add()
// 引用message1的数据
unmount()//会打印什么呢：1


//出现问题  明明我们通过点击改变了num的值，但是卸载组件和useMOUNT的num都为0
// 这是react hook 与 闭包 ，hook 与 闭包经典的坑
export const Test = () =>{
    const [num,setNum] = useState(0)

    const add = () => setNum(num + 1)

    useEffect(()=>{
        const id = setInterval(() => {
            console.log('num in setInterval',num);
        },1000)
        return () => clearInterval(id)
    },[num])
    //这就像add一样，每次调用都是新的num始终是初始的0  所以我们要[num] 说明每当num改变 这里面从新定义一遍就可以拿到最新的值而不是0
    useEffect(() =>{
        return ()=>{
            console.log('卸载值',num);
        }
    },[num])

    return <div>
        <button onClick={add}>add</button>
        <p>
            number:{num}
        </p>
    </div>
}