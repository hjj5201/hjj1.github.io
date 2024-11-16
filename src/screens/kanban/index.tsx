import React from "react";
import { useDocumentTitle } from "utils";
import { useKanbans } from "utils/kanban";
import { useKanbanSearchParams, useProjectIdInUrl, useProjectInUrl } from "./util";
import { KanbanColumn } from "./kanban-column";
import { Divider } from "antd";
import styled from "@emotion/styled";
import { SearchPanel } from "./serach-panel";

export const KanbanScreen = () =>{
    useDocumentTitle('看板列表')
    const {data:currentProject} = useProjectInUrl()
    const {data:kanbans} = useKanbans(useKanbanSearchParams())
    return <div>
        <h1>{currentProject?.name}看板</h1>
        <SearchPanel/>
       <ColumnsContainer>
       {
             kanbans?.map(kanban => <KanbanColumn key={kanban.id} kanban={kanban}/>)
        }
       </ColumnsContainer>
    </div>
}

const ColumnsContainer = styled.div`
    display: flex;
    overflow:hidden;
    margin-right: 2rem;
`