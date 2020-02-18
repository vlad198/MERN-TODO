import React, { Fragment, useContext, useEffect } from 'react'
import ToDo from './ToDo'
import ToDoContext from '../../contexts/todoContext/TodoContext';

const ToDoList = () => {

    const { todos, getToDos } = useContext(ToDoContext);


    useEffect(() => { 
        getToDos();
    }, []);

    return (
        <div className="mx-auto">
            <ul className="list-group">
                {todos.map(todo => <ToDo key={todo._id} todo={todo} />)}
            </ul>
        </div>
    );
}

export default ToDoList;
