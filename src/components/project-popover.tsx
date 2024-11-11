// 写鼠标移动当项目时展开的内容
import styled from "@emotion/styled";
import { Popover,Typography,List, Divider,Button } from "antd";
import React from "react";
import { useProjects } from "utils/project";
import { ButtonNoPadding } from "./lib";
import { useProjectModal } from "screens/project-list/util";

export const ProjectPopover = () =>{

    const {open} = useProjectModal()

    // 获取项目
    const {data:projects,isLoading} = useProjects()
    // 展示收藏项目
    const pinnedProjects = projects?.filter(projects => projects.pin)

    const content = <ContentContainer>
        <Typography.Text type={"secondary"}>收藏项目</Typography.Text>
        <List>
            {
                pinnedProjects?.map(project => <List.Item>
                    <List.Item.Meta title={project.name}/>
                </List.Item>)
            }
        </List>
        {/* 分隔线 */}
        <Divider/>
        <ButtonNoPadding
            onClick={open}
            type={"link"}
        >
            创建项目
        </ButtonNoPadding>
    </ContentContainer>

    // 该属性表示下拉列表从下面拉出来
    return <Popover placement={"bottom"} content={content}>
        <span>
            项目
        </span>
    </Popover>
}

const ContentContainer = styled.div`
    min-width: 30rem;
`