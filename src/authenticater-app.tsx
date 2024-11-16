//非登录注册页面
import styled from "@emotion/styled"
import { ButtonNoPadding, Row } from "components/lib"
import { useAuth } from "context/auth-context"
import React, { useState } from "react"
import { ProjectListScreen } from "screens/project-list"
//引入logo图片  这样引入组件样的东西是可以将图片变为svg从而调整样式
import {ReactComponent as SoftwareLogo} from 'assets/software-logo.svg'
import { Dropdown, Menu,Button } from "antd"
import {Navigate,Route, Routes} from 'react-router'
import {BrowserRouter as Router} from 'react-router-dom'
import { ProjectScreen } from "screens/project"
import { resetRoute } from "utils"
import { ProjectModal } from "screens/project-list/project-modal"
import { ProjectPopover } from "components/project-popover"

/**
 * grid和flex布局各种的应用场景
 * 1.要考虑，是一维布局还是二维布局
 * 一般来说，一维布局用flex，二维布局用grid
 * 2.是从内容出发还是从布局出发
 * 从内容出发：你先有一组内容(数量一般不固定)，然后希望他们均匀的分部在容器中，由内容自己大小决定占据的空间
 * 从布局出发：先规划网格(网格数量一般固定)，然后再把元素往里填充
 * 从内容出发用flex
 * 从布局出发，用grid
 */

// import { Button } from "antd"

//状态提升共同父组件
export const AuthenticaterApp = () =>{
    //控制抽屉的出现和不出现
   

    return <div>
        
            <Container>
            <Router>
                <PageHeader/>
                <Main>
                
                        <Routes >
                            <Route path="/" element={<Navigate to={'/projects'}/>}/>
                            <Route path="/projects" element={
                                <ProjectListScreen/>
                              } 
                            />
                            <Route path="/projects/:projectId/*" element={<ProjectScreen />} />
                        </Routes>
                
                </Main>
                <ProjectModal/>
                </Router>
            </Container>
        
    </div>
}

// const menu = (
//     <Menu>
//         <Menu.Item key="1">
//             <a onClick={logout}>登出</a>
//         </Menu.Item>
//     </Menu>
// );

const PageHeader = () => {
    return   <Header between={true} marginbottom={1}>
    {/* 给lib传props */}
    <HeaderLeft gap={true}>
        {/* 点击返回主页 */}
        <ButtonNoPadding type={'link'} onClick={resetRoute}>
            <SoftwareLogo width={'18rem'} color={'rgb(38,132,255)'}/>
        </ButtonNoPadding>
        <ProjectPopover/>
        <span>用户</span>
    </HeaderLeft>
    <HeaderRight>
       {/* overlay 把鼠标放上去以后显示的下拉框 */}
    {/* <Dropdown overlay = {menu}>
        <a onClick={e => e.preventDefault()}>
            Hi,{user?.name}
        </a>
    </Dropdown> */}
        <User/>
    </HeaderRight>
</Header>
}


const User = () =>{
    const {logout,user} = useAuth()
    return  <div>
        <h2>Hi,{user?.name}</h2>
        <Button onClick={logout}>登出</Button>
        </div>
}


const HeaderItem = styled.h3`
    margin-right: 3rem;
`

const Container = styled.div`
    /* display: grid; */
    /* grid-template-rows: 用于定义网格容器的行高。每个值表示对应行的高度 */
    grid-template-rows: 6rem 1fr 6rem;
    height: 100vh;
`
// grid-area是用来给grid子元素起名字的
const Header = styled(Row)`
padding: 3.2rem;
box-shadow:0 0 5px 0 rgba(0,0,0,0.1);
z-index: 1;

`
//引入lib的css变量
const HeaderLeft = styled(Row)`
`
const HeaderRight = styled.div``;
const Main = styled.main`
/* display: flex;
overflow: hidden; */
/* grid-area:main */
`;



// const PageHeader = styled.header`
//     height: 6rem;
//     background-color: gray;
// `

// const Main = styled.main`
//     /*整个视口高度减去头div的6rem就我main的高度  */
//     height: calc(100vh-6rem);
// `