import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useAuth } from 'context/auth-context';
import { AuthenticaterApp } from 'authenticater-app';
import { UnauthenticatedApp } from 'unauthenticated-app';



function App() {
  const {user} = useAuth()
  return (
    <div className="App">
      {user ? <AuthenticaterApp/>:<UnauthenticatedApp/>}
    </div>
  );
}

export default App;
