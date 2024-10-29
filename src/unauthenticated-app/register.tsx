import { useAuth } from "context/auth-context";
import React, { FormEvent } from "react";
import {Form,Input,Button} from 'antd'
import { LongButton } from "unauthenticated-app";
import { useAsync } from "utils/use-async";

const apiUrl = process.env.REACT_APP_API_URL
export const RegisterScreen =  ({onError}:{onError:(error:Error) =>void}) =>{

    const {register,user} = useAuth()
    const {run,isLoading} = useAsync(undefined,{throwOnError:true})

    const handleSubmit = async({cpassword,...values}:{username:string , password:string ,cpassword:string}) =>{
        if(cpassword !== values.password)  {
            onError(new Error('请确认俩次输入的密码相同'))
            return
        }
        //记得查
        try{
           await run(register(values))
        }catch(e){
            onError(e as Error)
        }
    }
    /**
     *  onFinish 属性
        定义: onFinish 是 Ant Design 的 Form 组件的一个属性，用于指定当表单验证通过时要调用的函数。
        功能: 当用户点击提交按钮时，表单会先进行验证。如果所有的输入项都符合规定（例如，必填项都已填写，格式正确等），则会调用 onFinish 指定的函数，并将表单的值作为参数传递给该函数。
     */
    return <Form  onFinish={handleSubmit}>
        {/* 通过name属性来给value的值，就不需要和之前那样子做了 */}
        {/* 这个例子中，rules 定义了一个验证规则，要求 username 字段为必填项。如果用户未输入用户名，表单会显示错误信息“请输入用户名”。 */}
        <Form.Item name={'username'} rules={[{required:true,message:'请输入用户名'}]}>
            <Input type="text" id={'username'} placeholder={'用户名'}/>
        </Form.Item>
        <Form.Item name={'password'} rules={[{required:true , message : '请输入密码'}]}>
            <Input type="password" id={'password'} placeholder={'密码'}/>
        </Form.Item>
        <Form.Item name={'cpassword'} rules={[{required:true , message : '请确认密码'}]}>
            <Input type="password" id={'cpassword'} placeholder={'确认密码'}/>
        </Form.Item>

        <Form.Item>
            {/* 这个type是指样式的type 原先的submit放在htmlType里了*/}
            {/* 意义: htmlType 属性用于设置按钮的 HTML 类型。

                功能: 设置按钮的 HTML 类型主要用于确定按钮的行为。常见的类型有：

                submit: 触发表单提交。当按钮类型为 submit 时，点击按钮会触发表单的 onFinish 方法。
                button: 普通按钮，不会提交表单。
                reset: 用于重置表单中的输入值。 
            */}
            <LongButton type={"primary"} htmlType={'submit'} loading={isLoading}>注册</LongButton>
        </Form.Item>
    </Form>
}