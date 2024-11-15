import styled from "@emotion/styled";
import { Kanban } from "types/kanban";
import { useTasks } from "utils/task";
import { useTaskSearchParams } from "./util";

// 将看板的数据搞成一列一列的
export const KanbanColumn = ({kanban}:{kanban:Kanban}) => {
    const {data:allTasks} = useTasks(useTaskSearchParams())
    const tasks = allTasks?.filter(task => task.kanbanId === kanban.id)
    return <div>
        <h3>{kanban.name}</h3>
            {tasks?.map(task => <div key={task.id}>
                    {task.name}
                </div>)}
    </div>
}

