import React from "react"
import { useEffect, useState } from "react"
import { Form, Input,Select } from "antd";

// 设置使用变量的说明书，即限制变量的类型---强类型
// 之所以暴露出来是因为list也要用
export interface User {
    id:string;
    name:string;
    email:string;
    title:string;
    organization:string;
    token:string
}

interface SearchPanelProps {
    users:User[],
    param:{
        name:string,
        personId:string
    },
    // 参数里面限制为是param这种类型的，这样子更改param时下面也会同时更改
    setParam:(param:SearchPanelProps['param'])=>void;
}
export const SearchPanel = ({param,setParam,users}:SearchPanelProps) =>{
    //这个属性可以让表单横着排
    return <Form layout={"inline"} style={{marginBottom:'2rem'}}>
        <Form.Item>
            <Input placeholder={'项目名'} type="text" value={param.name} onChange={evt => setParam({
                // 当setParam发生调用时，更新状态。需要吧param对象展开一个一个来更新所以要用...
                ...param,
                name:evt.target.value
            })}/>
        </Form.Item>
        <Form.Item>
                <Select value={param.personId} onChange={value => setParam({
                    ...param,
                    personId:value
                })}>
                    <Select.Option value={''}>负责人</Select.Option>
                    {
                        users.map(user=><Select.Option value={String(user.id)} key={user.id}>
                            {
                                user.name
                            }
                        </Select.Option>)
                    }
                </Select>
            </Form.Item>
    </Form>
}