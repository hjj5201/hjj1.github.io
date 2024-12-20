import React from "react"
import { User } from "./search-panel";
import { Dropdown, Menu, Table,Modal } from "antd";
import dayjs from "dayjs";
import { TableProps } from "antd/lib/table";
//react-router 和 react-router-dom 的关系 类似于 react 和 react-dom/react-native
import { Link } from "react-router-dom";
import { Pin } from "components/pin";
import { useDeleteProject, useEditProject, useProject } from "utils/project";
import { ButtonNoPadding } from "components/lib";
import { useProjectModal, useProjectsQueryKey } from "./util";
import { Project } from "types/project";


//把list删掉 因为继承的已经有了
interface ListProps extends TableProps<Project>{
    users:User[],
}
/**
 * columns: 定义表格的列。是一个数组，每个元素定义一列的属性，包括：
    title: 列的标题。
    dataIndex: 用于从数据源对象中获取数据的字段名。
    key: 每列的唯一标识，通常与 dataIndex 相同。
    pagination: 用于配置分页功能，可以设置为 false 以禁用分页，或传递对象以自定义分页行为
    rowKey: 指定每行数据的唯一标识字段，通常设置为数据源中的某个字段（如 id）。
 *
 * 
 */
// 可以把props直接送给tableprops 这个搞可以动态的将loading交给table
export const List = ({users,...props}:ListProps) =>{
    const {mutate} =useEditProject(useProjectsQueryKey())

    const {startEdit} = useProjectModal()
    const editProject = (id:number)  => () => startEdit(id)

    // 由于project是早就知道的，而pin还有传参数才知道导致俩个参数不同步
    const pinProject = (id:number) => (pin: boolean) =>mutate({id:id,pin})
    
    return <Table 
    pagination={false} 
    rowKey="id" // 在这里添加 rowKey
    columns={[
        // 增加收藏栏
        {
            title:<Pin checked={true} disabled={true}/>,
            render(value,project) {
                return <Pin checked={project.pin} onCheckedChange={pinProject(project.id)}/>
                // 和pin => pinProject(project.id,pin)是一样的不用柯里化之前
            }
        },
        {
        title:'名称',
        // 对应的project里面去读name属性
        // dataIndex:'name',
        // 排序 localeCompare可以排序我们的中文字符
        sorter:(a,b) =>a.name.localeCompare(b.name),
        render(value,project) {
            return <Link to={String(project.id)}>{project.name}</Link>
        }
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
    },
    {
        render(value,project) {
            // overlay的内容是下拉框的内容
            return <More project={project}/>
        }
    }
    // dataSource: 表格的数据源，通常是一个数组，包含多个对象。每个对象对应表格中的一行。
]} //dataSorse将list直接传给props
{...props}
/>
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


const More = ({project}:{project:Project}) => {
    const {startEdit} = useProjectModal()
    const editProject = (id:number)  => () => startEdit(id)
    const {mutate:deleteProject} = useDeleteProject(useProjectsQueryKey())
    // 给用户确认一遍
    const confirmDeleteProject = (id:number) => {
        // antd里的confirm
        Modal.confirm({
            title:'确定删除这个项目吗',
            content:'点击确定删除',
            okText:'确定',
            onOk() {
                deleteProject({id})
            }
        })
    }
    return<Dropdown overlay={<Menu>
        <Menu.Item key={'edit'} onClick={editProject(project.id)}>
            编辑
        </Menu.Item>
        <Menu.Item key={"delete"} onClick={() => confirmDeleteProject(project.id)}>
            删除
        </Menu.Item>
    </Menu>}>
        <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
    </Dropdown>
}