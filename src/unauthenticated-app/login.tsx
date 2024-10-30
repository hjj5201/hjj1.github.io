import { useAuth } from "context/auth-context";
import React, { FormEvent } from "react";
import {Form,Input,Button} from 'antd'
import Password from "antd/lib/input/Password";
import { LongButton } from "unauthenticated-app";
import { useAsync } from "utils/use-async";
const apiUrl = process.env.REACT_APP_API_URL
export const LoginScreen = ({onError}:{onError:(error:Error) =>void}) =>{

    const {login,user} = useAuth()
    const {run,isLoading} = useAsync(undefined,{throwOnError:true})

    const handleSubmit = async (values:{username:string , password:string}) =>{
        //记得查
        try{
          await run(login(values))
        }catch(e){
            // 如果在 try 块中发生错误（例如，登录失败、网络问题等），将会跳转到 catch 块。
            // onError(e as Error)：调用一个名为 onError 的函数，将捕获到的错误作为参数传入。这通常用于更新 UI 状态，显示错误消息，或者记录错误日志。e as Error 是 TypeScript 的类型断言，用于确保 e 被视为 Error 类型。
            onError(e as Error)
        }
    }

    return <Form  onFinish={handleSubmit}>
        {/* 通过name属性来给value的值，就不需要和之前那样子做了 */}
        <Form.Item name={'username'} rules={[{required:true,message:'请输入用户名'}]}>
            <Input type="text" id={'username'} placeholder={'用户名'}/>
        </Form.Item>
        {/* 这个属性表示该字段是必填的。如果用户没有填写这个字段，表单验证将失败。 失败后显示message的内容*/}
        <Form.Item name={'password'} rules={[{required:true , message : '请输入密码'}]}>
            <Input type="password" id={'password'} placeholder={'密码'}/>
        </Form.Item>
        <Form.Item>
            {/* 这个type是指样式的type 原先的submit放在htmlType里了*/}
            {/* 这个loading是自带的属性antd */}
            <LongButton type={"primary"} htmlType={'submit'} loading = {isLoading}>登录</LongButton>
        </Form.Item>
    </Form>
}