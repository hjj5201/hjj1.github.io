import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {loadDevTools} from 'jira-dev-tool'
import { AppProviders } from 'context';


loadDevTools(()=>ReactDOM.render(
   // React.StrictMode这是一个用于突出显示潜在问题的工具。它不会渲染任何 UI，只是在开发模式下启用额外的检查和警告。它可以帮助开发者识别不推荐使用的 API、检测不安全的生命周期方法等。
  <React.StrictMode>
    <AppProviders>
    <App />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById('root')
)
)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
