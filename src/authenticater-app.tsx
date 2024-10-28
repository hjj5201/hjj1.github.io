//非登录注册页面
import styled from "@emotion/styled"
import { Row } from "components/lib"
import { useAuth } from "context/auth-context"
import React from "react"
import { ProjectListScreen } from "screens/project-list"

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
export const AuthenticaterApp = () =>{
    const {logout} = useAuth()
    return <div>
        <Container>
            <Header between={true}>
                {/* 给lib传props */}
                <HeaderLeft gap={true}>
                    <h2>Logo</h2>
                    <h2>项目</h2>
                    <h2>用户</h2>
                </HeaderLeft>
                <HeaderRight>
                    <button onClick={logout}>登出</button>
                </HeaderRight>
            </Header>
            <Main>
                <ProjectListScreen/>
            </Main>
        </Container>
    </div>
}

const HeaderItem = styled.h3`
    margin-right: 3rem;
`

const Container = styled.div`
    /* display: grid; */
    grid-template-rows: 6rem 1fr 6rem;
    height: 100vh;
`
// grid-area是用来给grid子元素起名字的
const Header = styled(Row)`
`
//引入lib的css变量
const HeaderLeft = styled(Row)`
`
const HeaderRight = styled.div``;
const Main = styled.main`grid-area:main`;



// const PageHeader = styled.header`
//     height: 6rem;
//     background-color: gray;
// `

// const Main = styled.main`
//     /*整个视口高度减去头div的6rem就我main的高度  */
//     height: calc(100vh-6rem);
// `