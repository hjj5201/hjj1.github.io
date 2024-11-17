// 给搜索的文字添加高亮
import React from "react";

export const Mark = ({name,keyword}:{name:string,keyword:string}) => {
    if(!keyword) {
        return <>{name}</>
    }
    const arr = name.split(keyword)
    return <>
        {
            arr.map((str:string,index:number) => <span>
            {str}
            {
                index === arr.length-1? null : <span style={{color:'#257AFD'}}>
                    {keyword}
                </span>
            }
        </span>)
        }    
</>
}
