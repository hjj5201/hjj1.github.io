import React, { useEffect, useState } from "react";
import { useMount } from "utils";


//出现问题  明明我们通过点击改变了num的值，但是卸载组件和useMOUNT的num都为0
// 这是react hook 与 闭包 ，hook 与 闭包经典的坑
export const Test = () =>{
    const [num,setNum] = useState(0)

    const add = () => setNum(num + 1)

    useMount(()=>{
        setInterval(() => {
            console.log('num in setInterval',num);
        },1000)
    })

    useEffect(() =>{
        return ()=>{
            console.log(num);
        }
    },[])

    return <div>
        <button onClick={add}>add</button>
        <p>
            number:{num}
        </p>
    </div>
}