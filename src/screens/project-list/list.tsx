import React from "react"
import { User } from "./search-panel";
import { Table } from "antd";
interface Project {
    id:string;
    name:string;
    personId:string;
    pin:boolean;
    organization:string;
}
interface ListProps {
    list:Project[],
    users:User[],
}
export const List = ({list,users}:ListProps) =>{
    return <Table pagination={false} columns={[{
        title:'名称',
        // 对应的project里面去读name属性
        dataIndex:'name',
        // 排序 localeCompare可以排序我们的中文字符
        sorter:(a,b) =>a.name.localeCompare(b.name)
    },{
        title:'负责人',
        render(value,project){
            return <span>
                {users.find(user => user.id === project.personId)?.name||'未知'}
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