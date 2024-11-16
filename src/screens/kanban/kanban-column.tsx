import styled from "@emotion/styled";
import { Kanban } from "types/kanban";
import { useTasks } from "utils/task";
import { useTaskSearchParams } from "./util";
import { useTaskTypes } from "utils/task-type";
import taskIcon from 'assets/task.svg'
import bugIcon from 'assets/bug.svg'
import { Card } from "antd";
import { CreateTask } from "./create-task";

// 获取tasktype列表，根据id来渲染图片
const TaskTypeIcon = ({id}:{id:number}) => {
    const {data:taskTypes} = useTaskTypes()
    const name = taskTypes?.find(taskType => taskType.id === id)?.name
    if(!name) {
        return null
    }
    return <img src={name === 'task'? taskIcon : bugIcon}/>
}



// 将看板的数据搞成一列一列的
export const KanbanColumn = ({kanban}:{kanban:Kanban}) => {
    const {data:allTasks} = useTasks(useTaskSearchParams())
    const tasks = allTasks?.filter(task => task.kanbanId === kanban.id)
    return <Container>
        <h3>{kanban.name}</h3>
        <TasksContainer>
            {tasks?.map(task => <Card key={task.id} style={{marginBottom:'0.5rem'}}>
                <div>
                    {task.name}
                </div>
                    <TaskTypeIcon id={task.typeId}/>
                </Card>)}
                <CreateTask kanbanId={kanban.id}/>
        </TasksContainer>
    </Container>
}

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
