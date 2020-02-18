import React, { useContext ,useEffect} from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../contexts/authContext/AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => {

    const { userAuth,keepUserLoggedIn } = useContext(AuthContext);

    return (
        <Route {...rest} render={props => !userAuth ? (<Redirect to="/login" />) : (<Component {...props} />)} />
    );
}

export default PrivateRoute;