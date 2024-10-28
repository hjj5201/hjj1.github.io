import React from "react"
import { User } from "./search-panel";
import { Table } from "antd";
import dayjs from "dayjs";
interface Project {
    id:string;
    name:string;
    personId:string;
    pin:boolean;
    organization:string;
    created:number;
}
interface ListProps {
    list:Project[],
    users:User[],
}
export const List = ({list,users}:ListProps) =>{
    return <Table 
    pagination={false} 
    rowKey="id" // 在这里添加 rowKey
    columns={[
        {
        title:'名称',
        // 对应的project里面去读name属性
        dataIndex:'name',
        // 排序 localeCompare可以排序我们的中文字符
        sorter:(a,b) =>a.name.localeCompare(b.name),
    },
    {
        title:'部门',
        dataIndex:'organization',
    },
    {
        title:'负责人',
        render(value,project){
            return <span>
                {users.find(user => user.id === project.personId)?.name||'未知'}
            </span>
        }
    },
    {
        title:'创建时间',
        render(value,project) {
            return <span>
                {
                    project.created ? dayjs(project.created).format('YYYY-MM-DD') : '无'
                }
            </span>
        }
    }
]} dataSource={list}/>
    // return <table>
    //     <thead>
    //         <tr>
    //             <th>名称</th>
    //             <th>负责人</th>
    //         </tr>
    //     </thead>
    //     <tbody>
    //         {
    //             list.map(project => <tr key={project.id}>
    //                 <td>{project.name}</td>
    //                  {/* 找到与userid匹配的personid的人并输出它的user的名字 加上问号和||时表达了当结果是underfinde没找到时，就返回未知*/}
    //                 <td>{users.find(user => user.id === project.personId)?.name||'未知'}</td>
    //             </tr>
    //             )
    //         }
    //     </tbody>
    // </table>
}