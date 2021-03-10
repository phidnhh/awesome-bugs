import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from "./../context/auth";
import Menu from './awesomebugs/Menu';
import Sidebar from './awesomebugs/Sidebar';
import Loading from './loading/Loading';
import InfoModal from './modal/InfoModal';
import SearchModal from './modal/SearchModal';

function PrivateRoute({ Component, ...rest }) {
  const { isLoggedIn } = useAuth();
  return(
    isLoggedIn === undefined ? <Loading />:
      <Route {...rest} render={(props) => (
        isLoggedIn ?
          <>
            <div className="awesomebugs">
              <Sidebar/>
              <Menu/>
              <Component {...props}/>
            </div>
            <SearchModal/>
            <InfoModal/>
          </>
        : <Redirect to="/login" />
      )}
    />
  );
}

export default PrivateRoute;
