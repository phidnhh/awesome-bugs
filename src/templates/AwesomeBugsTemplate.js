import React, { useEffect, useRef } from "react";
import { Route } from "react-router-dom";
import Sidebar from "../components/awesomebugs/Sidebar";
import Menu from "../components/awesomebugs/Menu";
import SearchModal from "../components/modal/SearchModal";
import InfoModal from "../components/modal/InfoModal";
import { useDispatch, useSelector } from "react-redux";
import { notification } from 'antd';
import history from "./../util/history";
import { USER_LOGIN } from "../util/constants/settingSystem";

export const AwesomeBugsTemplate = (props) => {
  let userLogin = {};
  if(localStorage.getItem(USER_LOGIN)) {
    userLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
  }
  
  useEffect(() => {
    if(!userLogin.id) {
      history.push("/login");
    }
  }, []);

  const {Component, ...resParam} = props;
  return <Route {...resParam} render={(propsRoute) => {
    return <>
      <div className="awesomebugs">
        <Sidebar/>
        <Menu/>
        <Component {...propsRoute}/>
      </div>
      <SearchModal/>
      <InfoModal/>
    </>
  }}/>
}
