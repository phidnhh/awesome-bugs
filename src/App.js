import React, { useState, useEffect } from "react"
import { Route, Router, Switch, useHistory } from "react-router-dom";
import Loading from "./components/loading/Loading";
import Drawer from "./hocs/Drawer";
import CreateProject from "./pages/CreateProject";
import Home from "./pages/Home";
import indexAwesomeBugs from "./pages/indexAwesomeBugs";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import ProjectManagement from "./pages/ProjectManagement";
import SiderTableContent from "./pages/SiderTableContent";
import { AwesomeBugsTemplate } from "./templates/AwesomeBugsTemplate";
import { LoginTemplate } from "./templates/LoginTemplate";
import history from "./util/history";

export default function App() {
  return (
    <>
      <Router history={history}>
        <Drawer/>
        <Loading/>
        <Switch>
          <LoginTemplate exact path="/login" 
            LoginComponent={Login}
            SiderTableContentComponent={SiderTableContent}
          />
          <Route exact path="/home" component={Home} />
          <AwesomeBugsTemplate exact path="/" Component={indexAwesomeBugs}/>
          <AwesomeBugsTemplate exact path="/awesomebugs" Component={indexAwesomeBugs}/>
          <AwesomeBugsTemplate exact path="/createproject" Component={CreateProject}/>
          <AwesomeBugsTemplate exact path="/projectmanagement" Component={ProjectManagement}/>
          <Route path="*" component={PageNotFound} />
        </Switch>
      </Router>
    </>
  )
}
