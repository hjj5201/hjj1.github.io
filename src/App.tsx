import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useAuth } from 'context/auth-context';
import { AuthenticaterApp } from 'authenticater-app';
import { UnauthenticatedApp } from 'unauthenticated-app';
import { ErrorBoundary } from 'components/error-boundary';
import { FullPageErrorFallback } from 'components/lib';



function App() {
    //有user就进登录后的页面，没有就来到登录的页面
  const {user} = useAuth()
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <AuthenticaterApp/>:<UnauthenticatedApp/>}
      </ErrorBoundary>
    </div>
  );
}

export default App;
