import React, { useEffect, useState } from "react"
import { Route, Router, Switch } from "react-router-dom";
import Loading from "./components/loading/Loading";
import Drawer from "./hocs/Drawer";
import CreateProject from "./pages/CreateProject";
import ProjectDetail from "./pages/ProjectDetail";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import ProjectManagement from "./pages/ProjectManagement";
import SiderTableContent from "./pages/SiderTableContent";
import { LoginTemplate } from "./templates/LoginTemplate";
import history from "./util/history";
import Register from "./pages/Register";
import { userService } from "./services/UserService";
import { AuthContext } from "./context/auth";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {  
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    userService.testToken().catch((err) => {
      if(err.response.data.statusCode == 500) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{isLoggedIn, setLoggedIn}}>
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

          <PrivateRoute exact path="/awesomebugs" Component={ProjectDetail}/>
          <PrivateRoute exact path="/createproject" Component={CreateProject}/>
          <PrivateRoute exact path="/" Component={ProjectManagement}/>
          <PrivateRoute exact path="/projectmanagement" Component={ProjectManagement}/>
          <PrivateRoute exact path="/projectdetail/:projectId" Component={ProjectDetail}/>
          
          <Route path="*" component={PageNotFound} />
        </Switch>
      </Router>
    </AuthContext.Provider>
  )
}
