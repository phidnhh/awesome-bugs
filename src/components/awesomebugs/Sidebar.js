import React, { useEffect, useState } from 'react'
import { Layout, Menu } from 'antd';
import jiraLogo from "./../../assets/images/jiraLogo.svg";
import { useDispatch } from 'react-redux';
import { OPEN_FORM_CREATE_TASK } from '../../redux/constants/AwesomeBugs';
import FormCreateTask from '../form/FormCreateTask';

const { Sider } = Layout;

export default function Sidebar() {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    collapsed: true,
    boxShadowCss: "none"
  });

  let onCollapse = collapsed => {
    setState({ 
      collapsed,
      boxShadowCss: !collapsed? "rgba(0, 0, 0, 0.6) 0px 0px 50px 0px": "none"
    });
  };

  return (
    <div>
        <Sider style={{position:"fixed", height:"100vh", zIndex:"100", boxShadow:`${state.boxShadowCss}`}} className="sideBar" collapsible collapsed={state.collapsed} onCollapse={onCollapse}>
          <div className="logo">
            <img src={jiraLogo}/>
          </div>
          <Menu theme="dark" mode="inline">
            <Menu.Item key="1" icon={<i className="fa fa-plus fa-lg" ></i>} onClick={() => {
              dispatch({
                type: OPEN_FORM_CREATE_TASK,
                title: "Create Task",
                Component: <FormCreateTask/>
              })
            }}>
              <span className="text-uppercase">Create Task</span>
            </Menu.Item>            
            <Menu.Item key="2" icon={<i className="fa fa-search fa-lg" ></i>}>
              <span className="text-uppercase">Search Task</span>
            </Menu.Item>
          </Menu>
        </Sider>
    </div>
  )
}
