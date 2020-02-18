import React,{useReducer} from 'react';
import ToDoContext from './TodoContext';
import axios from 'axios';
import {CREATE_TODO_SUCCESS,CREATE_TODO_FAIL,TODO_DELETE_FAIL,TODO_DELETE_SUCCESS,GET_TODOS_FAIL,GET_TODOS_SUCCESS,CLEAR_TODO} from '../types';
import ToDoReducer from './TodoReducer';
import setToken from '../../utils/setToken';

const TodoState = (props) => {

    const initialState = {
        todos : [],
        error : null
    }

    const [state,dispatch] = useReducer(ToDoReducer,initialState);

    const config = {
        header: {
            'Content-Type': 'application/json'
        }
    };

    const clearToDo = () => {
        dispatch({
            type : CLEAR_TODO
        });
    }

    const getToDos = async () => {

        if (localStorage.token) {
            setToken(localStorage.token);
          }

        try {
          const res = await axios.get('/todos')
          dispatch({
            type: GET_TODOS_SUCCESS,
            payload: res.data
          });
        } catch (err) {
          dispatch({
            type: GET_TODOS_FAIL,
            payload: err.response.msg
          })
        }
      }

    const createToDo = async (name) => {
        try {
            const res = await axios.post('/todos',{name},config);
            dispatch({
                type : CREATE_TODO_SUCCESS,
                payload : res.data
            });
        } catch(err) {
            dispatch({
                type : CREATE_TODO_FAIL,
                payload : err.response.data.msg
            });
        }
    }

    const deleteToDo = async (_id) => {
        try {
            await axios.delete(`/todos/${_id}`,config);
            dispatch({
                type : TODO_DELETE_SUCCESS,
                payload : _id
            });
        } catch(err) {
            dispatch({
                type : TODO_DELETE_FAIL,
                payload : err.response.data.msg
            });
        }
    }


    return (  
        <ToDoContext.Provider value={{
            todos : state.todos,
            error : state.error,
            deleteToDo,
            createToDo,
            getToDos,
            clearToDo
        }}>
            {props.children}
        </ToDoContext.Provider>
    );
}
 
export default TodoState;