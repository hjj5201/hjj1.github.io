import styled from "@emotion/styled";

//代码复用
export const Row = styled.div<{
    gap?:number|boolean,
    between?:boolean,
    marginbottom?:number
}>`
    display: flex;
    align-items: center;
    justify-content: ${props => props.between ? 'space-between' : undefined};
    margin-bottom: ${props => props.marginbottom + 'rem'};
//给他子元素设置样式  最高优先级别后面的东西代表  防止子元素不垂直居中 
>* {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    /* 每个直接子元素都要有个向右的距离，项目里的 */
    margin-right: ${props => typeof props.gap === 'number' ? props.gap + 'rem': props.gap ? '2rem' : undefined};
}
`