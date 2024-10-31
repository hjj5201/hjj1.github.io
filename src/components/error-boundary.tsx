import React, { ReactNode } from "react";

//错误边界一定要用class组件
// 俩个泛型 第一个是props 第二是state
// 给props传入的属性   一个是children  一个是fallbackRender(捕获到错误后显示这个)
type FallbackRender = (props:{error:Error | null}) => React.ReactElement 
// type PropsWithChildren<P = unknown> = P & { children?: ReactNode | undefined }; 把俩个类型结合到一起
export class ErrorBoundary extends React.Component<React.PropsWithChildren<{fallbackRender : FallbackRender}>,{error:Error | null}> {
     state = {error:null}//与第二个参数保持一致

    //  静态元素要查
    // 意思为：当 ErrorBoundary 的子组件抛出异常这里会接收到之后，这个方法就会被调用并改变state值
     static getDerviedStateFromError(error:Error) {
        return {error}
     }

     render() {
        const {error} = this.state
        const {fallbackRender,children} = this.props
        if(error) {
            return fallbackRender({error})
        } 
        return children
     }
}