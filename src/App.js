import React from "react"
import { Route, Router, Switch } from "react-router-dom";
import Loading from "./components/loading/Loading";
import Drawer from "./hocs/Drawer";
import CreateProject from "./pages/CreateProject";
import ProjectDetail from "./pages/ProjectDetail";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import ProjectManagement from "./pages/ProjectManagement";
import SiderTableContent from "./pages/SiderTableContent";
import { AwesomeBugsTemplate } from "./templates/AwesomeBugsTemplate";
import { LoginTemplate } from "./templates/LoginTemplate";
import history from "./util/history";
import Register from "./pages/Register";

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
          <LoginTemplate exact path="/register" 
            LoginComponent={Register}
            SiderTableContentComponent={SiderTableContent}
          />
            <AwesomeBugsTemplate exact path="/awesomebugs" Component={ProjectDetail}/>
            <AwesomeBugsTemplate exact path="/createproject" Component={CreateProject}/>
            <AwesomeBugsTemplate exact path="/" Component={ProjectManagement}/>
            <AwesomeBugsTemplate exact path="/projectmanagement" Component={ProjectManagement}/>
            <AwesomeBugsTemplate exact path="/projectdetail/:projectId" Component={ProjectDetail}/>
            <Route path="*" component={PageNotFound} />
        </Switch>
      </Router>
    </>
  )
}
