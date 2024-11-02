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
import { Spin, Typography } from "antd";
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
        <Typography.Text type={"danger"}>{error?.message}</Typography.Text>
    </Fullpage>
);
