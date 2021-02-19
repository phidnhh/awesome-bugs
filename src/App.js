import React, { useState, useEffect } from "react"
import { Route, Router, Switch, useHistory } from "react-router-dom";
import LoadingComponent from "./components/LoadingComponent/LoadingComponent";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import SiderTableContent from "./pages/SiderTableContent";
import { LoginTemplate } from "./templates/LoginTemplate";
import history from "./util/history";

export default function App() {

  // const history = useHistory();
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch({
  //     type: ADD_HISTORY,
  //     history: history
  //   });
  // }, []);


  return (
    <>
      <Router history={history}>
        <LoadingComponent/>
        <Switch>
          <LoginTemplate exact path="/login" 
            LoginComponent={Login}
            SiderTableContentComponent={SiderTableContent}
          />
          <Route exact path="/home" component={Home} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </Router>
    </>
  )
}
