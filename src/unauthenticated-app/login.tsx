import { useAuth } from "context/auth-context";
import React, { FormEvent } from "react";
import {Form,Input,Button} from 'antd'
import Password from "antd/lib/input/Password";
import { LongButton } from "unauthenticated-app";

const apiUrl = process.env.REACT_APP_API_URL
export const LoginScreen = () =>{

    const {login,user} = useAuth()

    const handleSubmit = (value:{username:string , password:string}) =>{
        login(value)
    }

    return <Form  onFinish={handleSubmit}>
        {/* 通过name属性来给value的值，就不需要和之前那样子做了 */}
        <Form.Item name={'username'} rules={[{required:true,message:'请输入用户名'}]}>
            <Input type="text" id={'username'} placeholder={'用户名'}/>
        </Form.Item>
        <Form.Item name={'password'} rules={[{required:true , message : '请输入密码'}]}>
            <Input type="password" id={'password'} placeholder={'密码'}/>
        </Form.Item>
        <Form.Item>
            {/* 这个type是指样式的type 原先的submit放在htmlType里了*/}
            <LongButton type={"primary"} htmlType={'submit'}>登录</LongButton>
        </Form.Item>
    </Form>
}