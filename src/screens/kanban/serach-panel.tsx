//搜索框
import React from "react";
import { useTaskSearchParams } from "./util";
import { useSetUrlSearchParam } from "utils/url";
import { Row } from "components/lib";
import { Input,Button } from "antd";
import { UserSelect } from "components/user-select";
import { TaskTypeSelect } from "components/task-type-select";

export const SearchPanel = () => {
    const searchParams = useTaskSearchParams()
    const setSearchParams = useSetUrlSearchParam()
    // 重置
    const reset = () => {
        setSearchParams({
            typeId:undefined,
            processorId:undefined,
            tagId:undefined,
            name:undefined
        })
    }

    return <Row marginbottom={4} gap={true}>
        <Input style={{width:'20rem'}} placeholder={'任务名'} value={searchParams.name}
                onChange={evt => setSearchParams({name:evt.target.value})}/>
        <UserSelect defaultOptionName={'经办人'} value={searchParams.processorId} 
        onChange={value => setSearchParams({processorId:value})}/>
        <TaskTypeSelect defaultOptionName={'类型'} value={searchParams.typeId} 
        onChange={value => setSearchParams({typeId:value})}/>
        <Button onClick={reset}>清楚筛选器</Button>
    </Row>
}
// export const SearchPanel = () => {
//     const searchParams = useTaskSearchParams();
//     const setSearchParams = useSetUrlSearchParam();
//     const reset = () => {
//       setSearchParams({
//         typeId: undefined,
//         processorId: undefined,
//         tagId: undefined,
//         name: undefined,
//       });
//     };
  
//     return (
//       <Row marginbottom={4} gap={true}>
//         <Input
//           style={{ width: "20rem" }}
//           placeholder={"任务名"}
//           value={searchParams.name}
//           onChange={(evt) => setSearchParams({ name: evt.target.value })}
//         />
//         <UserSelect
//           defaultOptionName={"经办人"}
//           value={searchParams.processorId}
//           onChange={(value) => setSearchParams({ processorId: value })}
//         />
//         <TaskTypeSelect
//           defaultOptionName={"类型"}
//           value={searchParams.typeId}
//           onChange={(value) => setSearchParams({ typeId: value })}
//         />
//         <Button onClick={reset}>清除筛选器</Button>
//       </Row>
//     );
// }