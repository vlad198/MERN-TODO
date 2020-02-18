import React, { useContext } from 'react';
import ToDoContext from '../../contexts/todoContext/TodoContext';

const ToDo = ({todo}) => {

    const {deleteToDo} = useContext(ToDoContext);

    return (
        <li className="list-group-item">{todo.name} <span onClick={() => deleteToDo(todo._id)} style={{cursor : 'pointer'}} className="float-right"><i class="fas fa-trash"></i></span></li>
    );
}

export default ToDo;