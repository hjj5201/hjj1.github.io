import React from "react";
import styled from "@emotion/styled";
import { Kanban } from "types/kanban";
import { useTasks } from "utils/task";
import { useKanbansQueryKey, useTaskSearchParams, useTasksModal } from "./util";
import { useTaskTypes } from "utils/task-type";
import taskIcon from 'assets/task.svg'
import bugIcon from 'assets/bug.svg'
import { Button, Card, Dropdown, Menu, Modal } from "antd";
import { CreateTask } from "./create-task";
import { Task } from "types/task";
import { Mark } from "components/mark";
import { useDeleteKanban } from "utils/kanban";
import { Row } from "components/lib";
import { Drag, Drop, DropChild } from "components/drag-and-drop";



// 获取tasktype列表，根据id来渲染图片
const TaskTypeIcon = ({ id }: { id: number }) => {
    const { data: taskTypes } = useTaskTypes()
    const name = taskTypes?.find(taskType => taskType.id === id)?.name
    if (!name) {
        return null
    }
    return <img src={name === 'task' ? taskIcon : bugIcon} alt={'task-icon'} />
}

const TaskCard = ({ task }: { task: Task }) => {
    const { startEdit } = useTasksModal()
    const { name: keyword } = useTaskSearchParams()
    return (
        <Card key={task.id} style={{ marginBottom: '0.5rem', cursor: 'pointer' }}
            onClick={() => startEdit(task.id)}>
            <p>
                <Mark keyword={keyword} name={task.name} />
            </p>
            <TaskTypeIcon id={task.typeId} />
        </Card>)
}


// 将看板的数据搞成一列一列的
export const KanbanColumn = React.forwardRef<HTMLDivElement, { kanban: Kanban }>(({ kanban,...props }, ref) => {
    const { data: allTasks } = useTasks(useTaskSearchParams())
    const tasks = allTasks?.filter(task => task.kanbanId === kanban.id)
    return <Container ref={ref} {...props}>
        <Row between={true}>
            <h3>{kanban.name}</h3>
            <More kanban={kanban} key={kanban.id} />
        </Row>
        <TasksContainer>
          <Drop type={'ROW'} direction={'vertical'} droppableId={String(kanban.id)}>
            <DropChild style={{minHeight:'5px'}}>
            {tasks?.map((task,taskIndex) => (
                <Drag key={task.id} index={taskIndex} draggableId={'task' + task.id}>
                   <div>
                   <TaskCard task={task} key={task.id} />
                   </div>
                </Drag>
            )
            )}
            </DropChild>
          </Drop>
            <CreateTask kanbanId={kanban.id} />
        </TasksContainer>
    </Container>
})


//删除
const More = ({ kanban }: { kanban: Kanban }) => {
    const { mutateAsync } = useDeleteKanban(useKanbansQueryKey());
    const startDelete = () => {
        Modal.confirm({
            okText: "确定",
            cancelText: "取消",
            title: "确定删除看板吗",
            onOk() {
                return mutateAsync({ id: kanban.id });
            },
        });
    };
    const overlay = (
        <Menu>
            <Menu.Item>
                <Button type={"link"} onClick={startDelete}>
                    删除
                </Button>
            </Menu.Item>
        </Menu>
    );
    return (
        <Dropdown overlay={overlay}>
            <Button type={"link"}>...</Button>
        </Dropdown>
    );
};

export const Container = styled.div`
    min-width: 27rem;
    border-radius: 6px;
    background-color: rgb(244,245,247);
    display: flex;
    flex-direction: column;
    padding: 0.7rem 0.7rem 1rem;
    margin-right: 1.5rem;
    /* overflow: hidden; */
`

// 超出容器的时候才出现滚动条
const TasksContainer = styled.div`
    overflow: scroll;
    flex: 1;
    ::-webkit-scrollbar{
        display: none;
    }
`
