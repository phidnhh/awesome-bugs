import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom';
import Login from "./pages/Login";
import SiderTableContent from './pages/SiderTableContent';
import { LoginTemplate } from './templates/LoginTemplate';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <LoginTemplate exact path="/login" 
            LoginComponent={Login}
            SiderTableContentComponent={SiderTableContent}
          />
        </Switch>
      </BrowserRouter>
    </>
  )
}
