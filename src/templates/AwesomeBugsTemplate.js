import React from "react";
import { Route } from "react-router-dom";
import Sidebar from "../components/awesomebugs/Sidebar";
import Menu from "../components/awesomebugs/Menu";
import SearchModal from "../components/modal/SearchModal";
import InfoModal from "../components/modal/InfoModal";

export const AwesomeBugsTemplate = (props) => {
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
