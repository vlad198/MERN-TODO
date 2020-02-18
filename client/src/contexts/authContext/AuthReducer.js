import {LOGIN_FAIL,LOGIN_SUCCESS,AUTH_ERROR,SET_USER,LOGOUT,KEEP_LOGGED_IN,SET_ERROR,REGISTRATION_FAIL,REGISTRATION_SUCCESS,CLEAR_ERROR} from '../types';
import setToken from '../../utils/setToken';

export default (state,{type,payload}) => {
    switch(type) {
        case KEEP_LOGGED_IN :
            return {
                ...state,
                userAuth : true,
                user : payload,
                errors : null
            }
        case REGISTRATION_SUCCESS : 
        case LOGIN_SUCCESS :
            localStorage.setItem('token',payload.token);
            return {
                ...state,
                userAuth : true,
                user : payload.user,
                errors : null
            }
        case CLEAR_ERROR :
            return {
                ...state,
                errors : null
            }
        case SET_ERROR :
        case AUTH_ERROR :
            return {
                ...state,
                errors : payload
            }
        case SET_USER : 
            return {
                ...state,
                user : payload,
                userAuth : true,
                errors : null
            }
        case LOGOUT: 
            localStorage.removeItem('token');
            return {
                ...state,
                userAuth : null,
                user : null,
            }    


        case  REGISTRATION_FAIL : 
        case LOGIN_FAIL :
            localStorage.removeItem('token');
            return {
                ...state,
                userAuth : null,
                user : null,
                errors : payload
            }

        default :
            return state;
    }
}