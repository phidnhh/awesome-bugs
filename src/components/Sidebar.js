import React, { useState } from 'react'
import { Layout, Menu } from 'antd';
import jiraLogo from "./../assets/images/jiraLogo.svg";

const { Sider } = Layout;

export default function Sidebar() {
  const [state, setState] = useState({
    collapsed: false,
  });

  let onCollapse = collapsed => {
    setState({ collapsed });
  };

  return (
    <div>
        <Sider className="sider-sidebar" collapsible collapsed={state.collapsed} onCollapse={onCollapse}>
          <div className="logo">
            <img src={jiraLogo}/>
          </div>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<i className="fa fa-search fa-lg" ></i>}>
              <span className="text-uppercase">Search issues</span>
            </Menu.Item>
            <Menu.Item key="2" icon={<i className="fa fa-plus fa-lg" ></i>}>
              <span className="text-uppercase">Create Issue</span>
            </Menu.Item>
          </Menu>
        </Sider>
    </div>
  )
}
