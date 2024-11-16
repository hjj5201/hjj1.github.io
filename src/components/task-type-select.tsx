//用于筛选taskType搜索框
import React from "react";
import { useUers } from "utils/user";
import { IdSelect } from "./id-select";
import { useTaskTypes } from "utils/task-type";

export const TaskTypeSelect = (props:React.ComponentProps<typeof IdSelect>) =>{
    const {data:taskTypes} = useTaskTypes()
    return <IdSelect options={taskTypes || []} {...props}/>
}