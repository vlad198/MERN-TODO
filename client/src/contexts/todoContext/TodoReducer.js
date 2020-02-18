import {CREATE_TODO_SUCCESS,CREATE_TODO_FAIL,TODO_DELETE_FAIL,TODO_DELETE_SUCCESS,GET_TODOS_SUCCESS,GET_TODOS_FAIL,CLEAR_TODO} from '../types';

export default (state,action) => {
    switch(action.type) {
        case CLEAR_TODO : 
            return {
                ...state,
                todos : []
            }
        case GET_TODOS_SUCCESS : 
            return {
                ...state,
                todos : action.payload,
                error : null
            }
        case GET_TODOS_FAIL : 
            return {
                ...state,
                error : action.payload
            }
        case CREATE_TODO_SUCCESS :
            return {
                ...state,
                todos : [...state.todos,action.payload]
            }
        case CREATE_TODO_FAIL :
            return {
                ...state,
                error : action.payload
            }
        case TODO_DELETE_SUCCESS : 
            return {
                ...state,
                todos : state.todos.filter(todo => todo._id !== action.payload)
            }
        case TODO_DELETE_FAIL : 
            return {
                ...state,
                error : action.payload
            }
        default : 
            return state;
    }
}