import { useState } from "react"
import { useKanbansQueryKey, useProjectIdInUrl } from "./util"
import { useAddKanban } from "utils/kanban"
import { ColumnsContainer } from "."
import { Input } from "antd"
import React from "react"
import { Container } from "./kanban-column"

//增加看板
export const CreateKanban = () => {
    const [name,setName] = useState('')
    const projectId = useProjectIdInUrl()
    const {mutateAsync:addKanban} = useAddKanban(useKanbansQueryKey())

    const submit = async () => {
        await addKanban({name,projectId})
        // 成功后重置
        setName('')
    }

    return <Container>
        <Input size={"large"} placeholder={'新建看板名称'} onPressEnter={submit} value={name} 
        onChange={evt => setName(evt.target.value)}/>
    </Container>
}