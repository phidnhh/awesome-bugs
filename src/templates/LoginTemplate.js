import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { Route } from "react-router-dom";
import backgroundLogin from "./../assets/images/background-login.jpg";

const { Sider } = Layout;

export const LoginTemplate = (props) => {

  const [size, setSize] = useState({
      width: window.innerWidth,
      height: window.innerHeight
  });

  useEffect(() => {
    window.onresize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    };
  }, []);

  let { LoginComponent, SiderTableContentComponent, ...restRoute } = props;
  return <Route { ...restRoute } render={(propsRoute) => {
    return <>
      <Layout>
        <Sider width={size.width/2} style={{
            height: size.height, 
            backgroundImage: `url('${backgroundLogin}')`
          }}>
          <SiderTableContentComponent/>
        </Sider>        
        <Layout>
          <LoginComponent { ...propsRoute }/>
        </Layout>
      </Layout>
    </>
  }}/>
}
