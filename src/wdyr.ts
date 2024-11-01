// why did you render包的使用文件 查看为什么会依赖循环
import React from 'react';

if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    //填true会跟踪我的所有函数组件
    trackAllPureComponents: false,
  });
}