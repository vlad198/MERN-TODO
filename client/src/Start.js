import React, { useContext, useEffect, useLayoutEffect, useState, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import AuthContext from './contexts/authContext/AuthContext';
import setToken from './utils/setToken';
import ReactLoading from 'react-loading';
import Register from './components/pages/Register';

function Start() {

  const { keepUserLoggedIn } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    keepUserLoggedIn().then(() => setIsLoading(false))
  }, []);

  return (
    <Fragment>
      {
        isLoading ? (
          <ReactLoading type={"blank"} />
        ) : (
            <Router>
              <div className="container">
                <Switch>
                  <PrivateRoute exact path="/" component={Home} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/register" component={Register} />
                </Switch>
              </div>
            </Router>
          )
      }
    </Fragment>
  );
}

export default Start;
