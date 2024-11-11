// import styled from "@emotion/styled";
// import { Spin, Typography } from "antd";
// import { SpinState } from "antd/lib/spin";

// //代码复用
// export const Row = styled.div<{
//     gap?:number|boolean,
//     between?:boolean,
//     marginbottom?:number
// }>`
//     display: flex;
//     align-items: center;
//     justify-content: ${props => props.between ? 'space-between' : undefined};
//     margin-bottom: ${props => props.marginbottom + 'rem'};
// //给他子元素设置样式  最高优先级别后面的东西代表  防止子元素不垂直居中 
// >* {
//     margin-top: 0 !important;
//     margin-bottom: 0 !important;
//     /* 每个直接子元素都要有个向右的距离，项目里的 */
//     margin-right: ${props => typeof props.gap === 'number' ? props.gap + 'rem': props.gap ? '2rem' : undefined};
// }
// `

// const Fullpage = styled.div`
//     height: 100vh;
//     display: flex;
//     justify-content: center;
//     align-items: center;
// `

// export const FullPageLoading = () =><Fullpage>
//     <Spin size={"large"}/>
// </Fullpage>


// export const  FullPageErrorFallback = ({error}:{error:Error | null}) => <Fullpage>
//     <Typography.Text type={"danger"}{error?.message}></Typography.Text>
// </Fullpage>
import styled from "@emotion/styled";
import { Spin, Typography,Button } from "antd";
import { DevTools } from "jira-dev-tool";

// 代码复用
export const Row = styled.div<{
    gap?: number | boolean;
    between?: boolean;
    marginbottom?: number;
}>`
    display: flex;
    align-items: center;
    justify-content: ${props => (props.between ? 'space-between' : 'flex-start')};
    margin-bottom: ${props => (props.marginbottom ? `${props.marginbottom}rem` : '0')};

    > * {
        margin-top: 0 !important;
        margin-bottom: 0 !important;
        margin-right: ${props => 
            typeof props.gap === 'number' ? `${props.gap}rem` : 
            props.gap ? '2rem' : '0'};
    }
`;

const Fullpage = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
//查一下
export const FullPageLoading = () => (
    <Fullpage>
        <Spin size={"large"} />
    </Fullpage>
);

export const FullPageErrorFallback = ({ error }: { error: Error | null }) => (
    <Fullpage>
        {/* 防止me获取错误导致呈现错误页面没有齿轮了 */}
        <DevTools/>
        <ErrorBox error ={error}/>
    </Fullpage>
);

//类型守卫  当符合这个条件时即有value.message时，将value的类型改为ERROR，也就是将传入的值改为Error属性
const isError = (value:any):value is Error => value?.message

//封装一个可以自行判定是否为Error属性，当是的话就返回一个盒子
export const ErrorBox = ({error}:{error:unknown}) => {
    // 只要有message属性，我们就可以认为是error   报错原因是error为unknow不能读 所以要用类型守卫
    if(isError(error)) {
        return <Typography.Text type={"danger"}>{error?.message}</Typography.Text> 
    }
    return null
}   

//抽象一个padding为0的Button组件
export const ButtonNoPadding = styled(Button)`
    padding: 0;
`
