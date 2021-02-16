import React from "react";
import { Button, Layout } from "antd";
import { Route } from "react-router-dom";
import backgroundLogin from "./../assets/images/background-login.jpg";

const { Header, Footer, Sider, Content } = Layout;

export const LoginTemplate = (props) => {
  let { LoginComponent, SiderTableContentComponent, ...restRoute } = props;
  return <Route { ...restRoute } render={(propsRoute) => {
    return <>
      <Layout>
        <Sider width={window.innerWidth/2} style={{
            height: window.innerHeight,            
            backgroundImage: `url('${backgroundLogin}')`
          }}>
          <SiderTableContentComponent/>
        </Sider>        
        <Layout>
          <LoginComponent/>
        </Layout>
      </Layout>
    </>
  }}/>
}
