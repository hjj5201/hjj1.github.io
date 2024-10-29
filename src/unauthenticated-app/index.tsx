import { useState } from "react"
import { RegisterScreen } from "./register"
import { LoginScreen } from "./login"
import { Button, Card,Divider, Typography } from "antd"
import styled from "@emotion/styled"
//引进svg图片
import logo from 'assets/logo.svg'
import left from 'assets/left.svg'
import right from 'assets/right.svg'
export const UnauthenticatedApp = () =>{
    const [isRegister,setIsRegister] = useState(false)
    const [error,setError] = useState<Error | null>(null)
    return (<Container>
        <Header/>
        <Background/>
        <ShadowCard>
            <Title>
                {isRegister ? '请注册' : '请登录'}
            </Title>
            {error ? <Typography.Text type={"danger"}>{error.message}</Typography.Text> :null}
            {
                isRegister?<RegisterScreen onError={setError}/>:<LoginScreen onError={setError}/>
            }
            <Divider/>
            <Button type={"link"} onClick={() => setIsRegister(!isRegister)}>
                {isRegister?'已经有账号了?直接登录':'没有账号?注册新账号'}
            </Button>
        </ShadowCard>
    </Container>
    )
}
// 为什么要暴露呢？因为注册组件的按钮也要有这种属性
export  const LongButton = styled(Button)`
    width: 100%;
`

//加入title
const Title = styled.h2`
    margin-bottom: 2.4rem;
    color: rgb(94,108,132);
`

//给页面加一个背景图
const Background = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    /* 决定了我们的图片是否会随着页面的滑动而滑动 */
    background-attachment: fixed;
    background-position: left bottom,right bottom;
    background-size: calc(((100vw - 40rem)/2) - 3.2rem),calc(((100vw - 40rem)/2) - 3.2rem),cover;
    background-image: url(${left}),url(${right});
    `

const Header = styled.header`
    /* 引入logo图片 */
    background: url(${logo}) no-repeat center;
    padding: 5rem 0;
    background-size: 8rem;
    width: 100%;
`

//用于修改Card样式  记得吧Card切换成shadow Card
const ShadowCard = styled(Card)`
    width: 40rem;
    min-height: 56rem;
    padding: 3.2rem 4rem;
    border-radius: 0.3rem;
    box-sizing: border-box;
    box-shadow: rgba(0,0,0,0.1) 0 0 10px;
    text-align: center;
`

const Container = styled.div`
display:flex;
flex-direction: column;
align-items: center;
min-height: 100vh;
`