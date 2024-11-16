import React from "react";
import { useDocumentTitle } from "utils";
import { useKanbans } from "utils/kanban";
import { useKanbanSearchParams, useProjectIdInUrl, useProjectInUrl, useTaskSearchParams } from "./util";
import { KanbanColumn } from "./kanban-column";
import { Divider, Spin } from "antd";
import styled from "@emotion/styled";
import { SearchPanel } from "./serach-panel";
import { ScreenContainer } from "components/lib";
import { useTasks } from "utils/task";
import { CreateKanban } from "./create-kanban";

export const KanbanScreen = () =>{
    useDocumentTitle('看板列表')
    const {data:currentProject} = useProjectInUrl()
    const {data:kanbans,isLoading:kanbanIsLoading} = useKanbans(useKanbanSearchParams())
    const {isLoading:taskIsLoading} = useTasks(useTaskSearchParams())
    const isLoading = taskIsLoading||kanbanIsLoading
    return <ScreenContainer>
        <h1>{currentProject?.name}看板</h1>
        <SearchPanel/>
        {isLoading ? <Spin size={"large"}/> : <ColumnsContainer>
       {
             kanbans?.map(kanban => <KanbanColumn key={kanban.id} kanban={kanban}/>)
        }
        <CreateKanban/>
       </ColumnsContainer>}
    </ScreenContainer>
}

export const ColumnsContainer = styled.div`
    display: flex;
    overflow-x: scroll;
    /* 抢占父亲最后的空间 */
    flex: 1;
`