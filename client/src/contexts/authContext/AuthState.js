import React,{useReducer} from 'react';
import AuthContext from './AuthContext';
import {SET_USER,AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS,KEEP_LOGGED_IN,SET_ERROR ,LOGOUT,REGISTRATION_FAIL,REGISTRATION_SUCCESS,CLEAR_ERROR} from '../types';
import axios from 'axios';
import AuthReducer from './AuthReducer';
import setToken from '../../utils/setToken';

const AuthState = (props) => {

    const initialState = {
        userAuth : null,
        errors : null,
        user : null
    }

    const [state,dispatch] = useReducer(AuthReducer,initialState);

    const registerUser = async (user) => {
        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post('/register',user,config);
            dispatch({
                type : REGISTRATION_SUCCESS,
                payload : res.data
            });
        } catch(err) {
            dispatch({
                type : REGISTRATION_FAIL,
                payload : err.response.data
            });
        }
    }

    const setError = err => {
        dispatch({
            type : SET_ERROR,
            payload : err
        });
    }

    const keepUserLoggedIn = async () => {

        if (localStorage.token) {
            setToken(localStorage.token);
          }

        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res =  await axios.get('/login',config);
            dispatch({
                type : KEEP_LOGGED_IN,
                payload : res.data
            });
        } catch(err) {
            dispatch({
                type : LOGIN_FAIL,
                payload : err.response.data
            });
        }
        
    }

    const clearError = () => {
        dispatch({
            type : CLEAR_ERROR
        });
    }

    const logout = () => {
        dispatch({
            type : LOGOUT
        });
    }

    const getUser = async () => {
        if(localStorage.token) {
            setToken(localStorage.token);
        } 

        try {
            const res = await axios.get('/login');
            dispatch({
                type : SET_USER ,
                payload : res.data 
            });
        } catch(err) {
            dispatch({
                type : AUTH_ERROR,
                payload : err
            });
        }
    }

    const loginUser = async userData => {
        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post('/login',userData,config);

            dispatch({
                type : LOGIN_SUCCESS,
                payload : res.data
            });

        } catch(err) {
            dispatch({
                type : LOGIN_FAIL,
                payload : err.response.data
            });
        }

    }

    return ( 
        <AuthContext.Provider value={{
            user : state.user,
            userAuth : state.userAuth,
            errors : state.errors,
            getUser,
            loginUser,
            keepUserLoggedIn,
            logout,
            registerUser,
            clearError,
            setError
        }}>
            {props.children}
        </AuthContext.Provider>
     );
}
 
export default AuthState;
