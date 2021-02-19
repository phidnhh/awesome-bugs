import React from "react";
import { Route } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Menu from "../components/Menu";
import SearchModal from "../components/modal/SearchModal";
import InfoModal from "../components/modal/InfoModal";

export const AwesomeBugsTemplate = (props) => {
  const {Component, ...resParam} = props;
  return <Route {...resParam} render={(propsRoute) => {
    return <>
      <div className="jira">
        <Sidebar/>
        <Menu/>
        <Component {...propsRoute}/>
      </div>
      <SearchModal/>
      <InfoModal/>
    </>
  }}/>
}
