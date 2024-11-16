import React,{useEffect, useState} from "react";
import { useAddTask } from "utils/task";
import { useProjectIdInUrl, useTasksQueryKey } from "./util";
import { Card, Input } from "antd";

export const CreateTask = ({kanbanId}:{kanbanId:number}) => {
    const [name,setName] = useState('')
    const {mutateAsync:addTask} = useAddTask(useTasksQueryKey())
    const projectId = useProjectIdInUrl()
    const [inputMode,setInputMode] = useState(false)

    const submit = async () => {
        await addTask({projectId,name,kanbanId})
        // 输入状态关闭
        setInputMode(false)
        setName('')
    }

    const toggle = () => setInputMode(mode => !mode)

    useEffect(() => {
        if(!inputMode){
            setName('')
        }
    },[inputMode])

    if(!inputMode) {
        return <div onClick={toggle}>+创建事务</div>
    }
    // 是inputMode的内容
    return <Card>
        <Input onBlur={toggle} 
        placeholder={"需要做什么"} 
        onPressEnter={submit} 
        value={name} 
        onChange={evt => setName(evt.target.value)}/>
    </Card>
}