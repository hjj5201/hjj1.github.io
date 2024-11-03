//用于筛选用户
import React from "react";
import { useUers } from "utils/user";
import { IdSelect } from "./id-select";

export const UserSelect = (props:React.ComponentProps<typeof IdSelect>) =>{
    const {data:users} = useUers()
    return <IdSelect options={users || []} {...props}/>
}