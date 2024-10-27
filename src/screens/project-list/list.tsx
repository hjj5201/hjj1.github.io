import React from "react"
import { User } from "./search-panel";
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
    return <table>
        <thead>
            <tr>
                <th>名称</th>
                <th>负责人</th>
            </tr>
        </thead>
        <tbody>
            {
                list.map(project => <tr key={project.id}>
                    <td>{project.name}</td>
                     {/* 找到与userid匹配的personid的人并输出它的user的名字 加上问号和||时表达了当结果是underfinde没找到时，就返回未知*/}
                    <td>{users.find(user => user.id === project.personId)?.name||'未知'}</td>
                </tr>
                )
            }
        </tbody>
    </table>
}